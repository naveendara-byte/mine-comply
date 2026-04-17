import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as cn, B as Button, a as TableSkeleton, d as ClipboardList, W as Wind, D as Droplets } from "./index-TQY_iKlQ.js";
import { a as useComplianceTasks, g as useAirReadings, j as usePiezoReadings, m as useTreeRecords, d as TaskStatus } from "./useBackend-V3w6Lpe4.js";
import { P as PageHeader } from "./PageHeader-Dm741xOU.js";
import { B as Badge } from "./badge-CTr1JDat.js";
import { C as Card, c as CardContent, a as CardHeader } from "./card-OwjTBGJ1.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CJx0x7Rh.js";
import { m as Primitive } from "./index-CLCQYvXI.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-TEQr-NGF.js";
import { F as FileText } from "./file-text-DGj9TgEW.js";
import { T as TriangleAlert } from "./triangle-alert-DIO5gKzW.js";
import { C as Clock } from "./clock-oc9nSZiX.js";
import { C as CircleCheck } from "./circle-check-Cw-FxxNn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode$1);
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
      d: "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z",
      key: "cpyugq"
    }
  ],
  ["path", { d: "M12 22v-3", key: "kmzjlo" }]
];
const TreePine = createLucideIcon("tree-pine", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
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
  "December"
];
const CURRENT_YEAR = (/* @__PURE__ */ new Date()).getFullYear();
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i);
function tsToDate(ts) {
  return new Date(Number(ts / 1000000n));
}
function formatDate(ts) {
  return tsToDate(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function formatAirParam(param) {
  if (param.__kind__ === "Other") return param.Other;
  return param.__kind__.replace("_", ".");
}
function inMonth(ts, year, month) {
  const d = tsToDate(ts);
  return d.getFullYear() === year && d.getMonth() === month;
}
function StatusBadge({ status }) {
  const cfg = {
    [TaskStatus.Completed]: {
      label: "Completed",
      cls: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" })
    },
    [TaskStatus.InProgress]: {
      label: "In Progress",
      cls: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" })
    },
    [TaskStatus.Overdue]: {
      label: "Overdue",
      cls: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" })
    },
    [TaskStatus.Pending]: {
      label: "Pending",
      cls: "bg-muted text-muted-foreground border-border",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" })
    }
  };
  const c = cfg[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      variant: "outline",
      className: `flex items-center gap-1 text-xs font-semibold whitespace-nowrap ${c.cls}`,
      children: [
        c.icon,
        c.label
      ]
    }
  );
}
function SectionHeading({
  icon,
  title,
  count
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm text-foreground tracking-tight", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "ml-auto text-xs tabular-nums", children: [
      count,
      " record",
      count !== 1 ? "s" : ""
    ] })
  ] });
}
function EmptyRow({
  cols,
  message,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    TableCell,
    {
      colSpan: cols,
      className: "text-center text-muted-foreground text-sm py-10",
      "data-ocid": ocid,
      children: message
    }
  ) });
}
function ComplianceSummarySection({ tasks }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-none border-border print-section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeading,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-4 h-4" }),
        title: "Compliance Tasks",
        count: tasks.length
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-0 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold pl-4 w-[35%]", children: "Task / Condition" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold w-16", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold whitespace-nowrap", children: "Due Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold", children: "Responsible Officer (RO)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: tasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyRow,
        {
          cols: 5,
          message: "No compliance tasks due this month.",
          ocid: "reports.compliance.empty_state"
        }
      ) : tasks.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableRow,
        {
          "data-ocid": `reports.compliance.item.${i + 1}`,
          className: "hover:bg-muted/30",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "pl-4 align-top py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-medium text-sm text-foreground",
                  title: t.title,
                  children: t.title
                }
              ),
              t.conditionText && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: t.conditionText })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "align-top py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs font-mono", children: t.taskType }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm whitespace-nowrap align-top py-3", children: formatDate(t.dueDate) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm align-top py-3", children: t.responsibleOfficer }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "align-top py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: t.status }) })
          ]
        },
        t.id.toString()
      )) })
    ] }) })
  ] });
}
function AirQualitySection({ readings }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-none border-border print-section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeading,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { className: "w-4 h-4" }),
        title: "Air Quality Monitoring",
        count: readings.length
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-0 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold pl-4 whitespace-nowrap", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold", children: "Parameter" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-right", children: "Value" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold", children: "Unit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold", children: "Location" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold", children: "Measured By" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: readings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyRow,
        {
          cols: 6,
          message: "No air quality readings recorded this month.",
          ocid: "reports.air.empty_state"
        }
      ) : readings.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableRow,
        {
          "data-ocid": `reports.air.item.${i + 1}`,
          className: "hover:bg-muted/30",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "pl-4 text-sm whitespace-nowrap", children: formatDate(r.date) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs font-mono", children: formatAirParam(r.parameter) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono text-sm font-semibold", children: r.value.toFixed(2) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: r.unit }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: r.location }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: r.measuredBy })
          ]
        },
        r.id.toString()
      )) })
    ] }) })
  ] });
}
function PiezometerSection({ readings }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-none border-border print-section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeading,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-4 h-4" }),
        title: "Piezometer / Groundwater Readings",
        count: readings.length
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-0 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold pl-4 whitespace-nowrap", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold", children: "Well ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-right whitespace-nowrap", children: "Depth to Water (m)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-right", children: "pH" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-right whitespace-nowrap", children: "Conductivity (µS/cm)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-right whitespace-nowrap", children: "Turbidity (NTU)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold", children: "Location" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: readings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyRow,
        {
          cols: 7,
          message: "No piezometer readings recorded this month.",
          ocid: "reports.piezo.empty_state"
        }
      ) : readings.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableRow,
        {
          "data-ocid": `reports.piezo.item.${i + 1}`,
          className: "hover:bg-muted/30",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "pl-4 text-sm whitespace-nowrap", children: formatDate(r.date) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-medium text-primary", children: r.wellId }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono text-sm", children: r.depthToWater.toFixed(2) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono text-sm", children: r.pH.toFixed(1) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono text-sm", children: r.conductivity.toFixed(1) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono text-sm", children: r.turbidity.toFixed(1) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: r.location })
          ]
        },
        r.id.toString()
      )) })
    ] }) })
  ] });
}
function TreesSection({ records }) {
  const totalCount = records.reduce((acc, r) => acc + Number(r.count), 0);
  const bySpecies = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const r of records) {
      map.set(r.species, (map.get(r.species) ?? 0) + Number(r.count));
    }
    return Array.from(map.entries()).map(([species, count]) => ({
      species,
      count
    }));
  }, [records]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-none border-border print-section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TreePine, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm text-foreground tracking-tight", children: "Trees Planted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "ml-auto text-xs tabular-nums", children: [
        records.length,
        " record",
        records.length !== 1 ? "s" : ""
      ] }),
      records.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary text-primary-foreground text-xs font-bold tabular-nums", children: [
        totalCount.toLocaleString(),
        " total trees"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-0 pb-4", children: records.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center text-muted-foreground text-sm py-10",
        "data-ocid": "reports.trees.empty_state",
        children: "No trees planted this month."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold pl-4 whitespace-nowrap", children: "Planting Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold", children: "Species" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-right", children: "Count" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold", children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold", children: "Planted By" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold", children: "Notes" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: records.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `reports.trees.item.${i + 1}`,
            className: "hover:bg-muted/30",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "pl-4 text-sm whitespace-nowrap", children: formatDate(r.plantingDate) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-sm", children: r.species }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono text-sm font-semibold text-primary", children: Number(r.count).toLocaleString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: r.location }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: r.plantedBy }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground max-w-xs truncate", children: r.notes || "—" })
            ]
          },
          r.id.toString()
        )) })
      ] }),
      bySpecies.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mt-3 bg-muted/40 rounded-lg p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Species Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: bySpecies.map(({ species, count }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-1.5 bg-card border border-border rounded-md px-2.5 py-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TreePine, { className: "w-3 h-3 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: species }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "— ",
                count.toLocaleString()
              ] })
            ]
          },
          species
        )) })
      ] })
    ] }) })
  ] });
}
function ReportsPage() {
  const now = /* @__PURE__ */ new Date();
  const [selectedMonth, setSelectedMonth] = reactExports.useState(now.getMonth());
  const [selectedYear, setSelectedYear] = reactExports.useState(now.getFullYear());
  const { data: allTasks, isLoading: loadingTasks } = useComplianceTasks();
  const { data: allAir, isLoading: loadingAir } = useAirReadings();
  const { data: allPiezo, isLoading: loadingPiezo } = usePiezoReadings();
  const { data: allTrees, isLoading: loadingTrees } = useTreeRecords();
  const isLoading = loadingTasks || loadingAir || loadingPiezo || loadingTrees;
  const filteredTasks = reactExports.useMemo(
    () => (allTasks ?? []).filter(
      (t) => inMonth(t.dueDate, selectedYear, selectedMonth)
    ),
    [allTasks, selectedYear, selectedMonth]
  );
  const filteredAir = reactExports.useMemo(
    () => (allAir ?? []).filter(
      (r) => inMonth(r.date, selectedYear, selectedMonth)
    ),
    [allAir, selectedYear, selectedMonth]
  );
  const filteredPiezo = reactExports.useMemo(
    () => (allPiezo ?? []).filter(
      (r) => inMonth(r.date, selectedYear, selectedMonth)
    ),
    [allPiezo, selectedYear, selectedMonth]
  );
  const filteredTrees = reactExports.useMemo(
    () => (allTrees ?? []).filter(
      (r) => inMonth(r.plantingDate, selectedYear, selectedMonth)
    ),
    [allTrees, selectedYear, selectedMonth]
  );
  const handlePrint = () => window.print();
  const reportLabel = `${MONTHS[selectedMonth]} ${selectedYear}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden print:block text-center mb-6 pb-4 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-1", children: "Coal Mine Environmental Monitoring" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-display font-bold text-foreground", children: [
        "Monthly Monitoring Report — ",
        reportLabel
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
        "Generated: ",
        (/* @__PURE__ */ new Date()).toLocaleString("en-IN")
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-4 lg:p-6 space-y-6 print:p-0 print:space-y-4",
        "data-ocid": "reports.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "print:hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PageHeader,
              {
                title: "Monthly Monitoring Report",
                subtitle: "Aggregate environmental compliance data for regulators",
                actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    className: "flex items-center gap-2",
                    onClick: handlePrint,
                    "data-ocid": "reports.print_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4" }),
                      "Print / Export"
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Report Period:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: String(selectedMonth),
                  onValueChange: (v) => setSelectedMonth(Number(v)),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "w-36 h-8 text-sm",
                        "data-ocid": "reports.month_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: MONTHS.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(i), children: m }, m)) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: String(selectedYear),
                  onValueChange: (v) => setSelectedYear(Number(v)),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "w-24 h-8 text-sm",
                        "data-ocid": "reports.year_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: YEAR_OPTIONS.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(y), children: y }, y)) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Separator,
                {
                  orientation: "vertical",
                  className: "h-5 mx-1 hidden sm:block"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "Showing data for",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: reportLabel })
              ] })
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden print:flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Period: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: reportLabel })
            ] })
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { rows: 5 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { rows: 3 })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ComplianceSummarySection, { tasks: filteredTasks }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AirQualitySection, { readings: filteredAir }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PiezometerSection, { readings: filteredPiezo }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TreesSection, { records: filteredTrees })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
      ` })
  ] });
}
export {
  ReportsPage as default
};
