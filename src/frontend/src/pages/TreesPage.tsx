import type { CreateTreeRecordRequest } from "@/backend";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  useAddTreeRecord,
  useDeleteTreeRecord,
  useTreeRecords,
  useTreeSpeciesSummary,
} from "@/hooks/useBackend";
import {
  ChevronDown,
  ChevronUp,
  Leaf,
  MapPin,
  Plus,
  Search,
  Trash2,
  Trees,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Types ─────────────────────────────────────────────────────────────────────

type SortField = "plantingDate" | "species" | "count";
type SortDir = "asc" | "desc";

interface FormState {
  species: string;
  plantingDate: string;
  location: string;
  count: string;
  plantedBy: string;
  notes: string;
}

const EMPTY_FORM: FormState = {
  species: "",
  plantingDate: "",
  location: "",
  count: "",
  plantedBy: "",
  notes: "",
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(ts: bigint): string {
  const d = new Date(Number(ts / 1_000_000n));
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function tsFromDateStr(s: string): bigint {
  return BigInt(new Date(s).getTime()) * 1_000_000n;
}

const SPECIES_COLORS = [
  "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  "bg-amber-500/20 text-amber-700 dark:text-amber-300",
  "bg-purple-500/20 text-purple-700 dark:text-purple-300",
  "bg-rose-500/20 text-rose-700 dark:text-rose-300",
  "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300",
];

function speciesColorAt(idx: number) {
  return SPECIES_COLORS[idx % SPECIES_COLORS.length];
}

// ─── Summary Card ──────────────────────────────────────────────────────────────

function SummaryCard({
  icon,
  label,
  value,
  sub,
  colorClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  colorClass?: string;
}) {
  return (
    <Card className="border-border bg-card">
      <CardContent className="p-5 flex items-center gap-4">
        <div
          className={`p-3 rounded-xl flex-shrink-0 ${colorClass ?? "bg-primary/10 text-primary"}`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            {label}
          </p>
          <p className="text-2xl font-display font-bold text-foreground">
            {value}
          </p>
          {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Species Breakdown ─────────────────────────────────────────────────────────

function SpeciesBreakdown({ totalCount }: { totalCount: number }) {
  const { data: summary, isLoading } = useTreeSpeciesSummary();

  return (
    <Card
      className="border-border bg-card"
      data-ocid="trees.species_breakdown.card"
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-display font-semibold flex items-center gap-2">
          <Leaf className="h-4 w-4 text-primary" />
          Species Breakdown
          {summary && summary.length > 0 && (
            <Badge variant="secondary" className="text-xs font-normal ml-1">
              {summary.length} species
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="px-6 pb-4">
            <TableSkeleton rows={4} />
          </div>
        ) : !summary || summary.length === 0 ? (
          <div
            className="px-6 pb-6 text-center text-muted-foreground text-sm"
            data-ocid="trees.species_breakdown.empty_state"
          >
            No species data yet.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="text-xs font-semibold text-muted-foreground">
                  Species
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-right">
                  Count
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-right">
                  % of Total
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground min-w-[120px]">
                  Distribution
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary.map((s, i) => {
                const pct =
                  totalCount > 0
                    ? ((Number(s.totalCount) / totalCount) * 100).toFixed(1)
                    : "0.0";
                return (
                  <TableRow
                    key={s.species}
                    data-ocid={`trees.species.item.${i + 1}`}
                  >
                    <TableCell>
                      <Badge
                        className={`${speciesColorAt(i)} border-0 font-medium text-xs`}
                      >
                        {s.species}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold text-foreground">
                      {Number(s.totalCount).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground">
                      {pct}%
                    </TableCell>
                    <TableCell>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Sort Header ───────────────────────────────────────────────────────────────

function SortTH({
  field,
  label,
  sortField,
  sortDir,
  onSort,
}: {
  field: SortField;
  label: string;
  sortField: SortField;
  sortDir: SortDir;
  onSort: (f: SortField) => void;
}) {
  const active = sortField === field;
  return (
    <TableHead
      className="cursor-pointer select-none text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
      onClick={() => onSort(field)}
      data-ocid={`trees.sort.${field}`}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {active ? (
          sortDir === "asc" ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )
        ) : (
          <ChevronUp className="h-3 w-3 opacity-30" />
        )}
      </span>
    </TableHead>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function TreesPage() {
  const { data: records, isLoading } = useTreeRecords();
  const addRecord = useAddTreeRecord();
  const deleteRecord = useDeleteTreeRecord();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("plantingDate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  // ── Derived stats ─────────────────────────────────────────────────────────

  const totalCount = useMemo(
    () => (records ?? []).reduce((acc, r) => acc + Number(r.count), 0),
    [records],
  );

  const speciesSet = useMemo(
    () => new Set((records ?? []).map((r) => r.species)).size,
    [records],
  );

  const latestDate = useMemo(() => {
    if (!records || records.length === 0) return null;
    const max = records.reduce((a, b) =>
      a.plantingDate > b.plantingDate ? a : b,
    );
    return formatDate(max.plantingDate);
  }, [records]);

  // ── Filter + Sort ──────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let rows = [...(records ?? [])];
    if (q) {
      rows = rows.filter(
        (r) =>
          r.species.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.plantedBy.toLowerCase().includes(q),
      );
    }
    rows.sort((a, b) => {
      let cmp = 0;
      if (sortField === "plantingDate")
        cmp = Number(a.plantingDate - b.plantingDate);
      else if (sortField === "species")
        cmp = a.species.localeCompare(b.species);
      else if (sortField === "count") cmp = Number(a.count - b.count);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [records, search, sortField, sortDir]);

  function handleSort(f: SortField) {
    if (sortField === f) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(f);
      setSortDir("asc");
    }
  }

  // ── Form ──────────────────────────────────────────────────────────────────

  function setField(k: keyof FormState, v: string) {
    setForm((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.species.trim()) e.species = "Species is required";
    if (!form.plantingDate) e.plantingDate = "Planting date is required";
    if (!form.location.trim()) e.location = "Location is required";
    const cnt = Number.parseInt(form.count, 10);
    if (!form.count || Number.isNaN(cnt) || cnt < 1)
      e.count = "Enter a valid count (≥1)";
    if (!form.plantedBy.trim()) e.plantedBy = "Planted by is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    const req: CreateTreeRecordRequest = {
      species: form.species.trim(),
      plantingDate: tsFromDateStr(form.plantingDate),
      location: form.location.trim(),
      count: BigInt(Number.parseInt(form.count, 10)),
      plantedBy: form.plantedBy.trim(),
      notes: form.notes.trim(),
    };
    try {
      await addRecord.mutateAsync(req);
      toast.success("Tree record added successfully");
      setModalOpen(false);
      setForm(EMPTY_FORM);
    } catch {
      toast.error("Failed to add tree record");
    }
  }

  async function handleDelete() {
    if (deleteId === null) return;
    try {
      await deleteRecord.mutateAsync(deleteId);
      toast.success("Tree record deleted");
    } catch {
      toast.error("Failed to delete tree record");
    } finally {
      setDeleteId(null);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      className="p-4 lg:p-6 space-y-6 max-w-screen-xl mx-auto"
      data-ocid="trees.page"
    >
      <PageHeader
        title="Planted Trees Inventory"
        subtitle="Reclamation plantation records — species, count, location, and planting dates across mine sites."
        actions={
          <Button
            onClick={() => setModalOpen(true)}
            data-ocid="trees.add_button"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add Tree Record
          </Button>
        }
      />

      {/* ── Summary cards ── */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        data-ocid="trees.summary.section"
      >
        <SummaryCard
          icon={<Trees className="h-5 w-5" />}
          label="Total Trees Planted"
          value={totalCount.toLocaleString()}
          sub="Across all locations"
          colorClass="bg-primary/10 text-primary"
        />
        <SummaryCard
          icon={<Leaf className="h-5 w-5" />}
          label="Distinct Species"
          value={speciesSet}
          sub="Unique species recorded"
          colorClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        />
        <SummaryCard
          icon={<MapPin className="h-5 w-5" />}
          label="Last Planting Date"
          value={latestDate ?? "—"}
          sub="Most recent planting activity"
          colorClass="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        />
      </motion.div>

      {/* ── Species breakdown ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <SpeciesBreakdown totalCount={totalCount} />
      </motion.div>

      {/* ── Full tree log ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
      >
        <Card className="border-border bg-card" data-ocid="trees.log.card">
          <CardHeader className="pb-3 flex flex-row items-center justify-between gap-4 flex-wrap">
            <CardTitle className="text-base font-display font-semibold flex items-center gap-2">
              <Trees className="h-4 w-4 text-primary" />
              Tree Planting Log
              {!isLoading && (
                <Badge variant="secondary" className="ml-1 text-xs font-normal">
                  {filtered.length} record{filtered.length !== 1 ? "s" : ""}
                </Badge>
              )}
            </CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search species, location…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-9 text-sm"
                data-ocid="trees.search_input"
              />
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {isLoading ? (
              <div className="px-6 pb-6">
                <TableSkeleton rows={6} />
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-16 text-center px-6"
                data-ocid="trees.log.empty_state"
              >
                <Trees className="h-12 w-12 text-muted-foreground/30 mb-3" />
                <p className="text-base font-medium text-muted-foreground">
                  {search
                    ? "No records match your search"
                    : "No tree records yet"}
                </p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  {search
                    ? "Try a different species or location"
                    : "Click \u201cAdd Tree Record\u201d to log your first planting."}
                </p>
                {!search && (
                  <Button
                    className="mt-4"
                    onClick={() => setModalOpen(true)}
                    data-ocid="trees.empty_add_button"
                  >
                    <Plus className="h-4 w-4 mr-1.5" />
                    Add Tree Record
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                      <SortTH
                        field="species"
                        label="Species"
                        sortField={sortField}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                      <SortTH
                        field="plantingDate"
                        label="Planting Date"
                        sortField={sortField}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                      <TableHead className="text-xs font-semibold text-muted-foreground">
                        Location
                      </TableHead>
                      <SortTH
                        field="count"
                        label="Count"
                        sortField={sortField}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                      <TableHead className="text-xs font-semibold text-muted-foreground">
                        Planted By
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-muted-foreground">
                        Notes
                      </TableHead>
                      <TableHead className="w-10" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((rec, i) => (
                      <TableRow
                        key={rec.id.toString()}
                        className="hover:bg-muted/30 transition-colors"
                        data-ocid={`trees.log.item.${i + 1}`}
                      >
                        <TableCell>
                          <Badge
                            className={`${speciesColorAt(i)} border-0 text-xs font-medium`}
                          >
                            {rec.species}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-foreground font-medium whitespace-nowrap">
                          {formatDate(rec.plantingDate)}
                        </TableCell>
                        <TableCell className="text-sm text-foreground max-w-[180px] truncate">
                          <span className="inline-flex items-center gap-1 min-w-0">
                            <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className="truncate">{rec.location}</span>
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-mono font-semibold text-foreground">
                          {Number(rec.count).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-sm text-foreground">
                          {rec.plantedBy}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-[160px] truncate">
                          {rec.notes || <span className="opacity-40">—</span>}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
                            onClick={() => setDeleteId(rec.id)}
                            aria-label={`Delete ${rec.species} record`}
                            data-ocid={`trees.delete_button.${i + 1}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Add Tree Modal ── */}
      <FormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setForm(EMPTY_FORM);
          setErrors({});
        }}
        title="Add Tree Planting Record"
        onSubmit={handleSubmit}
        submitLabel="Save Record"
        isSubmitting={addRecord.isPending}
        size="lg"
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          data-ocid="trees.add_form"
        >
          <div className="space-y-1.5">
            <Label htmlFor="tree-species">
              Species <span className="text-destructive">*</span>
            </Label>
            <Input
              id="tree-species"
              placeholder="e.g. Teak, Bamboo, Neem"
              value={form.species}
              onChange={(e) => setField("species", e.target.value)}
              data-ocid="trees.species.input"
            />
            {errors.species && (
              <p
                className="text-xs text-destructive"
                data-ocid="trees.species.field_error"
              >
                {errors.species}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tree-date">
              Planting Date <span className="text-destructive">*</span>
            </Label>
            <Input
              id="tree-date"
              type="date"
              value={form.plantingDate}
              onChange={(e) => setField("plantingDate", e.target.value)}
              data-ocid="trees.planting_date.input"
            />
            {errors.plantingDate && (
              <p
                className="text-xs text-destructive"
                data-ocid="trees.planting_date.field_error"
              >
                {errors.plantingDate}
              </p>
            )}
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="tree-location">
              Location <span className="text-destructive">*</span>
            </Label>
            <Input
              id="tree-location"
              placeholder="e.g. North Reclamation Zone — Pit 3"
              value={form.location}
              onChange={(e) => setField("location", e.target.value)}
              data-ocid="trees.location.input"
            />
            {errors.location && (
              <p
                className="text-xs text-destructive"
                data-ocid="trees.location.field_error"
              >
                {errors.location}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tree-count">
              Count <span className="text-destructive">*</span>
            </Label>
            <Input
              id="tree-count"
              type="number"
              min={1}
              placeholder="Number of trees"
              value={form.count}
              onChange={(e) => setField("count", e.target.value)}
              data-ocid="trees.count.input"
            />
            {errors.count && (
              <p
                className="text-xs text-destructive"
                data-ocid="trees.count.field_error"
              >
                {errors.count}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tree-planted-by">
              Planted By <span className="text-destructive">*</span>
            </Label>
            <Input
              id="tree-planted-by"
              placeholder="Name or team responsible"
              value={form.plantedBy}
              onChange={(e) => setField("plantedBy", e.target.value)}
              data-ocid="trees.planted_by.input"
            />
            {errors.plantedBy && (
              <p
                className="text-xs text-destructive"
                data-ocid="trees.planted_by.field_error"
              >
                {errors.plantedBy}
              </p>
            )}
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="tree-notes">Notes</Label>
            <Textarea
              id="tree-notes"
              placeholder="Optional — survival rate, soil type, source nursery, etc."
              rows={3}
              value={form.notes}
              onChange={(e) => setField("notes", e.target.value)}
              data-ocid="trees.notes.textarea"
            />
          </div>
        </div>
      </FormModal>

      {/* ── Delete Confirmation ── */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(v) => !v && setDeleteId(null)}
      >
        <AlertDialogContent data-ocid="trees.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tree Record</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this planting record. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="trees.delete.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="trees.delete.confirm_button"
            >
              Delete Record
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
