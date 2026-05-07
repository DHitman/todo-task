export type Priority = "low" | "medium" | "high";
export type Status = "pending" | "completed";
export type ViewMode = "list" | "card";
export type StatusFilter = "all" | "pending" | "completed";
export type PriorityFilter = "all" | Priority;

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string; // ISO
  status: Status;
  createdAt: string;
}