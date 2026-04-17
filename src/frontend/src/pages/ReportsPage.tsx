import type {
  AirParameter,
  AirQualityReading,
  ComplianceTask,
  PiezometerReading,
  TreeRecord,
} from "@/backend";
import { TaskStatus } from "@/backend";
import { TableSkeleton } from "@/components/LoadingSpinner";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAirReadings,
  useComplianceTasks,
  usePiezoReadings,
  useTreeRecords,
} from "@/hooks/useBackend";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Clock,
  Droplets,
  FileText,
  Printer,
  TreePine,
  Wind,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function tsToDate(ts: bigint): Date {
  return new Date(Number(ts / 1_000_000n));
}

function formatDate(ts: bigint): string {
  return tsToDate(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatAirParam(param: AirParameter): string {
  if (param.__kind__ === "Other") return param.Other;
  return param.__kind__.replace("_", ".");
}

function inMonth(ts: bigint, year: number, month: number): boolean {
  const d = tsToDate(ts);
  return d.getFullYear() === year && d.getMonth() === month;
}

function StatusBadge({ status }: { status: TaskStatus }) {
  const cfg = {
    [TaskStatus.Completed]: {
      label: "Completed",
      cls: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
    [TaskStatus.InProgress]: {
      label: "In Progress",
      cls: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
      icon: <Clock className="w-3 h-3" />,
    },
    [TaskStatus.Overdue]: {
      label: "Overdue",
      cls: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
      icon: <XCircle className="w-3 h-3" />,
    },
    [TaskStatus.Pending]: {
      label: "Pending",
      cls: "bg-muted text-muted-foreground border-border",
      icon: <AlertTriangle className="w-3 h-3" />,
    },
  };
  const c = cfg[status];
  return (
    <Badge
      variant="outline"
      className={`flex items-center gap-1 text-xs font-semibold whitespace-nowrap ${c.cls}`}
    >
      {c.icon}
      {c.label}
    </Badge>
  );
}

function SectionHeading({
  icon,
  title,
  count,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-primary">{icon}</span>
      <h2 className="font-display font-bold text-sm text-foreground tracking-tight">
        {title}
      </h2>
      <Badge variant="secondary" className="ml-auto text-xs tabular-nums">
        {count} record{count !== 1 ? "s" : ""}
      </Badge>
    </div>
  );
}

function EmptyRow({
  cols,
  message,
  ocid,
}: {
  cols: number;
  message: string;
  ocid: string;
}) {
  return (
    <TableRow>
      <TableCell
        colSpan={cols}
        className="text-center text-muted-foreground text-sm py-10"
        data-ocid={ocid}
      >
        {message}
      </TableCell>
    </TableRow>
  );
}

// ─── Compliance Section ───────────────────────────────────────────────────────

function ComplianceSummarySection({ tasks }: { tasks: ComplianceTask[] }) {
  return (
    <Card className="shadow-none border-border print-section">
      <CardHeader className="pb-2 pt-4 px-4">
        <SectionHeading
          icon={<ClipboardList className="w-4 h-4" />}
          title="Compliance Tasks"
          count={tasks.length}
        />
      </CardHeader>
      <CardContent className="px-0 pb-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-xs font-semibold pl-4 w-[35%]">
                Task / Condition
              </TableHead>
              <TableHead className="text-xs font-semibold w-16">Type</TableHead>
              <TableHead className="text-xs font-semibold whitespace-nowrap">
                Due Date
              </TableHead>
              <TableHead className="text-xs font-semibold">
                Responsible Officer (RO)
              </TableHead>
              <TableHead className="text-xs font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length === 0 ? (
              <EmptyRow
                cols={5}
                message="No compliance tasks due this month."
                ocid="reports.compliance.empty_state"
              />
            ) : (
              tasks.map((t, i) => (
                <TableRow
                  key={t.id.toString()}
                  data-ocid={`reports.compliance.item.${i + 1}`}
                  className="hover:bg-muted/30"
                >
                  <TableCell className="pl-4 align-top py-3">
                    <p
                      className="font-medium text-sm text-foreground"
                      title={t.title}
                    >
                      {t.title}
                    </p>
                    {t.conditionText && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {t.conditionText}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="align-top py-3">
                    <Badge variant="outline" className="text-xs font-mono">
                      {t.taskType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap align-top py-3">
                    {formatDate(t.dueDate)}
                  </TableCell>
                  <TableCell className="text-sm align-top py-3">
                    {t.responsibleOfficer}
                  </TableCell>
                  <TableCell className="align-top py-3">
                    <StatusBadge status={t.status} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// ─── Air Quality Section ──────────────────────────────────────────────────────

function AirQualitySection({ readings }: { readings: AirQualityReading[] }) {
  return (
    <Card className="shadow-none border-border print-section">
      <CardHeader className="pb-2 pt-4 px-4">
        <SectionHeading
          icon={<Wind className="w-4 h-4" />}
          title="Air Quality Monitoring"
          count={readings.length}
        />
      </CardHeader>
      <CardContent className="px-0 pb-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-xs font-semibold pl-4 whitespace-nowrap">
                Date
              </TableHead>
              <TableHead className="text-xs font-semibold">Parameter</TableHead>
              <TableHead className="text-xs font-semibold text-right">
                Value
              </TableHead>
              <TableHead className="text-xs font-semibold">Unit</TableHead>
              <TableHead className="text-xs font-semibold">Location</TableHead>
              <TableHead className="text-xs font-semibold">
                Measured By
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {readings.length === 0 ? (
              <EmptyRow
                cols={6}
                message="No air quality readings recorded this month."
                ocid="reports.air.empty_state"
              />
            ) : (
              readings.map((r, i) => (
                <TableRow
                  key={r.id.toString()}
                  data-ocid={`reports.air.item.${i + 1}`}
                  className="hover:bg-muted/30"
                >
                  <TableCell className="pl-4 text-sm whitespace-nowrap">
                    {formatDate(r.date)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs font-mono">
                      {formatAirParam(r.parameter)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm font-semibold">
                    {r.value.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {r.unit}
                  </TableCell>
                  <TableCell className="text-sm">{r.location}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {r.measuredBy}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// ─── Piezometer Section ───────────────────────────────────────────────────────

function PiezometerSection({ readings }: { readings: PiezometerReading[] }) {
  return (
    <Card className="shadow-none border-border print-section">
      <CardHeader className="pb-2 pt-4 px-4">
        <SectionHeading
          icon={<Droplets className="w-4 h-4" />}
          title="Piezometer / Groundwater Readings"
          count={readings.length}
        />
      </CardHeader>
      <CardContent className="px-0 pb-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-xs font-semibold pl-4 whitespace-nowrap">
                Date
              </TableHead>
              <TableHead className="text-xs font-semibold">Well ID</TableHead>
              <TableHead className="text-xs font-semibold text-right whitespace-nowrap">
                Depth to Water (m)
              </TableHead>
              <TableHead className="text-xs font-semibold text-right">
                pH
              </TableHead>
              <TableHead className="text-xs font-semibold text-right whitespace-nowrap">
                Conductivity (µS/cm)
              </TableHead>
              <TableHead className="text-xs font-semibold text-right whitespace-nowrap">
                Turbidity (NTU)
              </TableHead>
              <TableHead className="text-xs font-semibold">Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {readings.length === 0 ? (
              <EmptyRow
                cols={7}
                message="No piezometer readings recorded this month."
                ocid="reports.piezo.empty_state"
              />
            ) : (
              readings.map((r, i) => (
                <TableRow
                  key={r.id.toString()}
                  data-ocid={`reports.piezo.item.${i + 1}`}
                  className="hover:bg-muted/30"
                >
                  <TableCell className="pl-4 text-sm whitespace-nowrap">
                    {formatDate(r.date)}
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm font-medium text-primary">
                      {r.wellId}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {r.depthToWater.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {r.pH.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {r.conductivity.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {r.turbidity.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {r.location}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// ─── Trees Section ────────────────────────────────────────────────────────────

function TreesSection({ records }: { records: TreeRecord[] }) {
  const totalCount = records.reduce((acc, r) => acc + Number(r.count), 0);

  const bySpecies = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of records) {
      map.set(r.species, (map.get(r.species) ?? 0) + Number(r.count));
    }
    return Array.from(map.entries()).map(([species, count]) => ({
      species,
      count,
    }));
  }, [records]);

  return (
    <Card className="shadow-none border-border print-section">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center gap-2">
          <span className="text-primary">
            <TreePine className="w-4 h-4" />
          </span>
          <h2 className="font-display font-bold text-sm text-foreground tracking-tight">
            Trees Planted
          </h2>
          <Badge variant="secondary" className="ml-auto text-xs tabular-nums">
            {records.length} record{records.length !== 1 ? "s" : ""}
          </Badge>
          {records.length > 0 && (
            <Badge className="bg-primary text-primary-foreground text-xs font-bold tabular-nums">
              {totalCount.toLocaleString()} total trees
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-4">
        {records.length === 0 ? (
          <div
            className="text-center text-muted-foreground text-sm py-10"
            data-ocid="reports.trees.empty_state"
          >
            No trees planted this month.
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-xs font-semibold pl-4 whitespace-nowrap">
                    Planting Date
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    Species
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-right">
                    Count
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    Location
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    Planted By
                  </TableHead>
                  <TableHead className="text-xs font-semibold">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((r, i) => (
                  <TableRow
                    key={r.id.toString()}
                    data-ocid={`reports.trees.item.${i + 1}`}
                    className="hover:bg-muted/30"
                  >
                    <TableCell className="pl-4 text-sm whitespace-nowrap">
                      {formatDate(r.plantingDate)}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {r.species}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm font-semibold text-primary">
                      {Number(r.count).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm">{r.location}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {r.plantedBy}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                      {r.notes || "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {bySpecies.length > 1 && (
              <div className="mx-4 mt-3 bg-muted/40 rounded-lg p-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Species Summary
                </p>
                <div className="flex flex-wrap gap-2">
                  {bySpecies.map(({ species, count }) => (
                    <div
                      key={species}
                      className="flex items-center gap-1.5 bg-card border border-border rounded-md px-2.5 py-1"
                    >
                      <TreePine className="w-3 h-3 text-primary shrink-0" />
                      <span className="text-sm font-medium">{species}</span>
                      <span className="text-xs text-muted-foreground">
                        — {count.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const { data: allTasks, isLoading: loadingTasks } = useComplianceTasks();
  const { data: allAir, isLoading: loadingAir } = useAirReadings();
  const { data: allPiezo, isLoading: loadingPiezo } = usePiezoReadings();
  const { data: allTrees, isLoading: loadingTrees } = useTreeRecords();

  const isLoading = loadingTasks || loadingAir || loadingPiezo || loadingTrees;

  const filteredTasks = useMemo(
    () =>
      (allTasks ?? []).filter((t) =>
        inMonth(t.dueDate, selectedYear, selectedMonth),
      ),
    [allTasks, selectedYear, selectedMonth],
  );

  const filteredAir = useMemo(
    () =>
      (allAir ?? []).filter((r) =>
        inMonth(r.date, selectedYear, selectedMonth),
      ),
    [allAir, selectedYear, selectedMonth],
  );

  const filteredPiezo = useMemo(
    () =>
      (allPiezo ?? []).filter((r) =>
        inMonth(r.date, selectedYear, selectedMonth),
      ),
    [allPiezo, selectedYear, selectedMonth],
  );

  const filteredTrees = useMemo(
    () =>
      (allTrees ?? []).filter((r) =>
        inMonth(r.plantingDate, selectedYear, selectedMonth),
      ),
    [allTrees, selectedYear, selectedMonth],
  );

  const handlePrint = () => window.print();

  const reportLabel = `${MONTHS[selectedMonth]} ${selectedYear}`;

  return (
    <>
      {/* ── Print-only header ── */}
      <div className="hidden print:block text-center mb-6 pb-4 border-b border-border">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
          Coal Mine Environmental Monitoring
        </p>
        <h1 className="text-xl font-display font-bold text-foreground">
          Monthly Monitoring Report — {reportLabel}
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Generated: {new Date().toLocaleString("en-IN")}
        </p>
      </div>

      <div
        className="p-4 lg:p-6 space-y-6 print:p-0 print:space-y-4"
        data-ocid="reports.page"
      >
        {/* ── Screen header ── */}
        <div className="print:hidden">
          <PageHeader
            title="Monthly Monitoring Report"
            subtitle="Aggregate environmental compliance data for regulators"
            actions={
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handlePrint}
                data-ocid="reports.print_button"
              >
                <Printer className="w-4 h-4" />
                Print / Export
              </Button>
            }
          />

          {/* Month / Year picker */}
          <Card className="border-border shadow-none">
            <CardContent className="py-3 px-4">
              <div className="flex flex-wrap items-center gap-3">
                <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium text-foreground">
                  Report Period:
                </span>

                <Select
                  value={String(selectedMonth)}
                  onValueChange={(v) => setSelectedMonth(Number(v))}
                >
                  <SelectTrigger
                    className="w-36 h-8 text-sm"
                    data-ocid="reports.month_select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((m, i) => (
                      <SelectItem key={m} value={String(i)}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={String(selectedYear)}
                  onValueChange={(v) => setSelectedYear(Number(v))}
                >
                  <SelectTrigger
                    className="w-24 h-8 text-sm"
                    data-ocid="reports.year_select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {YEAR_OPTIONS.map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Separator
                  orientation="vertical"
                  className="h-5 mx-1 hidden sm:block"
                />

                <span className="text-xs text-muted-foreground">
                  Showing data for{" "}
                  <span className="font-semibold text-foreground">
                    {reportLabel}
                  </span>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Print period label ── */}
        <div className="hidden print:flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="w-4 h-4" />
          <span>
            Period: <strong>{reportLabel}</strong>
          </span>
        </div>

        {/* ── Content ── */}
        {isLoading ? (
          <div className="space-y-4">
            <TableSkeleton rows={5} />
            <TableSkeleton rows={3} />
          </div>
        ) : (
          <div className="space-y-5">
            <ComplianceSummarySection tasks={filteredTasks} />
            <AirQualitySection readings={filteredAir} />
            <PiezometerSection readings={filteredPiezo} />
            <TreesSection records={filteredTrees} />
          </div>
        )}
      </div>

      {/* ── Print styles ── */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          [data-sidebar], nav, aside, header { display: none !important; }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
          .print-section { break-inside: avoid; page-break-inside: avoid; margin-bottom: 16px; }
          table { font-size: 11px !important; }
          th, td { padding: 4px 8px !important; }
          .shadow-none { box-shadow: none !important; }
        }
      `}</style>
    </>
  );
}
