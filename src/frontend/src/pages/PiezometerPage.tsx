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
import { Textarea } from "@/components/ui/textarea";
import {
  useAddPiezoReading,
  useDeletePiezoReading,
  usePiezoReadings,
} from "@/hooks/useBackend";
import type { CreatePiezoReadingRequest } from "@/types/index";
import { Droplets, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CHART_COLORS = [
  "oklch(0.62 0.18 243)",
  "oklch(0.65 0.17 153)",
  "oklch(0.68 0.15 70)",
  "oklch(0.58 0.19 24)",
  "oklch(0.45 0.1 280)",
];

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

const defaultForm: Omit<CreatePiezoReadingRequest, "date"> & { date: string } =
  {
    wellId: "",
    location: "",
    depthToWater: 0,
    pH: 7.0,
    conductivity: 0,
    turbidity: 0,
    measuredBy: "",
    date: "",
    notes: "",
  };

// ─── Component ────────────────────────────────────────────────────────────────

export default function PiezometerPage() {
  const { data: readings, isLoading } = usePiezoReadings();
  const addReading = useAddPiezoReading();
  const deleteReading = useDeletePiezoReading();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [selectedWell, setSelectedWell] = useState<string>("ALL");
  const [deleteId, setDeleteId] = useState<bigint | null>(null);

  function setField<K extends keyof typeof defaultForm>(
    key: K,
    value: (typeof defaultForm)[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // Unique sorted well IDs
  const wellIds = useMemo(() => {
    if (!readings) return [];
    return [...new Set(readings.map((r) => r.wellId))].sort();
  }, [readings]);

  // Build multi-line chart data: { date, [wellId]: depthToWater }
  const chartData = useMemo(() => {
    if (!readings) return [];
    const filtered =
      selectedWell === "ALL"
        ? readings
        : readings.filter((r) => r.wellId === selectedWell);

    const byDate: Record<string, Record<string, number>> = {};
    for (const r of filtered) {
      const label = fmtDateShort(r.date);
      if (!byDate[label]) byDate[label] = {};
      byDate[label][r.wellId] = r.depthToWater;
    }
    return Object.entries(byDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, wells]) => ({ date, ...wells }));
  }, [readings, selectedWell]);

  const chartWells = useMemo(
    () => (selectedWell === "ALL" ? wellIds : [selectedWell]),
    [wellIds, selectedWell],
  );

  // Table rows newest-first
  const tableRows = useMemo(
    () =>
      readings ? [...readings].sort((a, b) => Number(b.date - a.date)) : [],
    [readings],
  );

  async function handleCreate() {
    if (!form.wellId || !form.location || !form.measuredBy || !form.date) {
      toast.error("Please fill in all required fields");
      return;
    }
    const req: CreatePiezoReadingRequest = {
      wellId: form.wellId,
      location: form.location,
      depthToWater: Number(form.depthToWater),
      pH: Number(form.pH),
      conductivity: Number(form.conductivity),
      turbidity: Number(form.turbidity),
      measuredBy: form.measuredBy,
      date: BigInt(new Date(form.date).getTime() * 1_000_000),
      notes: form.notes,
    };
    await addReading.mutateAsync(req);
    toast.success("Piezometer reading added");
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
    <div className="p-4 lg:p-6 space-y-5" data-ocid="piezometer.page">
      <PageHeader
        title="Piezometer Monitoring"
        subtitle="Groundwater monitoring — depth, pH, conductivity, turbidity"
        badge={
          <Badge variant="outline" className="font-mono text-xs">
            {readings?.length ?? 0} readings
          </Badge>
        }
        actions={
          <Button
            size="sm"
            onClick={() => setModalOpen(true)}
            data-ocid="piezometer.add_reading.open_modal_button"
          >
            <Plus size={14} className="mr-1.5" />
            Add Reading
          </Button>
        }
      />

      {/* ── Depth to Water Chart ── */}
      <div className="rounded-xl border border-border bg-card shadow-sm p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Droplets size={15} className="text-primary" />
            <span className="font-display font-semibold text-sm text-foreground">
              Depth to Water Table — by Well
            </span>
          </div>
          {wellIds.length > 0 && (
            <Select value={selectedWell} onValueChange={setSelectedWell}>
              <SelectTrigger
                className="w-40 h-8 text-xs"
                data-ocid="piezometer.chart.well_filter.select"
              >
                <SelectValue placeholder="All wells" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Wells</SelectItem>
                {wellIds.map((wid) => (
                  <SelectItem key={wid} value={wid}>
                    {wid}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {isLoading ? (
          <Skeleton className="h-52 w-full rounded-lg" />
        ) : chartData.length === 0 ? (
          <div
            className="h-52 flex flex-col items-center justify-center gap-2 text-muted-foreground"
            data-ocid="piezometer.chart.empty_state"
          >
            <Droplets size={32} className="opacity-30" />
            <p className="text-sm">No piezometer data yet.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={chartData}
              margin={{ top: 8, right: 12, left: -16, bottom: 0 }}
            >
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
              />
              <YAxis
                tick={{ fontSize: 10, fill: "oklch(0.45 0 0)" }}
                tickLine={false}
                axisLine={false}
                label={{
                  value: "m",
                  angle: -90,
                  position: "insideLeft",
                  offset: 14,
                  style: { fontSize: 10, fill: "oklch(0.45 0 0)" },
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
                formatter={(val: number) => [`${val.toFixed(2)} m`, "Depth"]}
              />
              {chartWells.length > 1 && (
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 4 }} />
              )}
              {chartWells.map((wid, idx) => (
                <Line
                  key={wid}
                  type="monotone"
                  dataKey={wid}
                  name={wid}
                  stroke={CHART_COLORS[idx % CHART_COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
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
            data-ocid="piezometer.empty_state"
          >
            <Droplets
              size={36}
              className="text-muted-foreground mb-3 opacity-40"
            />
            <p className="text-sm font-medium text-foreground">
              No readings recorded
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Add your first piezometer measurement
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
          <div className="overflow-x-auto" data-ocid="piezometer.table">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20 border-border">
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">
                    Date
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">
                    Well ID
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">
                    Location
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-right">
                    Depth (m)
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-right">
                    pH
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-right">
                    Conductivity
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-right">
                    Turbidity
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">
                    Measured By
                  </TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableRows.map((r, i) => (
                  <TableRow
                    key={r.id.toString()}
                    className="border-border hover:bg-muted/20 transition-smooth"
                    data-ocid={`piezometer.reading.item.${i + 1}`}
                  >
                    <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                      {fmtDateLong(r.date)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="font-mono text-xs font-semibold"
                      >
                        {r.wellId}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs max-w-[120px] truncate">
                      {r.location}
                    </TableCell>
                    <TableCell className="text-xs text-right font-mono font-semibold text-foreground">
                      {r.depthToWater.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-xs text-right font-mono">
                      {r.pH.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-xs text-right font-mono">
                      {r.conductivity.toFixed(2)}{" "}
                      <span className="text-[10px] text-muted-foreground font-normal">
                        µS/cm
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-right font-mono">
                      {r.turbidity.toFixed(2)}{" "}
                      <span className="text-[10px] text-muted-foreground font-normal">
                        NTU
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[120px] truncate">
                      {r.measuredBy}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive transition-smooth"
                        onClick={() => setDeleteId(r.id)}
                        aria-label="Delete reading"
                        data-ocid={`piezometer.reading.delete_button.${i + 1}`}
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
        title="Add Piezometer Reading"
        submitLabel="Save Reading"
        isSubmitting={addReading.isPending}
        onSubmit={handleCreate}
        size="lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Well ID *</Label>
            <Input
              placeholder="e.g. PZ-01"
              value={form.wellId}
              onChange={(e) => setField("wellId", e.target.value)}
              data-ocid="piezometer.create.well_id.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Date *</Label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setField("date", e.target.value)}
              data-ocid="piezometer.create.date.input"
            />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <Label>Location *</Label>
            <Input
              placeholder="Location / area"
              value={form.location}
              onChange={(e) => setField("location", e.target.value)}
              data-ocid="piezometer.create.location.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Depth to Water (m)</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={form.depthToWater}
              onChange={(e) =>
                setField("depthToWater", Number.parseFloat(e.target.value) || 0)
              }
              data-ocid="piezometer.create.depth.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>pH</Label>
            <Input
              type="number"
              step="0.1"
              min="0"
              max="14"
              placeholder="7.0"
              value={form.pH}
              onChange={(e) =>
                setField("pH", Number.parseFloat(e.target.value) || 0)
              }
              data-ocid="piezometer.create.ph.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Conductivity (µS/cm)</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={form.conductivity}
              onChange={(e) =>
                setField("conductivity", Number.parseFloat(e.target.value) || 0)
              }
              data-ocid="piezometer.create.conductivity.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Turbidity (NTU)</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={form.turbidity}
              onChange={(e) =>
                setField("turbidity", Number.parseFloat(e.target.value) || 0)
              }
              data-ocid="piezometer.create.turbidity.input"
            />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <Label>Measured By *</Label>
            <Input
              placeholder="Analyst / technician name"
              value={form.measuredBy}
              onChange={(e) => setField("measuredBy", e.target.value)}
              data-ocid="piezometer.create.measured_by.input"
            />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <Label>Notes</Label>
            <Textarea
              rows={2}
              placeholder="Observations…"
              value={form.notes}
              onChange={(e) => setField("notes", e.target.value)}
              data-ocid="piezometer.create.notes.textarea"
            />
          </div>
        </div>
      </FormModal>

      {/* ── Delete Confirmation ── */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(v) => !v && setDeleteId(null)}
      >
        <AlertDialogContent data-ocid="piezometer.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Reading?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The piezometer reading will be
              permanently removed from the monitoring records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="piezometer.delete.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="piezometer.delete.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
