import { createFileRoute } from "@tanstack/react-router";
import { ConversationLibrary } from "@/components/flow-os/ConversationLibrary";
import { RoleGate } from "@/founder/components/RoleGate";

export const Route = createFileRoute("/admin/conversation-library")({
  head: () => ({
    meta: [
      { title: "Conversation Library — Gharpayy" },
      { name: "description", content: "Review canonical conversation families and map WhatsApp evidence variants." },
      { property: "og:title", content: "Conversation Library — Gharpayy" },
      { property: "og:description", content: "Review canonical conversation families and map WhatsApp evidence variants." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <RoleGate><ConversationLibrary /></RoleGate>,
  errorComponent: ({ error }) => <div className="p-6 text-sm text-destructive">{error.message}</div>,
  notFoundComponent: () => <div className="p-6 text-sm">Conversation Library not found.</div>,
});