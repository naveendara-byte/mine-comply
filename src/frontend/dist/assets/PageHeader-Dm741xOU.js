import { j as jsxRuntimeExports, b as cn } from "./index-TQY_iKlQ.js";
function PageHeader({
  title,
  subtitle,
  actions,
  className,
  badge
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between border-b border-border pb-4 mb-6",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground tracking-tight truncate", children: title }),
            badge
          ] }),
          subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: subtitle })
        ] }),
        actions && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-shrink-0 mt-2 sm:mt-0", children: actions })
      ]
    }
  );
}
export {
  PageHeader as P
};
