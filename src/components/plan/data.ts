import type { HorizonKind, PriorityKind, StatusKind } from "./primitives";

export type Plan = {
  id: string;
  title: string;
  slug: string;
  status: StatusKind;
  priority: PriorityKind;
  horizon: HorizonKind;
  done: number;
  total: number;
  lastActive: string;
  initiative: string;
  owner: string;
};

export const plans: Plan[] = [
  {
    id: "PLN-142",
    title: "Night runner retry budget + backoff",
    slug: "night-runner-retry-budget.md",
    status: "progress",
    priority: "P0",
    horizon: "Now",
    done: 7,
    total: 11,
    lastActive: "4m ago",
    initiative: "Night Runner Stabilization",
    owner: "mira",
  },
  {
    id: "PLN-138",
    title: "Orphan worktree reaper",
    slug: "orphan-worktree-reaper.md",
    status: "blocked",
    priority: "P0",
    horizon: "Now",
    done: 3,
    total: 9,
    lastActive: "1h ago",
    initiative: "Night Runner Stabilization",
    owner: "dev-bot",
  },
  {
    id: "PLN-131",
    title: "Plan diff viewer for markdown revisions",
    slug: "plan-diff-viewer.md",
    status: "review",
    priority: "P1",
    horizon: "Next",
    done: 9,
    total: 10,
    lastActive: "3h ago",
    initiative: "Workspace Surface",
    owner: "kai",
  },
  {
    id: "PLN-127",
    title: "Saved views + shareable filter URLs",
    slug: "saved-views.md",
    status: "progress",
    priority: "P1",
    horizon: "Next",
    done: 4,
    total: 8,
    lastActive: "yesterday",
    initiative: "Workspace Surface",
    owner: "mira",
  },
  {
    id: "PLN-119",
    title: "Bulk triage keyboard layer",
    slug: "bulk-triage-keys.md",
    status: "backlog",
    priority: "P2",
    horizon: "Later",
    done: 0,
    total: 6,
    lastActive: "3d ago",
    initiative: "Workspace Surface",
    owner: "unassigned",
  },
  {
    id: "PLN-104",
    title: "Archive + cold storage for stale plans",
    slug: "cold-storage.md",
    status: "done",
    priority: "P2",
    horizon: "Someday",
    done: 5,
    total: 5,
    lastActive: "2w ago",
    initiative: "Platform Hygiene",
    owner: "kai",
  },
];

export const savedViews = [
  "P0/P1 Needs Attention",
  "My plans · active",
  "Stalled > 24h",
  "Review queue",
];
