import { j as jsxRuntimeExports, b as cn } from "./index-TQY_iKlQ.js";
const statusConfig = {
  Completed: {
    label: "Completed",
    className: "bg-green-500/15 text-green-400 border border-green-500/30",
    dot: "bg-green-400"
  },
  InProgress: {
    label: "In Progress",
    className: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    dot: "bg-amber-400"
  },
  Overdue: {
    label: "Overdue",
    className: "bg-red-500/15 text-red-400 border border-red-500/30",
    dot: "bg-red-400 animate-pulse"
  },
  Pending: {
    label: "Pending",
    className: "bg-muted text-muted-foreground border border-border",
    dot: "bg-muted-foreground"
  }
};
function StatusBadge({
  status,
  className,
  size = "md"
}) {
  const config = statusConfig[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        config.className,
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("h-1.5 w-1.5 rounded-full", config.dot) }),
        config.label
      ]
    }
  );
}
const barConfig = {
  Completed: "border-l-green-500",
  InProgress: "border-l-amber-500",
  Overdue: "border-l-red-500",
  Pending: "border-l-border"
};
function StatusAccentBar({ status, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("border-l-4", barConfig[status], className) });
}
export {
  StatusBadge as S,
  StatusAccentBar as a
};
