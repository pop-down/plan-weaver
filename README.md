# Plan Weaver

# [SYSTEM PROMPT: CRITICAL EXECUTION CONSTRAINTS]

- You are a Senior UX/UI Engineer.

- **CRITICAL CONSTRAINT:** Your primary goal is to generate a **High-Fidelity Static UI Prototype / Mockup**. 

- **DO NOT** build complex state management, heavy data models, backend logic, real drag-and-drop libraries, or massive dummy datasets. 

- Limit dummy data to 5-8 highly representative items. 

- Use simple React state just to toggle between views (e.g., Sidebar navigation).

- Focus strictly on the **HTML/CSS structure, responsive layout, visual components, and typography**. You must finish the entire UI in a **SINGLE SHOT** without running out of tokens/credits.

---

# [PROJECT GOAL: Plan Management Workspace UI Prototype]

Design a responsive, dark-mode developer-tool UI (inspired by Linear, Height, Raycast) for a "Plan Management Workspace". It is a dashboard where developers manage Markdown-based plan documents. 

Create a Single Page layout with a left Sidebar for navigation. The sidebar should have the following mock tabs, and clicking them should simply render the corresponding static UI view:

## 1. Component Library (View 1)

- A showcase page displaying all reusable UI elements used in this prototype: Primary/Secondary Buttons, Status Badges (e.g., In Progress, Review), Priority Tags (P0, P1), Horizon Badges (Now, Next), Error/Recovery Alerts, and a skeleton loading state.

## 2. Core Plan Workspace (View 2)

- **Layout:** A dense, scannable List or Board view.

- **Row/Card Items:** Show Plan Title, Status, Priority, Checklist progress, and a "Last active" timestamp. 

- **Detail Split-View (Desktop) / Bottom Sheet (Mobile):** Show a mock detail panel on the right side containing a beautifully styled Markdown reading area, metadata, and core action buttons (Verify, Start, Complete).

## 3. Recovery / Attention Experience (View 3)

- A view dedicated to stalled plans (e.g., "Rate limit exceeded", "Orphan worktree").

- **UI Focus:** Do not just use a red warning icon. Design a "Context Card" that clearly answers: "Why did this stop?" and "Can it be resumed?", followed by a clear, confirm-gated recovery action button. Visually differentiate between an infrastructure warning (quota) vs. a fatal code error.

## 4. Groups & Planning Horizon (View 4)

- A view showing how plans are grouped by a larger Initiative (e.g., "Night Runner Stabilization").

- Include a visual representation of "Planning Horizons" (Now, Next, Later, Someday) using Kanban-style columns or distinct list sections. (No real drag-and-drop needed, just the static layout).

## 5. Filter & Bulk Triage Bar

- Place a static top bar in the Workspace view showing a complex "Saved View" dropdown (e.g., "P0/P1 Needs Attention") and mock multi-select bulk action buttons (Change Horizon, Add Tag).

## 6. Responsive & Visual Requirements

- **Mobile First/Responsive:** The desktop split-view MUST collapse gracefully into a list where details open as a full-page or bottom sheet on mobile screens. 

- **Aesthetic:** High information density but visually uncluttered. Use muted dark colors for backgrounds, crisp typography for the Markdown area, and subtle semantic colors only for statuses and priorities.

- **Context over Action:** Always show the text explanation of a state before the action button.

Execute this strictly as a frontend presentation layer. Output the complete, stylish UI immediately.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ea139a7e-db97-452a-a721-f076f65d627c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
