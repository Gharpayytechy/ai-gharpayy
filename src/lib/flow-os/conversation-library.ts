export const CANONICAL_CONVERSATION_FAMILIES = [
  "QUALIFICATION",
  "LOCATION",
  "BUDGET",
  "PROPERTY",
  "VISIT",
  "RECOVERY",
  "HANDOFF",
  "SUPPLY",
  "INTERNAL_PROMISE",
  "DRAFT",
  "CONTEXT",
  "UNKNOWN",
] as const;

export type CanonicalConversationFamily = (typeof CANONICAL_CONVERSATION_FAMILIES)[number];

export const CONVERSATION_FAMILY_LABELS: Record<CanonicalConversationFamily, string> = {
  QUALIFICATION: "Qualification",
  LOCATION: "Location",
  BUDGET: "Budget",
  PROPERTY: "Property",
  VISIT: "Visit",
  RECOVERY: "Recovery",
  HANDOFF: "Handoff",
  SUPPLY: "Supply",
  INTERNAL_PROMISE: "Internal promise",
  DRAFT: "Draft",
  CONTEXT: "Context required",
  UNKNOWN: "Unclassified",
};

export function isCanonicalConversationFamily(value: string | null | undefined): value is CanonicalConversationFamily {
  return CANONICAL_CONVERSATION_FAMILIES.includes(value as CanonicalConversationFamily);
}