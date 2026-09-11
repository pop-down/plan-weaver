import type { ReactNode } from "react";

/* ---------------------------------- Button --------------------------------- */

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  className?: string;
  icon?: ReactNode;
};

const buttonBase =
  "inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors focus-ring select-none whitespace-nowrap";

const buttonVariants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_1px_0_0_color-mix(in_oklab,white_18%,transparent)_inset]",
  secondary:
    "bg-surface-raised text-foreground border border-border-strong hover:bg-muted",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-muted",
  danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
};

const buttonSizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-7 px-2.5 text-xs",
  md: "h-9 px-3.5 text-sm",
};

export function Button({
  children,
  variant = "secondary",
  size = "md",
  className = "",
  icon,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
    >
      {icon ? <span className="shrink-0 opacity-90">{icon}</span> : null}
      {children}
    </button>
  );
}

/* ---------------------------------- Badges --------------------------------- */

export type StatusKind = "backlog" | "progress" | "review" | "blocked" | "done";

const statusMap: Record<StatusKind, { label: string; dot: string; text: string }> = {
  backlog: { label: "Backlog", dot: "bg-muted-foreground", text: "text-muted-foreground" },
  progress: { label: "In Progress", dot: "bg-primary", text: "text-primary" },
  review: { label: "Review", dot: "bg-accent", text: "text-accent" },
  blocked: { label: "Blocked", dot: "bg-destructive", text: "text-destructive" },
  done: { label: "Complete", dot: "bg-success", text: "text-success" },
};

export function StatusBadge({ kind, label }: { kind: StatusKind; label?: string }) {
  const s = statusMap[kind];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface-raised px-2 py-0.5 text-[11px] font-medium ${s.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {label ?? s.label}
    </span>
  );
}

export type PriorityKind = "P0" | "P1" | "P2";

const priorityMap: Record<PriorityKind, string> = {
  P0: "text-p0 border-p0/40 bg-p0/10",
  P1: "text-p1 border-p1/40 bg-p1/10",
  P2: "text-p2 border-p2/35 bg-p2/10",
};

export function PriorityTag({ level }: { level: PriorityKind }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide ${priorityMap[level]}`}
    >
      {level}
    </span>
  );
}

export type HorizonKind = "Now" | "Next" | "Later" | "Someday";

const horizonMap: Record<HorizonKind, string> = {
  Now: "bg-primary/12 text-primary border-primary/30",
  Next: "bg-accent/12 text-accent border-accent/30",
  Later: "bg-muted text-muted-foreground border-border-strong",
  Someday: "bg-transparent text-muted-foreground border-dashed border-border-strong",
};

export function HorizonBadge({ horizon }: { horizon: HorizonKind }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${horizonMap[horizon]}`}
    >
      <span className="font-mono text-[9px] opacity-70">◆</span>
      {horizon}
    </span>
  );
}

/* --------------------------------- Progress -------------------------------- */

export function ChecklistProgress({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <span className="inline-flex min-w-0 shrink-0 items-center gap-2">
      <span className="h-1 w-14 overflow-hidden rounded-full bg-muted">
        <span
          className={`block h-full rounded-full ${pct === 100 ? "bg-success" : "bg-primary"}`}
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className="font-mono text-[11px] text-muted-foreground">
        {done}/{total}
      </span>
    </span>
  );
}

/* ---------------------------------- Alerts --------------------------------- */

export function AlertCard({
  tone,
  eyebrow,
  title,
  children,
  action,
}: {
  tone: "warning" | "fatal" | "info";
  eyebrow: string;
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  const tones = {
    warning: {
      wrap: "border-warning/35 bg-warning/[0.06]",
      chip: "bg-warning/15 text-warning border-warning/30",
      rail: "bg-warning",
    },
    fatal: {
      wrap: "border-destructive/40 bg-destructive/[0.07]",
      chip: "bg-destructive/15 text-destructive border-destructive/30",
      rail: "bg-destructive",
    },
    info: {
      wrap: "border-info/35 bg-info/[0.06]",
      chip: "bg-info/15 text-info border-info/30",
      rail: "bg-info",
    },
  }[tone];

  return (
    <div className={`relative overflow-hidden rounded-lg border ${tones.wrap} p-4 pl-5`}>
      <span className={`absolute inset-y-0 left-0 w-[3px] ${tones.rail}`} />
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${tones.chip}`}
        >
          {eyebrow}
        </span>
        <h4 className="min-w-0 text-sm font-semibold">{title}</h4>
      </div>
      <div className="mt-2 space-y-2 text-[13px] leading-relaxed text-muted-foreground">
        {children}
      </div>
      {action ? <div className="mt-3 flex flex-wrap gap-2">{action}</div> : null}
    </div>
  );
}

/* --------------------------------- Skeleton -------------------------------- */

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3.5 py-3">
      <div className="h-4 w-4 rounded shimmer" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-3 w-2/5 rounded shimmer" />
        <div className="h-2.5 w-1/4 rounded shimmer" />
      </div>
      <div className="hidden h-2.5 w-16 rounded shimmer sm:block" />
      <div className="h-5 w-20 rounded-full shimmer" />
    </div>
  );
}

/* ------------------------------- Section shell ------------------------------ */

export function SectionHeader({
  title,
  hint,
  right,
}: {
  title: string;
  hint?: string;
  right?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
      <div className="min-w-0">
        <h2 className="truncate text-sm font-semibold tracking-tight">{title}</h2>
        {hint ? <p className="mt-0.5 truncate text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      {right}
    </div>
  );
}
