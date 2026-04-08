import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  AlertTriangle,
  BarChart2,
  CheckCircle,
  Eye,
  Radio,
  RefreshCw,
  Shield,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDashboard } from "../hooks/use-backend";
import type { DashboardStats } from "../types";

// ── Helpers ───────────────────────────────────────────────────────────────────

function toNum(v: bigint | number) {
  return typeof v === "bigint" ? Number(v) : v;
}

function pct(part: bigint | number, total: bigint | number) {
  const t = toNum(total);
  if (t === 0) return "0%";
  return `${Math.round((toNum(part) / t) * 100)}%`;
}

function formatIST(nanoTs: bigint) {
  const ms = Number(nanoTs / 1_000_000n);
  if (ms === 0) return "—";
  return `${new Date(ms).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })} IST`;
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

type AccentColor = "green" | "amber" | "red" | "saffron" | "default";

interface StatCardProps {
  label: string;
  value: bigint | number;
  sublabel?: string;
  accent?: AccentColor;
  icon: React.ReactNode;
  featured?: boolean;
}

const ACCENT_MAP: Record<AccentColor, string> = {
  green: "text-chart-1",
  amber: "text-chart-2",
  red: "text-chart-3",
  saffron: "text-accent",
  default: "text-foreground",
};

const BORDER_MAP: Record<AccentColor, string> = {
  green: "border-chart-1/30",
  amber: "border-chart-2/30",
  red: "border-chart-3/30",
  saffron: "border-accent/40",
  default: "border-border",
};

function StatCard({
  label,
  value,
  sublabel,
  accent = "default",
  icon,
  featured = false,
}: StatCardProps) {
  const colorClass = ACCENT_MAP[accent];
  const borderClass = BORDER_MAP[accent];

  return (
    <div
      className={`bg-card border ${borderClass} rounded-lg p-5 flex flex-col gap-3 transition-smooth hover:border-opacity-70`}
      data-ocid="stat-card"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-black uppercase tracking-widest text-muted-foreground leading-tight">
          {label}
        </span>
        <span className={`${colorClass} shrink-0`}>{icon}</span>
      </div>
      <span
        className={`${featured ? "text-4xl" : "text-3xl"} font-black font-mono ${colorClass} leading-none`}
      >
        {toNum(value).toLocaleString("en-IN")}
      </span>
      {sublabel && (
        <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
          {sublabel}
        </span>
      )}
    </div>
  );
}

// ── Progress Bar Row ──────────────────────────────────────────────────────────

interface ProgressRowProps {
  label: string;
  count: number;
  total: number;
  colorClass: string;
}

function ProgressRow({ label, count, total, colorClass }: ProgressRowProps) {
  const pctNum = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm font-bold">
        <span className="text-foreground uppercase tracking-wider text-xs">
          {label}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {count.toLocaleString("en-IN")}{" "}
          <span className="text-muted-foreground/60">({pctNum}%)</span>
        </span>
      </div>
      <div className="h-2.5 bg-muted/50 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${colorClass} transition-all duration-700`}
          style={{ width: `${pctNum}%` }}
        />
      </div>
    </div>
  );
}

// ── Recharts custom tooltip ───────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-md px-3 py-2 text-xs font-bold shadow-lg">
      <p className="text-muted-foreground uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-foreground font-mono">
        {payload[0].value.toLocaleString("en-IN")} articles
      </p>
    </div>
  );
}

// ── Propaganda Type Badges ────────────────────────────────────────────────────

const PROPAGANDA_TYPES = [
  { label: "Emotional Manipulation", key: "emotional_manipulation" },
  { label: "Fear-Based Language", key: "fear_based_language" },
  { label: "Selective Facts", key: "selective_facts" },
  { label: "Ideological Pushing", key: "ideological_pushing" },
];

// ── Main Stats Grid ───────────────────────────────────────────────────────────

function StatsGrid({ stats }: { stats: DashboardStats }) {
  const total = toNum(stats.total_articles) || 1;
  const factPct = pct(stats.verified_count, total);
  const propagandaPct = pct(stats.propaganda_alert_count, total);
  const hasAlert = toNum(stats.propaganda_alert_count) > 0;

  // Bias chart data
  const biasData = [
    { name: "Low", count: toNum(stats.low_bias_count) },
    { name: "Medium", count: toNum(stats.medium_bias_count) },
    { name: "High", count: toNum(stats.high_bias_count) },
  ];

  // Classification pie data
  const classData = [
    {
      name: "Fact",
      value: toNum(stats.verified_count),
      color: "var(--color-chart-1)",
    },
    {
      name: "Opinion",
      value: toNum(stats.opinion_count),
      color: "var(--color-chart-2)",
    },
    {
      name: "Unverified",
      value: toNum(stats.unverified_count),
      color: "var(--color-chart-3)",
    },
  ];

  // Reliability chart data
  const reliabilityData = [
    { name: "High", count: toNum(stats.high_reliability_count) },
    { name: "Medium", count: toNum(stats.medium_reliability_count) },
    { name: "Low", count: toNum(stats.low_reliability_count) },
  ];

  const biasColors = [
    "var(--color-chart-1)",
    "var(--color-chart-2)",
    "var(--color-chart-3)",
  ];

  const reliabilityColors = [
    "var(--color-chart-1)",
    "var(--color-chart-2)",
    "var(--color-chart-3)",
  ];

  return (
    <div className="space-y-8">
      {/* ── Primary KPI Row ── */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground px-2">
            Primary Metrics
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          data-ocid="kpi-row"
        >
          <StatCard
            label="Total Articles"
            value={stats.total_articles}
            sublabel={`${factPct} verified as FACT`}
            accent="saffron"
            icon={<Eye className="w-5 h-5" />}
            featured
          />
          <StatCard
            label="Propaganda Alerts"
            value={stats.propaganda_alert_count}
            sublabel={`${propagandaPct} of total`}
            accent={hasAlert ? "red" : "green"}
            icon={<AlertTriangle className="w-5 h-5" />}
            featured
          />
          <StatCard
            label="High Reliability Sources"
            value={stats.high_reliability_count}
            sublabel={`${pct(stats.high_reliability_count, total)} of total`}
            accent="green"
            icon={<Shield className="w-5 h-5" />}
            featured
          />
          <StatCard
            label="Low Bias Articles"
            value={stats.low_bias_count}
            sublabel={`${pct(stats.low_bias_count, total)} of total`}
            accent="green"
            icon={<CheckCircle className="w-5 h-5" />}
            featured
          />
        </div>
      </section>

      {/* ── Bias Distribution + Classification Breakdown ── */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground px-2">
            Analysis Breakdown
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bias Distribution */}
          <div
            className="bg-card border border-border rounded-lg p-6 space-y-5"
            data-ocid="bias-distribution"
          >
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent" />
              <h3 className="text-xs font-black uppercase tracking-widest text-foreground">
                Bias Distribution
              </h3>
            </div>
            <div className="space-y-4">
              <ProgressRow
                label="Low Bias"
                count={toNum(stats.low_bias_count)}
                total={total}
                colorClass="bg-chart-1"
              />
              <ProgressRow
                label="Medium Bias"
                count={toNum(stats.medium_bias_count)}
                total={total}
                colorClass="bg-chart-2"
              />
              <ProgressRow
                label="High Bias"
                count={toNum(stats.high_bias_count)}
                total={total}
                colorClass="bg-chart-3"
              />
            </div>
            <div className="h-44 -mx-2 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={biasData} barCategoryGap="35%">
                  <XAxis
                    dataKey="name"
                    tick={{
                      fill: "oklch(var(--muted-foreground))",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {biasData.map((_entry, i) => (
                      <Cell key={_entry.name} fill={biasColors[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Classification Breakdown */}
          <div
            className="bg-card border border-border rounded-lg p-6 space-y-5"
            data-ocid="classification-breakdown"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <h3 className="text-xs font-black uppercase tracking-widest text-foreground">
                Classification Breakdown
              </h3>
            </div>
            <div className="space-y-4">
              <ProgressRow
                label="Fact"
                count={toNum(stats.verified_count)}
                total={total}
                colorClass="bg-chart-1"
              />
              <ProgressRow
                label="Opinion"
                count={toNum(stats.opinion_count)}
                total={total}
                colorClass="bg-chart-2"
              />
              <ProgressRow
                label="Unverified"
                count={toNum(stats.unverified_count)}
                total={total}
                colorClass="bg-chart-3"
              />
            </div>
            <div className="h-44 -mx-2 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={classData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={42}
                    outerRadius={70}
                    paddingAngle={3}
                  >
                    {classData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    formatter={(value: string) => (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ── Source Reliability Breakdown ── */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground px-2">
            Source Reliability
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div
          className="bg-card border border-border rounded-lg p-6"
          data-ocid="source-reliability"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <ProgressRow
                label="High Reliability"
                count={toNum(stats.high_reliability_count)}
                total={total}
                colorClass="bg-chart-1"
              />
              <ProgressRow
                label="Medium Reliability"
                count={toNum(stats.medium_reliability_count)}
                total={total}
                colorClass="bg-chart-2"
              />
              <ProgressRow
                label="Low Reliability"
                count={toNum(stats.low_reliability_count)}
                total={total}
                colorClass="bg-chart-3"
              />
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={reliabilityData}
                  layout="vertical"
                  barCategoryGap="30%"
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{
                      fill: "oklch(var(--muted-foreground))",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                    axisLine={false}
                    tickLine={false}
                    width={64}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {reliabilityData.map((_entry, i) => (
                      <Cell key={_entry.name} fill={reliabilityColors[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ── Propaganda Analysis Summary ── */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground px-2">
            Propaganda Analysis Summary
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div
          className={`bg-card border rounded-lg p-6 ${hasAlert ? "border-chart-3/50" : "border-chart-1/30"}`}
          data-ocid="propaganda-summary"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex items-center gap-4 shrink-0">
              <div
                className={`w-16 h-16 rounded-lg flex items-center justify-center ${hasAlert ? "bg-chart-3/10 border border-chart-3/30" : "bg-chart-1/10 border border-chart-1/30"}`}
              >
                <AlertTriangle
                  className={`w-8 h-8 ${hasAlert ? "text-chart-3" : "text-chart-1"}`}
                />
              </div>
              <div>
                <div
                  className={`text-4xl font-black font-mono ${hasAlert ? "text-chart-3" : "text-chart-1"}`}
                >
                  {toNum(stats.propaganda_alert_count).toLocaleString("en-IN")}
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mt-0.5">
                  Active Propaganda Alerts
                </div>
                <div className="text-xs text-muted-foreground font-semibold mt-1">
                  {propagandaPct} of analyzed content
                </div>
              </div>
            </div>
            <div className="sm:border-l sm:border-border sm:pl-6 flex-1">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">
                Detected Manipulation Types
              </p>
              <div className="flex flex-wrap gap-2">
                {PROPAGANDA_TYPES.map((t) => (
                  <Badge
                    key={t.key}
                    variant="secondary"
                    className="text-xs font-bold uppercase tracking-wider px-3 py-1"
                    data-ocid={`propaganda-type-${t.key}`}
                  >
                    {t.label}
                  </Badge>
                ))}
              </div>
              {!hasAlert && (
                <p className="text-xs text-chart-1 font-bold mt-3 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  No active propaganda alerts detected
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const {
    data: stats,
    isLoading,
    dataUpdatedAt,
    refetch,
    isFetching,
  } = useDashboard();

  const lastRefreshed = dataUpdatedAt
    ? `${new Date(dataUpdatedAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })} IST`
    : "—";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ── Page Header ── */}
      <header
        className="border-b border-border pb-6"
        data-ocid="dashboard-header"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1 h-8 bg-accent rounded-full" />
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground uppercase">
                Intelligence Dashboard
              </h1>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-accent pl-4">
              Bharat Netra Truth Network
            </p>
            <p className="text-sm text-muted-foreground font-semibold mt-2 pl-4">
              Real-time aggregate truth metrics — platform-level transparency
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
              <Radio className="w-3.5 h-3.5 text-chart-1" />
              <span>
                Last updated:{" "}
                {stats ? formatIST(stats.last_updated) : lastRefreshed}
              </span>
            </div>
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted hover:bg-muted/80 text-xs font-bold uppercase tracking-wider text-foreground transition-smooth border border-border disabled:opacity-50"
              data-ocid="refresh-btn"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      {isLoading ? (
        <div className="space-y-8" data-ocid="dashboard-loading">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {["k1", "k2", "k3", "k4"].map((k) => (
              <Skeleton key={k} className="h-32 rounded-lg" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-64 rounded-lg" />
            <Skeleton className="h-64 rounded-lg" />
          </div>
          <Skeleton className="h-48 rounded-lg" />
        </div>
      ) : !stats ? (
        <div
          className="flex flex-col items-center justify-center py-24 text-center"
          data-ocid="dashboard-empty"
        >
          <div className="w-20 h-20 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-6">
            <BarChart2 className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-black uppercase tracking-wider text-foreground">
            No Data Yet
          </h2>
          <p className="text-muted-foreground font-semibold mt-2 max-w-sm text-sm">
            Intelligence statistics will populate as articles are submitted and
            analyzed.
          </p>
        </div>
      ) : (
        <StatsGrid stats={stats} />
      )}

      {/* ── Refresh Indicator ── */}
      <footer
        className="border-t border-border pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-semibold"
        data-ocid="refresh-indicator"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-chart-1 animate-pulse" />
          <span>Live monitoring active — data refreshes every 30 seconds</span>
        </div>
        <span>
          Frontend last polled:{" "}
          <span className="font-mono text-foreground">{lastRefreshed}</span>
        </span>
      </footer>
    </div>
  );
}
