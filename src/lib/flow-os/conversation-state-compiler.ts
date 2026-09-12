import type { PipelineStage } from "@/lib/pipeline/stage-config";
import type { WorkBucket } from "./work-concurrency";
export { CANONICAL_CONVERSATION_FAMILIES, CONVERSATION_FAMILY_LABELS } from "./conversation-library";

export const CONVERSATION_COMPILER_VERSION = "gharpayy-csc-v1.0.0";

export type WaitingOn = "CUSTOMER" | "GHARPAYY" | "SUPPLY" | "TOUR_TEAM" | "CLOSING" | "OTHER_TEAM" | "EXTERNAL" | "NONE";
export type ConversationMovement = "FIRST_OBSERVATION" | "NO_MOVEMENT" | "PROGRESSED" | "MOVED_WITH_BLOCKER" | "REVIVED_BY_SUPPLY" | "STRONG_PROGRESS" | "REGRESSED";
export type ScreenshotStatus = "FRESH" | "DUE_SOON" | "SCREENSHOT_NOT_RECEIVED" | "CRITICAL";
export type SlaStatus = "ON_TRACK" | "DUE_SOON" | "OVERDUE" | "NO_SLA";

export interface ConversationContext {
  canonicalEvent: string;
  eventFamily?: string | null;
  capturedAt?: string | null;
  direction?: "incoming" | "outgoing" | "unknown" | null;
  text?: string | null;
  momentum?: number | null;
}

export interface ConversationCompilerInput {
  lastMessage?: string | null;
  rawText?: string | null;
  direction?: "incoming" | "outgoing" | "unknown" | null;
  unreadVisible?: boolean | null;
  seenState?: "seen" | "unseen" | "unknown" | null;
  detectedLabel?: string | null;
  colorHint?: string | null;
  handlerHint?: string | null;
  ocrConfidence?: number | null;
  capturedAt?: string | null;
  now?: string | Date;
  savedStage?: PipelineStage | string | null;
  previous?: ConversationContext | null;
}

export interface ConversationCompilation {
  compilerVersion: string;
  ruleKey: string | null;
  canonicalEvent: string;
  eventFamily: string;
  modifiers: string[];
  entities: Record<string, string | number | string[]>;
  rawLabels: string[];
  parsedLabels: { sourceMarkers: string[]; people: string[]; urgency: string[]; acquisition: string[]; other: string[] };
  conversationStage: string;
  waitingOn: WaitingOn;
  blocker: string | null;
  intent: string;
  health: "MOVING" | "STUCK" | "AT_RISK" | "UNKNOWN";
  movement: ConversationMovement;
  momentum: number;
  nextAction: string;
  nextActionOwner: string;
  actionDueAt: string | null;
  slaStatus: SlaStatus;
  priority: "P0" | "P1" | "P2" | "P3";
  screenshotDueAt: string;
  screenshotStatus: ScreenshotStatus;
  evidenceQuality: number;
  confidence: number;
  automationSafe: boolean;
  needsReview: boolean;
  reasons: string[];
  legacy: {
    inferredPipelineHint: PipelineStage | null;
    inferredWorkBucket: WorkBucket;
    primaryMission: string;
    primaryAction: string;
    blockerHint: string | null;
    isPriorityInterrupt: boolean;
  };
}

type Rule = {
  key: string; event: string; family: string; patterns: RegExp[]; stage: string; waiting: WaitingOn;
  action: string; owner: string; sla: number | null; priority: ConversationCompilation["priority"];
  momentum: number; confidence: number; blocker?: string; pipeline?: PipelineStage | null; bucket?: WorkBucket;
};

const RULES: Rule[] = [
  { key: "customer_reached", event: "CUSTOMER_REACHED", family: "VISIT", patterns: [/\b(reached|outside (the )?property|at the property|downstairs)\b/i], stage: "TOUR_IN_PROGRESS", waiting: "TOUR_TEAM", action: "Support live visit now", owner: "TOUR_TEAM", sla: 0, priority: "P0", momentum: 5, confidence: 94, pipeline: "TOUR_IN_PROGRESS", bucket: "TOUR_READY" },
  { key: "tour_completed", event: "TOUR_COMPLETED", family: "VISIT", patterns: [/(visit|tour).*(done|completed)|showed (the )?property/i], stage: "POST_VISIT", waiting: "CUSTOMER", action: "Capture visit feedback", owner: "SALES", sla: 30, priority: "P0", momentum: 5, confidence: 90, pipeline: "POST_VISIT", bucket: "POST_TOUR" },
  { key: "visit_time", event: "VISIT_TIME_CONFIRMED", family: "VISIT", patterns: [/(visit|come|meet).*(at|by)\s*\d{1,2}([:.]\d{2})?\s*(am|pm)|\b(today|tomorrow)\s+(at|by)\s+\d/i], stage: "VISIT_PLANNING", waiting: "TOUR_TEAM", action: "Schedule and confirm tour", owner: "TOUR_TEAM", sla: 30, priority: "P0", momentum: 4, confidence: 88, pipeline: "TOUR_SCHEDULED", bucket: "TOUR_READY" },
  { key: "visit_availability", event: "VISIT_AVAILABILITY_PENDING", family: "VISIT", patterns: [/(when|are you).*(available|free).*(visit|property)|want to visit|visit today/i], stage: "VISIT_PLANNING", waiting: "CUSTOMER", action: "Confirm visit day and time", owner: "TOUR_TEAM", sla: 60, priority: "P1", momentum: 3, confidence: 88, pipeline: "TOUR_SCHEDULED", bucket: "TOUR_READY" },
  { key: "location_feasibility", event: "LOCATION_FEASIBILITY_PENDING", family: "LOCATION", patterns: [/(check|see).*(location).*(feasible|work|okay|ok)|is (this|the) location (okay|ok|feasible)|have you checked the location|\bworks\??$/i], stage: "REQUIREMENT_VALIDATION", waiting: "CUSTOMER", action: "Follow up on location feasibility", owner: "SALES", sla: 120, priority: "P2", momentum: 1, confidence: 86, pipeline: "DOSSIER", bucket: "WAITING_CUSTOMER" },
  { key: "location_required", event: "LOCATION_REQUIRED", family: "LOCATION", patterns: [/(which|preferred|exact).*(location)|share.*(office|college).*location|where is your (office|college)/i], stage: "REQUIREMENT_VALIDATION", waiting: "CUSTOMER", action: "Get exact location", owner: "SALES", sla: 120, priority: "P2", momentum: 1, confidence: 86, blocker: "Location missing", pipeline: "DOSSIER", bucket: "WAITING_CUSTOMER" },
  { key: "budget_objection", event: "BUDGET_OBJECTION", family: "BUDGET", patterns: [/(too expensive|price (is )?high|rent (is )?high|over budget|costly|can't afford|cannot afford)/i], stage: "PROPERTY_EVALUATION", waiting: "GHARPAYY", action: "Resolve budget blocker or rematch", owner: "SALES", sla: 60, priority: "P1", momentum: -2, confidence: 91, blocker: "Budget objection", pipeline: "NEGOTIATION", bucket: "RECOVERY" },
  { key: "rent_feasibility", event: "RENT_FEASIBILITY_PENDING", family: "BUDGET", patterns: [/(rent|price).*(feasible|work|okay|ok)|check.*(rent|price).*(amenit|feasible)/i], stage: "PROPERTY_EVALUATION", waiting: "CUSTOMER", action: "Follow up on rent and amenities", owner: "SALES", sla: 120, priority: "P2", momentum: 2, confidence: 85, pipeline: "MATCHED", bucket: "WAITING_CUSTOMER" },
  { key: "budget_required", event: "BUDGET_REQUIRED", family: "BUDGET", patterns: [/(max|maximum|your).*(budget)|budget.*(range|please|share)/i], stage: "REQUIREMENT_VALIDATION", waiting: "CUSTOMER", action: "Get maximum budget", owner: "SALES", sla: 120, priority: "P2", momentum: 1, confidence: 87, blocker: "Budget missing", pipeline: "DOSSIER", bucket: "WAITING_CUSTOMER" },
  { key: "property_review", event: "PROPERTY_REVIEW_PENDING", family: "PROPERTY", patterns: [/(check|go through|review).*(property|option)|did you.*(property|option)|new .*option available/i], stage: "PROPERTY_EVALUATION", waiting: "CUSTOMER", action: "Get property-specific feedback", owner: "SALES", sla: 120, priority: "P1", momentum: 2, confidence: 86, pipeline: "MATCHED", bucket: "WAITING_CUSTOMER" },
  { key: "options_available", event: "OPTIONS_AVAILABLE", family: "PROPERTY", patterns: [/(other|more|new).*(option|property).*(available|share)|we have.*option|flat.?like pg/i], stage: "MATCHING", waiting: "GHARPAYY", action: "Share strongest matching options", owner: "SALES", sla: 30, priority: "P1", momentum: 2, confidence: 84, pipeline: "MATCHED", bucket: "TODAY" },
  { key: "supply_gap", event: "SUPPLY_GAP", family: "SUPPLY", patterns: [/(do not|don't|dont).*have.*option|no (available )?(option|inventory)|get back once we find/i], stage: "SUPPLY_MATCHING", waiting: "SUPPLY", action: "Find matching inventory", owner: "SUPPLY", sla: 240, priority: "P1", momentum: -1, confidence: 90, blocker: "Matching inventory unavailable", pipeline: "MATCHED", bucket: "WAITING_SUPPLY" },
  { key: "handoff", event: "HANDOFF_PENDING_ACCEPTANCE", family: "HANDOFF", patterns: [/(text|contact|message).*(them|team).*(assist|help)|flats team|central team/i], stage: "HANDOFF", waiting: "OTHER_TEAM", action: "Get receiving team acceptance", owner: "OTHER_TEAM", sla: 10, priority: "P1", momentum: 0, confidence: 87, blocker: "Handoff not accepted", pipeline: null, bucket: "WAITING_OWNER" },
  { key: "still_looking", event: "RECOVERY_STILL_LOOKING", family: "RECOVERY", patterns: [/still looking|are you.*looking.*(flat|pg|stay|room)/i], stage: "RECOVERY", waiting: "CUSTOMER", action: "Confirm whether requirement is active", owner: "SALES", sla: 240, priority: "P2", momentum: 0, confidence: 89, pipeline: "DOSSIER", bucket: "RECOVERY" },
  { key: "closure_check", event: "CLOSURE_CHECK", family: "RECOVERY", patterns: [/(got|found|booked).*(stay|flat|pg|room)|were you able to find/i], stage: "RECOVERY", waiting: "CUSTOMER", action: "Confirm active or found elsewhere", owner: "SALES", sla: 240, priority: "P2", momentum: 0, confidence: 88, pipeline: null, bucket: "RECOVERY" },
  { key: "checking_details", event: "CHECKING_DETAILS", family: "INTERNAL_PROMISE", patterns: [/checking.*(getting|sharing|send).*(detail|option)|will check.*get back/i], stage: "MATCHING", waiting: "GHARPAYY", action: "Send promised details", owner: "SALES", sla: 30, priority: "P1", momentum: 0, confidence: 90, blocker: "Details promised but not supplied", pipeline: "MATCHED", bucket: "TODAY" },
  { key: "callback", event: "PROMISED_CALLBACK", family: "INTERNAL_PROMISE", patterns: [/(we|i).*(connect|call).*(back|shortly|soon)|call you back/i], stage: "FOLLOW_UP", waiting: "GHARPAYY", action: "Call customer", owner: "SALES", sla: 30, priority: "P1", momentum: 0, confidence: 88, blocker: "Callback promised", pipeline: null, bucket: "TODAY" },
  { key: "unsent_draft", event: "UNSENT_DRAFT", family: "DRAFT", patterns: [/\bdraft\s*:/i], stage: "FOLLOW_UP", waiting: "GHARPAYY", action: "Review and send draft", owner: "SALES", sla: 30, priority: "P1", momentum: 0, confidence: 96, blocker: "Response composed but not sent", pipeline: null, bucket: "TODAY" },
  { key: "movein", event: "MOVEIN_REQUIRED", family: "QUALIFICATION", patterns: [/(move.?in date|when exactly.*need|when do you need|joining date)/i], stage: "REQUIREMENT_VALIDATION", waiting: "CUSTOMER", action: "Get move-in date", owner: "SALES", sla: 120, priority: "P2", momentum: 1, confidence: 87, blocker: "Move-in date missing", pipeline: "DOSSIER", bucket: "WAITING_CUSTOMER" },
  { key: "welcome", event: "WELCOME_SENT", family: "QUALIFICATION", patterns: [/thank\s*you for connecting with gharpayy/i], stage: "NEW", waiting: "CUSTOMER", action: "Qualify requirement", owner: "SALES", sla: 120, priority: "P2", momentum: 1, confidence: 92, blocker: "Requirement not captured", pipeline: "DOSSIER", bucket: "WAITING_CUSTOMER" },
];

const SHORT_REPLY = /^(yes|yep|yeah|no|nope|ok|okay|sure|done|works?|fine|haan|nahi)[.!?\s]*$/i;
const CALL_ATTEMPT = /(tried calling|called you|call.*not (connect|answer)|not reachable|missed call)/i;
const PERSON_LABELS = ["HRITHIK", "DIYAA", "SPRIHA", "AKHIL", "HIMAKSHI", "LACHITA", "NIKHIL", "CHARU", "PULKIT"];

function iso(value: string | Date | null | undefined) { const d = value ? new Date(value) : new Date(); return Number.isNaN(d.getTime()) ? new Date() : d; }
function addMinutes(date: Date, minutes: number) { return new Date(date.getTime() + minutes * 60_000).toISOString(); }
function clamp(value: number, min = 0, max = 100) { return Math.max(min, Math.min(max, Math.round(value))); }

function extractEntities(text: string) {
  const entities: Record<string, string | number | string[]> = {};
  const money = text.match(/(?:₹|rs\.?|inr)?\s*(\d{1,3}(?:[,\s]\d{3})+|\d{4,6})\s*(k|thousand)?/i);
  if (money) entities.budget = money[0].trim();
  const room = text.match(/\b(1\s*bhk|2\s*bhk|3\s*bhk|single sharing|double sharing|triple sharing|private room|co-?living|pg)\b/i);
  if (room) entities.roomType = room[0];
  const timing = text.match(/\b(today|tomorrow|next week|next month|\d{1,2}([/:.-]\d{1,2})?\s*(am|pm))\b/i);
  if (timing) entities.timeWindow = timing[0];
  const amenities = ["food", "wifi", "ac", "attached washroom", "parking", "laundry"].filter((v) => text.toLowerCase().includes(v));
  if (amenities.length) entities.amenities = amenities;
  return entities;
}

function parseLabels(...values: Array<string | null | undefined>) {
  const raw = values.flatMap((v) => (v ?? "").split(/[,|/•]+/)).map((v) => v.trim()).filter(Boolean);
  const parsed = { sourceMarkers: [] as string[], people: [] as string[], urgency: [] as string[], acquisition: [] as string[], other: [] as string[] };
  for (const label of raw) {
    const upper = label.toUpperCase();
    if (upper.includes("CRM")) parsed.sourceMarkers.push(label);
    else if (PERSON_LABELS.some((person) => upper.includes(person))) parsed.people.push(label);
    else if (upper.includes("IMMEDIATE")) parsed.urgency.push(label);
    else if (upper.includes("UNFILLED") || upper.includes("FORM LEAD")) parsed.acquisition.push(label);
    else parsed.other.push(label);
  }
  return { raw, parsed };
}

function movement(rule: Rule | null, previous: ConversationContext | null | undefined): ConversationMovement {
  if (!previous) return "FIRST_OBSERVATION";
  if (!rule || rule.event === previous.canonicalEvent) return "NO_MOVEMENT";
  if (rule.event === "OPTIONS_AVAILABLE" && previous.eventFamily === "SUPPLY") return "REVIVED_BY_SUPPLY";
  if (rule.momentum >= 4) return "STRONG_PROGRESS";
  if (rule.blocker && rule.momentum >= 0) return "MOVED_WITH_BLOCKER";
  if (rule.momentum < 0) return "REGRESSED";
  return "PROGRESSED";
}

export function compileConversationState(input: ConversationCompilerInput): ConversationCompilation {
  const message = (input.lastMessage ?? "").trim();
  const searchable = `${message}\n${input.rawText ?? ""}`.trim();
  const capturedAt = iso(input.capturedAt);
  const now = iso(input.now);
  const inbound = input.direction === "incoming" || input.unreadVisible === true || input.seenState === "unseen";
  const modifiers: string[] = [];
  const reasons: string[] = [];
  if (CALL_ATTEMPT.test(searchable)) modifiers.push("CALL_ATTEMPTED");
  if (/as discussed|over call|on call/i.test(searchable)) modifiers.push("CONTEXT_FROM_CALL");
  if (/\b(1\s*bhk|2\s*bhk|3\s*bhk|pg|private room|sharing)\b/i.test(searchable)) modifiers.push("PROPERTY_TYPE_MENTIONED");
  const labels = parseLabels(input.detectedLabel, input.handlerHint);
  if (labels.raw.length) modifiers.push("LEGACY_LABEL_VISIBLE");
  if (inbound) reasons.push("Fresh inbound or unread WhatsApp evidence");

  let rule = RULES.find((candidate) => candidate.patterns.some((pattern) => pattern.test(searchable))) ?? null;
  let contextResolved = false;
  if (SHORT_REPLY.test(message)) {
    if (input.previous?.canonicalEvent) {
      contextResolved = true;
      const positive = /^(yes|yep|yeah|ok|okay|sure|done|works?|fine|haan)/i.test(message);
      const prior = input.previous.canonicalEvent;
      const event = prior.includes("LOCATION") ? (positive ? "LOCATION_FEASIBLE" : "LOCATION_REJECTED")
        : prior.includes("BUDGET") || prior.includes("RENT") ? (positive ? "BUDGET_ACCEPTED" : "BUDGET_OBJECTION")
        : prior.includes("PROPERTY") ? (positive ? "PROPERTY_INTERESTED" : "REMATCH_REQUIRED")
        : prior.includes("VISIT") ? (positive ? "VISIT_DAY_IDENTIFIED" : "VISIT_TIME_PENDING") : "CONTEXT_REQUIRED";
      rule = { key: "context_reply", event, family: input.previous.eventFamily ?? "CONTEXT", patterns: [], stage: "CONTEXT_RESOLVED", waiting: positive ? "GHARPAYY" : "CUSTOMER", action: positive ? "Advance the confirmed next step" : "Clarify the customer's response", owner: "SALES", sla: 60, priority: "P1", momentum: positive ? 3 : -1, confidence: event === "CONTEXT_REQUIRED" ? 55 : 84, pipeline: null, bucket: positive ? "TODAY" : "WAITING_CUSTOMER" };
      reasons.push(`Short reply resolved against ${prior}`);
    } else {
      rule = { key: "context_required", event: "CONTEXT_REQUIRED", family: "CONTEXT", patterns: [], stage: "UNKNOWN", waiting: "NONE", action: "Open previous conversation context", owner: "SALES", sla: null, priority: "P2", momentum: 0, confidence: 35, blocker: "Previous question is unavailable", pipeline: null, bucket: "TODAY" };
      reasons.push("Short reply cannot be interpreted safely without the prior question");
    }
  }

  if (!rule) {
    rule = { key: "new_pattern", event: "NEW_PATTERN_DETECTED", family: "UNKNOWN", patterns: [], stage: "UNKNOWN", waiting: inbound ? "GHARPAYY" : "NONE", action: inbound ? "Review and respond" : "Review conversation evidence", owner: "SALES", sla: inbound ? 60 : null, priority: inbound ? "P1" : "P3", momentum: 0, confidence: searchable ? 42 : 20, pipeline: null, bucket: inbound ? "NOW" : "TODAY" };
    reasons.push(searchable ? "No approved V1 corpus rule matched" : "No readable message evidence");
  } else if (!contextResolved) reasons.push(`Matched V1 rule: ${rule.key}`);

  const ocr = clamp(input.ocrConfidence ?? 60);
  const confidence = clamp(rule.confidence * 0.75 + ocr * 0.25);
  const evidenceQuality = clamp(ocr * 0.6 + (message ? 20 : 0) + (input.direction && input.direction !== "unknown" ? 10 : 0) + (input.capturedAt ? 10 : 0));
  const actionDueAt = rule.sla === null ? null : addMinutes(capturedAt, rule.sla);
  const screenshotDueAt = addMinutes(capturedAt, 20 * 60);
  const ageHours = (now.getTime() - capturedAt.getTime()) / 3_600_000;
  const screenshotStatus: ScreenshotStatus = ageHours >= 48 ? "CRITICAL" : ageHours >= 24 ? "SCREENSHOT_NOT_RECEIVED" : ageHours >= 20 ? "DUE_SOON" : "FRESH";
  const dueDelta = actionDueAt ? (new Date(actionDueAt).getTime() - now.getTime()) / 60_000 : null;
  const slaStatus: SlaStatus = dueDelta === null ? "NO_SLA" : dueDelta < 0 ? "OVERDUE" : dueDelta <= Math.max(10, (rule.sla ?? 0) * .2) ? "DUE_SOON" : "ON_TRACK";
  const movementValue = movement(rule, input.previous);
  const momentum = Math.max(-10, Math.min(10, (input.previous?.momentum ?? 0) + rule.momentum));
  const needsReview = confidence < 68 || rule.event === "CONTEXT_REQUIRED" || rule.event === "NEW_PATTERN_DETECTED";
  const automationSafe = !needsReview && ocr >= 70 && !["FOUND_STAY", "TOUR_SCHEDULED"].includes(rule.event);
  const health = screenshotStatus === "CRITICAL" || slaStatus === "OVERDUE" ? "STUCK" : rule.blocker || screenshotStatus === "DUE_SOON" ? "AT_RISK" : rule.event === "NEW_PATTERN_DETECTED" ? "UNKNOWN" : "MOVING";
  const interrupt = inbound && !["CHECKED_IN", "LOST"].includes(String(input.savedStage ?? ""));

  return {
    compilerVersion: CONVERSATION_COMPILER_VERSION, ruleKey: rule.key, canonicalEvent: rule.event, eventFamily: rule.family,
    modifiers: [...new Set(modifiers)], entities: extractEntities(searchable), rawLabels: labels.raw, parsedLabels: labels.parsed,
    conversationStage: rule.stage, waitingOn: rule.waiting, blocker: rule.blocker ?? null,
    intent: rule.family, health, movement: movementValue, momentum, nextAction: rule.action, nextActionOwner: rule.owner,
    actionDueAt, slaStatus, priority: rule.priority, screenshotDueAt, screenshotStatus, evidenceQuality, confidence,
    automationSafe, needsReview, reasons,
    legacy: { inferredPipelineHint: rule.pipeline ?? null, inferredWorkBucket: rule.bucket ?? "TODAY", primaryMission: rule.action, primaryAction: rule.action, blockerHint: rule.blocker ?? null, isPriorityInterrupt: interrupt },
  };
}

export function compilationAsIntelligence(compilation: ConversationCompilation) {
  return { ...compilation, advisoryOnly: true, authoritativeStageUnchanged: true };
}