import { TableSkeleton } from "@/components/LoadingSpinner";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useComplianceTasks, useDashboardStats } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import type { ComplianceTask } from "@/types/index";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Droplets,
  FileBarChart,
  ListChecks,
  ShieldAlert,
  ShieldCheck,
  Trees,
  Wind,
} from "lucide-react";

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  barColor,
  subLabel,
  href,
  ocid,
}: {
  label: string;
  value: bigint | number | undefined;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  barColor: string;
  subLabel?: string;
  href: string;
  ocid: string;
}) {
  return (
    <Link to={href} data-ocid={ocid}>
      <Card className="border-border hover:shadow-elevated transition-smooth cursor-pointer group relative overflow-hidden">
        <div
          className={cn("absolute inset-y-0 left-0 w-1 rounded-l-lg", barColor)}
        />
        <CardContent className="pl-5 pr-4 py-4 flex items-center gap-4">
          <div
            className={cn(
              "h-11 w-11 rounded-xl flex items-center justify-center shrink-0",
              iconBg,
            )}
          >
            <Icon size={20} className={iconColor} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-2xl font-display font-bold text-foreground leading-none tabular-nums">
              {value !== undefined ? value.toString() : "—"}
            </p>
            <p className="text-xs text-muted-foreground mt-1 truncate">
              {label}
            </p>
            {subLabel && (
              <p className="text-[10px] text-muted-foreground/70 mt-0.5 truncate">
                {subLabel}
              </p>
            )}
          </div>
          <ChevronRight
            size={14}
            className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0"
          />
        </CardContent>
      </Card>
    </Link>
  );
}

// ─── Status Breakdown Bar ────────────────────────────────────────────────────

function StatusBreakdownBar({
  pending,
  inProgress,
  completed,
  overdue,
}: {
  pending: bigint;
  inProgress: bigint;
  completed: bigint;
  overdue: bigint;
}) {
  const total =
    Number(pending) + Number(inProgress) + Number(completed) + Number(overdue);
  if (total === 0) return null;

  const pct = (n: bigint) => (total > 0 ? (Number(n) / total) * 100 : 0);

  const segments = [
    {
      label: "Completed",
      value: completed,
      color: "bg-green-500",
      pct: pct(completed),
    },
    {
      label: "In Progress",
      value: inProgress,
      color: "bg-amber-500",
      pct: pct(inProgress),
    },
    {
      label: "Overdue",
      value: overdue,
      color: "bg-red-500",
      pct: pct(overdue),
    },
    {
      label: "Pending",
      value: pending,
      color: "bg-muted-foreground/40",
      pct: pct(pending),
    },
  ];

  return (
    <div className="space-y-3" data-ocid="dashboard.status_breakdown.section">
      {/* Stacked bar */}
      <div className="flex rounded-full overflow-hidden h-3 bg-muted gap-px">
        {segments.map((s) =>
          s.pct > 0 ? (
            <div
              key={s.label}
              className={cn("h-full transition-all duration-700", s.color)}
              style={{ width: `${s.pct}%` }}
              title={`${s.label}: ${s.value.toString()}`}
            />
          ) : null,
        )}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <div className={cn("h-2.5 w-2.5 rounded-full shrink-0", s.color)} />
            <span className="text-xs text-muted-foreground">
              {s.label}{" "}
              <span className="font-semibold text-foreground tabular-nums">
                {s.value.toString()}
              </span>
            </span>
          </div>
        ))}
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-xs text-muted-foreground">
            Total{" "}
            <span className="font-semibold text-foreground tabular-nums">
              {total}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Status Banner ────────────────────────────────────────────────────────────

function StatusBanner({ overdue }: { overdue: bigint }) {
  const hasOverdue = Number(overdue) > 0;
  return (
    <div
      data-ocid="dashboard.status_banner"
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 py-3 border",
        hasOverdue
          ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
          : "bg-green-500/10 border-green-500/30 text-green-400",
      )}
    >
      {hasOverdue ? (
        <ShieldAlert size={18} className="shrink-0" />
      ) : (
        <ShieldCheck size={18} className="shrink-0" />
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">
          {hasOverdue ? "Action Required" : "All Clear"}
        </p>
        <p className="text-xs opacity-80 mt-0.5">
          {hasOverdue
            ? `${overdue.toString()} compliance task${Number(overdue) > 1 ? "s are" : " is"} overdue — immediate attention needed`
            : "All compliance tasks are on track. No overdue items."}
        </p>
      </div>
      {hasOverdue && (
        <Link
          to="/compliance"
          className="shrink-0 text-xs font-semibold underline underline-offset-2 hover:opacity-80"
          data-ocid="dashboard.status_banner.compliance_link"
        >
          Review →
        </Link>
      )}
    </div>
  );
}

// ─── Upcoming Deadline Row ────────────────────────────────────────────────────

function DeadlineRow({ task, index }: { task: ComplianceTask; index: number }) {
  const dueDate = new Date(Number(task.dueDate) / 1_000_000);
  const now = new Date();
  const diffDays = Math.ceil(
    (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  const status = task.status as unknown as string;
  const statusVariant =
    status === "Overdue"
      ? "Overdue"
      : status === "InProgress"
        ? "InProgress"
        : status === "Completed"
          ? "Completed"
          : "Pending";

  const dueLabelColor =
    diffDays < 0
      ? "text-red-400"
      : diffDays <= 7
        ? "text-amber-400"
        : "text-muted-foreground";

  const dueLabel =
    diffDays < 0
      ? `${Math.abs(diffDays)}d overdue`
      : diffDays === 0
        ? "Due today"
        : diffDays === 1
          ? "Due tomorrow"
          : `Due in ${diffDays}d`;

  return (
    <Link
      to="/compliance/$taskId"
      params={{ taskId: task.id.toString() }}
      className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-smooth border-b border-border/60 last:border-0 group"
      data-ocid={`dashboard.upcoming_task.item.${index}`}
    >
      <div
        className={cn(
          "w-1 self-stretch rounded-full shrink-0",
          statusVariant === "Overdue"
            ? "bg-red-500"
            : statusVariant === "InProgress"
              ? "bg-amber-500"
              : statusVariant === "Completed"
                ? "bg-green-500"
                : "bg-border",
        )}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
          {task.title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          {task.taskType as unknown as string}
          {task.responsibleOfficer ? ` · RO: ${task.responsibleOfficer}` : ""}
        </p>
      </div>
      <div className="shrink-0 flex flex-col items-end gap-1">
        <StatusBadge status={statusVariant} size="sm" />
        <span
          className={cn("text-[10px] font-medium tabular-nums", dueLabelColor)}
        >
          {dueLabel}
        </span>
      </div>
      <ChevronRight size={14} className="text-muted-foreground shrink-0" />
    </Link>
  );
}

// ─── Quick Link Card ──────────────────────────────────────────────────────────

function QuickLinkCard({
  href,
  icon: Icon,
  label,
  description,
  iconBg,
  iconColor,
  ocid,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  iconBg: string;
  iconColor: string;
  ocid: string;
}) {
  return (
    <Link to={href} data-ocid={ocid}>
      <Card className="border-border hover:shadow-elevated transition-smooth cursor-pointer group h-full">
        <CardContent className="p-4 flex flex-col gap-3">
          <div
            className={cn(
              "h-10 w-10 rounded-lg flex items-center justify-center",
              iconBg,
            )}
          >
            <Icon size={18} className={iconColor} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {label}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-primary mt-auto">
            Open <ChevronRight size={12} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: tasks, isLoading: tasksLoading } = useComplianceTasks();

  const overdueCount = stats?.taskCounts.overdue ?? BigInt(0);
  const inProgressCount = stats?.taskCounts.inProgress ?? BigInt(0);
  const completedCount = stats?.taskCounts.completed ?? BigInt(0);
  const pendingCount = stats?.taskCounts.pending ?? BigInt(0);
  const totalTasks =
    Number(overdueCount) +
    Number(inProgressCount) +
    Number(completedCount) +
    Number(pendingCount);

  // Upcoming: non-completed tasks sorted by dueDate ascending, top 5
  const upcomingTasks: ComplianceTask[] = tasks
    ? [...tasks]
        .filter((t) => {
          const s = t.status as unknown as string;
          return s !== "Completed";
        })
        .sort((a, b) => Number(a.dueDate) - Number(b.dueDate))
        .slice(0, 5)
    : [];

  return (
    <div className="p-4 lg:p-6 space-y-6" data-ocid="dashboard.page">
      <PageHeader
        title="Environmental Compliance Dashboard"
        subtitle="Coal Mine Operations — Real-time compliance & environmental status"
      />

      {/* Status Banner */}
      {!statsLoading && <StatusBanner overdue={overdueCount} />}
      {statsLoading && (
        <div className="h-14 rounded-lg bg-muted animate-pulse" />
      )}

      {/* KPI Cards */}
      <section data-ocid="dashboard.kpi.section">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Key Performance Indicators
        </h2>
        {statsLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((k) => (
              <div
                key={k}
                className="h-[72px] rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard
              label="Total Tasks"
              value={totalTasks}
              icon={ListChecks}
              iconBg="bg-primary/15"
              iconColor="text-primary"
              barColor="bg-primary"
              subLabel={`${completedCount.toString()} completed`}
              href="/compliance"
              ocid="dashboard.total_tasks.card"
            />
            <KpiCard
              label="Overdue Tasks"
              value={overdueCount}
              icon={AlertTriangle}
              iconBg="bg-red-500/15"
              iconColor="text-red-400"
              barColor="bg-red-500"
              subLabel="Require immediate action"
              href="/compliance"
              ocid="dashboard.overdue_tasks.card"
            />
            <KpiCard
              label="Trees Planted"
              value={stats?.totalTreesPlanted}
              icon={Trees}
              iconBg="bg-green-500/15"
              iconColor="text-green-400"
              barColor="bg-green-500"
              subLabel="Environmental restoration"
              href="/trees"
              ocid="dashboard.total_trees.card"
            />
            <KpiCard
              label="Monitoring Readings"
              value={
                (stats?.recentAirReadingsCount ?? BigInt(0)) +
                (stats?.recentPiezoReadingsCount ?? BigInt(0))
              }
              icon={BarChart3}
              iconBg="bg-blue-500/15"
              iconColor="text-blue-400"
              barColor="bg-blue-500"
              subLabel="Last 30 days (Air + Piezo)"
              href="/monitoring/air"
              ocid="dashboard.recent_readings.card"
            />
          </div>
        )}
      </section>

      {/* Compliance Status Breakdown */}
      <section data-ocid="dashboard.breakdown.section">
        <Card className="border-border">
          <CardHeader className="px-4 py-3 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <BarChart3 size={15} className="text-primary" />
                Compliance Status Breakdown
              </CardTitle>
              <Link
                to="/compliance"
                className="text-xs text-primary hover:underline"
                data-ocid="dashboard.breakdown.view_all.link"
              >
                View all →
              </Link>
            </div>
          </CardHeader>
          <CardContent className="px-4 py-4">
            {statsLoading ? (
              <div className="space-y-2">
                <div className="h-3 rounded-full bg-muted animate-pulse" />
                <div className="flex gap-4">
                  {[1, 2, 3, 4].map((k) => (
                    <div
                      key={k}
                      className="h-4 w-20 rounded bg-muted animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <StatusBreakdownBar
                pending={pendingCount}
                inProgress={inProgressCount}
                completed={completedCount}
                overdue={overdueCount}
              />
            )}
          </CardContent>
        </Card>
      </section>

      {/* Main content: Upcoming Deadlines + Monitoring + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Upcoming Deadlines */}
        <div className="lg:col-span-2">
          <Card className="border-border">
            <CardHeader className="px-4 py-3 border-b border-border">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Clock size={15} className="text-amber-400" />
                  Upcoming Deadlines
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0 h-4"
                  >
                    Next 5
                  </Badge>
                </CardTitle>
                <Link
                  to="/compliance"
                  className="text-xs text-primary hover:underline"
                  data-ocid="dashboard.view_all_tasks.link"
                >
                  View all →
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {tasksLoading ? (
                <div className="p-4">
                  <TableSkeleton rows={5} />
                </div>
              ) : upcomingTasks.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center py-12 text-center"
                  data-ocid="dashboard.upcoming_empty_state"
                >
                  <CheckCircle2 size={32} className="text-green-400 mb-3" />
                  <p className="text-sm font-medium text-foreground">
                    No pending deadlines
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    All active compliance tasks are completed
                  </p>
                  <Link
                    to="/compliance"
                    className="mt-3 text-xs text-primary hover:underline"
                    data-ocid="dashboard.create_task.link"
                  >
                    Manage Compliance Tasks →
                  </Link>
                </div>
              ) : (
                upcomingTasks.map((task, i) => (
                  <DeadlineRow
                    key={task.id.toString()}
                    task={task}
                    index={i + 1}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column: Monitoring Summary + Quick Links */}
        <div className="space-y-4">
          {/* Monitoring Summary */}
          <div>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Monitoring Summary
            </h2>
            <div className="space-y-2">
              <Link
                to="/monitoring/air"
                data-ocid="dashboard.air_monitoring.card"
              >
                <Card className="border-border hover:shadow-elevated transition-smooth cursor-pointer">
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-md bg-primary/15 text-primary flex items-center justify-center shrink-0">
                      <Wind size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        Air Quality
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {statsLoading
                          ? "Loading…"
                          : `${stats?.recentAirReadingsCount.toString() ?? 0} readings (30d)`}
                      </p>
                    </div>
                    <ChevronRight
                      size={14}
                      className="text-muted-foreground shrink-0"
                    />
                  </CardContent>
                </Card>
              </Link>
              <Link
                to="/monitoring/piezometer"
                data-ocid="dashboard.piezometer.card"
              >
                <Card className="border-border hover:shadow-elevated transition-smooth cursor-pointer">
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-md bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                      <Droplets size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        Piezometer
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {statsLoading
                          ? "Loading…"
                          : `${stats?.recentPiezoReadingsCount.toString() ?? 0} readings (30d)`}
                      </p>
                    </div>
                    <ChevronRight
                      size={14}
                      className="text-muted-foreground shrink-0"
                    />
                  </CardContent>
                </Card>
              </Link>
              <Link to="/trees" data-ocid="dashboard.trees.card">
                <Card className="border-border hover:shadow-elevated transition-smooth cursor-pointer">
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-md bg-green-500/15 text-green-400 flex items-center justify-center shrink-0">
                      <Trees size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        Planted Trees
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {statsLoading
                          ? "Loading…"
                          : `${stats?.totalTreesPlanted.toString() ?? 0} total trees`}
                      </p>
                    </div>
                    <ChevronRight
                      size={14}
                      className="text-muted-foreground shrink-0"
                    />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Quick Access
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <QuickLinkCard
                href="/compliance"
                icon={ClipboardCheck}
                label="Compliance"
                description="EC & CTO conditions"
                iconBg="bg-primary/15"
                iconColor="text-primary"
                ocid="dashboard.quick_compliance.link"
              />
              <QuickLinkCard
                href="/monitoring/air"
                icon={Wind}
                label="Air Monitor"
                description="PM & dust readings"
                iconBg="bg-primary/15"
                iconColor="text-primary"
                ocid="dashboard.quick_air.link"
              />
              <QuickLinkCard
                href="/monitoring/piezometer"
                icon={Droplets}
                label="Piezometer"
                description="Groundwater levels"
                iconBg="bg-blue-500/15"
                iconColor="text-blue-400"
                ocid="dashboard.quick_piezo.link"
              />
              <QuickLinkCard
                href="/reports"
                icon={FileBarChart}
                label="Reports"
                description="Compliance reports"
                iconBg="bg-amber-500/15"
                iconColor="text-amber-400"
                ocid="dashboard.quick_reports.link"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
