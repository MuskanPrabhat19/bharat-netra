import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Newspaper,
  ShieldAlert,
  Tag,
  User,
} from "lucide-react";
import {
  BiasIndicatorBadge,
  ClassificationBadge,
  SourceReliabilityBadge,
  TruthScoreBadge,
} from "../components/badges";
import { useArticle, useArticles } from "../hooks/use-backend";
import type { Article } from "../types";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(ts: bigint): string {
  if (ts === 0n) return "Unknown date";
  const ms = Number(ts / 1_000_000n);
  if (Number.isNaN(ms) || ms === 0) return "Unknown date";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(ms));
}

// ── Score Bar ─────────────────────────────────────────────────────────────────

function ScoreBar({ value, label }: { value: bigint | number; label: string }) {
  const n = Math.min(100, Math.max(0, Number(value)));
  const color = n >= 70 ? "bg-chart-1" : n >= 40 ? "bg-chart-2" : "bg-chart-3";
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        <span className="text-xs font-mono font-black text-foreground">
          {n}
        </span>
      </div>
      <div className="h-2 bg-muted/40 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${n}%` }}
        />
      </div>
    </div>
  );
}

// ── Related Article Card ──────────────────────────────────────────────────────

function RelatedCard({ article }: { article: Article }) {
  return (
    <Link
      to="/article/$id"
      params={{ id: article.id.toString() }}
      className="card-news group flex flex-col gap-2"
      data-ocid="related-article-card"
    >
      <span className="text-xs font-bold text-accent uppercase tracking-wider">
        {article.category}
      </span>
      <p className="text-sm font-bold text-foreground leading-snug line-clamp-2 group-hover:text-accent transition-smooth">
        {article.headline}
      </p>
      <div className="flex items-center gap-2 mt-auto pt-1">
        <TruthScoreBadge score={article.truth_score} showLabel />
        <ClassificationBadge classification={article.classification} />
      </div>
    </Link>
  );
}

// ── Loading Skeleton ──────────────────────────────────────────────────────────

function ArticleDetailSkeleton() {
  return (
    <div
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6"
      data-ocid="article-loading"
    >
      <Skeleton className="h-5 w-28" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20 rounded-sm" />
        <Skeleton className="h-6 w-16 rounded-sm" />
        <Skeleton className="h-6 w-24 rounded-sm" />
        <Skeleton className="h-6 w-20 rounded-sm" />
      </div>
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-5 w-3/4" />
      <div className="flex gap-6">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-40 w-full rounded-md" />
      <Skeleton className="h-56 w-full" />
      <Skeleton className="h-48 w-full rounded-md" />
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ArticleDetail() {
  const { id } = useParams({ from: "/article/$id" });
  const articleId = BigInt(id);
  const { data: article, isLoading } = useArticle(articleId);
  const { data: allArticles } = useArticles();

  if (isLoading) return <ArticleDetailSkeleton />;

  if (!article) {
    return (
      <div
        className="flex flex-col items-center justify-center py-32 text-center px-4"
        data-ocid="article-not-found"
      >
        <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
          <ShieldAlert className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-black text-foreground mb-2">
          Article Not Found
        </h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-xs">
          This article may have been removed or the link is incorrect.
        </p>
        <Link
          to="/news-feed"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold text-sm px-4 py-2 rounded-sm hover:bg-accent/90 transition-smooth"
        >
          <ArrowLeft className="w-4 h-4" /> Back to News Feed
        </Link>
      </div>
    );
  }

  // Related articles: same category, different id, max 3
  const related = (allArticles ?? [])
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const pa = article.propaganda_analysis;
  const propagandaFlags = [
    {
      key: "emotional_manipulation",
      label: "Emotional Manipulation",
      value: pa.emotional_manipulation,
    },
    {
      key: "selective_facts",
      label: "Selective Facts",
      value: pa.selective_facts,
    },
    {
      key: "fear_based_language",
      label: "Fear-Based Language",
      value: pa.fear_based_language,
    },
    {
      key: "ideological_pushing",
      label: "Ideological Pushing",
      value: pa.ideological_pushing,
    },
  ];
  const hasPropaganda = propagandaFlags.some((f) => f.value);

  return (
    <article
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      data-ocid="article-detail"
    >
      {/* ── Back Button ── */}
      <Link
        to="/news-feed"
        className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-accent transition-smooth mb-6"
        data-ocid="article-back"
      >
        <ArrowLeft className="w-4 h-4" /> Back to News Feed
      </Link>

      {/* ── All 4 Scoring Badges ── */}
      <div className="flex flex-wrap gap-2 mb-5" data-ocid="article-badges">
        <TruthScoreBadge score={article.truth_score} showLabel />
        <BiasIndicatorBadge bias={article.bias_indicator} />
        <SourceReliabilityBadge reliability={article.source_reliability} />
        <ClassificationBadge classification={article.classification} />
      </div>

      {/* ── Headline ── */}
      <h1
        className="text-2xl md:text-4xl font-black text-foreground leading-tight mb-4"
        data-ocid="article-headline"
      >
        {article.headline}
      </h1>

      {/* ── Summary ── */}
      <p className="text-base text-muted-foreground font-semibold leading-relaxed mb-6">
        {article.summary}
      </p>

      {/* ── Metadata Row ── */}
      <div
        className="flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-3 mb-8"
        data-ocid="article-metadata"
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <User className="w-3.5 h-3.5 text-accent" />
          {article.author}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Newspaper className="w-3.5 h-3.5 text-accent" />
          {article.source_outlet}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Calendar className="w-3.5 h-3.5 text-accent" />
          {formatDate(article.publication_date)}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider">
          <Tag className="w-3.5 h-3.5" />
          {article.category}
        </span>
      </div>

      {/* ── Article Body ── */}
      <div
        className="text-foreground text-sm md:text-base leading-relaxed mb-10 whitespace-pre-wrap font-body"
        data-ocid="article-body"
      >
        {article.body}
      </div>

      {/* ── Truth Score Breakdown ── */}
      <section
        className="bg-card border border-border rounded-md p-5 mb-8"
        data-ocid="truth-score-breakdown"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xs font-black uppercase tracking-widest text-foreground">
            Truth Score Breakdown
          </h2>
          <TruthScoreBadge score={article.truth_score} showLabel />
        </div>

        {/* Overall bar */}
        <ScoreBar value={article.truth_score} label="Overall Truth Score" />

        <div className="my-4 border-t border-border/50" />

        {/* Component scores */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ScoreBar
            value={article.source_reliability_score}
            label="Source Reliability"
          />
          <ScoreBar
            value={article.fact_completeness_score}
            label="Fact Completeness"
          />
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                No Contradiction
              </span>
              {article.no_contradiction_flag > 0n ? (
                <CheckCircle className="w-4 h-4 text-chart-1" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-chart-3" />
              )}
            </div>
            <div className="h-2 bg-muted/40 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  article.no_contradiction_flag > 0n
                    ? "bg-chart-1"
                    : "bg-chart-3"
                }`}
                style={{
                  width: article.no_contradiction_flag > 0n ? "100%" : "30%",
                }}
              />
            </div>
            <span
              className={`text-xs font-black ${
                article.no_contradiction_flag > 0n
                  ? "text-chart-1"
                  : "text-chart-3"
              }`}
            >
              {article.no_contradiction_flag > 0n
                ? "VERIFIED"
                : "CONTRADICTIONS"}
            </span>
          </div>
        </div>
      </section>

      {/* ── Propaganda Analysis ── */}
      <section
        className="bg-card border border-border rounded-md p-5 mb-10"
        data-ocid="propaganda-analysis"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-accent/10 border border-accent/20">
            <ShieldAlert className="w-4 h-4 text-accent" />
          </div>
          <h2 className="text-xs font-black uppercase tracking-widest text-foreground">
            Propaganda Analysis
          </h2>
          {hasPropaganda ? (
            <span className="ml-auto text-xs font-black text-chart-3 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> MARKERS DETECTED
            </span>
          ) : (
            <span className="ml-auto text-xs font-black text-chart-1 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> CLEAN
            </span>
          )}
        </div>

        {/* 4 indicator rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {propagandaFlags.map(({ key, label, value }) => (
            <div
              key={key}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm border ${
                value
                  ? "border-chart-3/40 bg-chart-3/8"
                  : "border-chart-1/40 bg-chart-1/8"
              }`}
              data-ocid={`propaganda-flag-${key}`}
            >
              {value ? (
                <AlertTriangle className="w-5 h-5 text-chart-3 shrink-0" />
              ) : (
                <CheckCircle className="w-5 h-5 text-chart-1 shrink-0" />
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-foreground truncate">
                  {label}
                </span>
                <span
                  className={`text-xs font-black tracking-wider ${
                    value ? "text-chart-3" : "text-chart-1"
                  }`}
                >
                  {value ? "DETECTED" : "NOT DETECTED"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary bar */}
        {!hasPropaganda && (
          <div className="flex items-center gap-2 px-4 py-3 bg-chart-1/10 border border-chart-1/30 rounded-sm">
            <CheckCircle className="w-4 h-4 text-chart-1 shrink-0" />
            <p className="text-sm font-bold text-chart-1">
              No propaganda markers detected. This article meets neutrality
              standards.
            </p>
          </div>
        )}

        {/* Suggested rewrite */}
        {hasPropaganda &&
          pa.suggested_rewrite !== undefined &&
          pa.suggested_rewrite.length > 0 && (
            <div
              className="mt-4 p-4 bg-accent/5 border border-accent/25 rounded-sm"
              data-ocid="suggested-rewrite"
            >
              <p className="text-xs font-black text-accent uppercase tracking-widest mb-2">
                ✦ Suggested Neutral Rewrite
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {pa.suggested_rewrite}
              </p>
            </div>
          )}
      </section>

      {/* ── Related Articles ── */}
      {related.length > 0 && (
        <section data-ocid="related-articles">
          <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">
            More in {article.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {related.map((rel) => (
              <RelatedCard key={rel.id.toString()} article={rel} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
