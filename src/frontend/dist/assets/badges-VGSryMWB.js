import { j as jsxRuntimeExports, a as cn } from "./index-CL-FxwHs.js";
import { c as SourceReliability, S as StreamStatus, C as Classification } from "./use-backend-D5H3Go86.js";
function TruthScoreBadge({
  score,
  className,
  showLabel = false
}) {
  const n = Number(score);
  const tier = n >= 70 ? "high" : n >= 30 ? "medium" : "low";
  const label = n >= 70 ? "Verified" : n >= 30 ? "Partial" : "Low";
  const badgeClass = tier === "high" ? "badge-truth-high" : tier === "medium" ? "badge-truth-medium" : "badge-truth-low";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(badgeClass, "gap-1", className),
      "data-ocid": "truth-score-badge",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-bold", children: n }),
        showLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-90", children: label })
      ]
    }
  );
}
function BiasIndicatorBadge({
  bias,
  className
}) {
  const value = typeof bias === "string" ? bias : "Low" in bias ? "Low" : "Medium" in bias ? "Medium" : "High";
  const colorClass = value === "Low" ? "bg-chart-1 text-white" : value === "Medium" ? "bg-chart-2 text-white" : "bg-chart-3 text-white";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-sm px-2 py-1 font-bold text-xs",
        colorClass,
        className
      ),
      "data-ocid": "bias-indicator-badge",
      children: [
        "Bias: ",
        value
      ]
    }
  );
}
function SourceReliabilityBadge({
  reliability,
  className
}) {
  const colorClass = reliability === SourceReliability.High ? "bg-chart-1 text-white" : reliability === SourceReliability.Medium ? "bg-chart-2 text-white" : "bg-chart-3 text-white";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-sm px-2 py-1 font-bold text-xs",
        colorClass,
        className
      ),
      "data-ocid": "source-reliability-badge",
      children: [
        "Source: ",
        reliability
      ]
    }
  );
}
function ClassificationBadge({
  classification,
  className
}) {
  const colorClass = classification === Classification.Fact ? "bg-accent text-accent-foreground" : classification === Classification.Opinion ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-sm px-2 py-1 font-bold text-xs uppercase tracking-wide",
        colorClass,
        className
      ),
      "data-ocid": "classification-badge",
      children: classification
    }
  );
}
function StreamStatusBadge({
  status,
  className
}) {
  const colorClass = status === StreamStatus.Live ? "bg-chart-3 text-white animate-pulse" : status === StreamStatus.Upcoming ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground";
  const label = status === StreamStatus.Live ? "● LIVE" : status === StreamStatus.Upcoming ? "UPCOMING" : "ENDED";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-sm px-2 py-1 font-bold text-xs tracking-wider",
        colorClass,
        className
      ),
      "data-ocid": "stream-status-badge",
      children: label
    }
  );
}
export {
  BiasIndicatorBadge as B,
  ClassificationBadge as C,
  SourceReliabilityBadge as S,
  TruthScoreBadge as T,
  StreamStatusBadge as a
};
