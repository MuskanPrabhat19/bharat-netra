import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, S as Skeleton, L as Link } from "./index-CL-FxwHs.js";
import { B as Button } from "./button-HWhoFiqx.js";
import { u as useArticles, C as Classification } from "./use-backend-D5H3Go86.js";
import { T as TruthScoreBadge, C as ClassificationBadge, B as BiasIndicatorBadge, S as SourceReliabilityBadge } from "./badges-VGSryMWB.js";
import { U as User } from "./user-D2v1hmUk.js";
import "./index-Cjzqe9wX.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
];
const ArrowUpDown = createLucideIcon("arrow-up-down", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const CATEGORIES = [
  "All",
  "Politics",
  "Science",
  "Sports",
  "Health"
];
const CLASSIFICATIONS = [
  "All",
  "Fact",
  "Opinion",
  "Unverified"
];
function formatDate(ts) {
  if (ts === 0n) return "Unknown date";
  const ms = Number(ts / 1000000n);
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(ms));
}
function classificationToFilter(c) {
  if (c === Classification.Fact) return "Fact";
  if (c === Classification.Opinion) return "Opinion";
  return "Unverified";
}
function ArticleCard({ article }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/article/$id",
      params: { id: article.id.toString() },
      className: "card-news group flex flex-col gap-3 cursor-pointer no-underline",
      "data-ocid": `article-card-${article.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-accent", children: article.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TruthScoreBadge, { score: article.truth_score, showLabel: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-foreground leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-200", children: article.headline }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: article.summary }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClassificationBadge, { classification: article.classification }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BiasIndicatorBadge, { bias: article.bias_indicator }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SourceReliabilityBadge, { reliability: article.source_reliability })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 font-semibold truncate min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3 h-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: article.source_outlet })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3" }),
            article.author
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3 h-3" }),
          formatDate(article.publication_date)
        ] })
      ]
    }
  );
}
function SkeletonCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-news flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 pt-2 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-12" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" })
    ] })
  ] });
}
function FilterBar({
  category,
  classification,
  sort,
  onCategory,
  onClassification,
  onSort,
  total
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-md p-4 mb-6 space-y-3",
      "data-ocid": "news-filter-bar",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-3.5 h-3.5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "Category:" })
            ] }),
            CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onCategory(cat),
                className: [
                  "px-2.5 py-1 text-xs font-bold rounded-sm border transition-colors duration-200 uppercase tracking-wide",
                  category === cat ? "bg-accent text-accent-foreground border-accent" : "bg-muted/40 text-muted-foreground border-border hover:border-accent hover:text-foreground"
                ].join(" "),
                "data-ocid": `filter-category-${cat.toLowerCase()}`,
                children: cat
              },
              cat
            ))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onSort(sort === "truth_score" ? "date" : "truth_score"),
              className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border border-border rounded-sm bg-muted/40 hover:border-accent hover:text-foreground text-muted-foreground transition-colors duration-200 uppercase tracking-wide shrink-0",
              "data-ocid": "sort-toggle",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "w-3.5 h-3.5" }),
                sort === "truth_score" ? "Truth Score ↓" : "Newest First"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "Type:" }),
          CLASSIFICATIONS.map((cls) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onClassification(cls),
              className: [
                "px-2.5 py-1 text-xs font-bold rounded-sm border transition-colors duration-200 uppercase tracking-wide",
                classification === cls ? "bg-primary text-primary-foreground border-primary" : "bg-muted/40 text-muted-foreground border-border hover:border-primary hover:text-foreground"
              ].join(" "),
              "data-ocid": `filter-classification-${cls.toLowerCase()}`,
              children: cls
            },
            cls
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground font-semibold", children: [
            total,
            " article",
            total !== 1 ? "s" : ""
          ] })
        ] })
      ]
    }
  );
}
function NewsFeed() {
  const { data: articles, isLoading } = useArticles();
  const [category, setCategory] = reactExports.useState(() => {
    const p = new URLSearchParams(window.location.search);
    const v = p.get("category");
    return CATEGORIES.includes(v) ? v : "All";
  });
  const [classification, setClassification] = reactExports.useState(
    () => {
      const p = new URLSearchParams(window.location.search);
      const v = p.get("classification");
      return CLASSIFICATIONS.includes(v) ? v : "All";
    }
  );
  const [sort, setSort] = reactExports.useState(() => {
    const p = new URLSearchParams(window.location.search);
    const v = p.get("sort");
    return v === "truth_score" || v === "date" ? v : "date";
  });
  reactExports.useEffect(() => {
    const url = new URL(window.location.href);
    category === "All" ? url.searchParams.delete("category") : url.searchParams.set("category", category);
    classification === "All" ? url.searchParams.delete("classification") : url.searchParams.set("classification", classification);
    sort === "date" ? url.searchParams.delete("sort") : url.searchParams.set("sort", sort);
    window.history.replaceState(null, "", url.toString());
  }, [category, classification, sort]);
  const filtered = reactExports.useMemo(() => {
    if (!articles) return [];
    let list = [...articles];
    if (category !== "All") {
      list = list.filter((a) => a.category === category);
    }
    if (classification !== "All") {
      list = list.filter(
        (a) => classificationToFilter(a.classification) === classification
      );
    }
    if (sort === "truth_score") {
      list.sort((a, b) => Number(b.truth_score) - Number(a.truth_score));
    } else {
      list.sort(
        (a, b) => Number(b.publication_date) - Number(a.publication_date)
      );
    }
    return list;
  }, [articles, category, classification, sort]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black tracking-tight text-foreground uppercase", children: "Live News Feed" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-semibold mt-1 text-sm", children: "AI-verified · Bias-scored · Classified. No narrative. Only truth." })
    ] }),
    !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      FilterBar,
      {
        category,
        classification,
        sort,
        onCategory: setCategory,
        onClassification: setClassification,
        onSort: setSort,
        total: filtered.length
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 text-center",
        "data-ocid": "news-feed-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "📡" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-foreground uppercase tracking-tight", children: "No Articles Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-sm font-semibold text-sm", children: (articles == null ? void 0 : articles.length) ? "No articles match the selected filters. Try adjusting your criteria." : "Verified news will appear here as they are submitted and fact-checked." }),
          (category !== "All" || classification !== "All") && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "mt-4 font-bold uppercase tracking-wide text-xs",
              onClick: () => {
                setCategory("All");
                setClassification("All");
              },
              "data-ocid": "clear-filters-btn",
              children: "Clear Filters"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        "data-ocid": "news-feed-grid",
        children: filtered.map((article) => /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCard, { article }, article.id.toString()))
      }
    )
  ] });
}
export {
  NewsFeed as default
};
