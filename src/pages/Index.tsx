import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  LayoutGrid,
  ListTodo,
  Moon,
  Plus,
  Search,
  Sparkles,
  Sun,
  ListChecks,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { useTasks } from "@/hooks/useTasks";
import { useTheme } from "@/hooks/useTheme";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskItem } from "@/components/tasks/TaskItem";
import { StatCard } from "@/components/tasks/StatCard";
import { PriorityFilter, StatusFilter, Task, ViewMode } from "@/types/task";
import { cn } from "@/lib/utils";

const Index = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleStatus } = useTasks();
  const { theme, toggle } = useTheme();

  const [view, setView] = useState<ViewMode>("list");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Task | null>(null);

  const q = search.trim().toLowerCase();
  const filtered = tasks
    .filter((t) => (statusFilter === "all" ? true : t.status === statusFilter))
    .filter((t) => (priorityFilter === "all" ? true : t.priority === priorityFilter))
    .filter(
      (t) =>
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    )
    .sort((a, b) => {
      if (a.status !== b.status) return a.status === "completed" ? 1 : -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (t: Task) => {
    setEditing(t);
    setFormOpen(true);
  };

  const handleSubmit = (data: { title: string; description: string; priority: Task["priority"]; dueDate: string }) => {
    if (editing) {
      updateTask(editing.id, data);
      toast({ title: "Task updated" });
    } else {
      addTask(data);
      toast({ title: "Task created" });
    }
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    deleteTask(pendingDelete.id);
    toast({ title: "Task deleted" });
    setPendingDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Flux
              </h1>
              <p className="text-sm text-muted-foreground">Your focused task dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" onClick={toggle} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="hero" onClick={openNew} className="gap-2">
              <Plus className="h-4 w-4" />
              New task
            </Button>
          </div>
        </header>

        {/* Stats */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total" value={stats.total} icon={ListChecks} accent="primary" />
          <StatCard label="Pending" value={stats.pending} icon={Circle} accent="warning" />
          <StatCard label="Completed" value={stats.completed} icon={CheckCircle2} accent="success" />
        </section>

        {/* Toolbar */}
        <section className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={(v) => setPriorityFilter(v as PriorityFilter)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <div className="ml-auto inline-flex rounded-lg border border-border p-1">
              <button
                onClick={() => setView("list")}
                aria-label="List view"
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                  view === "list"
                    ? "bg-gradient-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <ListTodo className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("card")}
                aria-label="Card view"
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                  view === "card"
                    ? "bg-gradient-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Tasks */}
        <section className="mt-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-20 text-center animate-fade-in">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
                <ListTodo className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">No tasks found</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                {tasks.length === 0
                  ? "Get started by creating your first task."
                  : "Try adjusting your search or filters."}
              </p>
              {tasks.length === 0 && (
                <Button onClick={openNew} variant="hero" className="mt-6 gap-2">
                  <Plus className="h-4 w-4" />
                  Create task
                </Button>
              )}
            </div>
          ) : (
            <div
              className={cn(
                view === "card"
                  ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  : "flex flex-col gap-3"
              )}
            >
              {filtered.map((t) => (
                <TaskItem
                  key={t.id}
                  task={t}
                  view={view}
                  onToggle={toggleStatus}
                  onEdit={openEdit}
                  onDelete={setPendingDelete}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <TaskForm
        open={formOpen}
        onOpenChange={setFormOpen}
        initial={editing}
        onSubmit={handleSubmit}
      />

      <AlertDialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this task?</AlertDialogTitle>
            <AlertDialogDescription>
              "{pendingDelete?.title}" will be permanently removed. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
