CREATE OR REPLACE FUNCTION public.reconcile_conversation_pattern_mapping(_pattern_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _pattern public.conversation_pattern_clusters;
  _rule public.conversation_rules;
  _observation record;
  _previous public.conversation_states;
  _compilation public.conversation_compilations;
  _due_at timestamptz;
  _momentum integer;
  _movement text;
  _affected integer := 0;
  _lead_ids uuid[] := '{}'::uuid[];
BEGIN
  IF auth.uid() IS NULL OR NOT public.is_tower_ops(auth.uid()) THEN
    RAISE EXCEPTION 'Only authorized administrators can reconcile conversation mappings';
  END IF;

  SELECT * INTO _pattern FROM public.conversation_pattern_clusters WHERE id = _pattern_id;
  IF _pattern.id IS NULL OR _pattern.assigned_family IS NULL THEN
    RAISE EXCEPTION 'Reviewed conversation pattern not found';
  END IF;

  IF _pattern.mapped_rule_id IS NOT NULL THEN
    SELECT * INTO _rule FROM public.conversation_rules WHERE id = _pattern.mapped_rule_id AND active = true;
  ELSE
    SELECT * INTO _rule FROM public.conversation_rules
    WHERE active = true AND event_family = _pattern.assigned_family
    ORDER BY observed_count DESC, version DESC, rule_key
    LIMIT 1;
  END IF;
  IF _rule.id IS NULL THEN RAISE EXCEPTION 'No active rule is available for this mapping'; END IF;

  UPDATE public.conversation_pattern_clusters SET mapped_rule_id = _rule.id WHERE id = _pattern.id;

  FOR _observation IN
    SELECT so.* FROM public.screenshot_observations so
    WHERE so.lead_id IS NOT NULL
      AND regexp_replace(regexp_replace(lower(trim(coalesce(so.last_message_preview, ''))), '[0-9]+', '#', 'g'), '\s+', ' ', 'g') = _pattern.normalized_pattern
    ORDER BY so.captured_at, so.created_at
  LOOP
    SELECT * INTO _previous FROM public.conversation_states WHERE lead_id = _observation.lead_id;
    _due_at := CASE WHEN _rule.sla_minutes IS NULL THEN NULL ELSE coalesce(_observation.captured_at, _observation.created_at) + make_interval(mins => _rule.sla_minutes) END;
    _momentum := greatest(-10, least(10, coalesce(_previous.momentum, 0) + _rule.movement_effect));
    _movement := CASE WHEN _previous.lead_id IS NULL THEN 'FIRST_OBSERVATION' WHEN _previous.canonical_event = _rule.canonical_event THEN 'NO_MOVEMENT' WHEN _rule.movement_effect < 0 THEN 'REGRESSED' WHEN _rule.movement_effect >= 4 THEN 'STRONG_PROGRESS' WHEN _rule.blocker IS NOT NULL THEN 'MOVED_WITH_BLOCKER' ELSE 'PROGRESSED' END;

    INSERT INTO public.conversation_compilations (
      observation_id, lead_id, compiler_version, rule_id, rule_version, canonical_event, event_family,
      modifiers, extracted_entities, raw_labels, parsed_labels, conversation_stage, waiting_on, blocker,
      intent, health, movement, momentum, next_action, next_action_owner, action_due_at, sla_status,
      priority, screenshot_due_at, screenshot_status, evidence_quality, confidence, automation_safe,
      needs_review, reasons, original_interpretation, active_interpretation
    ) VALUES (
      _observation.id, _observation.lead_id, 'reviewed-rule-v1.' || _rule.version::text, _rule.id, _rule.version,
      _rule.canonical_event, _rule.event_family, _rule.modifiers_to_add, coalesce(_observation.intelligence->'entities', '{}'::jsonb),
      ARRAY_REMOVE(ARRAY[_observation.detected_label, _observation.handler_hint], NULL), '{}'::jsonb,
      _rule.stage_after, _rule.waiting_on, _rule.blocker, _rule.event_family,
      CASE WHEN _rule.blocker IS NULL THEN 'MOVING' ELSE 'AT_RISK' END, _movement, _momentum,
      _rule.default_next_action, _rule.default_owner_role, _due_at,
      CASE WHEN _due_at IS NULL THEN 'NO_SLA' WHEN _due_at < now() THEN 'OVERDUE' ELSE 'ON_TRACK' END,
      _rule.priority, coalesce(_observation.captured_at, _observation.created_at) + interval '20 hours',
      CASE WHEN coalesce(_observation.captured_at, _observation.created_at) < now() - interval '48 hours' THEN 'CRITICAL' ELSE 'FRESH' END,
      greatest(0, least(100, round(coalesce(_observation.ocr_confidence, 60))::integer)),
      greatest(_rule.confidence_threshold, coalesce(_observation.ocr_confidence, 60)), true, false,
      ARRAY['Applied reviewed Conversation Library mapping', 'Rule: ' || _rule.rule_key], _observation.intelligence, true
    ) ON CONFLICT (observation_id, compiler_version) DO UPDATE SET
      rule_id = excluded.rule_id, rule_version = excluded.rule_version, canonical_event = excluded.canonical_event,
      event_family = excluded.event_family, conversation_stage = excluded.conversation_stage,
      waiting_on = excluded.waiting_on, blocker = excluded.blocker, movement = excluded.movement,
      momentum = excluded.momentum, next_action = excluded.next_action, next_action_owner = excluded.next_action_owner,
      action_due_at = excluded.action_due_at, sla_status = excluded.sla_status, priority = excluded.priority,
      confidence = excluded.confidence, automation_safe = true, needs_review = false, reasons = excluded.reasons,
      active_interpretation = true, compiled_at = now()
    RETURNING * INTO _compilation;

    IF _previous.latest_compilation_id IS NOT NULL AND _previous.latest_compilation_id <> _compilation.id THEN
      UPDATE public.conversation_compilations SET active_interpretation = false WHERE id = _previous.latest_compilation_id;
    END IF;

    INSERT INTO public.conversation_states (
      lead_id, latest_observation_id, latest_compilation_id, canonical_event, event_family, modifiers,
      extracted_entities, conversation_stage, waiting_on, blocker, intent, health, movement, momentum,
      next_action, next_action_owner, action_due_at, sla_status, priority, last_screenshot_at,
      screenshot_due_at, screenshot_status, evidence_quality, confidence, automation_safe, needs_review, updated_at
    ) VALUES (
      _observation.lead_id, _observation.id, _compilation.id, _rule.canonical_event, _rule.event_family,
      _rule.modifiers_to_add, coalesce(_observation.intelligence->'entities', '{}'::jsonb), _rule.stage_after,
      _rule.waiting_on, _rule.blocker, _rule.event_family, CASE WHEN _rule.blocker IS NULL THEN 'MOVING' ELSE 'AT_RISK' END,
      _movement, _momentum, _rule.default_next_action, _rule.default_owner_role, _due_at,
      CASE WHEN _due_at IS NULL THEN 'NO_SLA' WHEN _due_at < now() THEN 'OVERDUE' ELSE 'ON_TRACK' END,
      _rule.priority, coalesce(_observation.captured_at, _observation.created_at),
      coalesce(_observation.captured_at, _observation.created_at) + interval '20 hours',
      CASE WHEN coalesce(_observation.captured_at, _observation.created_at) < now() - interval '48 hours' THEN 'CRITICAL' ELSE 'FRESH' END,
      greatest(0, least(100, round(coalesce(_observation.ocr_confidence, 60))::integer)),
      greatest(_rule.confidence_threshold, coalesce(_observation.ocr_confidence, 60)), true, false, now()
    ) ON CONFLICT (lead_id) DO UPDATE SET
      latest_observation_id = excluded.latest_observation_id, latest_compilation_id = excluded.latest_compilation_id,
      canonical_event = excluded.canonical_event, event_family = excluded.event_family, modifiers = excluded.modifiers,
      extracted_entities = excluded.extracted_entities, conversation_stage = excluded.conversation_stage,
      waiting_on = excluded.waiting_on, blocker = excluded.blocker, intent = excluded.intent, health = excluded.health,
      movement = excluded.movement, momentum = excluded.momentum, next_action = excluded.next_action,
      next_action_owner = excluded.next_action_owner, action_due_at = excluded.action_due_at,
      sla_status = excluded.sla_status, priority = excluded.priority, last_screenshot_at = excluded.last_screenshot_at,
      screenshot_due_at = excluded.screenshot_due_at, screenshot_status = excluded.screenshot_status,
      evidence_quality = excluded.evidence_quality, confidence = excluded.confidence, automation_safe = true,
      needs_review = false, updated_at = now()
    WHERE public.conversation_states.last_screenshot_at IS NULL OR excluded.last_screenshot_at >= public.conversation_states.last_screenshot_at;

    UPDATE public.leads SET
      current_pipeline_stage = _rule.stage_after,
      pipeline_stage = _rule.stage_after,
      current_mission = _rule.default_next_action,
      primary_blocker = _rule.blocker,
      suggested_stage = _rule.stage_after,
      suggested_mission = _rule.default_next_action,
      suggestion_confidence = greatest(_rule.confidence_threshold, coalesce(_observation.ocr_confidence, 60)),
      suggestion_evidence = 'Reviewed Conversation Library rule: ' || _rule.rule_key,
      updated_at = now()
    WHERE id = _observation.lead_id;

    UPDATE public.next_actions SET
      kind = _rule.default_next_action, due_at = coalesce(_due_at, now()), notes = 'Created from reviewed Conversation Library mapping',
      priority = _rule.priority, updated_at = now()
    WHERE id = (
      SELECT id FROM public.next_actions WHERE lead_id = _observation.lead_id AND status = 'open'
        AND source = 'conversation_compiler' ORDER BY created_at DESC LIMIT 1
    );
    IF NOT FOUND THEN
      INSERT INTO public.next_actions (lead_id, owner_id, kind, due_at, notes, source, triggered_by_observation_id, status, priority, created_by)
      SELECT _observation.lead_id, l.current_owner, _rule.default_next_action, coalesce(_due_at, now()),
        'Created from reviewed Conversation Library mapping', 'conversation_compiler', _observation.id, 'open', _rule.priority, auth.uid()
      FROM public.leads l WHERE l.id = _observation.lead_id;
    END IF;

    INSERT INTO public.lead_timeline (lead_id, actor, activity, detail, prev_stage, new_stage, next_action, deadline)
    VALUES (_observation.lead_id, auth.uid(), 'conversation_mapping_applied',
      'Reviewed rule ' || _rule.rule_key || ' applied from Conversation Library', _previous.conversation_stage,
      _rule.stage_after, _rule.default_next_action, _due_at);

    _lead_ids := array_append(_lead_ids, _observation.lead_id);
    _affected := _affected + 1;
  END LOOP;

  RETURN jsonb_build_object('pattern_id', _pattern.id, 'rule_id', _rule.id, 'affected_observations', _affected, 'lead_ids', _lead_ids);
END;
$$;

REVOKE ALL ON FUNCTION public.reconcile_conversation_pattern_mapping(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.reconcile_conversation_pattern_mapping(uuid) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.start_compiled_lead_action(_lead_id uuid, _ttl_minutes integer DEFAULT 30)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _state public.conversation_states;
  _claim public.work_claims;
  _action public.next_actions;
  _deadline timestamptz;
BEGIN
  IF auth.uid() IS NULL OR NOT public.any_role(auth.uid()) THEN RAISE EXCEPTION 'Sign in with a team role to start work'; END IF;
  SELECT * INTO _state FROM public.conversation_states WHERE lead_id = _lead_id;
  IF _state.lead_id IS NULL THEN RAISE EXCEPTION 'No compiled conversation state exists for this lead'; END IF;
  _deadline := CASE WHEN _state.action_due_at IS NULL OR _state.action_due_at < now() THEN now() + interval '30 minutes' ELSE _state.action_due_at END;

  _claim := public.claim_flow_lead(_lead_id, auth.uid(), NULL, 'NOW', greatest(1, _ttl_minutes), _state.next_action, _deadline);
  UPDATE public.work_claims SET state = 'active', next_action = _state.next_action, next_action_at = _deadline,
    last_meaningful_action_at = now(), expires_at = now() + make_interval(mins => greatest(1, _ttl_minutes)), updated_at = now()
  WHERE id = _claim.id RETURNING * INTO _claim;

  UPDATE public.next_actions SET status = 'in_progress', owner_id = auth.uid(), due_at = _deadline,
    notes = concat_ws(E'\n', nullif(notes, ''), 'Started from Flow OS lead detail'), updated_at = now()
  WHERE id = (SELECT id FROM public.next_actions WHERE lead_id = _lead_id AND status IN ('open','in_progress') ORDER BY CASE WHEN source='conversation_compiler' THEN 0 ELSE 1 END, due_at LIMIT 1)
  RETURNING * INTO _action;
  IF _action.id IS NULL THEN
    INSERT INTO public.next_actions (lead_id, owner_id, kind, due_at, notes, source, status, priority, created_by)
    VALUES (_lead_id, auth.uid(), _state.next_action, _deadline, 'Started from Flow OS lead detail', 'conversation_compiler', 'in_progress', _state.priority, auth.uid())
    RETURNING * INTO _action;
  END IF;

  UPDATE public.leads SET current_mission = _state.next_action, last_operator_action_at = now(), updated_at = now() WHERE id = _lead_id;
  INSERT INTO public.lead_timeline (lead_id, actor, activity, detail, new_stage, next_action, deadline)
  VALUES (_lead_id, auth.uid(), 'compiled_action_started', 'Operator claimed the lead and started the compiler-recommended action', _state.conversation_stage, _state.next_action, _deadline);
  RETURN jsonb_build_object('claim_id', _claim.id, 'action_id', _action.id, 'deadline', _deadline, 'next_action', _state.next_action);
END;
$$;

REVOKE ALL ON FUNCTION public.start_compiled_lead_action(uuid, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.start_compiled_lead_action(uuid, integer) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.assign_conversation_pattern_family(_pattern_id uuid, _family text, _notes text DEFAULT NULL, _rule_id uuid DEFAULT NULL)
RETURNS public.conversation_pattern_clusters
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _result public.conversation_pattern_clusters;
  _selected_rule uuid;
BEGIN
  IF auth.uid() IS NULL OR NOT public.is_tower_ops(auth.uid()) THEN RAISE EXCEPTION 'Only authorized administrators can map conversation families'; END IF;
  IF _family IS NULL OR NOT EXISTS (SELECT 1 FROM public.conversation_rules WHERE active AND event_family = upper(trim(_family))) THEN RAISE EXCEPTION 'Unknown canonical family: %', _family; END IF;
  IF _rule_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.conversation_rules WHERE id = _rule_id AND active AND event_family = upper(trim(_family))) THEN RAISE EXCEPTION 'Selected rule does not belong to this family'; END IF;
  SELECT coalesce(_rule_id, (SELECT id FROM public.conversation_rules WHERE active AND event_family = upper(trim(_family)) ORDER BY observed_count DESC, version DESC, rule_key LIMIT 1)) INTO _selected_rule;
  UPDATE public.conversation_pattern_clusters SET assigned_family = upper(trim(_family)), mapped_rule_id = _selected_rule,
    status = 'mapped', reviewed_by = auth.uid(), reviewed_at = now(), notes = nullif(trim(coalesce(_notes, '')), '')
  WHERE id = _pattern_id RETURNING * INTO _result;
  IF _result.id IS NULL THEN RAISE EXCEPTION 'Conversation pattern not found'; END IF;
  PERFORM public.reconcile_conversation_pattern_mapping(_pattern_id);
  RETURN _result;
END;
$$;

REVOKE ALL ON FUNCTION public.assign_conversation_pattern_family(uuid, text, text, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.assign_conversation_pattern_family(uuid, text, text, uuid) TO authenticated, service_role;