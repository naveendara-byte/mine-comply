import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, a as TableSkeleton, d as ClipboardList, u as ue, L as Link } from "./index-TQY_iKlQ.js";
import { P as Plus, F as FormModal, I as Input } from "./input-nHBbGSn7.js";
import { P as PageHeader } from "./PageHeader-Dm741xOU.js";
import { a as StatusAccentBar, S as StatusBadge } from "./StatusBadge-ChZv4U0N.js";
import { L as Label, T as Textarea, a as Trash2 } from "./textarea-CEz23vbN.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CJx0x7Rh.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-gF0Z_xDD.js";
import { a as useComplianceTasks, b as useCreateTask, c as useDeleteTask, T as TaskType, d as TaskStatus } from "./useBackend-V3w6Lpe4.js";
import { T as TriangleAlert } from "./triangle-alert-DIO5gKzW.js";
import { C as Calendar, U as User } from "./user-m-pq-YVg.js";
import { C as ChevronRight } from "./chevron-right-d7EU4y8M.js";
import "./index-CLCQYvXI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }],
  ["path", { d: "M11 12h4", key: "q8tih4" }],
  ["path", { d: "M11 16h7", key: "uosisv" }],
  ["path", { d: "M11 20h10", key: "jvxblo" }]
];
const ArrowUpNarrowWide = createLucideIcon("arrow-up-narrow-wide", __iconNode);
const statusTabs = [
  { value: "all", label: "All" },
  { value: "Overdue", label: "Overdue" },
  { value: "InProgress", label: "In Progress" },
  { value: "Pending", label: "Pending" },
  { value: "Completed", label: "Completed" }
];
const taskTypeConfig = {
  EC: {
    label: "EC",
    color: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30"
  },
  CTO: {
    label: "CTO",
    color: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30"
  },
  CTE: {
    label: "CTE",
    color: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30"
  }
};
const rowBgConfig = {
  Overdue: "bg-red-500/5 hover:bg-red-500/10",
  InProgress: "bg-amber-500/5 hover:bg-amber-500/10",
  Completed: "hover:bg-muted/30",
  Pending: "hover:bg-muted/30"
};
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
const defaultForm = {
  title: "",
  taskType: TaskType.EC,
  conditionText: "",
  dueDate: "",
  responsibleOfficer: "",
  notes: ""
};
function TaskRow({
  task,
  index,
  onDelete
}) {
  const statusVariant = getStatusVariant(task.status);
  const dueDate = new Date(Number(task.dueDate) / 1e6);
  const isOverdue = statusVariant === "Overdue";
  const typeConf = taskTypeConfig[task.taskType] ?? taskTypeConfig.EC;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `relative flex items-stretch gap-0 border-b border-border/50 last:border-0 transition-smooth ${rowBgConfig[statusVariant]}`,
      "data-ocid": `compliance.task.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatusAccentBar,
          {
            status: statusVariant,
            className: "w-1 flex-shrink-0 rounded-l"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center gap-3 px-4 py-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/compliance/$taskId",
                  params: { taskId: task.id.toString() },
                  className: "text-sm font-semibold text-foreground hover:text-primary transition-colors truncate",
                  "data-ocid": `compliance.task.link.${index}`,
                  children: task.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${typeConf.color}`,
                  children: typeConf.label
                }
              ),
              isOverdue && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 text-[10px] text-red-500 font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 10 }),
                "OVERDUE"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 11 }),
                dueDate.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 11 }),
                task.responsibleOfficer
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatusBadge,
            {
              status: statusVariant,
              size: "sm",
              className: "flex-shrink-0"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-muted-foreground hover:text-destructive transition-colors",
                onClick: () => onDelete(task.id),
                "aria-label": "Delete task",
                "data-ocid": `compliance.task.delete_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/compliance/$taskId",
                params: { taskId: task.id.toString() },
                className: "flex items-center justify-center h-7 w-7 text-muted-foreground hover:text-foreground transition-colors",
                "aria-label": "View task details",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function CompliancePage() {
  const { data: tasks, isLoading } = useComplianceTasks();
  const createTask = useCreateTask();
  const deleteTask = useDeleteTask();
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(defaultForm);
  const [confirmDeleteId, setConfirmDeleteId] = reactExports.useState(null);
  const filtered = (tasks ?? []).filter((t) => {
    const statusMatch = statusFilter === "all" || t.status === statusFilter;
    const typeMatch = typeFilter === "all" || t.taskType === typeFilter;
    return statusMatch && typeMatch;
  }).sort((a, b) => Number(a.dueDate) - Number(b.dueDate));
  async function handleCreate() {
    if (!form.title || !form.dueDate || !form.responsibleOfficer) {
      ue.error("Please fill in all required fields");
      return;
    }
    try {
      await createTask.mutateAsync({
        title: form.title,
        taskType: form.taskType,
        conditionText: form.conditionText,
        dueDate: BigInt(new Date(form.dueDate).getTime() * 1e6),
        responsibleOfficer: form.responsibleOfficer,
        notes: form.notes
      });
      ue.success("Compliance task created successfully");
      setModalOpen(false);
      setForm(defaultForm);
    } catch {
      ue.error("Failed to create task");
    }
  }
  async function handleConfirmDelete() {
    if (!confirmDeleteId) return;
    try {
      await deleteTask.mutateAsync(confirmDeleteId);
      ue.success("Task deleted");
    } catch {
      ue.error("Failed to delete task");
    } finally {
      setConfirmDeleteId(null);
    }
  }
  const overdueCount = (tasks ?? []).filter(
    (t) => t.status === TaskStatus.Overdue
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 lg:p-6 space-y-5", "data-ocid": "compliance.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Compliance Tasks",
        subtitle: "EC / CTO / CTE conditions with status tracking against RO",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          overdueCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs font-semibold text-red-500 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 11 }),
            overdueCount,
            " Overdue"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: () => setModalOpen(true),
              "data-ocid": "compliance.add_task.open_modal_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mr-1.5" }),
                "Add Task"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tabs,
        {
          value: statusFilter,
          onValueChange: (v) => setStatusFilter(v),
          className: "flex-1",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "bg-muted/50 h-8 gap-0.5 flex-wrap", children: statusTabs.map((tab) => {
            const count = tab.value === "all" ? (tasks == null ? void 0 : tasks.length) ?? 0 : (tasks ?? []).filter(
              (t) => t.status === tab.value
            ).length;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: tab.value,
                className: "text-xs h-7 px-3 gap-1.5",
                "data-ocid": `compliance.filter.${tab.value}.tab`,
                children: [
                  tab.label,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-background/70 text-muted-foreground text-[10px] px-1 rounded-sm font-mono", children: count })
                ]
              },
              tab.value
            );
          }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: typeFilter,
          onValueChange: (v) => setTypeFilter(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "h-8 w-36 text-xs",
                "data-ocid": "compliance.type_filter.select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Types" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Types" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "EC", children: "EC — Environmental Clearance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "CTO", children: "CTO — Consent to Operate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "CTE", children: "CTE — Consent to Establish" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpNarrowWide, { size: 12 }),
        "Sorted by due date"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-card overflow-hidden shadow-sm", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { rows: 6 }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "compliance.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 24, className: "text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No tasks found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 max-w-xs", children: statusFilter !== "all" || typeFilter !== "all" ? "Try clearing the filters to see all tasks" : "Add your first compliance task to get started" }),
          (statusFilter !== "all" || typeFilter !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "mt-4",
              onClick: () => {
                setStatusFilter("all");
                setTypeFilter("all");
              },
              children: "Clear filters"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-5 py-2 bg-muted/40 border-b border-border text-[11px] font-semibold text-muted-foreground uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: "Task / Condition" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 text-right hidden sm:block", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16" })
      ] }),
      filtered.map((task, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        TaskRow,
        {
          task,
          index: i + 1,
          onDelete: (id) => setConfirmDeleteId(id)
        },
        task.id.toString()
      ))
    ] }) }),
    !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
      "Showing ",
      filtered.length,
      " of ",
      (tasks == null ? void 0 : tasks.length) ?? 0,
      " tasks"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormModal,
      {
        open: modalOpen,
        onClose: () => {
          setModalOpen(false);
          setForm(defaultForm);
        },
        title: "Add Compliance Task",
        submitLabel: "Create Task",
        isSubmitting: createTask.isPending,
        onSubmit: handleCreate,
        size: "lg",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ct-title", children: [
              "Task Title ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ct-title",
                placeholder: "e.g. Dust suppression compliance check",
                value: form.title,
                onChange: (e) => setForm({ ...form, title: e.target.value }),
                "data-ocid": "compliance.create.title.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ct-type", children: [
              "Task Type ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.taskType,
                onValueChange: (v) => setForm({ ...form, taskType: v }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "ct-type",
                      "data-ocid": "compliance.create.type.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: TaskType.EC, children: "EC — Environmental Clearance" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: TaskType.CTO, children: "CTO — Consent to Operate" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: TaskType.CTE, children: "CTE — Consent to Establish" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ct-due", children: [
              "Due Date ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ct-due",
                type: "date",
                value: form.dueDate,
                onChange: (e) => setForm({ ...form, dueDate: e.target.value }),
                "data-ocid": "compliance.create.due_date.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ct-ro", children: [
              "Responsible Officer (RO)",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ct-ro",
                placeholder: "Officer name",
                value: form.responsibleOfficer,
                onChange: (e) => setForm({ ...form, responsibleOfficer: e.target.value }),
                "data-ocid": "compliance.create.officer.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ct-condition", children: "Condition Text" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "ct-condition",
                placeholder: "Describe the EC/CTO/CTE condition to be fulfilled…",
                rows: 3,
                value: form.conditionText,
                onChange: (e) => setForm({ ...form, conditionText: e.target.value }),
                "data-ocid": "compliance.create.condition.textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ct-notes", children: "Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "ct-notes",
                placeholder: "Additional notes or remarks…",
                rows: 2,
                value: form.notes,
                onChange: (e) => setForm({ ...form, notes: e.target.value }),
                "data-ocid": "compliance.create.notes.textarea"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormModal,
      {
        open: confirmDeleteId !== null,
        onClose: () => setConfirmDeleteId(null),
        title: "Delete Compliance Task",
        submitLabel: "Delete Task",
        isSubmitting: deleteTask.isPending,
        onSubmit: handleConfirmDelete,
        size: "sm",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "compliance.delete.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: "Are you sure you want to delete this compliance task? This action cannot be undone." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TriangleAlert,
              {
                size: 14,
                className: "text-destructive flex-shrink-0"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive font-medium", children: "All task history and conditions will be permanently removed." })
          ] })
        ] })
      }
    )
  ] });
}
export {
  CompliancePage as default
};
