import { format, isPast, isToday } from "date-fns";
import { Calendar, Pencil, Trash2 } from "lucide-react";
import { Task } from "@/types/task";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PriorityBadge } from "./PriorityBadge";

interface Props {
  task: Task;
  view: "list" | "card";
  onToggle: (id: string) => void;
  onEdit: (t: Task) => void;
  onDelete: (t: Task) => void;
}

export const TaskItem = ({ task, view, onToggle, onEdit, onDelete }: Props) => {
  const due = new Date(task.dueDate);
  const overdue = task.status === "pending" && isPast(due) && !isToday(due);
  const completed = task.status === "completed";

  const meta = (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <PriorityBadge priority={task.priority} />
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 font-medium text-secondary-foreground",
          overdue && "bg-destructive/10 text-destructive",
          completed && "opacity-60"
        )}
      >
        <Calendar className="h-3 w-3" />
        {format(due, "MMM d")}
        {overdue && " · overdue"}
      </span>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium",
          completed
            ? "bg-success/15 text-success"
            : "bg-primary/10 text-primary"
        )}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full", completed ? "bg-success" : "bg-primary")} />
        {completed ? "Completed" : "Pending"}
      </span>
    </div>
  );

  const actions = (
    <div className="flex items-center gap-1">
      <Button size="icon" variant="ghost" onClick={() => onEdit(task)} aria-label="Edit task">
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => onDelete(task)}
        aria-label="Delete task"
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  if (view === "card") {
    return (
      <div
        className={cn(
          "group relative flex flex-col gap-3 rounded-2xl border border-border bg-gradient-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elegant animate-fade-in",
          completed && "opacity-75"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3">
            <Checkbox
              checked={completed}
              onCheckedChange={() => onToggle(task.id)}
              className="mt-1"
            />
            <h3
              className={cn(
                "text-base font-semibold leading-snug text-foreground truncate max-w-[100px]",
                completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </h3>
          </div>
          {actions}
        </div>
        {task.description && (
          <p
            className={cn(
              "text-sm text-muted-foreground line-clamp-1",
              completed && "line-through"
            )}
          >
            {task.description}
          </p>
        )}
        <div className="mt-auto pt-2">{meta}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group flex items-start gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft transition-all duration-200 hover:border-primary/30 hover:shadow-elegant animate-fade-in",
        completed && "opacity-75"
      )}
    >
      <Checkbox
        checked={completed}
        onCheckedChange={() => onToggle(task.id)}
        className="mt-1"
      />
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3
            className={cn(
              "text-base font-semibold text-foreground truncate max-w-[900px]",
              completed && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </h3>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">{actions}</div>
        </div>
        {task.description && (
          <p
            className={cn(
              "text-sm text-muted-foreground line-clamp-1",
              completed && "line-through"
            )}
          >
            {task.description}
          </p>
        )}
        {meta}
      </div>
    </div>
  );
};