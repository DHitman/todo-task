import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: number;
  icon: LucideIcon;
  accent?: "primary" | "warning" | "success";
}

const accents = {
  primary: "bg-gradient-primary text-primary-foreground shadow-glow",
  warning: "bg-priority-medium/15 text-priority-medium",
  success: "bg-success/15 text-success",
};

export const StatCard = ({ label, value, icon: Icon, accent = "primary" }: Props) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:shadow-elegant">
      <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", accents[accent])}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-2xl font-bold tracking-tight text-foreground">{value}</div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      </div>
    </div>
  );
};