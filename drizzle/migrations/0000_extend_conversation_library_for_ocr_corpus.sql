ALTER TABLE public.conversation_pattern_clusters
  ADD COLUMN IF NOT EXISTS assigned_family text,
  ADD COLUMN IF NOT EXISTS avg_ocr_confidence numeric,
  ADD COLUMN IF NOT EXISTS confidence_band text,
  ADD COLUMN IF NOT EXISTS sample_labels text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS source_screenshots text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS source_zones text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS corpus_row_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS source_corpus text NOT NULL DEFAULT 'live_compiler';

CREATE INDEX IF NOT EXISTS conversation_patterns_assigned_family_idx
  ON public.conversation_pattern_clusters(assigned_family, occurrence_count DESC);

CREATE OR REPLACE FUNCTION public.assign_conversation_pattern_family(
  _pattern_id uuid,
  _family text,
  _notes text DEFAULT NULL,
  _rule_id uuid DEFAULT NULL
)
RETURNS public.conversation_pattern_clusters
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _result public.conversation_pattern_clusters;
BEGIN
  IF auth.uid() IS NULL OR NOT (
    public.has_role(auth.uid(), 'founder_admin'::public.app_role)
    OR public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'manager'::public.app_role)
    OR public.has_role(auth.uid(), 'zone_manager'::public.app_role)
    OR public.has_role(auth.uid(), 'control_tower'::public.app_role)
  ) THEN
    RAISE EXCEPTION 'Only authorized administrators can map conversation families';
  END IF;

  IF _family IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.conversation_rules
    WHERE active = true AND event_family = upper(trim(_family))
  ) THEN
    RAISE EXCEPTION 'Unknown canonical family: %', _family;
  END IF;

  IF _rule_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.conversation_rules
    WHERE id = _rule_id AND active = true AND event_family = upper(trim(_family))
  ) THEN
    RAISE EXCEPTION 'Selected rule does not belong to this family';
  END IF;

  UPDATE public.conversation_pattern_clusters
  SET assigned_family = upper(trim(_family)),
      mapped_rule_id = _rule_id,
      status = 'mapped',
      reviewed_by = auth.uid(),
      reviewed_at = now(),
      notes = NULLIF(trim(COALESCE(_notes, '')), '')
  WHERE id = _pattern_id
  RETURNING * INTO _result;

  IF _result.id IS NULL THEN
    RAISE EXCEPTION 'Conversation pattern not found';
  END IF;

  RETURN _result;
END;
$$;

REVOKE ALL ON FUNCTION public.assign_conversation_pattern_family(uuid, text, text, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.assign_conversation_pattern_family(uuid, text, text, uuid) TO authenticated, service_role;