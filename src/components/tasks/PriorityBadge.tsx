import { Flag } from "lucide-react";
import { Priority } from "@/types/task";
import { cn } from "@/lib/utils";

const styles: Record<Priority, string> = {
  low: "bg-priority-low/15 text-priority-low",
  medium: "bg-priority-medium/15 text-priority-medium",
  high: "bg-priority-high/15 text-priority-high",
};

export const PriorityBadge = ({ priority }: { priority: Priority }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium capitalize",
        styles[priority]
      )}
    >
      <Flag className="h-3 w-3" />
      {priority}
    </span>
  );
};