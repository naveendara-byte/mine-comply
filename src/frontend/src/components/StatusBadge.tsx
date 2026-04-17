import { cn } from "@/lib/utils";
import type { StatusVariant } from "@/types/index";

interface StatusBadgeProps {
  status: StatusVariant;
  className?: string;
  size?: "sm" | "md";
}

const statusConfig: Record<
  StatusVariant,
  { label: string; className: string; dot: string }
> = {
  Completed: {
    label: "Completed",
    className: "bg-green-500/15 text-green-400 border border-green-500/30",
    dot: "bg-green-400",
  },
  InProgress: {
    label: "In Progress",
    className: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    dot: "bg-amber-400",
  },
  Overdue: {
    label: "Overdue",
    className: "bg-red-500/15 text-red-400 border border-red-500/30",
    dot: "bg-red-400 animate-pulse",
  },
  Pending: {
    label: "Pending",
    className: "bg-muted text-muted-foreground border border-border",
    dot: "bg-muted-foreground",
  },
};

export function StatusBadge({
  status,
  className,
  size = "md",
}: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        config.className,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}

/** Left-accent bar variant for table rows and list cards */
interface StatusAccentBarProps {
  status: StatusVariant;
  className?: string;
}

const barConfig: Record<StatusVariant, string> = {
  Completed: "border-l-green-500",
  InProgress: "border-l-amber-500",
  Overdue: "border-l-red-500",
  Pending: "border-l-border",
};

export function StatusAccentBar({ status, className }: StatusAccentBarProps) {
  return <div className={cn("border-l-4", barConfig[status], className)} />;
}

export type { StatusVariant };
