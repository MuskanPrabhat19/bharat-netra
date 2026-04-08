import { c as createLucideIcon, u as useParams, j as jsxRuntimeExports, L as Link, S as Skeleton } from "./index-CL-FxwHs.js";
import { T as TruthScoreBadge, B as BiasIndicatorBadge, S as SourceReliabilityBadge, C as ClassificationBadge } from "./badges-VGSryMWB.js";
import { a as useArticle, u as useArticles } from "./use-backend-D5H3Go86.js";
import { S as ShieldAlert } from "./shield-alert-BdRYHVKj.js";
import { U as User } from "./user-D2v1hmUk.js";
import { C as CircleCheckBig, T as TriangleAlert } from "./triangle-alert-CaM_m_4w.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 18h-5", key: "95g1m2" }],
  ["path", { d: "M18 14h-8", key: "sponae" }],
  [
    "path",
    {
      d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",
      key: "39pd36"
    }
  ],
  ["rect", { width: "8", height: "4", x: "10", y: "6", rx: "1", key: "aywv1n" }]
];
const Newspaper = createLucideIcon("newspaper", __iconNode$1);
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
function formatDate(ts) {
  if (ts === 0n) return "Unknown date";
  const ms = Number(ts / 1000000n);
  if (Number.isNaN(ms) || ms === 0) return "Unknown date";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(ms));
}
function ScoreBar({ value, label }) {
  const n = Math.min(100, Math.max(0, Number(value)));
  const color = n >= 70 ? "bg-chart-1" : n >= 40 ? "bg-chart-2" : "bg-chart-3";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-black text-foreground", children: n })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted/40 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-full rounded-full transition-all duration-700 ${color}`,
        style: { width: `${n}%` }
      }
    ) })
  ] });
}
function RelatedCard({ article }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/article/$id",
      params: { id: article.id.toString() },
      className: "card-news group flex flex-col gap-2",
      "data-ocid": "related-article-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-accent uppercase tracking-wider", children: article.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground leading-snug line-clamp-2 group-hover:text-accent transition-smooth", children: article.headline }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-auto pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TruthScoreBadge, { score: article.truth_score, showLabel: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClassificationBadge, { classification: article.classification })
        ] })
      ]
    }
  );
}
function ArticleDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6",
      "data-ocid": "article-loading",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16 rounded-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24 rounded-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-md" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-md" })
      ]
    }
  );
}
function ArticleDetail() {
  const { id } = useParams({ from: "/article/$id" });
  const articleId = BigInt(id);
  const { data: article, isLoading } = useArticle(articleId);
  const { data: allArticles } = useArticles();
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleDetailSkeleton, {});
  if (!article) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-32 text-center px-4",
        "data-ocid": "article-not-found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-foreground mb-2", children: "Article Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 max-w-xs", children: "This article may have been removed or the link is incorrect." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/news-feed",
              className: "inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold text-sm px-4 py-2 rounded-sm hover:bg-accent/90 transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                " Back to News Feed"
              ]
            }
          )
        ]
      }
    );
  }
  const related = (allArticles ?? []).filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);
  const pa = article.propaganda_analysis;
  const propagandaFlags = [
    {
      key: "emotional_manipulation",
      label: "Emotional Manipulation",
      value: pa.emotional_manipulation
    },
    {
      key: "selective_facts",
      label: "Selective Facts",
      value: pa.selective_facts
    },
    {
      key: "fear_based_language",
      label: "Fear-Based Language",
      value: pa.fear_based_language
    },
    {
      key: "ideological_pushing",
      label: "Ideological Pushing",
      value: pa.ideological_pushing
    }
  ];
  const hasPropaganda = propagandaFlags.some((f) => f.value);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
      "data-ocid": "article-detail",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/news-feed",
            className: "inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-accent transition-smooth mb-6",
            "data-ocid": "article-back",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              " Back to News Feed"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-5", "data-ocid": "article-badges", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TruthScoreBadge, { score: article.truth_score, showLabel: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BiasIndicatorBadge, { bias: article.bias_indicator }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SourceReliabilityBadge, { reliability: article.source_reliability }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClassificationBadge, { classification: article.classification })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "text-2xl md:text-4xl font-black text-foreground leading-tight mb-4",
            "data-ocid": "article-headline",
            children: article.headline
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground font-semibold leading-relaxed mb-6", children: article.summary }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-3 mb-8",
            "data-ocid": "article-metadata",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-accent" }),
                article.author
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "w-3.5 h-3.5 text-accent" }),
                article.source_outlet
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-accent" }),
                formatDate(article.publication_date)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3.5 h-3.5" }),
                article.category
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-foreground text-sm md:text-base leading-relaxed mb-10 whitespace-pre-wrap font-body",
            "data-ocid": "article-body",
            children: article.body
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "bg-card border border-border rounded-md p-5 mb-8",
            "data-ocid": "truth-score-breakdown",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-black uppercase tracking-widest text-foreground", children: "Truth Score Breakdown" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TruthScoreBadge, { score: article.truth_score, showLabel: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreBar, { value: article.truth_score, label: "Overall Truth Score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-4 border-t border-border/50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ScoreBar,
                  {
                    value: article.source_reliability_score,
                    label: "Source Reliability"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ScoreBar,
                  {
                    value: article.fact_completeness_score,
                    label: "Fact Completeness"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "No Contradiction" }),
                    article.no_contradiction_flag > 0n ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-chart-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-chart-3" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted/40 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `h-full rounded-full transition-all duration-700 ${article.no_contradiction_flag > 0n ? "bg-chart-1" : "bg-chart-3"}`,
                      style: {
                        width: article.no_contradiction_flag > 0n ? "100%" : "30%"
                      }
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs font-black ${article.no_contradiction_flag > 0n ? "text-chart-1" : "text-chart-3"}`,
                      children: article.no_contradiction_flag > 0n ? "VERIFIED" : "CONTRADICTIONS"
                    }
                  )
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "bg-card border border-border rounded-md p-5 mb-10",
            "data-ocid": "propaganda-analysis",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-8 h-8 rounded-sm bg-accent/10 border border-accent/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-4 h-4 text-accent" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-black uppercase tracking-widest text-foreground", children: "Propaganda Analysis" }),
                hasPropaganda ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs font-black text-chart-3 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5" }),
                  " MARKERS DETECTED"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs font-black text-chart-1 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
                  " CLEAN"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4", children: propagandaFlags.map(({ key, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `flex items-center gap-3 px-4 py-3 rounded-sm border ${value ? "border-chart-3/40 bg-chart-3/8" : "border-chart-1/40 bg-chart-1/8"}`,
                  "data-ocid": `propaganda-flag-${key}`,
                  children: [
                    value ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-chart-3 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-chart-1 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground truncate", children: label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-xs font-black tracking-wider ${value ? "text-chart-3" : "text-chart-1"}`,
                          children: value ? "DETECTED" : "NOT DETECTED"
                        }
                      )
                    ] })
                  ]
                },
                key
              )) }),
              !hasPropaganda && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-3 bg-chart-1/10 border border-chart-1/30 rounded-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-chart-1 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-chart-1", children: "No propaganda markers detected. This article meets neutrality standards." })
              ] }),
              hasPropaganda && pa.suggested_rewrite !== void 0 && pa.suggested_rewrite.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "mt-4 p-4 bg-accent/5 border border-accent/25 rounded-sm",
                  "data-ocid": "suggested-rewrite",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black text-accent uppercase tracking-widest mb-2", children: "✦ Suggested Neutral Rewrite" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: pa.suggested_rewrite })
                  ]
                }
              )
            ]
          }
        ),
        related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "related-articles", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xs font-black uppercase tracking-widest text-muted-foreground mb-4", children: [
            "More in ",
            article.category
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4", children: related.map((rel) => /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedCard, { article: rel }, rel.id.toString())) })
        ] })
      ]
    }
  );
}
export {
  ArticleDetail as default
};
