import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, R as Radio, a as cn, S as Skeleton, E as Eye } from "./index-CL-FxwHs.js";
import { b as useStreams, S as StreamStatus } from "./use-backend-D5H3Go86.js";
import { a as StreamStatusBadge } from "./badges-VGSryMWB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
];
const Wifi = createLucideIcon("wifi", __iconNode);
function VideoPlaceholder({
  isLive,
  title
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-video w-full rounded-md overflow-hidden flex flex-col items-center justify-center gap-3 relative bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 opacity-10",
        style: {
          backgroundImage: "linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }
      }
    ),
    isLive && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-3 left-3 inline-flex items-center gap-1.5 bg-chart-3 text-primary-foreground text-xs font-black px-2 py-1 rounded-sm tracking-widest", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary-foreground animate-ping inline-block" }),
      "LIVE NOW"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "z-10 flex flex-col items-center gap-2 text-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full border-2 border-accent/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-6 h-6 text-accent fill-accent" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-semibold max-w-[180px] leading-snug", children: "Stream will load here" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/60 font-medium truncate max-w-[200px]", children: title })
    ] })
  ] });
}
function StreamCard({ stream }) {
  const isLive = stream.status === StreamStatus.Live;
  const isUpcoming = stream.status === StreamStatus.Upcoming;
  const showPlayer = isLive || isUpcoming;
  const formattedTime = reactExports.useMemo(() => {
    const ms = Number(stream.start_time / 1000000n);
    if (!ms) return null;
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata"
    }).format(new Date(ms));
  }, [stream.start_time]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "card-news flex flex-col gap-0 overflow-hidden p-0 group",
        isLive && "border-chart-3/60 shadow-[0_0_12px_oklch(0.55_0.22_25/0.25)]",
        isUpcoming && "border-accent/40"
      ),
      "data-ocid": `stream-card-${stream.id}`,
      children: [
        showPlayer ? /* @__PURE__ */ jsxRuntimeExports.jsx(VideoPlaceholder, { isLive, title: stream.title }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video w-full flex items-center justify-center bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-8 h-8 text-muted-foreground/40" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StreamStatusBadge, { status: stream.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-muted-foreground truncate max-w-[120px]", children: stream.source })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-black text-foreground line-clamp-2 leading-snug group-hover:text-accent transition-colors duration-200", children: stream.title }),
          stream.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: stream.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 pt-1 border-t border-border", children: [
            formattedTime && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              formattedTime,
              " IST"
            ] }),
            isLive && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] font-bold text-chart-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-3 h-3" }),
              "Broadcasting"
            ] }),
            isUpcoming && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] font-bold text-accent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
              "Set Reminder"
            ] })
          ] }),
          isLive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-muted/40 rounded-sm px-2 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-muted-foreground uppercase tracking-wider", children: "Source Reliability" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "text-[10px] font-black px-1.5 py-0.5 rounded-sm",
                  stream.source === "DD News" || stream.source === "Doordarshan" ? "bg-chart-1 text-primary-foreground" : "bg-chart-2 text-primary-foreground"
                ),
                children: "HIGH"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function StreamSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-news p-0 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-video w-full rounded-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 rounded-sm" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full rounded-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4 rounded-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2 rounded-sm" })
    ] })
  ] });
}
const TABS = [
  { key: "all", label: "All Streams" },
  {
    key: "live",
    label: "Live Now",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-chart-3 animate-pulse inline-block" })
  },
  { key: "upcoming", label: "Upcoming" },
  { key: "ended", label: "Ended" }
];
function Live() {
  const [activeFilter, setActiveFilter] = reactExports.useState(() => {
    const params = new URLSearchParams(window.location.search);
    const f = params.get("filter");
    return f === "live" || f === "upcoming" || f === "ended" ? f : "all";
  });
  reactExports.useEffect(() => {
    const url = new URL(window.location.href);
    if (activeFilter === "all") {
      url.searchParams.delete("filter");
    } else {
      url.searchParams.set("filter", activeFilter);
    }
    window.history.replaceState(null, "", url.toString());
  }, [activeFilter]);
  const { data: streams, isLoading } = useStreams();
  const liveStreams = reactExports.useMemo(
    () => (streams == null ? void 0 : streams.filter((s) => s.status === StreamStatus.Live)) ?? [],
    [streams]
  );
  const upcomingStreams = reactExports.useMemo(
    () => (streams == null ? void 0 : streams.filter((s) => s.status === StreamStatus.Upcoming)) ?? [],
    [streams]
  );
  const endedStreams = reactExports.useMemo(
    () => (streams == null ? void 0 : streams.filter((s) => s.status === StreamStatus.Ended)) ?? [],
    [streams]
  );
  const filtered = reactExports.useMemo(() => {
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
  function setFilter(tab) {
    setActiveFilter(tab);
  }
  const tabCounts = {
    all: (streams == null ? void 0 : streams.length) ?? 0,
    live: liveStreams.length,
    upcoming: upcomingStreams.length,
    ended: endedStreams.length
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          liveStreams.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full bg-chart-3 animate-ping absolute" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-7 h-7 text-accent relative z-10" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black tracking-tight text-foreground uppercase", children: "Live Broadcast" }),
        liveStreams.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 bg-chart-3 text-primary-foreground text-xs font-black px-2 py-1 rounded-sm tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary-foreground animate-ping" }),
          liveStreams.length,
          " LIVE"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-semibold text-sm ml-9", children: "Bharat Netra live coverage — real-time verified streams from trusted sources across India." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center gap-1 bg-card border border-border rounded-md p-1 w-fit",
        "data-ocid": "live-filter-tabs",
        role: "tablist",
        "aria-label": "Filter streams",
        children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            role: "tab",
            "aria-selected": activeFilter === tab.key,
            onClick: () => setFilter(tab.key),
            type: "button",
            className: cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-black transition-smooth whitespace-nowrap",
              activeFilter === tab.key ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"
            ),
            "data-ocid": `filter-tab-${tab.key}`,
            children: [
              tab.icon,
              tab.label,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "text-[10px] font-black px-1.5 py-0.5 rounded-sm ml-0.5",
                    activeFilter === tab.key ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                  ),
                  children: tabCounts[tab.key]
                }
              )
            ]
          },
          tab.key
        ))
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(StreamSkeleton, {}, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 text-center",
        "data-ocid": "live-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-7 h-7 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black text-foreground", children: activeFilter === "live" ? "No live streams right now" : activeFilter === "upcoming" ? "No upcoming streams scheduled" : activeFilter === "ended" ? "No past streams yet" : "No streams available" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-semibold mt-2 max-w-sm text-sm", children: activeFilter === "live" ? "Live broadcasts will appear here as they begin. Check back soon." : "Streams will appear here once they are scheduled or completed." }),
          activeFilter !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setFilter("all"),
              type: "button",
              className: "mt-4 text-xs font-black text-accent hover:underline",
              "data-ocid": "live-empty-view-all",
              children: "View all streams →"
            }
          )
        ]
      }
    ) : activeFilter !== "all" ? (
      /* Single filtered grid */
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: filtered.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(StreamCard, { stream: s }, s.id.toString())) })
    ) : (
      /* All: grouped by status */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
        liveStreams.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-chart-3 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-black uppercase tracking-widest text-chart-3", children: "Currently Live" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: liveStreams.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(StreamCard, { stream: s }, s.id.toString())) })
        ] }),
        upcomingStreams.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-black uppercase tracking-widest text-accent", children: "Upcoming Streams" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: upcomingStreams.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(StreamCard, { stream: s }, s.id.toString())) })
        ] }),
        endedStreams.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-muted-foreground/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-black uppercase tracking-widest text-muted-foreground", children: "Past Streams" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: endedStreams.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(StreamCard, { stream: s }, s.id.toString())) })
        ] })
      ] })
    )
  ] });
}
export {
  Live as default
};
