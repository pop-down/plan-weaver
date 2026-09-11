import { useState } from "react";
import { plans, savedViews, type Plan } from "./data";
import {
  AlertCard,
  Button,
  ChecklistProgress,
  HorizonBadge,
  PriorityTag,
  SectionHeader,
  SkeletonRow,
  StatusBadge,
  type HorizonKind,
} from "./primitives";
import { IconChevron, IconClose, IconSearch } from "./icons";

/* ========================= VIEW 1 — COMPONENT LIBRARY ======================== */

function Swatch({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="surface-panel p-4">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

export function ComponentLibraryView() {
  return (
    <div className="mx-auto max-w-5xl space-y-5 p-4 sm:p-6">
      <header>
        <h1 className="text-xl font-semibold">Component Library</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every primitive used across the plan workspace, rendered at production fidelity.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <Swatch label="Buttons">
          <Button variant="primary">Start plan</Button>
          <Button variant="secondary">Verify</Button>
          <Button variant="ghost">Discard</Button>
          <Button variant="danger" size="sm">
            Force stop
          </Button>
        </Swatch>

        <Swatch label="Status badges">
          <StatusBadge kind="backlog" />
          <StatusBadge kind="progress" />
          <StatusBadge kind="review" />
          <StatusBadge kind="blocked" />
          <StatusBadge kind="done" />
        </Swatch>

        <Swatch label="Priority tags">
          <PriorityTag level="P0" />
          <PriorityTag level="P1" />
          <PriorityTag level="P2" />
        </Swatch>

        <Swatch label="Horizon badges">
          <HorizonBadge horizon="Now" />
          <HorizonBadge horizon="Next" />
          <HorizonBadge horizon="Later" />
          <HorizonBadge horizon="Someday" />
        </Swatch>

        <Swatch label="Checklist progress">
          <ChecklistProgress done={3} total={11} />
          <ChecklistProgress done={7} total={11} />
          <ChecklistProgress done={5} total={5} />
        </Swatch>

        <Swatch label="Monospace metadata">
          <span className="font-mono text-xs text-muted-foreground">PLN-142</span>
          <span className="font-mono text-xs text-muted-foreground">
            plans/night-runner-retry-budget.md
          </span>
        </Swatch>
      </div>

      <div className="space-y-3">
        <SectionHeader title="Alerts & recovery" hint="Context first, action second." />
        <AlertCard
          tone="warning"
          eyebrow="Infrastructure"
          title="Rate limit exceeded — run paused, not failed"
          action={<Button variant="secondary" size="sm">Resume when quota resets</Button>}
        >
          <p>The model provider returned 429 twice. Work is checkpointed at step 7 of 11.</p>
        </AlertCard>
        <AlertCard
          tone="fatal"
          eyebrow="Code error"
          title="Type error in reaper.ts — run cannot resume"
          action={<Button variant="danger" size="sm">Reset to last good checkpoint</Button>}
        >
          <p>The failure is inside your repository, so retrying will reproduce it.</p>
        </AlertCard>
      </div>

      <div className="space-y-2">
        <SectionHeader title="Loading state" hint="Skeleton rows for the plan list." />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
      </div>
    </div>
  );
}

/* ========================== VIEW 2 — PLAN WORKSPACE ========================== */

function TriageBar() {
  return (
    <div className="sticky top-0 z-10 space-y-2.5 border-b border-border bg-surface/95 px-4 py-3 backdrop-blur sm:px-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            className="focus-ring inline-flex min-w-0 items-center gap-2 rounded-md border border-border-strong bg-surface-raised px-2.5 py-1.5 text-sm hover:bg-muted"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-p0" />
            <span className="truncate font-medium">{savedViews[0]}</span>
            <IconChevron className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          </button>
          <span className="hidden font-mono text-[11px] text-muted-foreground lg:inline">
            6 results · sorted by last active
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 rounded-md border border-border bg-surface-raised px-2.5 py-1.5 md:flex">
            <IconSearch className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Filter plans…</span>
            <kbd className="rounded border border-border px-1 font-mono text-[10px] text-muted-foreground">
              /
            </kbd>
          </div>
          <Button variant="primary" size="sm">
            New plan
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-md border border-dashed border-border-strong bg-surface-raised/60 px-2.5 py-2">
        <span className="font-mono text-[11px] text-primary">2 selected</span>
        <span className="hidden h-3 w-px bg-border sm:block" />
        <Button size="sm">Change horizon</Button>
        <Button size="sm">Add tag</Button>
        <Button size="sm">Assign</Button>
        <Button size="sm" variant="ghost">
          Clear
        </Button>
      </div>
    </div>
  );
}

function PlanRow({
  plan,
  active,
  onSelect,
}: {
  plan: Plan;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`focus-ring w-full border-l-2 px-4 py-3 text-left transition-colors sm:px-5 ${
        active
          ? "border-l-primary bg-surface-raised"
          : "border-l-transparent hover:bg-surface-raised/60"
      }`}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-2">
            <PriorityTag level={plan.priority} />
            <span className="truncate text-sm font-medium">{plan.title}</span>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="font-mono text-[11px] text-muted-foreground">{plan.id}</span>
            <ChecklistProgress done={plan.done} total={plan.total} />
            <span className="text-[11px] text-muted-foreground">· {plan.lastActive}</span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <StatusBadge kind={plan.status} />
          <span className="hidden sm:block">
            <HorizonBadge horizon={plan.horizon} />
          </span>
        </div>
      </div>
    </button>
  );
}

function PlanDetail({ plan, onClose }: { plan: Plan; onClose?: () => void }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-border px-4 py-3.5 sm:px-5">
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-2">
            <PriorityTag level={plan.priority} />
            <h2 className="truncate text-sm font-semibold">{plan.title}</h2>
          </div>
          <p className="mt-1 truncate font-mono text-[11px] text-muted-foreground">
            plans/{plan.slug}
          </p>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close detail"
            className="focus-ring shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <IconClose />
          </button>
        ) : (
          <StatusBadge kind={plan.status} />
        )}
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-b border-border px-4 py-3.5 sm:grid-cols-4 sm:px-5">
        {[
          ["Owner", plan.owner],
          ["Initiative", plan.initiative],
          ["Last active", plan.lastActive],
        ].map(([k, v]) => (
          <div key={k} className="min-w-0">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {k}
            </dt>
            <dd className="mt-1 truncate text-xs">{v}</dd>
          </div>
        ))}
        <div className="min-w-0">
          <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Horizon
          </dt>
          <dd className="mt-1">
            <HorizonBadge horizon={plan.horizon} />
          </dd>
        </div>
      </dl>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
        <article className="prose-md mx-auto max-w-2xl">
          <h1>{plan.title}</h1>
          <p>
            The nightly runner exhausts its provider quota mid-sequence and restarts from step
            zero, burning the remaining budget. This plan introduces a bounded retry budget with
            exponential backoff and a durable checkpoint per step.
          </p>
          <h2>Context</h2>
          <ul>
            <li>Retries are currently unbounded and share one global counter.</li>
            <li>
              Checkpoints are written to <code>.runner/state.json</code> only on success.
            </li>
            <li>A 429 is treated as a fatal error rather than a pause.</li>
          </ul>
          <h2>Approach</h2>
          <pre>{`retry(step, {
  budget: 4,
  backoff: "exp",   // 2s → 4s → 8s → 16s
  on429: "pause",   // resume when quota resets
})`}</pre>
          <blockquote>
            Pausing must be visible in the UI as a state, never as a silent failure.
          </blockquote>
          <h2>Checklist</h2>
          <ul>
            <li>Per-step checkpoint write</li>
            <li>Classify 429 as pausable</li>
            <li>Surface remaining budget in the plan row</li>
          </ul>
        </article>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border bg-surface px-4 py-3 sm:px-5">
        <Button variant="primary" size="sm">
          Start
        </Button>
        <Button size="sm">Verify</Button>
        <Button size="sm">Complete</Button>
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">
          {plan.done}/{plan.total} done
        </span>
      </div>
    </div>
  );
}

export function WorkspaceView() {
  const [selectedId, setSelectedId] = useState<string | null>(plans[0].id);
  const [sheetOpen, setSheetOpen] = useState(false);
  const selected = plans.find((p) => p.id === selectedId) ?? plans[0];

  return (
    <div className="flex h-full min-h-0">
      <div className="flex min-w-0 flex-1 flex-col lg:max-w-[52%] lg:border-r lg:border-border">
        <TriageBar />
        <div className="min-h-0 flex-1 divide-y divide-border overflow-y-auto">
          {plans.map((p) => (
            <PlanRow
              key={p.id}
              plan={p}
              active={p.id === selected.id && !sheetOpen}
              onSelect={() => {
                setSelectedId(p.id);
                setSheetOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      <div className="hidden min-w-0 flex-1 lg:block">
        <PlanDetail plan={selected} />
      </div>

      {sheetOpen ? (
        <div className="fixed inset-0 z-30 lg:hidden">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setSheetOpen(false)}
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
          />
          <div className="absolute inset-x-0 bottom-0 top-12 flex flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-2xl">
            <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-border-strong" />
            <div className="min-h-0 flex-1">
              <PlanDetail plan={selected} onClose={() => setSheetOpen(false)} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ============================ VIEW 3 — ATTENTION ============================ */

export function AttentionView() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4 sm:p-6">
      <header>
        <h1 className="text-xl font-semibold">Needs attention</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Two runs stopped. Each card explains why it stopped and whether it can be resumed.
        </p>
      </header>

      <div className="surface-panel overflow-hidden">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-4 py-3">
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              <PriorityTag level="P0" />
              <span className="truncate text-sm font-medium">
                Night runner retry budget + backoff
              </span>
            </div>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
              PLN-142 · paused 4m ago at step 7/11
            </p>
          </div>
          <StatusBadge kind="progress" label="Paused" />
        </div>
        <div className="space-y-3 p-4">
          <AlertCard tone="warning" eyebrow="Infrastructure" title="Why did this stop?">
            <p>
              The provider returned <code className="font-mono">429 Too Many Requests</code> twice
              in a row. This is a quota limit outside your repository — nothing in the plan is
              broken.
            </p>
            <p className="text-foreground/85">
              <strong className="font-semibold">Can it be resumed?</strong> Yes. State is
              checkpointed at step 7, so resuming continues rather than restarting. Quota resets in
              roughly 12 minutes.
            </p>
          </AlertCard>
          <div className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-surface-raised px-3 py-2.5">
            <span className="min-w-0 flex-1 text-xs text-muted-foreground">
              Resuming will re-run step 7 only. Confirm to queue it.
            </span>
            <Button size="sm">Cancel run</Button>
            <Button variant="primary" size="sm">
              Confirm & resume
            </Button>
          </div>
        </div>
      </div>

      <div className="surface-panel overflow-hidden">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-4 py-3">
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              <PriorityTag level="P0" />
              <span className="truncate text-sm font-medium">Orphan worktree reaper</span>
            </div>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
              PLN-138 · failed 1h ago at step 3/9
            </p>
          </div>
          <StatusBadge kind="blocked" />
        </div>
        <div className="space-y-3 p-4">
          <AlertCard tone="fatal" eyebrow="Code error" title="Why did this stop?">
            <p>
              <code className="font-mono">reaper.ts:64</code> threw{" "}
              <code className="font-mono">TypeError: worktree.path is undefined</code>. The failure
              is in your repository, so a plain retry will reproduce it.
            </p>
            <p className="text-foreground/85">
              <strong className="font-semibold">Can it be resumed?</strong> Not as-is. Fix the
              guard on <code className="font-mono">listWorktrees()</code>, then reset the run to the
              last good checkpoint (step 2).
            </p>
          </AlertCard>
          <div className="flex flex-wrap items-center gap-2 rounded-md border border-destructive/30 bg-destructive/[0.06] px-3 py-2.5">
            <span className="min-w-0 flex-1 text-xs text-muted-foreground">
              Resetting discards partial output from step 3. This cannot be undone.
            </span>
            <Button size="sm">Open log</Button>
            <Button variant="danger" size="sm">
              Confirm reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================= VIEW 4 — GROUPS & HORIZONS ======================== */

const horizons: HorizonKind[] = ["Now", "Next", "Later", "Someday"];

export function GroupsView() {
  const initiatives = Array.from(new Set(plans.map((p) => p.initiative)));

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <header>
        <h1 className="text-xl font-semibold">Groups & planning horizon</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Plans rolled up by initiative, then laid out across the horizon board.
        </p>
      </header>

      <section className="space-y-3">
        <SectionHeader title="Initiatives" hint="Rollup of scope and progress." />
        <div className="grid gap-3 md:grid-cols-3">
          {initiatives.map((name) => {
            const group = plans.filter((p) => p.initiative === name);
            const done = group.reduce((a, p) => a + p.done, 0);
            const total = group.reduce((a, p) => a + p.total, 0);
            return (
              <div key={name} className="surface-panel p-4">
                <h3 className="truncate text-sm font-semibold">{name}</h3>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  {group.length} plans
                </p>
                <div className="mt-3">
                  <ChecklistProgress done={done} total={total} />
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.map((p) => (
                    <PriorityTag key={p.id} level={p.priority} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <SectionHeader title="Planning horizon" hint="Now · Next · Later · Someday" />
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div className="grid min-w-[720px] grid-cols-4 gap-3">
            {horizons.map((h) => {
              const col = plans.filter((p) => p.horizon === h);
              return (
                <div key={h} className="flex min-w-0 flex-col rounded-lg border border-border bg-surface/60">
                  <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2.5">
                    <HorizonBadge horizon={h} />
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {col.length}
                    </span>
                  </div>
                  <div className="space-y-2 p-2">
                    {col.map((p) => (
                      <div
                        key={p.id}
                        className="rounded-md border border-border bg-surface-raised p-2.5"
                      >
                        <div className="flex items-center gap-1.5">
                          <PriorityTag level={p.priority} />
                          <span className="truncate text-xs font-medium">{p.title}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <ChecklistProgress done={p.done} total={p.total} />
                          <span className="truncate font-mono text-[10px] text-muted-foreground">
                            {p.owner}
                          </span>
                        </div>
                      </div>
                    ))}
                    {col.length === 0 ? (
                      <p className="rounded-md border border-dashed border-border px-2.5 py-6 text-center text-[11px] text-muted-foreground">
                        Nothing here
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
