import { useEffect, useState } from "react";
import { Task } from "@/types/task";

const STORAGE_KEY = "tm_tasks_v1";

const seed: Task[] = [
  {
    id: crypto.randomUUID(),
    title: "Welcome to Flux 👋",
    description: "Click the + button to add your first task. Edit, complete, or delete anytime.",
    priority: "medium",
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Try the card view",
    description: "Toggle between list and card layouts with the buttons in the toolbar.",
    priority: "low",
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Ship the dashboard",
    description: "Polish the design and call it done.",
    priority: "high",
    dueDate: new Date(Date.now() - 86400000).toISOString(),
    status: "completed",
    createdAt: new Date().toISOString(),
  },
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Task[];
    } catch {}
    return seed;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (t: Omit<Task, "id" | "status" | "createdAt">) =>
    setTasks((p) => [
      { ...t, id: crypto.randomUUID(), status: "pending", createdAt: new Date().toISOString() },
      ...p,
    ]);

  const updateTask = (id: string, patch: Partial<Task>) =>
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  const deleteTask = (id: string) => setTasks((p) => p.filter((t) => t.id !== id));

  const toggleStatus = (id: string) =>
    setTasks((p) =>
      p.map((t) =>
        t.id === id ? { ...t, status: t.status === "completed" ? "pending" : "completed" } : t
      )
    );

  return { tasks, addTask, updateTask, deleteTask, toggleStatus };
};