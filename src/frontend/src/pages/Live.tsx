import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Clock, Eye, Play, Radio, Wifi } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { StreamStatus } from "../backend";
import { StreamStatusBadge } from "../components/badges";
import { useStreams } from "../hooks/use-backend";
import type { LiveStream } from "../types";

// ── Filter tab type ────────────────────────────────────────────────────────────

type FilterTab = "all" | "live" | "upcoming" | "ended";

// ── Placeholder video player ───────────────────────────────────────────────────

function VideoPlaceholder({
  isLive,
  title,
}: { isLive: boolean; title: string }) {
  return (
    <div className="aspect-video w-full rounded-md overflow-hidden flex flex-col items-center justify-center gap-3 relative bg-background">
      {/* Decorative grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {isLive && (
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-chart-3 text-primary-foreground text-xs font-black px-2 py-1 rounded-sm tracking-widest">
          <span className="w-2 h-2 rounded-full bg-primary-foreground animate-ping inline-block" />
          LIVE NOW
        </span>
      )}
      <div className="z-10 flex flex-col items-center gap-2 text-center px-4">
        <div className="w-14 h-14 rounded-full border-2 border-accent/40 flex items-center justify-center">
          <Play className="w-6 h-6 text-accent fill-accent" />
        </div>
        <p className="text-xs text-muted-foreground font-semibold max-w-[180px] leading-snug">
          Stream will load here
        </p>
        <p className="text-[10px] text-muted-foreground/60 font-medium truncate max-w-[200px]">
          {title}
        </p>
      </div>
    </div>
  );
}

// ── Stream card ────────────────────────────────────────────────────────────────

function StreamCard({ stream }: { stream: LiveStream }) {
  const isLive = stream.status === StreamStatus.Live;
  const isUpcoming = stream.status === StreamStatus.Upcoming;
  const showPlayer = isLive || isUpcoming;

  const formattedTime = useMemo(() => {
    const ms = Number(stream.start_time / 1_000_000n);
    if (!ms) return null;
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date(ms));
  }, [stream.start_time]);

  return (
    <div
      className={cn(
        "card-news flex flex-col gap-0 overflow-hidden p-0 group",
        isLive &&
          "border-chart-3/60 shadow-[0_0_12px_oklch(0.55_0.22_25/0.25)]",
        isUpcoming && "border-accent/40",
      )}
      data-ocid={`stream-card-${stream.id}`}
    >
      {/* Video area */}
      {showPlayer ? (
        <VideoPlaceholder isLive={isLive} title={stream.title} />
      ) : (
        <div className="aspect-video w-full flex items-center justify-center bg-muted/30">
          <Radio className="w-8 h-8 text-muted-foreground/40" />
        </div>
      )}

      {/* Card body */}
      <div className="flex flex-col gap-3 p-4">
        {/* Top row: status badge + source name */}
        <div className="flex items-center justify-between gap-2">
          <StreamStatusBadge status={stream.status} />
          <span className="text-xs font-bold text-muted-foreground truncate max-w-[120px]">
            {stream.source}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-black text-foreground line-clamp-2 leading-snug group-hover:text-accent transition-colors duration-200">
          {stream.title}
        </h3>

        {/* Description */}
        {stream.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {stream.description}
          </p>
        )}

        {/* Meta row */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-border">
          {formattedTime && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
              <Clock className="w-3 h-3" />
              {formattedTime} IST
            </span>
          )}
          {isLive && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-chart-3">
              <Wifi className="w-3 h-3" />
              Broadcasting
            </span>
          )}
          {isUpcoming && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-accent">
              <Eye className="w-3 h-3" />
              Set Reminder
            </span>
          )}
        </div>

        {/* Source reliability for LIVE streams */}
        {isLive && (
          <div className="flex items-center gap-2 bg-muted/40 rounded-sm px-2 py-1.5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Source Reliability
            </span>
            <span
              className={cn(
                "text-[10px] font-black px-1.5 py-0.5 rounded-sm",
                stream.source === "DD News" || stream.source === "Doordarshan"
                  ? "bg-chart-1 text-primary-foreground"
                  : "bg-chart-2 text-primary-foreground",
              )}
            >
              HIGH
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Skeleton card ──────────────────────────────────────────────────────────────

function StreamSkeleton() {
  return (
    <div className="card-news p-0 overflow-hidden">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-16 rounded-sm" />
          <Skeleton className="h-4 w-24 rounded-sm" />
        </div>
        <Skeleton className="h-4 w-full rounded-sm" />
        <Skeleton className="h-4 w-3/4 rounded-sm" />
        <Skeleton className="h-3 w-1/2 rounded-sm" />
      </div>
    </div>
  );
}

// ── Filter tabs ────────────────────────────────────────────────────────────────

const TABS: { key: FilterTab; label: string; icon?: React.ReactNode }[] = [
  { key: "all", label: "All Streams" },
  {
    key: "live",
    label: "Live Now",
    icon: (
      <span className="w-2 h-2 rounded-full bg-chart-3 animate-pulse inline-block" />
    ),
  },
  { key: "upcoming", label: "Upcoming" },
  { key: "ended", label: "Ended" },
];

// ── Main page ──────────────────────────────────────────────────────────────────

export default function Live() {
  // Filter state stored in URL search params via native API for type-safe compatibility
  const [activeFilter, setActiveFilter] = useState<FilterTab>(() => {
    const params = new URLSearchParams(window.location.search);
    const f = params.get("filter");
    return f === "live" || f === "upcoming" || f === "ended" ? f : "all";
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeFilter === "all") {
      url.searchParams.delete("filter");
    } else {
      url.searchParams.set("filter", activeFilter);
    }
    window.history.replaceState(null, "", url.toString());
  }, [activeFilter]);

  const { data: streams, isLoading } = useStreams();

  const liveStreams = useMemo(
    () => streams?.filter((s) => s.status === StreamStatus.Live) ?? [],
    [streams],
  );
  const upcomingStreams = useMemo(
    () => streams?.filter((s) => s.status === StreamStatus.Upcoming) ?? [],
    [streams],
  );
  const endedStreams = useMemo(
    () => streams?.filter((s) => s.status === StreamStatus.Ended) ?? [],
    [streams],
  );

  const filtered = useMemo(() => {
    if (!streams) return [];
    switch (activeFilter) {
      case "live":
        return liveStreams;
      case "upcoming":
        return upcomingStreams;
      case "ended":
        return endedStreams;
      default:
        return streams;
    }
  }, [streams, activeFilter, liveStreams, upcomingStreams, endedStreams]);

  function setFilter(tab: FilterTab) {
    setActiveFilter(tab);
  }

  const tabCounts: Record<FilterTab, number> = {
    all: streams?.length ?? 0,
    live: liveStreams.length,
    upcoming: upcomingStreams.length,
    ended: endedStreams.length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ── Section header ── */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {liveStreams.length > 0 && (
              <span className="w-3 h-3 rounded-full bg-chart-3 animate-ping absolute" />
            )}
            <Radio className="w-7 h-7 text-accent relative z-10" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
            Live Broadcast
          </h1>
          {liveStreams.length > 0 && (
            <span className="inline-flex items-center gap-1.5 bg-chart-3 text-primary-foreground text-xs font-black px-2 py-1 rounded-sm tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-ping" />
              {liveStreams.length} LIVE
            </span>
          )}
        </div>
        <p className="text-muted-foreground font-semibold text-sm ml-9">
          Bharat Netra live coverage — real-time verified streams from trusted
          sources across India.
        </p>
      </div>

      {/* ── Filter tabs ── */}
      <div
        className="flex items-center gap-1 bg-card border border-border rounded-md p-1 w-fit"
        data-ocid="live-filter-tabs"
        role="tablist"
        aria-label="Filter streams"
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeFilter === tab.key}
            onClick={() => setFilter(tab.key)}
            type="button"
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-black transition-smooth whitespace-nowrap",
              activeFilter === tab.key
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
            data-ocid={`filter-tab-${tab.key}`}
          >
            {tab.icon}
            {tab.label}
            <span
              className={cn(
                "text-[10px] font-black px-1.5 py-0.5 rounded-sm ml-0.5",
                activeFilter === tab.key
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {tabCounts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
            <StreamSkeleton key={k} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-24 text-center"
          data-ocid="live-empty"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Radio className="w-7 h-7 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-black text-foreground">
            {activeFilter === "live"
              ? "No live streams right now"
              : activeFilter === "upcoming"
                ? "No upcoming streams scheduled"
                : activeFilter === "ended"
                  ? "No past streams yet"
                  : "No streams available"}
          </h2>
          <p className="text-muted-foreground font-semibold mt-2 max-w-sm text-sm">
            {activeFilter === "live"
              ? "Live broadcasts will appear here as they begin. Check back soon."
              : "Streams will appear here once they are scheduled or completed."}
          </p>
          {activeFilter !== "all" && (
            <button
              onClick={() => setFilter("all")}
              type="button"
              className="mt-4 text-xs font-black text-accent hover:underline"
              data-ocid="live-empty-view-all"
            >
              View all streams →
            </button>
          )}
        </div>
      ) : activeFilter !== "all" ? (
        /* Single filtered grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s) => (
            <StreamCard key={s.id.toString()} stream={s} />
          ))}
        </div>
      ) : (
        /* All: grouped by status */
        <div className="space-y-10">
          {liveStreams.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-chart-3 animate-pulse" />
                <h2 className="text-xs font-black uppercase tracking-widest text-chart-3">
                  Currently Live
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {liveStreams.map((s) => (
                  <StreamCard key={s.id.toString()} stream={s} />
                ))}
              </div>
            </section>
          )}

          {upcomingStreams.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <h2 className="text-xs font-black uppercase tracking-widest text-accent">
                  Upcoming Streams
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {upcomingStreams.map((s) => (
                  <StreamCard key={s.id.toString()} stream={s} />
                ))}
              </div>
            </section>
          )}

          {endedStreams.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Past Streams
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {endedStreams.map((s) => (
                  <StreamCard key={s.id.toString()} stream={s} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
