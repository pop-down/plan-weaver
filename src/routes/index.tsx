import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AttentionView,
  ComponentLibraryView,
  GroupsView,
  WorkspaceView,
} from "@/components/plan/views";
import {
  IconAttention,
  IconGroups,
  IconLibrary,
  IconMenu,
  IconWorkspace,
  IconClose,
} from "@/components/plan/icons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Plan Workspace — Markdown plan management for developers" },
      {
        name: "description",
        content:
          "A dark, high-density workspace for managing markdown plan documents: triage, recovery context, and planning horizons.",
      },
      { property: "og:title", content: "Plan Workspace — Markdown plan management" },
      {
        property: "og:description",
        content:
          "Triage plans, recover stalled runs with real context, and organize work across Now, Next, Later and Someday.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type ViewKey = "library" | "workspace" | "attention" | "groups";

const nav: { key: ViewKey; label: string; icon: typeof IconLibrary; badge?: string }[] = [
  { key: "workspace", label: "Plans", icon: IconWorkspace, badge: "6" },
  { key: "attention", label: "Needs attention", icon: IconAttention, badge: "2" },
  { key: "groups", label: "Groups & horizon", icon: IconGroups },
  { key: "library", label: "Component library", icon: IconLibrary },
];

function Index() {
  const [view, setView] = useState<ViewKey>("workspace");
  const [navOpen, setNavOpen] = useState(false);
  const current = nav.find((n) => n.key === view)!;

  const sidebar = (
    <div className="flex h-full flex-col bg-surface">
      <div className="flex items-center gap-2.5 px-4 py-4">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-primary font-mono text-xs font-bold text-primary-foreground">
          P
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">Plan Workspace</p>
          <p className="truncate font-mono text-[10px] text-muted-foreground">
            night-runner / main
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 px-2">
        <p className="px-2 pb-1 pt-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>
        {nav.map((item) => {
          const Icon = item.icon;
          const active = item.key === view;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setView(item.key);
                setNavOpen(false);
              }}
              className={`focus-ring flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                active
                  ? "bg-surface-raised font-medium text-foreground"
                  : "text-muted-foreground hover:bg-surface-raised/60 hover:text-foreground"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${active ? "text-primary" : ""}`} />
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              {item.badge ? (
                <span className="shrink-0 rounded bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="m-2 rounded-md border border-border bg-surface-raised p-3">
        <p className="text-xs font-medium">Static prototype</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
          Presentation layer only — data is mocked.
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <aside className="hidden w-60 shrink-0 border-r border-border md:block">{sidebar}</aside>

      {navOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setNavOpen(false)}
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 w-64 border-r border-border shadow-2xl">
            {sidebar}
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="grid shrink-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-b border-border bg-surface px-4 py-2.5 md:hidden">
          <button
            type="button"
            aria-label={navOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setNavOpen((v) => !v)}
            className="focus-ring shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {navOpen ? <IconClose /> : <IconMenu />}
          </button>
          <span className="truncate text-sm font-semibold">{current.label}</span>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto">
          {view === "workspace" ? (
            <div className="h-full">
              <WorkspaceView />
            </div>
          ) : null}
          {view === "attention" ? <AttentionView /> : null}
          {view === "groups" ? <GroupsView /> : null}
          {view === "library" ? <ComponentLibraryView /> : null}
        </main>
      </div>
    </div>
  );
}
