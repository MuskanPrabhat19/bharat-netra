import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpDown,
  Building2,
  CalendarDays,
  SlidersHorizontal,
  User,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Classification } from "../backend";
import {
  BiasIndicatorBadge,
  ClassificationBadge,
  SourceReliabilityBadge,
  TruthScoreBadge,
} from "../components/badges";
import { useArticles } from "../hooks/use-backend";
import type { Article } from "../types";

// ── Types ──────────────────────────────────────────────────────────────────────

type SortKey = "truth_score" | "date";
type CategoryFilter = "All" | string;
type ClassificationFilter = "All" | "Fact" | "Opinion" | "Unverified";

const CATEGORIES: CategoryFilter[] = [
  "All",
  "Politics",
  "Science",
  "Sports",
  "Health",
];
const CLASSIFICATIONS: ClassificationFilter[] = [
  "All",
  "Fact",
  "Opinion",
  "Unverified",
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatDate(ts: bigint): string {
  if (ts === 0n) return "Unknown date";
  const ms = Number(ts / 1_000_000n);
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(ms));
}

function classificationToFilter(c: Classification): ClassificationFilter {
  if (c === Classification.Fact) return "Fact";
  if (c === Classification.Opinion) return "Opinion";
  return "Unverified";
}

// ── Article Card ───────────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to="/article/$id"
      params={{ id: article.id.toString() }}
      className="card-news group flex flex-col gap-3 cursor-pointer no-underline"
      data-ocid={`article-card-${article.id}`}
    >
      {/* Top row: category + truth score */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">
          {article.category}
        </span>
        <TruthScoreBadge score={article.truth_score} showLabel />
      </div>

      {/* Headline */}
      <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-200">
        {article.headline}
      </h3>

      {/* Summary */}
      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
        {article.summary}
      </p>

      {/* Score badges */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-border">
        <ClassificationBadge classification={article.classification} />
        <BiasIndicatorBadge bias={article.bias_indicator} />
        <SourceReliabilityBadge reliability={article.source_reliability} />
      </div>

      {/* Meta row */}
      <div className="flex items-center justify-between text-xs text-muted-foreground gap-2">
        <span className="flex items-center gap-1 font-semibold truncate min-w-0">
          <Building2 className="w-3 h-3 shrink-0" />
          <span className="truncate">{article.source_outlet}</span>
        </span>
        <span className="flex items-center gap-1 shrink-0">
          <User className="w-3 h-3" />
          {article.author}
        </span>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground/70">
        <CalendarDays className="w-3 h-3" />
        {formatDate(article.publication_date)}
      </div>
    </Link>
  );
}

// ── Skeleton Cards ─────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="card-news flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-14" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
      <div className="flex gap-1.5 pt-2 border-t border-border">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-14" />
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

// ── Filter Bar ─────────────────────────────────────────────────────────────────

interface FilterBarProps {
  category: CategoryFilter;
  classification: ClassificationFilter;
  sort: SortKey;
  onCategory: (v: CategoryFilter) => void;
  onClassification: (v: ClassificationFilter) => void;
  onSort: (v: SortKey) => void;
  total: number;
}

function FilterBar({
  category,
  classification,
  sort,
  onCategory,
  onClassification,
  onSort,
  total,
}: FilterBarProps) {
  return (
    <div
      className="bg-card border border-border rounded-md p-4 mb-6 space-y-3"
      data-ocid="news-filter-bar"
    >
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Left: filters */}
        <div className="flex flex-wrap gap-2">
          {/* Category filter */}
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Category:
            </span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategory(cat)}
              className={[
                "px-2.5 py-1 text-xs font-bold rounded-sm border transition-colors duration-200 uppercase tracking-wide",
                category === cat
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-muted/40 text-muted-foreground border-border hover:border-accent hover:text-foreground",
              ].join(" ")}
              data-ocid={`filter-category-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right: sort toggle */}
        <button
          type="button"
          onClick={() =>
            onSort(sort === "truth_score" ? "date" : "truth_score")
          }
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border border-border rounded-sm bg-muted/40 hover:border-accent hover:text-foreground text-muted-foreground transition-colors duration-200 uppercase tracking-wide shrink-0"
          data-ocid="sort-toggle"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          {sort === "truth_score" ? "Truth Score ↓" : "Newest First"}
        </button>
      </div>

      {/* Classification filter */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Type:
        </span>
        {CLASSIFICATIONS.map((cls) => (
          <button
            key={cls}
            type="button"
            onClick={() => onClassification(cls)}
            className={[
              "px-2.5 py-1 text-xs font-bold rounded-sm border transition-colors duration-200 uppercase tracking-wide",
              classification === cls
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/40 text-muted-foreground border-border hover:border-primary hover:text-foreground",
            ].join(" ")}
            data-ocid={`filter-classification-${cls.toLowerCase()}`}
          >
            {cls}
          </button>
        ))}

        <span className="ml-auto text-xs text-muted-foreground font-semibold">
          {total} article{total !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function NewsFeed() {
  const { data: articles, isLoading } = useArticles();

  // URL search param persistence using native API (same pattern as Live.tsx)
  const [category, setCategory] = useState<CategoryFilter>(() => {
    const p = new URLSearchParams(window.location.search);
    const v = p.get("category");
    return (
      CATEGORIES.includes(v as CategoryFilter) ? v : "All"
    ) as CategoryFilter;
  });
  const [classification, setClassification] = useState<ClassificationFilter>(
    () => {
      const p = new URLSearchParams(window.location.search);
      const v = p.get("classification");
      return (
        CLASSIFICATIONS.includes(v as ClassificationFilter) ? v : "All"
      ) as ClassificationFilter;
    },
  );
  const [sort, setSort] = useState<SortKey>(() => {
    const p = new URLSearchParams(window.location.search);
    const v = p.get("sort");
    return v === "truth_score" || v === "date" ? v : "date";
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    category === "All"
      ? url.searchParams.delete("category")
      : url.searchParams.set("category", category);
    classification === "All"
      ? url.searchParams.delete("classification")
      : url.searchParams.set("classification", classification);
    sort === "date"
      ? url.searchParams.delete("sort")
      : url.searchParams.set("sort", sort);
    window.history.replaceState(null, "", url.toString());
  }, [category, classification, sort]);

  const filtered = useMemo(() => {
    if (!articles) return [];
    let list = [...articles];

    if (category !== "All") {
      list = list.filter((a) => a.category === category);
    }

    if (classification !== "All") {
      list = list.filter(
        (a) => classificationToFilter(a.classification) === classification,
      );
    }

    if (sort === "truth_score") {
      list.sort((a, b) => Number(b.truth_score) - Number(a.truth_score));
    } else {
      list.sort(
        (a, b) => Number(b.publication_date) - Number(a.publication_date),
      );
    }

    return list;
  }, [articles, category, classification, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
          Live News Feed
        </h1>
        <p className="text-muted-foreground font-semibold mt-1 text-sm">
          AI-verified · Bias-scored · Classified. No narrative. Only truth.
        </p>
      </div>

      {/* Filter Bar */}
      {!isLoading && (
        <FilterBar
          category={category}
          classification={classification}
          sort={sort}
          onCategory={setCategory}
          onClassification={setClassification}
          onSort={setSort}
          total={filtered.length}
        />
      )}

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((k) => (
            <SkeletonCard key={k} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-24 text-center"
          data-ocid="news-feed-empty"
        >
          <div className="text-5xl mb-4">📡</div>
          <h2 className="text-xl font-black text-foreground uppercase tracking-tight">
            No Articles Found
          </h2>
          <p className="text-muted-foreground mt-2 max-w-sm font-semibold text-sm">
            {articles?.length
              ? "No articles match the selected filters. Try adjusting your criteria."
              : "Verified news will appear here as they are submitted and fact-checked."}
          </p>
          {(category !== "All" || classification !== "All") && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4 font-bold uppercase tracking-wide text-xs"
              onClick={() => {
                setCategory("All");
                setClassification("All");
              }}
              data-ocid="clear-filters-btn"
            >
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="news-feed-grid"
        >
          {filtered.map((article) => (
            <ArticleCard key={article.id.toString()} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
