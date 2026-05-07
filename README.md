# Flux — Task Management Dashboard

A focused, minimal task management app built with React, TypeScript, and Tailwind CSS.

Link - https://abhisek-todo-task.netlify.app

## Features

- Create, edit, and delete tasks with title, description, priority, and due date
- Filter tasks by status (pending/completed) and priority (low/medium/high)
- Search tasks by title or description
- Toggle between list and card views
- Light/dark theme toggle with system preference detection
- Data persisted in localStorage
- Calendar date picker prevents selecting past dates
- Responsive design for mobile and desktop

## Tech Stack

- **React 18** — UI library
- **TypeScript** — type safety
- **Vite** — fast dev server and bundler
- **Tailwind CSS** — utility-first styling
- **shadcn/ui** — accessible, composable UI primitives (Radix UI under the hood)
- **date-fns** — lightweight date formatting
- **Lucide React** — icon set

## Setup

```bash
# Clone the repo
git clone https://github.com/DHitman/todo-task.git
cd todo-task

# Install dependencies
npm install

# Start dev server
npm run dev
```

App runs at `http://localhost:8080`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

## Project Structure

```
src/
├── components/
│   ├── tasks/          # Task-specific components (TaskItem, TaskForm, StatCard, PriorityBadge)
│   └── ui/             # Reusable UI primitives (button, dialog, select, etc.)
├── hooks/              # Custom hooks (useTasks, useTheme, use-toast)
├── pages/              # Route pages (Index, NotFound)
├── types/              # TypeScript type definitions
└── lib/                # Utilities (cn helper)
```

## Design Decisions

1. **No state management library** — `useState` + localStorage is sufficient for a single-page task app. Keeps the bundle small and the code straightforward.

2. **Custom hooks for logic** — `useTasks` encapsulates all CRUD operations and persistence. `useTheme` handles dark mode. Easy to swap localStorage for an API later without touching components.

3. **shadcn/ui over a full component library** — Only the components actually used are included. No bloat, full control over styling.

4. **Arrow functions throughout** — Consistent code style, no mixing of function declarations and expressions.

5. **Tailwind for all styling** — No CSS modules or styled-components. Single source of truth for design tokens via CSS variables in `index.css`.

6. **Calendar disables past dates** — Users can only set due dates from today onwards, preventing invalid task creation.

7. **Text truncation** — Long titles truncate with ellipsis, descriptions are clamped to 1 line to keep the UI clean.

