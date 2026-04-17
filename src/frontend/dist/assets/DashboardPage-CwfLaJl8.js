import { c as createLucideIcon, j as jsxRuntimeExports, T as Trees, C as ChartColumn, L as Link, a as TableSkeleton, W as Wind, D as Droplets, S as ShieldCheck, b as cn } from "./index-TQY_iKlQ.js";
import { P as PageHeader } from "./PageHeader-Dm741xOU.js";
import { S as StatusBadge } from "./StatusBadge-ChZv4U0N.js";
import { B as Badge } from "./badge-CTr1JDat.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-OwjTBGJ1.js";
import { u as useDashboardStats, a as useComplianceTasks } from "./useBackend-V3w6Lpe4.js";
import { T as TriangleAlert } from "./triangle-alert-DIO5gKzW.js";
import { C as Clock } from "./clock-oc9nSZiX.js";
import { C as CircleCheck } from "./circle-check-Cw-FxxNn.js";
import { C as ChevronRight } from "./chevron-right-d7EU4y8M.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "m9 14 2 2 4-4", key: "df797q" }]
];
const ClipboardCheck = createLucideIcon("clipboard-check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M8 18v-2", key: "qcmpov" }],
  ["path", { d: "M12 18v-4", key: "q1q25u" }],
  ["path", { d: "M16 18v-6", key: "15y0np" }]
];
const FileChartColumnIncreasing = createLucideIcon("file-chart-column-increasing", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["path", { d: "m3 7 2 2 4-4", key: "1obspn" }],
  ["path", { d: "M13 6h8", key: "15sg57" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 18h8", key: "oe0vm4" }]
];
const ListChecks = createLucideIcon("list-checks", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode);
function KpiCard({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  barColor,
  subLabel,
  href,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: href, "data-ocid": ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border hover:shadow-elevated transition-smooth cursor-pointer group relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn("absolute inset-y-0 left-0 w-1 rounded-l-lg", barColor)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pl-5 pr-4 py-4 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "h-11 w-11 rounded-xl flex items-center justify-center shrink-0",
            iconBg
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 20, className: iconColor })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground leading-none tabular-nums", children: value !== void 0 ? value.toString() : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 truncate", children: label }),
        subLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/70 mt-0.5 truncate", children: subLabel })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ChevronRight,
        {
          size: 14,
          className: "text-muted-foreground group-hover:text-foreground transition-colors shrink-0"
        }
      )
    ] })
  ] }) });
}
function StatusBreakdownBar({
  pending,
  inProgress,
  completed,
  overdue
}) {
  const total = Number(pending) + Number(inProgress) + Number(completed) + Number(overdue);
  if (total === 0) return null;
  const pct = (n) => total > 0 ? Number(n) / total * 100 : 0;
  const segments = [
    {
      label: "Completed",
      value: completed,
      color: "bg-green-500",
      pct: pct(completed)
    },
    {
      label: "In Progress",
      value: inProgress,
      color: "bg-amber-500",
      pct: pct(inProgress)
    },
    {
      label: "Overdue",
      value: overdue,
      color: "bg-red-500",
      pct: pct(overdue)
    },
    {
      label: "Pending",
      value: pending,
      color: "bg-muted-foreground/40",
      pct: pct(pending)
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "dashboard.status_breakdown.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex rounded-full overflow-hidden h-3 bg-muted gap-px", children: segments.map(
      (s) => s.pct > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn("h-full transition-all duration-700", s.color),
          style: { width: `${s.pct}%` },
          title: `${s.label}: ${s.value.toString()}`
        },
        s.label
      ) : null
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-1", children: [
      segments.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-2.5 w-2.5 rounded-full shrink-0", s.color) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          s.label,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground tabular-nums", children: s.value.toString() })
        ] })
      ] }, s.label)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        "Total",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground tabular-nums", children: total })
      ] }) })
    ] })
  ] });
}
function StatusBanner({ overdue }) {
  const hasOverdue = Number(overdue) > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "dashboard.status_banner",
      className: cn(
        "flex items-center gap-3 rounded-lg px-4 py-3 border",
        hasOverdue ? "bg-amber-500/10 border-amber-500/30 text-amber-400" : "bg-green-500/10 border-green-500/30 text-green-400"
      ),
      children: [
        hasOverdue ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { size: 18, className: "shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 18, className: "shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: hasOverdue ? "Action Required" : "All Clear" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-80 mt-0.5", children: hasOverdue ? `${overdue.toString()} compliance task${Number(overdue) > 1 ? "s are" : " is"} overdue — immediate attention needed` : "All compliance tasks are on track. No overdue items." })
        ] }),
        hasOverdue && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/compliance",
            className: "shrink-0 text-xs font-semibold underline underline-offset-2 hover:opacity-80",
            "data-ocid": "dashboard.status_banner.compliance_link",
            children: "Review →"
          }
        )
      ]
    }
  );
}
function DeadlineRow({ task, index }) {
  const dueDate = new Date(Number(task.dueDate) / 1e6);
  const now = /* @__PURE__ */ new Date();
  const diffDays = Math.ceil(
    (dueDate.getTime() - now.getTime()) / (1e3 * 60 * 60 * 24)
  );
  const status = task.status;
  const statusVariant = status === "Overdue" ? "Overdue" : status === "InProgress" ? "InProgress" : status === "Completed" ? "Completed" : "Pending";
  const dueLabelColor = diffDays < 0 ? "text-red-400" : diffDays <= 7 ? "text-amber-400" : "text-muted-foreground";
  const dueLabel = diffDays < 0 ? `${Math.abs(diffDays)}d overdue` : diffDays === 0 ? "Due today" : diffDays === 1 ? "Due tomorrow" : `Due in ${diffDays}d`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/compliance/$taskId",
      params: { taskId: task.id.toString() },
      className: "flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-smooth border-b border-border/60 last:border-0 group",
      "data-ocid": `dashboard.upcoming_task.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-1 self-stretch rounded-full shrink-0",
              statusVariant === "Overdue" ? "bg-red-500" : statusVariant === "InProgress" ? "bg-amber-500" : statusVariant === "Completed" ? "bg-green-500" : "bg-border"
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors", children: task.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: [
            task.taskType,
            task.responsibleOfficer ? ` · RO: ${task.responsibleOfficer}` : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 flex flex-col items-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: statusVariant, size: "sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn("text-[10px] font-medium tabular-nums", dueLabelColor),
              children: dueLabel
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14, className: "text-muted-foreground shrink-0" })
      ]
    }
  );
}
function QuickLinkCard({
  href,
  icon: Icon,
  label,
  description,
  iconBg,
  iconColor,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: href, "data-ocid": ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border hover:shadow-elevated transition-smooth cursor-pointer group h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "h-10 w-10 rounded-lg flex items-center justify-center",
          iconBg
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, className: iconColor })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground group-hover:text-primary transition-colors", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-primary mt-auto", children: [
      "Open ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12 })
    ] })
  ] }) }) });
}
function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: tasks, isLoading: tasksLoading } = useComplianceTasks();
  const overdueCount = (stats == null ? void 0 : stats.taskCounts.overdue) ?? BigInt(0);
  const inProgressCount = (stats == null ? void 0 : stats.taskCounts.inProgress) ?? BigInt(0);
  const completedCount = (stats == null ? void 0 : stats.taskCounts.completed) ?? BigInt(0);
  const pendingCount = (stats == null ? void 0 : stats.taskCounts.pending) ?? BigInt(0);
  const totalTasks = Number(overdueCount) + Number(inProgressCount) + Number(completedCount) + Number(pendingCount);
  const upcomingTasks = tasks ? [...tasks].filter((t) => {
    const s = t.status;
    return s !== "Completed";
  }).sort((a, b) => Number(a.dueDate) - Number(b.dueDate)).slice(0, 5) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 lg:p-6 space-y-6", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Environmental Compliance Dashboard",
        subtitle: "Coal Mine Operations — Real-time compliance & environmental status"
      }
    ),
    !statsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBanner, { overdue: overdueCount }),
    statsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 rounded-lg bg-muted animate-pulse" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.kpi.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: "Key Performance Indicators" }),
      statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: [1, 2, 3, 4].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-[72px] rounded-lg bg-muted animate-pulse"
        },
        k
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KpiCard,
          {
            label: "Total Tasks",
            value: totalTasks,
            icon: ListChecks,
            iconBg: "bg-primary/15",
            iconColor: "text-primary",
            barColor: "bg-primary",
            subLabel: `${completedCount.toString()} completed`,
            href: "/compliance",
            ocid: "dashboard.total_tasks.card"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KpiCard,
          {
            label: "Overdue Tasks",
            value: overdueCount,
            icon: TriangleAlert,
            iconBg: "bg-red-500/15",
            iconColor: "text-red-400",
            barColor: "bg-red-500",
            subLabel: "Require immediate action",
            href: "/compliance",
            ocid: "dashboard.overdue_tasks.card"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KpiCard,
          {
            label: "Trees Planted",
            value: stats == null ? void 0 : stats.totalTreesPlanted,
            icon: Trees,
            iconBg: "bg-green-500/15",
            iconColor: "text-green-400",
            barColor: "bg-green-500",
            subLabel: "Environmental restoration",
            href: "/trees",
            ocid: "dashboard.total_trees.card"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KpiCard,
          {
            label: "Monitoring Readings",
            value: ((stats == null ? void 0 : stats.recentAirReadingsCount) ?? BigInt(0)) + ((stats == null ? void 0 : stats.recentPiezoReadingsCount) ?? BigInt(0)),
            icon: ChartColumn,
            iconBg: "bg-blue-500/15",
            iconColor: "text-blue-400",
            barColor: "bg-blue-500",
            subLabel: "Last 30 days (Air + Piezo)",
            href: "/monitoring/air",
            ocid: "dashboard.recent_readings.card"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "dashboard.breakdown.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "px-4 py-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 15, className: "text-primary" }),
          "Compliance Status Breakdown"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/compliance",
            className: "text-xs text-primary hover:underline",
            "data-ocid": "dashboard.breakdown.view_all.link",
            children: "View all →"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-4 py-4", children: statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 rounded-full bg-muted animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: [1, 2, 3, 4].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-4 w-20 rounded bg-muted animate-pulse"
          },
          k
        )) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatusBreakdownBar,
        {
          pending: pendingCount,
          inProgress: inProgressCount,
          completed: completedCount,
          overdue: overdueCount
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "px-4 py-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 15, className: "text-amber-400" }),
            "Upcoming Deadlines",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-[10px] px-1.5 py-0 h-4",
                children: "Next 5"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/compliance",
              className: "text-xs text-primary hover:underline",
              "data-ocid": "dashboard.view_all_tasks.link",
              children: "View all →"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: tasksLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { rows: 5 }) }) : upcomingTasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-12 text-center",
            "data-ocid": "dashboard.upcoming_empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 32, className: "text-green-400 mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No pending deadlines" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "All active compliance tasks are completed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/compliance",
                  className: "mt-3 text-xs text-primary hover:underline",
                  "data-ocid": "dashboard.create_task.link",
                  children: "Manage Compliance Tasks →"
                }
              )
            ]
          }
        ) : upcomingTasks.map((task, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          DeadlineRow,
          {
            task,
            index: i + 1
          },
          task.id.toString()
        )) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: "Monitoring Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/monitoring/air",
                "data-ocid": "dashboard.air_monitoring.card",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border hover:shadow-elevated transition-smooth cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3 flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-md bg-primary/15 text-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { size: 16 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Air Quality" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: statsLoading ? "Loading…" : `${(stats == null ? void 0 : stats.recentAirReadingsCount.toString()) ?? 0} readings (30d)` })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ChevronRight,
                    {
                      size: 14,
                      className: "text-muted-foreground shrink-0"
                    }
                  )
                ] }) })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/monitoring/piezometer",
                "data-ocid": "dashboard.piezometer.card",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border hover:shadow-elevated transition-smooth cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3 flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-md bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { size: 16 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Piezometer" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: statsLoading ? "Loading…" : `${(stats == null ? void 0 : stats.recentPiezoReadingsCount.toString()) ?? 0} readings (30d)` })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ChevronRight,
                    {
                      size: 14,
                      className: "text-muted-foreground shrink-0"
                    }
                  )
                ] }) })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/trees", "data-ocid": "dashboard.trees.card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border hover:shadow-elevated transition-smooth cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-md bg-green-500/15 text-green-400 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trees, { size: 16 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Planted Trees" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: statsLoading ? "Loading…" : `${(stats == null ? void 0 : stats.totalTreesPlanted.toString()) ?? 0} total trees` })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronRight,
                {
                  size: 14,
                  className: "text-muted-foreground shrink-0"
                }
              )
            ] }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: "Quick Access" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              QuickLinkCard,
              {
                href: "/compliance",
                icon: ClipboardCheck,
                label: "Compliance",
                description: "EC & CTO conditions",
                iconBg: "bg-primary/15",
                iconColor: "text-primary",
                ocid: "dashboard.quick_compliance.link"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              QuickLinkCard,
              {
                href: "/monitoring/air",
                icon: Wind,
                label: "Air Monitor",
                description: "PM & dust readings",
                iconBg: "bg-primary/15",
                iconColor: "text-primary",
                ocid: "dashboard.quick_air.link"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              QuickLinkCard,
              {
                href: "/monitoring/piezometer",
                icon: Droplets,
                label: "Piezometer",
                description: "Groundwater levels",
                iconBg: "bg-blue-500/15",
                iconColor: "text-blue-400",
                ocid: "dashboard.quick_piezo.link"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              QuickLinkCard,
              {
                href: "/reports",
                icon: FileChartColumnIncreasing,
                label: "Reports",
                description: "Compliance reports",
                iconBg: "bg-amber-500/15",
                iconColor: "text-amber-400",
                ocid: "dashboard.quick_reports.link"
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  DashboardPage as default
};
