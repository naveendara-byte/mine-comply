import { FormModal } from "@/components/FormModal";
import { TableSkeleton } from "@/components/LoadingSpinner";
import { PageHeader } from "@/components/PageHeader";
import { StatusAccentBar, StatusBadge } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  TaskStatus,
  useComplianceTasks,
  useCreateTask,
  useDeleteTask,
} from "@/hooks/useBackend";
import type { ComplianceTask, CreateTaskRequest } from "@/types/index";
import type { StatusVariant } from "@/types/index";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Calendar,
  ChevronRight,
  ClipboardList,
  Plus,
  SortAsc,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TaskType } from "../backend";

// ─── Types & constants ────────────────────────────────────────────────────────

type StatusFilter = "all" | "Overdue" | "InProgress" | "Pending" | "Completed";
type TypeFilter = "all" | "EC" | "CTO" | "CTE";

const statusTabs: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "Overdue", label: "Overdue" },
  { value: "InProgress", label: "In Progress" },
  { value: "Pending", label: "Pending" },
  { value: "Completed", label: "Completed" },
];

const taskTypeConfig: Record<string, { label: string; color: string }> = {
  EC: {
    label: "EC",
    color:
      "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30",
  },
  CTO: {
    label: "CTO",
    color:
      "bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30",
  },
  CTE: {
    label: "CTE",
    color:
      "bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30",
  },
};

const rowBgConfig: Record<string, string> = {
  Overdue: "bg-red-500/5 hover:bg-red-500/10",
  InProgress: "bg-amber-500/5 hover:bg-amber-500/10",
  Completed: "hover:bg-muted/30",
  Pending: "hover:bg-muted/30",
};

function getStatusVariant(status: TaskStatus): StatusVariant {
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

const defaultForm: Omit<CreateTaskRequest, "dueDate"> & { dueDate: string } = {
  title: "",
  taskType: TaskType.EC,
  conditionText: "",
  dueDate: "",
  responsibleOfficer: "",
  notes: "",
};

// ─── TaskRow component ────────────────────────────────────────────────────────

function TaskRow({
  task,
  index,
  onDelete,
}: {
  task: ComplianceTask;
  index: number;
  onDelete: (id: bigint) => void;
}) {
  const statusVariant = getStatusVariant(task.status);
  const dueDate = new Date(Number(task.dueDate) / 1_000_000);
  const isOverdue = statusVariant === "Overdue";
  const typeConf = taskTypeConfig[task.taskType] ?? taskTypeConfig.EC;

  return (
    <div
      className={`relative flex items-stretch gap-0 border-b border-border/50 last:border-0 transition-smooth ${rowBgConfig[statusVariant]}`}
      data-ocid={`compliance.task.item.${index}`}
    >
      {/* Left accent bar */}
      <StatusAccentBar
        status={statusVariant}
        className="w-1 flex-shrink-0 rounded-l"
      />

      <div className="flex-1 flex items-center gap-3 px-4 py-3 min-w-0">
        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to="/compliance/$taskId"
              params={{ taskId: task.id.toString() }}
              className="text-sm font-semibold text-foreground hover:text-primary transition-colors truncate"
              data-ocid={`compliance.task.link.${index}`}
            >
              {task.title}
            </Link>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${typeConf.color}`}
            >
              {typeConf.label}
            </span>
            {isOverdue && (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-red-500 font-semibold">
                <AlertTriangle size={10} />
                OVERDUE
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar size={11} />
              {dueDate.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <User size={11} />
              {task.responsibleOfficer}
            </span>
          </div>
        </div>

        {/* Status badge */}
        <StatusBadge
          status={statusVariant}
          size="sm"
          className="flex-shrink-0"
        />

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive transition-colors"
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
            data-ocid={`compliance.task.delete_button.${index}`}
          >
            <Trash2 size={13} />
          </Button>
          <Link
            to="/compliance/$taskId"
            params={{ taskId: task.id.toString() }}
            className="flex items-center justify-center h-7 w-7 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="View task details"
          >
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CompliancePage() {
  const { data: tasks, isLoading } = useComplianceTasks();
  const createTask = useCreateTask();
  const deleteTask = useDeleteTask();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [confirmDeleteId, setConfirmDeleteId] = useState<bigint | null>(null);

  // Filter + sort (soonest due date first)
  const filtered = (tasks ?? [])
    .filter((t) => {
      const statusMatch =
        statusFilter === "all" || t.status === (statusFilter as TaskStatus);
      const typeMatch =
        typeFilter === "all" || t.taskType === (typeFilter as TaskType);
      return statusMatch && typeMatch;
    })
    .sort((a, b) => Number(a.dueDate) - Number(b.dueDate));

  async function handleCreate() {
    if (!form.title || !form.dueDate || !form.responsibleOfficer) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await createTask.mutateAsync({
        title: form.title,
        taskType: form.taskType,
        conditionText: form.conditionText,
        dueDate: BigInt(new Date(form.dueDate).getTime() * 1_000_000),
        responsibleOfficer: form.responsibleOfficer,
        notes: form.notes,
      });
      toast.success("Compliance task created successfully");
      setModalOpen(false);
      setForm(defaultForm);
    } catch {
      toast.error("Failed to create task");
    }
  }

  async function handleConfirmDelete() {
    if (!confirmDeleteId) return;
    try {
      await deleteTask.mutateAsync(confirmDeleteId);
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete task");
    } finally {
      setConfirmDeleteId(null);
    }
  }

  const overdueCount = (tasks ?? []).filter(
    (t) => t.status === TaskStatus.Overdue,
  ).length;

  return (
    <div className="p-4 lg:p-6 space-y-5" data-ocid="compliance.page">
      <PageHeader
        title="Compliance Tasks"
        subtitle="EC / CTO / CTE conditions with status tracking against RO"
        actions={
          <div className="flex items-center gap-2">
            {overdueCount > 0 && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-red-500 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">
                <AlertTriangle size={11} />
                {overdueCount} Overdue
              </span>
            )}
            <Button
              size="sm"
              onClick={() => setModalOpen(true)}
              data-ocid="compliance.add_task.open_modal_button"
            >
              <Plus size={14} className="mr-1.5" />
              Add Task
            </Button>
          </div>
        }
      />

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Status tabs */}
        <Tabs
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as StatusFilter)}
          className="flex-1"
        >
          <TabsList className="bg-muted/50 h-8 gap-0.5 flex-wrap">
            {statusTabs.map((tab) => {
              const count =
                tab.value === "all"
                  ? (tasks?.length ?? 0)
                  : (tasks ?? []).filter(
                      (t) => t.status === (tab.value as TaskStatus),
                    ).length;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="text-xs h-7 px-3 gap-1.5"
                  data-ocid={`compliance.filter.${tab.value}.tab`}
                >
                  {tab.label}
                  <span className="bg-background/70 text-muted-foreground text-[10px] px-1 rounded-sm font-mono">
                    {count}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Type filter */}
        <Select
          value={typeFilter}
          onValueChange={(v) => setTypeFilter(v as TypeFilter)}
        >
          <SelectTrigger
            className="h-8 w-36 text-xs"
            data-ocid="compliance.type_filter.select"
          >
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="EC">EC — Environmental Clearance</SelectItem>
            <SelectItem value="CTO">CTO — Consent to Operate</SelectItem>
            <SelectItem value="CTE">CTE — Consent to Establish</SelectItem>
          </SelectContent>
        </Select>

        <span className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
          <SortAsc size={12} />
          Sorted by due date
        </span>
      </div>

      {/* Task list */}
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-4">
            <TableSkeleton rows={6} />
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="compliance.empty_state"
          >
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
              <ClipboardList size={24} className="text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              No tasks found
            </p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              {statusFilter !== "all" || typeFilter !== "all"
                ? "Try clearing the filters to see all tasks"
                : "Add your first compliance task to get started"}
            </p>
            {(statusFilter !== "all" || typeFilter !== "all") && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setStatusFilter("all");
                  setTypeFilter("all");
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Column header */}
            <div className="flex items-center gap-3 px-5 py-2 bg-muted/40 border-b border-border text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              <div className="flex-1">Task / Condition</div>
              <div className="w-20 text-right hidden sm:block">Status</div>
              <div className="w-16" />
            </div>
            {filtered.map((task, i) => (
              <TaskRow
                key={task.id.toString()}
                task={task}
                index={i + 1}
                onDelete={(id) => setConfirmDeleteId(id)}
              />
            ))}
          </>
        )}
      </div>

      {/* Result summary */}
      {!isLoading && filtered.length > 0 && (
        <p className="text-xs text-muted-foreground text-right">
          Showing {filtered.length} of {tasks?.length ?? 0} tasks
        </p>
      )}

      {/* Create task modal */}
      <FormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setForm(defaultForm);
        }}
        title="Add Compliance Task"
        submitLabel="Create Task"
        isSubmitting={createTask.isPending}
        onSubmit={handleCreate}
        size="lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="ct-title">
              Task Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ct-title"
              placeholder="e.g. Dust suppression compliance check"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              data-ocid="compliance.create.title.input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ct-type">
              Task Type <span className="text-destructive">*</span>
            </Label>
            <Select
              value={form.taskType}
              onValueChange={(v) =>
                setForm({ ...form, taskType: v as TaskType })
              }
            >
              <SelectTrigger
                id="ct-type"
                data-ocid="compliance.create.type.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TaskType.EC}>
                  EC — Environmental Clearance
                </SelectItem>
                <SelectItem value={TaskType.CTO}>
                  CTO — Consent to Operate
                </SelectItem>
                <SelectItem value={TaskType.CTE}>
                  CTE — Consent to Establish
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ct-due">
              Due Date <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ct-due"
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              data-ocid="compliance.create.due_date.input"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="ct-ro">
              Responsible Officer (RO){" "}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ct-ro"
              placeholder="Officer name"
              value={form.responsibleOfficer}
              onChange={(e) =>
                setForm({ ...form, responsibleOfficer: e.target.value })
              }
              data-ocid="compliance.create.officer.input"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="ct-condition">Condition Text</Label>
            <Textarea
              id="ct-condition"
              placeholder="Describe the EC/CTO/CTE condition to be fulfilled…"
              rows={3}
              value={form.conditionText}
              onChange={(e) =>
                setForm({ ...form, conditionText: e.target.value })
              }
              data-ocid="compliance.create.condition.textarea"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="ct-notes">Notes</Label>
            <Textarea
              id="ct-notes"
              placeholder="Additional notes or remarks…"
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              data-ocid="compliance.create.notes.textarea"
            />
          </div>
        </div>
      </FormModal>

      {/* Delete confirmation modal */}
      <FormModal
        open={confirmDeleteId !== null}
        onClose={() => setConfirmDeleteId(null)}
        title="Delete Compliance Task"
        submitLabel="Delete Task"
        isSubmitting={deleteTask.isPending}
        onSubmit={handleConfirmDelete}
        size="sm"
      >
        <div className="space-y-3" data-ocid="compliance.delete.dialog">
          <p className="text-sm text-foreground">
            Are you sure you want to delete this compliance task? This action
            cannot be undone.
          </p>
          <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20">
            <AlertTriangle
              size={14}
              className="text-destructive flex-shrink-0"
            />
            <p className="text-xs text-destructive font-medium">
              All task history and conditions will be permanently removed.
            </p>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
