import { cn } from "@/lib/utils";
import { Classification, SourceReliability } from "../backend";
import type { BiasIndicator } from "../types";

// ── Truth Score Badge ──────────────────────────────────────────────────────────

interface TruthScoreBadgeProps {
  score: bigint | number;
  className?: string;
  showLabel?: boolean;
}

export function TruthScoreBadge({
  score,
  className,
  showLabel = false,
}: TruthScoreBadgeProps) {
  const n = Number(score);
  const tier = n >= 70 ? "high" : n >= 30 ? "medium" : "low";
  const label = n >= 70 ? "Verified" : n >= 30 ? "Partial" : "Low";
  const badgeClass =
    tier === "high"
      ? "badge-truth-high"
      : tier === "medium"
        ? "badge-truth-medium"
        : "badge-truth-low";

  return (
    <span
      className={cn(badgeClass, "gap-1", className)}
      data-ocid="truth-score-badge"
    >
      <span className="font-mono text-xs font-bold">{n}</span>
      {showLabel && <span className="text-xs opacity-90">{label}</span>}
    </span>
  );
}

// ── Bias Indicator Badge ───────────────────────────────────────────────────────

interface BiasIndicatorBadgeProps {
  bias: BiasIndicator;
  className?: string;
}

export function BiasIndicatorBadge({
  bias,
  className,
}: BiasIndicatorBadgeProps) {
  const value =
    typeof bias === "string"
      ? bias
      : "Low" in bias
        ? "Low"
        : "Medium" in bias
          ? "Medium"
          : "High";
  const colorClass =
    value === "Low"
      ? "bg-chart-1 text-white"
      : value === "Medium"
        ? "bg-chart-2 text-white"
        : "bg-chart-3 text-white";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-1 font-bold text-xs",
        colorClass,
        className,
      )}
      data-ocid="bias-indicator-badge"
    >
      Bias: {value}
    </span>
  );
}

// ── Source Reliability Badge ───────────────────────────────────────────────────

interface SourceReliabilityBadgeProps {
  reliability: SourceReliability;
  className?: string;
}

export function SourceReliabilityBadge({
  reliability,
  className,
}: SourceReliabilityBadgeProps) {
  const colorClass =
    reliability === SourceReliability.High
      ? "bg-chart-1 text-white"
      : reliability === SourceReliability.Medium
        ? "bg-chart-2 text-white"
        : "bg-chart-3 text-white";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-1 font-bold text-xs",
        colorClass,
        className,
      )}
      data-ocid="source-reliability-badge"
    >
      Source: {reliability}
    </span>
  );
}

// ── Classification Badge ───────────────────────────────────────────────────────

interface ClassificationBadgeProps {
  classification: Classification;
  className?: string;
}

export function ClassificationBadge({
  classification,
  className,
}: ClassificationBadgeProps) {
  const colorClass =
    classification === Classification.Fact
      ? "bg-accent text-accent-foreground"
      : classification === Classification.Opinion
        ? "bg-primary text-primary-foreground"
        : "bg-muted text-muted-foreground";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-1 font-bold text-xs uppercase tracking-wide",
        colorClass,
        className,
      )}
      data-ocid="classification-badge"
    >
      {classification}
    </span>
  );
}

// ── Stream Status Badge ────────────────────────────────────────────────────────

import { StreamStatus } from "../backend";

interface StreamStatusBadgeProps {
  status: StreamStatus;
  className?: string;
}

export function StreamStatusBadge({
  status,
  className,
}: StreamStatusBadgeProps) {
  const colorClass =
    status === StreamStatus.Live
      ? "bg-chart-3 text-white animate-pulse"
      : status === StreamStatus.Upcoming
        ? "bg-primary text-primary-foreground"
        : "bg-muted text-muted-foreground";

  const label =
    status === StreamStatus.Live
      ? "● LIVE"
      : status === StreamStatus.Upcoming
        ? "UPCOMING"
        : "ENDED";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-1 font-bold text-xs tracking-wider",
        colorClass,
        className,
      )}
      data-ocid="stream-status-badge"
    >
      {label}
    </span>
  );
}
