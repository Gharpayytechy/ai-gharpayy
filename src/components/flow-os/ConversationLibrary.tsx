import { useCallback, useEffect, useMemo, useState } from "react";
import { BookOpen, CheckCircle2, Filter, Library, Search, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import {
  CANONICAL_CONVERSATION_FAMILIES,
  CONVERSATION_FAMILY_LABELS,
  isCanonicalConversationFamily,
  type CanonicalConversationFamily,
} from "@/lib/flow-os/conversation-library";
import { useTowerAuth } from "@/lib/tower/auth";

type RuleRow = {
  id: string;
  canonical_event: string;
  event_family: string;
  semantic_examples: unknown;
  positive_patterns: unknown;
  observed_count: number;
  version: number;
  active: boolean;
};

type PatternRow = {
  id: string;
  normalized_pattern: string;
  representative_text: string;
  occurrence_count: number;
  suggested_family: string | null;
  assigned_family: string | null;
  status: string;
  avg_ocr_confidence: number | null;
  confidence_band: string | null;
  sample_labels: string[];
  source_screenshots: string[];
  source_zones: string[];
  mapped_rule_id: string | null;
};

type FamilyFilter = CanonicalConversationFamily | "ALL" | "UNMAPPED";

function stringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

export function ConversationLibrary() {
  const auth = useTowerAuth();
  const [rules, setRules] = useState<RuleRow[]>([]);
  const [patterns, setPatterns] = useState<PatternRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState<FamilyFilter>("ALL");
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const [ruleResult, patternResult] = await Promise.all([
      supabase
        .from("conversation_rules")
        .select("id,canonical_event,event_family,semantic_examples,positive_patterns,observed_count,version,active")
        .eq("active", true)
        .order("event_family")
        .order("observed_count", { ascending: false }),
      supabase
        .from("conversation_pattern_clusters")
        .select("id,normalized_pattern,representative_text,occurrence_count,suggested_family,assigned_family,status,avg_ocr_confidence,confidence_band,sample_labels,source_screenshots,source_zones,mapped_rule_id")
        .order("occurrence_count", { ascending: false })
        .limit(1000),
    ]);
    const message = ruleResult.error?.message ?? patternResult.error?.message;
    if (message) setError(message);
    else {
      setRules((ruleResult.data ?? []) as RuleRow[]);
      setPatterns((patternResult.data ?? []) as PatternRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => { void load(); }, [load]);

  const familyStats = useMemo(() => CANONICAL_CONVERSATION_FAMILIES.map((key) => ({
    key,
    rules: rules.filter((rule) => rule.event_family === key),
    variants: patterns.filter((pattern) => (pattern.assigned_family ?? pattern.suggested_family) === key),
  })), [patterns, rules]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return patterns.filter((pattern) => {
      const currentFamily = pattern.assigned_family ?? pattern.suggested_family;
      const familyMatches = family === "ALL" || (family === "UNMAPPED" ? !pattern.assigned_family : currentFamily === family);
      const searchMatches = !needle || [pattern.representative_text, pattern.normalized_pattern, ...pattern.sample_labels, ...pattern.source_zones]
        .some((value) => value.toLowerCase().includes(needle));
      return familyMatches && searchMatches;
    });
  }, [family, patterns, query]);

  const mapFamily = async (pattern: PatternRow, nextFamily: CanonicalConversationFamily) => {
    setSavingId(pattern.id);
    const matchingRule = rules.find((rule) => rule.event_family === nextFamily) ?? null;
    const { data, error: saveError } = await supabase.rpc("assign_conversation_pattern_family", {
      _pattern_id: pattern.id,
      _family: nextFamily,
      _notes: "Assigned in Conversation Library",
      _rule_id: matchingRule?.id ?? undefined,
    });
    setSavingId(null);
    if (saveError) {
      toast.error(saveError.message);
      return;
    }
    const saved = data as PatternRow;
    setPatterns((current) => current.map((item) => item.id === pattern.id ? { ...item, ...saved } : item));
    toast.success(`Mapped to ${CONVERSATION_FAMILY_LABELS[nextFamily]}`);
  };

  const mappedCount = patterns.filter((pattern) => pattern.assigned_family).length;
  const evidenceCount = patterns.reduce((total, pattern) => total + pattern.occurrence_count, 0);

  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
            <Library className="h-4 w-4 text-primary" /> Conversation State Compiler
          </div>
          <h1 className="font-display text-3xl font-semibold">Conversation Library</h1>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            Canonical families and real WhatsApp variants from 107 screenshots. Suggestions remain evidence until an admin confirms them.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => void load()} disabled={loading}>Refresh library</Button>
      </header>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ["Evidence rows", evidenceCount.toLocaleString(), "Usable OCR messages"],
          ["Distinct variants", patterns.length.toLocaleString(), "Normalized phrases"],
          ["Admin mapped", mappedCount.toLocaleString(), `${Math.max(0, patterns.length - mappedCount)} awaiting review`],
          ["Canonical families", CANONICAL_CONVERSATION_FAMILIES.length.toString(), `${rules.length} active rules`],
        ].map(([label, value, detail]) => (
          <Card key={label} className="p-4">
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="mt-1 font-display text-2xl font-semibold">{loading ? "—" : value}</div>
            <div className="mt-1 text-[11px] text-muted-foreground">{detail}</div>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-2">
          <button type="button" onClick={() => setFamily("ALL")} className={`w-full rounded-md border p-3 text-left ${family === "ALL" ? "border-primary bg-primary/5" : "bg-card hover:bg-muted/50"}`}>
            <div className="flex items-center justify-between"><span className="text-sm font-semibold">All variants</span><Badge variant="secondary">{patterns.length}</Badge></div>
          </button>
          {familyStats.map((item) => (
            <button key={item.key} type="button" onClick={() => setFamily(item.key)} className={`w-full rounded-md border p-3 text-left ${family === item.key ? "border-primary bg-primary/5" : "bg-card hover:bg-muted/50"}`}>
              <div className="flex items-center justify-between gap-2"><span className="text-sm font-semibold">{CONVERSATION_FAMILY_LABELS[item.key]}</span><Badge variant="outline">{item.variants.length}</Badge></div>
              <div className="mt-1 text-[11px] text-muted-foreground">{item.rules.length} canonical events · {item.variants.reduce((n, row) => n + row.occurrence_count, 0)} observations</div>
            </button>
          ))}
        </aside>

        <div className="min-w-0 space-y-3">
          <Card className="p-3">
            <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_220px]">
              <div className="relative"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search messages, labels, or zones" className="pl-9" /></div>
              <Select value={family} onValueChange={(value) => setFamily(value as FamilyFilter)}>
                <SelectTrigger><Filter className="mr-2 h-4 w-4" /><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All families</SelectItem>
                  <SelectItem value="UNMAPPED">Awaiting admin mapping</SelectItem>
                  {CANONICAL_CONVERSATION_FAMILIES.map((item) => <SelectItem key={item} value={item}>{CONVERSATION_FAMILY_LABELS[item]}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </Card>

          {error ? <Card className="border-destructive p-5 text-sm text-destructive">Could not load the library: {error}</Card> : null}
          {!error && !loading && filtered.length === 0 ? <Card className="p-10 text-center text-sm text-muted-foreground">No conversation variants match this view.</Card> : null}
          {!error && (loading || filtered.length > 0) ? (
            <Card className="overflow-hidden p-0">
              <Table>
                <TableHeader><TableRow className="bg-muted/50">
                  <TableHead className="min-w-[320px]">Observed variant</TableHead>
                  <TableHead>Evidence</TableHead>
                  <TableHead>Machine suggestion</TableHead>
                  <TableHead className="min-w-[210px]">Admin decision</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {loading ? Array.from({ length: 6 }).map((_, index) => <TableRow key={index}><TableCell colSpan={4}><div className="h-12 animate-pulse rounded bg-muted" /></TableCell></TableRow>) : filtered.map((pattern) => {
                    const suggested = isCanonicalConversationFamily(pattern.suggested_family) ? pattern.suggested_family : "UNKNOWN";
                    const assigned = isCanonicalConversationFamily(pattern.assigned_family) ? pattern.assigned_family : null;
                    return (
                      <TableRow key={pattern.id}>
                        <TableCell className="align-top">
                          <div className="font-medium leading-5">{pattern.representative_text}</div>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {pattern.source_zones.slice(0, 3).map((zone) => <Badge key={zone} variant="outline" className="font-normal">{zone}</Badge>)}
                            {pattern.sample_labels.slice(0, 2).map((label) => <Badge key={label} variant="secondary" className="font-normal">{label}</Badge>)}
                          </div>
                          <div className="mt-2 truncate text-[10px] text-muted-foreground" title={pattern.source_screenshots.join(", ")}>{pattern.source_screenshots[0] ?? "Live compiler evidence"}</div>
                        </TableCell>
                        <TableCell className="align-top">
                          <div className="font-mono text-lg font-semibold">{pattern.occurrence_count}</div>
                          <div className="text-[11px] text-muted-foreground">{pattern.avg_ocr_confidence ? `${pattern.avg_ocr_confidence}% OCR` : "Live pattern"}</div>
                          {pattern.confidence_band ? <Badge variant="outline" className="mt-1">{pattern.confidence_band}</Badge> : null}
                        </TableCell>
                        <TableCell className="align-top"><Badge variant={suggested === "UNKNOWN" ? "outline" : "secondary"}><Sparkles className="mr-1 h-3 w-3" />{CONVERSATION_FAMILY_LABELS[suggested]}</Badge></TableCell>
                        <TableCell className="align-top">
                          {assigned ? <div className="mb-2 flex items-center gap-1 text-xs text-success"><CheckCircle2 className="h-4 w-4" />Confirmed: {CONVERSATION_FAMILY_LABELS[assigned]}</div> : <div className="mb-2 text-xs text-muted-foreground">Awaiting admin decision</div>}
                          <Select value={assigned ?? ""} onValueChange={(value) => void mapFamily(pattern, value as CanonicalConversationFamily)} disabled={!auth.isTowerOps || savingId === pattern.id}>
                            <SelectTrigger><SelectValue placeholder="Assign family" /></SelectTrigger>
                            <SelectContent>{CANONICAL_CONVERSATION_FAMILIES.filter((item) => item !== "UNKNOWN").map((item) => <SelectItem key={item} value={item}>{CONVERSATION_FAMILY_LABELS[item]}</SelectItem>)}</SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          ) : null}
        </div>
      </section>

      <Card className="flex items-start gap-3 p-4">
        <BookOpen className="mt-0.5 h-5 w-5 text-primary" />
        <div><div className="text-sm font-semibold">Evidence stays separate from status</div><div className="mt-1 text-xs text-muted-foreground">Assigning a family records the admin decision. It does not rewrite the original screenshot text or historical compilation.</div></div>
      </Card>
    </div>
  );
}