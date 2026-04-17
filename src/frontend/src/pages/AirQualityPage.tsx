import { FormModal } from "@/components/FormModal";
import { TableSkeleton } from "@/components/LoadingSpinner";
import { PageHeader } from "@/components/PageHeader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddAirReading,
  useAirReadings,
  useDeleteAirReading,
} from "@/hooks/useBackend";
import type { AirParameter, CreateAirReadingRequest } from "@/types/index";
import { Plus, Trash2, Wind } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

// ─── Types & Helpers ──────────────────────────────────────────────────────────

type ParamKey = "PM10" | "PM2_5" | "SO2" | "NOx" | "CO";

const PARAM_TABS: { key: ParamKey; label: string }[] = [
  { key: "PM10", label: "PM10" },
  { key: "PM2_5", label: "PM2.5" },
  { key: "SO2", label: "SO₂" },
  { key: "NOx", label: "NOₓ" },
  { key: "CO", label: "CO" },
];

const paramOptions = ["PM10", "PM2_5", "SO2", "NOx", "CO", "Other"] as const;

// Regulatory limits and units per parameter
const PARAM_CONFIG: Record<ParamKey, { unit: string; limit: number }> = {
  PM10: { unit: "µg/m³", limit: 100 },
  PM2_5: { unit: "µg/m³", limit: 60 },
  SO2: { unit: "µg/m³", limit: 80 },
  NOx: { unit: "µg/m³", limit: 80 },
  CO: { unit: "mg/m³", limit: 2 },
};

function makeAirParameter(param: string, other: string): AirParameter {
  if (param === "PM10") return { __kind__: "PM10", PM10: null };
  if (param === "PM2_5") return { __kind__: "PM2_5", PM2_5: null };
  if (param === "SO2") return { __kind__: "SO2", SO2: null };
  if (param === "NOx") return { __kind__: "NOx", NOx: null };
  if (param === "CO") return { __kind__: "CO", CO: null };
  return { __kind__: "Other", Other: other };
}

function paramLabel(p: AirParameter): string {
  if (p.__kind__ === "PM2_5") return "PM2.5";
  if (p.__kind__ === "Other") return `Other: ${p.Other}`;
  return p.__kind__;
}

function paramKind(p: AirParameter): string {
  return p.__kind__;
}

function fmtDateLong(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function fmtDateShort(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

const paramColors: Record<string, string> = {
  PM10: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  PM2_5: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  SO2: "bg-red-500/15 text-red-600 dark:text-red-400",
  NOx: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
  CO: "bg-primary/15 text-primary",
  Other: "bg-muted text-muted-foreground",
};

const defaultForm = {
  parameter: "PM10",
  otherParam: "",
  value: "",
  unit: "µg/m³",
  location: "",
  measuredBy: "",
  date: "",
  notes: "",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function AirQualityPage() {
  const { data: readings, isLoading } = useAirReadings();
  const addReading = useAddAirReading();
  const deleteReading = useDeleteAirReading();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [activeParam, setActiveParam] = useState<ParamKey>("PM10");
  const [deleteId, setDeleteId] = useState<bigint | null>(null);

  // Chart data for selected parameter
  const chartData = useMemo(() => {
    if (!readings) return [];
    return readings
      .filter((r) => r.parameter.__kind__ === activeParam)
      .sort((a, b) => Number(a.date - b.date))
      .map((r) => ({
        date: fmtDateShort(r.date),
        rawDate: Number(r.date),
        value: r.value,
        unit: r.unit,
      }));
  }, [readings, activeParam]);

  const activeLabel =
    PARAM_TABS.find((t) => t.key === activeParam)?.label ?? activeParam;

  const paramConfig = PARAM_CONFIG[activeParam];

  // Summary stats for the selected parameter
  const chartStats = useMemo(() => {
    if (!chartData.length) return null;
    const vals = chartData.map((d) => d.value);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    return { min, max, avg };
  }, [chartData]);

  // Show every Nth tick so labels don't crowd on 30 data points
  const xTickInterval =
    chartData.length > 20 ? Math.ceil(chartData.length / 10) - 1 : 0;

  // Table rows newest-first
  const tableRows = useMemo(
    () =>
      readings ? [...readings].sort((a, b) => Number(b.date - a.date)) : [],
    [readings],
  );

  async function handleCreate() {
    if (!form.value || !form.location || !form.measuredBy || !form.date) {
      toast.error("Please fill in all required fields");
      return;
    }
    const req: CreateAirReadingRequest = {
      parameter: makeAirParameter(form.parameter, form.otherParam),
      value: Number.parseFloat(form.value),
      unit: form.unit,
      location: form.location,
      measuredBy: form.measuredBy,
      date: BigInt(new Date(form.date).getTime() * 1_000_000),
      notes: form.notes,
    };
    await addReading.mutateAsync(req);
    toast.success("Air quality reading added");
    setModalOpen(false);
    setForm(defaultForm);
  }

  function handleDeleteConfirm() {
    if (deleteId === null) return;
    deleteReading.mutate(deleteId, {
      onSuccess: () => toast.success("Reading deleted"),
      onError: () => toast.error("Failed to delete reading"),
    });
    setDeleteId(null);
  }

  return (
    <div className="p-4 lg:p-6 space-y-5" data-ocid="air_quality.page">
      <PageHeader
        title="Air Quality Monitoring"
        subtitle="PM10, PM2.5, SO₂, NOₓ, CO — ambient air readings"
        badge={
          <Badge variant="outline" className="font-mono text-xs">
            {readings?.length ?? 0} readings
          </Badge>
        }
        actions={
          <Button
            size="sm"
            onClick={() => setModalOpen(true)}
            data-ocid="air_quality.add_reading.open_modal_button"
          >
            <Plus size={14} className="mr-1.5" />
            Add Reading
          </Button>
        }
      />

      {/* ── Trend Chart ── */}
      <div className="rounded-xl border border-border bg-card shadow-sm p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Wind size={15} className="text-primary" />
            <span className="font-display font-semibold text-sm text-foreground">
              Trend — {activeLabel}
            </span>
          </div>
          <Tabs
            value={activeParam}
            onValueChange={(v) => setActiveParam(v as ParamKey)}
          >
            <TabsList data-ocid="air_quality.chart.filter.tab">
              {PARAM_TABS.map((t) => (
                <TabsTrigger
                  key={t.key}
                  value={t.key}
                  data-ocid={`air_quality.chart.tab.${t.key.toLowerCase()}`}
                  className="text-xs px-2.5"
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <Skeleton className="h-52 w-full rounded-lg" />
        ) : chartData.length === 0 ? (
          <div
            className="h-52 flex flex-col items-center justify-center gap-2 text-muted-foreground"
            data-ocid="air_quality.chart.empty_state"
          >
            <Wind size={32} className="opacity-30" />
            <p className="text-sm">No {activeLabel} data yet.</p>
          </div>
        ) : (
          <>
            {/* Summary stats row */}
            {chartStats && (
              <div
                className="grid grid-cols-3 gap-3"
                data-ocid="air_quality.chart.stats"
              >
                {(
                  [
                    { label: "Min", value: chartStats.min },
                    { label: "Avg", value: chartStats.avg },
                    { label: "Max", value: chartStats.max },
                  ] as const
                ).map(({ label, value }) => {
                  const overLimit = value > paramConfig.limit;
                  return (
                    <div
                      key={label}
                      className={`rounded-lg px-3 py-2 text-center ${overLimit ? "bg-destructive/10 border border-destructive/20" : "bg-muted/40 border border-border"}`}
                    >
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                        {label}
                      </p>
                      <p
                        className={`text-sm font-mono font-bold mt-0.5 ${overLimit ? "text-destructive" : "text-foreground"}`}
                      >
                        {value.toFixed(1)}
                        <span className="text-[10px] font-normal text-muted-foreground ml-1">
                          {paramConfig.unit}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Limit legend hint */}
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span
                className="inline-block w-5 h-px border-t-2 border-dashed"
                style={{ borderColor: "oklch(0.58 0.19 24)" }}
              />
              <span>
                Standard limit: {paramConfig.limit} {paramConfig.unit}
              </span>
            </div>

            <ResponsiveContainer width="100%" height={240}>
              <AreaChart
                data={chartData}
                margin={{ top: 8, right: 16, left: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="airGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="oklch(0.62 0.18 243)"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(0.62 0.18 243)"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="oklch(0.88 0 0 / 0.6)"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "oklch(0.45 0 0)" }}
                  tickLine={false}
                  axisLine={false}
                  interval={xTickInterval}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "oklch(0.45 0 0)" }}
                  tickLine={false}
                  axisLine={false}
                  width={44}
                  label={{
                    value: paramConfig.unit,
                    angle: -90,
                    position: "insideLeft",
                    offset: 10,
                    style: {
                      fontSize: 10,
                      fill: "oklch(0.45 0 0)",
                      textAnchor: "middle",
                    },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--background)",
                    border: "1px solid oklch(0.88 0 0)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    padding: "8px 12px",
                  }}
                  labelStyle={{ fontWeight: 600 }}
                  formatter={(val: number) => [
                    `${val.toFixed(2)} ${paramConfig.unit}`,
                    activeLabel,
                  ]}
                />
                <ReferenceLine
                  y={paramConfig.limit}
                  stroke="oklch(0.58 0.19 24)"
                  strokeDasharray="5 3"
                  strokeWidth={1.5}
                  label={{
                    value: `Limit: ${paramConfig.limit}`,
                    position: "insideTopRight",
                    fontSize: 10,
                    fill: "oklch(0.58 0.19 24)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="oklch(0.62 0.18 243)"
                  strokeWidth={2}
                  fill="url(#airGradient)"
                  dot={{ r: 2.5, fill: "oklch(0.62 0.18 243)", strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </>
        )}
      </div>

      {/* ── Readings Table ── */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
          <span className="font-display font-semibold text-sm text-foreground">
            All Readings
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            {tableRows.length} total
          </span>
        </div>

        {isLoading ? (
          <div className="p-4">
            <TableSkeleton rows={6} />
          </div>
        ) : !tableRows.length ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="air_quality.empty_state"
          >
            <Wind size={36} className="text-muted-foreground mb-3 opacity-40" />
            <p className="text-sm font-medium text-foreground">
              No readings recorded
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Add your first air quality measurement
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 gap-1.5"
              onClick={() => setModalOpen(true)}
            >
              <Plus size={13} />
              Add Reading
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto" data-ocid="air_quality.table">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20 border-border">
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">
                    Date
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">
                    Parameter
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-right">
                    Value
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">
                    Location
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">
                    Measured By
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">
                    Notes
                  </TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableRows.map((r, i) => (
                  <TableRow
                    key={r.id.toString()}
                    className="border-border hover:bg-muted/20 transition-smooth"
                    data-ocid={`air_quality.reading.item.${i + 1}`}
                  >
                    <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                      {fmtDateLong(r.date)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-[10px] font-semibold border-0 ${paramColors[paramKind(r.parameter)] ?? paramColors.Other}`}
                      >
                        {paramLabel(r.parameter)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-right font-mono font-semibold text-foreground whitespace-nowrap">
                      {r.value.toFixed(2)}{" "}
                      <span className="font-normal text-muted-foreground">
                        {r.unit}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs max-w-[140px] truncate">
                      {r.location}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[120px] truncate">
                      {r.measuredBy}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[160px] truncate">
                      {r.notes || "—"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive transition-smooth"
                        onClick={() => setDeleteId(r.id)}
                        aria-label="Delete reading"
                        data-ocid={`air_quality.reading.delete_button.${i + 1}`}
                      >
                        <Trash2 size={13} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* ── Add Modal ── */}
      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Air Quality Reading"
        submitLabel="Save Reading"
        isSubmitting={addReading.isPending}
        onSubmit={handleCreate}
        size="lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Parameter *</Label>
            <Select
              value={form.parameter}
              onValueChange={(v) => setForm({ ...form, parameter: v })}
            >
              <SelectTrigger data-ocid="air_quality.create.parameter.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {paramOptions.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p === "PM2_5" ? "PM2.5" : p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {form.parameter === "Other" && (
            <div className="space-y-1.5">
              <Label>Parameter Name *</Label>
              <Input
                placeholder="e.g. H₂S"
                value={form.otherParam}
                onChange={(e) =>
                  setForm({ ...form, otherParam: e.target.value })
                }
                data-ocid="air_quality.create.other_param.input"
              />
            </div>
          )}
          <div className="space-y-1.5">
            <Label>Value *</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              data-ocid="air_quality.create.value.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Unit</Label>
            <Input
              placeholder="µg/m³"
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
              data-ocid="air_quality.create.unit.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Location *</Label>
            <Input
              placeholder="Monitoring station / area"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              data-ocid="air_quality.create.location.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Date *</Label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              data-ocid="air_quality.create.date.input"
            />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <Label>Measured By *</Label>
            <Input
              placeholder="Analyst / technician name"
              value={form.measuredBy}
              onChange={(e) => setForm({ ...form, measuredBy: e.target.value })}
              data-ocid="air_quality.create.measured_by.input"
            />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <Label>Notes</Label>
            <Textarea
              rows={2}
              placeholder="Observations, instrument details…"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              data-ocid="air_quality.create.notes.textarea"
            />
          </div>
        </div>
      </FormModal>

      {/* ── Delete Confirmation ── */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(v) => !v && setDeleteId(null)}
      >
        <AlertDialogContent data-ocid="air_quality.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Reading?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The air quality reading will be
              permanently removed from the records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="air_quality.delete.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="air_quality.delete.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
