import { c as createLucideIcon, e as useParams, f as useNavigate, r as reactExports, j as jsxRuntimeExports, P as PageLoading, L as Link, B as Button, u as ue } from "./index-TQY_iKlQ.js";
import { S as StatusBadge } from "./StatusBadge-ChZv4U0N.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-OwjTBGJ1.js";
import { L as Label, T as Textarea, a as Trash2 } from "./textarea-CEz23vbN.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CJx0x7Rh.js";
import { e as useComplianceTask, f as useUpdateTask, c as useDeleteTask, d as TaskStatus } from "./useBackend-V3w6Lpe4.js";
import { T as TriangleAlert } from "./triangle-alert-DIO5gKzW.js";
import { C as Calendar, U as User } from "./user-m-pq-YVg.js";
import { C as Clock } from "./clock-oc9nSZiX.js";
import { F as FileText } from "./file-text-DGj9TgEW.js";
import "./index-CLCQYvXI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
const statusOptions = [
  { value: TaskStatus.Pending, label: "Pending" },
  { value: TaskStatus.InProgress, label: "In Progress" },
  { value: TaskStatus.Completed, label: "Completed" },
  { value: TaskStatus.Overdue, label: "Overdue" }
];
function getStatusVariant(status) {
  switch (status) {
    case TaskStatus.Overdue:
      return "Overdue";
    case TaskStatus.InProgress:
      return "InProgress";
    case TaskStatus.Completed:
      return "Completed";
    default:
      return "Pending";
  }
}
const taskTypeConfig = {
  EC: {
    label: "EC",
    fullName: "Environmental Clearance",
    color: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30"
  },
  CTO: {
    label: "CTO",
    fullName: "Consent to Operate",
    color: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30"
  },
  CTE: {
    label: "CTE",
    fullName: "Consent to Establish",
    color: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30"
  }
};
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}
function DetailRow({
  icon,
  label,
  value,
  mono = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 py-2.5 border-b border-border/50 last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground mt-0.5 flex-shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: `text-sm font-medium text-foreground break-words ${mono ? "font-mono" : ""}`,
          children: value
        }
      )
    ] })
  ] });
}
function ComplianceDetailPage() {
  const { taskId } = useParams({ from: "/compliance/$taskId" });
  const navigate = useNavigate();
  const taskBigInt = BigInt(taskId);
  const { data: task, isLoading } = useComplianceTask(taskBigInt);
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const [newStatus, setNewStatus] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = reactExports.useState(false);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoading, {});
  if (!task) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-6 flex flex-col items-center justify-center min-h-64 text-center",
        "data-ocid": "compliance_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 32, className: "text-muted-foreground mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Task not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 mb-4", children: "This compliance task may have been deleted." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/compliance",
              className: "text-primary text-sm hover:underline",
              "data-ocid": "compliance_detail.back.link",
              children: "← Back to compliance list"
            }
          )
        ]
      }
    );
  }
  const statusVariant = getStatusVariant(task.status);
  const typeConf = taskTypeConfig[task.taskType] ?? taskTypeConfig.EC;
  const isOverdue = statusVariant === "Overdue";
  async function handleUpdate() {
    if (!newStatus) {
      ue.error("Please select a new status");
      return;
    }
    try {
      await updateTask.mutateAsync({
        id: task.id,
        req: { status: newStatus, notes }
      });
      ue.success("Task updated successfully");
      setNewStatus("");
      setNotes("");
    } catch {
      ue.error("Failed to update task");
    }
  }
  async function handleDelete() {
    try {
      await deleteTask.mutateAsync(task.id);
      ue.success("Compliance task deleted");
      void navigate({ to: "/compliance" });
    } catch {
      ue.error("Failed to delete task");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 lg:p-6 space-y-5 max-w-4xl",
      "data-ocid": "compliance_detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/compliance",
            className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
            "data-ocid": "compliance_detail.back.link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
              "Back to Compliance Tasks"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card overflow-hidden shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-1.5 w-full ${isOverdue ? "bg-red-500" : statusVariant === "InProgress" ? "bg-amber-500" : statusVariant === "Completed" ? "bg-green-500" : "bg-border"}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs font-bold px-2 py-0.5 rounded font-mono ${typeConf.color}`,
                    children: typeConf.label
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: typeConf.fullName }),
                isOverdue && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-red-500 font-semibold animate-pulse", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 11 }),
                  "OVERDUE"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground leading-tight break-words", children: task.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: statusVariant }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-0 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest", children: "Task Details" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-4 pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DetailRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14 }),
                    label: "Due Date",
                    value: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: isOverdue ? "text-red-500 font-semibold" : "",
                        children: [
                          formatDate(task.dueDate),
                          isOverdue && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-[10px] text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded-full", children: "OVERDUE" })
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DetailRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14 }),
                    label: "Responsible Officer (RO)",
                    value: task.responsibleOfficer
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DetailRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 14 }),
                    label: "Task Type / Permit",
                    value: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `px-2 py-0.5 rounded text-xs font-bold font-mono ${typeConf.color}`,
                        children: [
                          typeConf.label,
                          " — ",
                          typeConf.fullName
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DetailRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
                    label: "Created At",
                    value: formatDate(task.createdAt)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DetailRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14 }),
                    label: "Last Updated",
                    value: formatDate(task.updatedAt)
                  }
                )
              ] })
            ] }),
            task.conditionText && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 12 }),
                "Condition Text"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed whitespace-pre-wrap", children: task.conditionText }) })
            ] }),
            task.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 12 }),
                "Notes"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed whitespace-pre-wrap", children: task.notes }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 12 }),
                "Update Status"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-4 pb-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "newStatus", className: "text-xs", children: "New Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: newStatus,
                      onValueChange: (v) => setNewStatus(v),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            id: "newStatus",
                            className: "h-8 text-xs",
                            "data-ocid": "compliance_detail.status.select",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select new status…" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: statusOptions.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "updateNotes", className: "text-xs", children: "Update Notes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "updateNotes",
                      rows: 3,
                      placeholder: "Add update remarks…",
                      value: notes,
                      onChange: (e) => setNotes(e.target.value),
                      className: "text-xs resize-none",
                      "data-ocid": "compliance_detail.notes.textarea"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    onClick: handleUpdate,
                    disabled: updateTask.isPending || !newStatus,
                    className: "w-full",
                    "data-ocid": "compliance_detail.update.submit_button",
                    children: updateTask.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 12, className: "mr-1.5 animate-spin" }),
                      "Updating…"
                    ] }) : "Save Update"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-destructive/30 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-semibold text-destructive/80 uppercase tracking-widest", children: "Danger Zone" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-4 pb-4", children: !showDeleteConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Permanently delete this compliance task and all associated data." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "w-full border-destructive/40 text-destructive hover:bg-destructive hover:text-destructive-foreground",
                    onClick: () => setShowDeleteConfirm(true),
                    "data-ocid": "compliance_detail.delete_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13, className: "mr-1.5" }),
                      "Delete Task"
                    ]
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "space-y-3",
                  "data-ocid": "compliance_detail.delete.dialog",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-2.5 rounded bg-destructive/10 border border-destructive/20", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TriangleAlert,
                        {
                          size: 13,
                          className: "text-destructive flex-shrink-0 mt-0.5"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive font-medium", children: "This action cannot be undone. The task will be permanently deleted." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "outline",
                          size: "sm",
                          className: "flex-1 text-xs",
                          onClick: () => setShowDeleteConfirm(false),
                          disabled: deleteTask.isPending,
                          "data-ocid": "compliance_detail.delete.cancel_button",
                          children: "Cancel"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "destructive",
                          className: "flex-1 text-xs",
                          onClick: handleDelete,
                          disabled: deleteTask.isPending,
                          "data-ocid": "compliance_detail.delete.confirm_button",
                          children: deleteTask.isPending ? "Deleting…" : "Confirm Delete"
                        }
                      )
                    ] })
                  ]
                }
              ) })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  ComplianceDetailPage as default
};
