import { PageLoading } from "@/components/LoadingSpinner";
import { PageHeader } from "@/components/PageHeader";
import { StatusAccentBar, StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  TaskStatus,
  useComplianceTask,
  useDeleteTask,
  useUpdateTask,
} from "@/hooks/useBackend";
import type { StatusVariant } from "@/types/index";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  RefreshCw,
  Tag,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: TaskStatus.Pending, label: "Pending" },
  { value: TaskStatus.InProgress, label: "In Progress" },
  { value: TaskStatus.Completed, label: "Completed" },
  { value: TaskStatus.Overdue, label: "Overdue" },
];

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

const taskTypeConfig: Record<
  string,
  { label: string; color: string; fullName: string }
> = {
  EC: {
    label: "EC",
    fullName: "Environmental Clearance",
    color:
      "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30",
  },
  CTO: {
    label: "CTO",
    fullName: "Consent to Operate",
    color:
      "bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30",
  },
  CTE: {
    label: "CTE",
    fullName: "Consent to Establish",
    color:
      "bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30",
  },
};

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// ─── Detail row subcomponent ──────────────────────────────────────────────────

function DetailRow({
  icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border/50 last:border-0">
      <span className="text-muted-foreground mt-0.5 flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p
          className={`text-sm font-medium text-foreground break-words ${mono ? "font-mono" : ""}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ComplianceDetailPage() {
  const { taskId } = useParams({ from: "/compliance/$taskId" });
  const navigate = useNavigate();
  const taskBigInt = BigInt(taskId);

  const { data: task, isLoading } = useComplianceTask(taskBigInt);
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [newStatus, setNewStatus] = useState<TaskStatus | "">("");
  const [notes, setNotes] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (isLoading) return <PageLoading />;

  if (!task) {
    return (
      <div
        className="p-6 flex flex-col items-center justify-center min-h-64 text-center"
        data-ocid="compliance_detail.error_state"
      >
        <AlertTriangle size={32} className="text-muted-foreground mb-3" />
        <p className="text-sm font-medium text-foreground">Task not found</p>
        <p className="text-xs text-muted-foreground mt-1 mb-4">
          This compliance task may have been deleted.
        </p>
        <Link
          to="/compliance"
          className="text-primary text-sm hover:underline"
          data-ocid="compliance_detail.back.link"
        >
          ← Back to compliance list
        </Link>
      </div>
    );
  }

  const statusVariant = getStatusVariant(task.status);
  const typeConf = taskTypeConfig[task.taskType] ?? taskTypeConfig.EC;
  const isOverdue = statusVariant === "Overdue";

  async function handleUpdate() {
    if (!newStatus) {
      toast.error("Please select a new status");
      return;
    }
    try {
      await updateTask.mutateAsync({
        id: task!.id,
        req: { status: newStatus, notes },
      });
      toast.success("Task updated successfully");
      setNewStatus("");
      setNotes("");
    } catch {
      toast.error("Failed to update task");
    }
  }

  async function handleDelete() {
    try {
      await deleteTask.mutateAsync(task!.id);
      toast.success("Compliance task deleted");
      void navigate({ to: "/compliance" });
    } catch {
      toast.error("Failed to delete task");
    }
  }

  return (
    <div
      className="p-4 lg:p-6 space-y-5 max-w-4xl"
      data-ocid="compliance_detail.page"
    >
      {/* Back nav */}
      <Link
        to="/compliance"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        data-ocid="compliance_detail.back.link"
      >
        <ArrowLeft size={14} />
        Back to Compliance Tasks
      </Link>

      {/* Header with prominent status accent */}
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
        {/* Status accent banner */}
        <div
          className={`h-1.5 w-full ${
            isOverdue
              ? "bg-red-500"
              : statusVariant === "InProgress"
                ? "bg-amber-500"
                : statusVariant === "Completed"
                  ? "bg-green-500"
                  : "bg-border"
          }`}
        />
        <div className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${typeConf.color}`}
                >
                  {typeConf.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {typeConf.fullName}
                </span>
                {isOverdue && (
                  <span className="flex items-center gap-1 text-xs text-red-500 font-semibold animate-pulse">
                    <AlertTriangle size={11} />
                    OVERDUE
                  </span>
                )}
              </div>
              <h1 className="text-xl font-display font-bold text-foreground leading-tight break-words">
                {task.title}
              </h1>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <StatusBadge status={statusVariant} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column: Details + condition + notes */}
        <div className="lg:col-span-2 space-y-5">
          {/* Task metadata */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-0 pt-4 px-4">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                Task Details
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-2">
              <DetailRow
                icon={<Calendar size={14} />}
                label="Due Date"
                value={
                  <span
                    className={isOverdue ? "text-red-500 font-semibold" : ""}
                  >
                    {formatDate(task.dueDate)}
                    {isOverdue && (
                      <span className="ml-2 text-[10px] text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded-full">
                        OVERDUE
                      </span>
                    )}
                  </span>
                }
              />
              <DetailRow
                icon={<User size={14} />}
                label="Responsible Officer (RO)"
                value={task.responsibleOfficer}
              />
              <DetailRow
                icon={<Tag size={14} />}
                label="Task Type / Permit"
                value={
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${typeConf.color}`}
                  >
                    {typeConf.label} — {typeConf.fullName}
                  </span>
                }
              />
              <DetailRow
                icon={<Clock size={14} />}
                label="Created At"
                value={formatDate(task.createdAt)}
              />
              <DetailRow
                icon={<RefreshCw size={14} />}
                label="Last Updated"
                value={formatDate(task.updatedAt)}
              />
            </CardContent>
          </Card>

          {/* Condition text */}
          {task.conditionText && (
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <FileText size={12} />
                  Condition Text
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {task.conditionText}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          {task.notes && (
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <MessageSquare size={12} />
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {task.notes}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column: Update + Delete */}
        <div className="space-y-4">
          {/* Update status card */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                <CheckCircle size={12} />
                Update Status
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="newStatus" className="text-xs">
                  New Status
                </Label>
                <Select
                  value={newStatus}
                  onValueChange={(v) => setNewStatus(v as TaskStatus)}
                >
                  <SelectTrigger
                    id="newStatus"
                    className="h-8 text-xs"
                    data-ocid="compliance_detail.status.select"
                  >
                    <SelectValue placeholder="Select new status…" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="updateNotes" className="text-xs">
                  Update Notes
                </Label>
                <Textarea
                  id="updateNotes"
                  rows={3}
                  placeholder="Add update remarks…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="text-xs resize-none"
                  data-ocid="compliance_detail.notes.textarea"
                />
              </div>
              <Button
                size="sm"
                onClick={handleUpdate}
                disabled={updateTask.isPending || !newStatus}
                className="w-full"
                data-ocid="compliance_detail.update.submit_button"
              >
                {updateTask.isPending ? (
                  <>
                    <RefreshCw size={12} className="mr-1.5 animate-spin" />
                    Updating…
                  </>
                ) : (
                  "Save Update"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Danger zone */}
          <Card className="border-destructive/30 shadow-sm">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-xs font-semibold text-destructive/80 uppercase tracking-widest">
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              {!showDeleteConfirm ? (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Permanently delete this compliance task and all associated
                    data.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-destructive/40 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => setShowDeleteConfirm(true)}
                    data-ocid="compliance_detail.delete_button"
                  >
                    <Trash2 size={13} className="mr-1.5" />
                    Delete Task
                  </Button>
                </div>
              ) : (
                <div
                  className="space-y-3"
                  data-ocid="compliance_detail.delete.dialog"
                >
                  <div className="flex items-start gap-2 p-2.5 rounded bg-destructive/10 border border-destructive/20">
                    <AlertTriangle
                      size={13}
                      className="text-destructive flex-shrink-0 mt-0.5"
                    />
                    <p className="text-xs text-destructive font-medium">
                      This action cannot be undone. The task will be permanently
                      deleted.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => setShowDeleteConfirm(false)}
                      disabled={deleteTask.isPending}
                      data-ocid="compliance_detail.delete.cancel_button"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1 text-xs"
                      onClick={handleDelete}
                      disabled={deleteTask.isPending}
                      data-ocid="compliance_detail.delete.confirm_button"
                    >
                      {deleteTask.isPending ? "Deleting…" : "Confirm Delete"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
