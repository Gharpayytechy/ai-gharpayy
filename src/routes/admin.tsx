import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { TowerAuthProvider, useTowerAuth } from "@/lib/tower/auth";
import { MemberSwitcher } from "@/components/tower/MemberSwitcher";
import { useCrmLink } from "@/founder/hooks/useCrmLink";
import { AdminFocusProvider } from "@/founder/lib/admin-focus";
import { BattlefieldBar } from "@/founder/components/admin/BattlefieldBar";


const TABS = [
  { to: "/admin", label: "Founder Desk", exact: true },
  { to: "/admin/briefing", label: "Briefing" },
  { to: "/admin/watchtower", label: "Watchtower" },
  { to: "/admin/war-room", label: "War Room" },
  { to: "/admin/simulator", label: "Simulator" },
  { to: "/admin/sheet", label: "Sheet" },
  { to: "/admin/command-center", label: "Command Centre" },


  { to: "/admin/ops", label: "Ops" },
  { to: "/admin/console", label: "Console" },
  { to: "/admin/flow", label: "Role Flow" },
  { to: "/admin/playbooks", label: "Playbooks" },
  { to: "/admin/conversation-library", label: "Conversation Library" },
  { to: "/admin/report-center", label: "Report Centre" },
];

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Founder Admin — Gharpayy" },
      { name: "description", content: "Founder Admin and Zone Manager console: company pulse, zone performance, people discipline and daily reporting." },
      { property: "og:title", content: "Founder Admin — Gharpayy" },
      { property: "og:description", content: "Company pulse, zone performance, people discipline and daily reporting in one console." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <TowerAuthProvider>
      <AdminFocusProvider>
        <AdminShell />
      </AdminFocusProvider>
    </TowerAuthProvider>
  ),

});

function AdminShell() {
  const auth = useTowerAuth();
  const crm = useCrmLink();
  const pathname = useRouterState({ select: (s) => s.location.pathname });


  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-card sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 min-w-0">
            <Link to="/admin" className="shrink-0">
              <div className="text-lg font-bold">Founder Admin</div>
              <div className="text-xs text-muted-foreground">
                {auth.role === "zone_manager" ? "Your zone, end to end" : "The whole company in one view"}
              </div>
            </Link>
            <nav className="flex gap-1 flex-wrap">
              {TABS.map((t) => {
                const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
                return (
                  <Link
                    key={t.to}
                    to={t.to}
                    className={`px-3 py-1.5 rounded text-sm ${active ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                  >
                    {t.label}
                  </Link>
                );
              })}
              <Link to="/tower" className="px-3 py-1.5 rounded text-sm hover:bg-muted text-muted-foreground">
                Control Tower
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/myt/flow-ops"
              title="Every number on this console is counted from the live CRM"
              className="hidden md:flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs hover:bg-muted"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-medium">Live CRM</span>
              <span className="text-muted-foreground">
                {crm.leads} leads · {crm.tours} tours · {crm.bookings} bookings · {crm.people} people
              </span>
            </Link>
            <MemberSwitcher />
          </div>
        </div>
      </header>
      <main className="max-w-[1600px] mx-auto p-4 space-y-4">
        <BattlefieldBar />
        <Outlet />
      </main>

    </div>
  );
}
