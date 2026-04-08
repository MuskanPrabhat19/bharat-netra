import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Edit2,
  Eye,
  EyeOff,
  FileText,
  LogOut,
  Plus,
  Radio,
  Settings,
  Shield,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  BiasIndicator,
  Classification,
  SourceReliability,
  StreamStatus,
} from "../backend";
import {
  useAdminArticles,
  useAdminPrincipal,
  useAdminStreams,
  useAdminSubmitArticle,
  useAdminSubmitStream,
  useAuditLog,
  useClearAuditLog,
  useDeleteArticle,
  useDeleteStream,
  useIsAdmin,
  useToggleArticlePublished,
  useToggleStreamPublished,
  useTransferAdmin,
  useUpdateArticle,
  useUpdateStream,
} from "../hooks/use-backend";
import type {
  Article,
  ArticleInput,
  LiveStream,
  LiveStreamInput,
} from "../types";

// ── Types ──────────────────────────────────────────────────────────────────────

type AdminTab = "articles" | "streams" | "audit" | "settings";

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatTimestamp(ts: bigint): string {
  if (ts === 0n) return "—";
  const ms = Number(ts / 1_000_000n);
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ms));
}

function truncate(str: string, n = 32) {
  return str.length > n ? `${str.slice(0, n)}…` : str;
}

function calcTruthScore(src: string, fact: string, contra: boolean): number {
  const s = Math.min(100, Math.max(0, Number.parseInt(src, 10) || 0));
  const f = Math.min(100, Math.max(0, Number.parseInt(fact, 10) || 0));
  const c = contra ? 100 : 0;
  return Math.round((s + f + c) / 3);
}

// ── Empty state for article form ───────────────────────────────────────────────

const EMPTY_ARTICLE_FORM = {
  headline: "",
  summary: "",
  body: "",
  category: "Politics",
  author: "",
  source_outlet: "",
  classification: Classification.Fact,
  bias: BiasIndicator.Low,
  source_reliability: SourceReliability.High,
  source_reliability_score: "85",
  fact_completeness_score: "80",
  no_contradiction: true,
  emotional_manipulation: false,
  selective_facts: false,
  fear_based_language: false,
  ideological_pushing: false,
  suggested_rewrite: "",
};

type ArticleFormState = typeof EMPTY_ARTICLE_FORM;

// ── Empty state for stream form ────────────────────────────────────────────────

const EMPTY_STREAM_FORM = {
  title: "",
  description: "",
  source: "",
  status: StreamStatus.Upcoming,
  start_time: "",
  embed_url: "",
};

type StreamFormState = typeof EMPTY_STREAM_FORM;

// ── Confirmation dialog ────────────────────────────────────────────────────────

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

function ConfirmDialog({
  title,
  message,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  danger = false,
}: ConfirmDialogProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      data-ocid="confirm-dialog"
    >
      <div className="bg-card border border-border rounded-md p-6 w-full max-w-sm shadow-xl space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle
              className={`w-5 h-5 ${danger ? "text-destructive" : "text-accent"}`}
            />
            <h3 className="font-black text-sm uppercase tracking-wide text-foreground">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground font-semibold leading-relaxed">
          {message}
        </p>
        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="font-bold"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            className={`font-black uppercase tracking-wide text-xs ${
              danger
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "bg-accent text-accent-foreground hover:bg-accent/90"
            }`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Article Form ───────────────────────────────────────────────────────────────

interface ArticleFormProps {
  initial?: ArticleFormState;
  editId?: bigint;
  onDone: () => void;
}

function ArticleFormPanel({ initial, editId, onDone }: ArticleFormProps) {
  const [form, setForm] = useState<ArticleFormState>(
    initial ?? EMPTY_ARTICLE_FORM,
  );
  const { mutate: submit, isPending: isSubmitting } = useAdminSubmitArticle();
  const { mutate: update, isPending: isUpdating } = useUpdateArticle();
  const isPending = isSubmitting || isUpdating;

  const truthScore = calcTruthScore(
    form.source_reliability_score,
    form.fact_completeness_score,
    form.no_contradiction,
  );

  function set<K extends keyof ArticleFormState>(
    key: K,
    value: ArticleFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function buildInput(): ArticleInput {
    return {
      headline: form.headline,
      summary: form.summary,
      body: form.body,
      category: form.category,
      author: form.author,
      source_outlet: form.source_outlet,
      classification: form.classification,
      bias_indicator: form.bias,
      source_reliability: form.source_reliability,
      source_reliability_score: BigInt(
        Number.parseInt(form.source_reliability_score, 10) || 0,
      ),
      fact_completeness_score: BigInt(
        Number.parseInt(form.fact_completeness_score, 10) || 0,
      ),
      no_contradiction_flag: form.no_contradiction ? 1n : 0n,
      publication_date: BigInt(Date.now()) * 1_000_000n,
      propaganda_analysis: {
        emotional_manipulation: form.emotional_manipulation,
        selective_facts: form.selective_facts,
        fear_based_language: form.fear_based_language,
        ideological_pushing: form.ideological_pushing,
        suggested_rewrite: form.suggested_rewrite || undefined,
      },
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input = buildInput();
    if (editId !== undefined) {
      update(
        { id: editId, input },
        {
          onSuccess: (r) => {
            if (r.__kind__ === "ok") {
              toast.success("Article updated");
              onDone();
            } else {
              toast.error(`Failed: ${r.err}`);
            }
          },
          onError: (err) => toast.error(`Error: ${err.message}`),
        },
      );
    } else {
      submit(input, {
        onSuccess: (r) => {
          if (r.__kind__ === "ok") {
            toast.success("Article created");
            onDone();
          } else {
            toast.error(`Failed: ${r.err}`);
          }
        },
        onError: (err) => toast.error(`Error: ${err.message}`),
      });
    }
  }

  const selectCls =
    "w-full h-10 rounded-md border border-border bg-background px-3 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-accent";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      data-ocid="article-form"
    >
      {/* Live truth score */}
      <div className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/30 rounded-sm">
        <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
          Computed Truth Score
        </span>
        <span
          className={`text-lg font-black font-mono ${
            truthScore >= 70
              ? "text-chart-1"
              : truthScore >= 40
                ? "text-chart-2"
                : "text-chart-3"
          }`}
        >
          {truthScore}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Headline *
          </Label>
          <Input
            value={form.headline}
            onChange={(e) => set("headline", e.target.value)}
            placeholder="Neutral, factual headline"
            required
            data-ocid="article-headline-input"
            className="bg-background border-border text-foreground font-semibold"
          />
        </div>

        <div className="md:col-span-2 space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Summary *
          </Label>
          <Textarea
            value={form.summary}
            onChange={(e) => set("summary", e.target.value)}
            placeholder="1–2 sentence factual summary"
            required
            rows={2}
            data-ocid="article-summary-input"
            className="bg-background border-border text-foreground font-semibold resize-none"
          />
        </div>

        <div className="md:col-span-2 space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Full Article Body *
          </Label>
          <Textarea
            value={form.body}
            onChange={(e) => set("body", e.target.value)}
            placeholder="Full verified article text…"
            required
            rows={5}
            data-ocid="article-body-input"
            className="bg-background border-border text-foreground font-semibold resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Author *
          </Label>
          <Input
            value={form.author}
            onChange={(e) => set("author", e.target.value)}
            placeholder="Reporter name"
            required
            className="bg-background border-border text-foreground font-semibold"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Source Outlet *
          </Label>
          <Input
            value={form.source_outlet}
            onChange={(e) => set("source_outlet", e.target.value)}
            placeholder="e.g. DD News, The Hindu"
            required
            className="bg-background border-border text-foreground font-semibold"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Category *
          </Label>
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className={selectCls}
            data-ocid="article-category-select"
          >
            {[
              "Politics",
              "Science",
              "Sports",
              "Health",
              "Economy",
              "Technology",
              "International",
              "Environment",
            ].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Classification *
          </Label>
          <select
            value={form.classification}
            onChange={(e) =>
              set("classification", e.target.value as Classification)
            }
            className={selectCls}
            data-ocid="article-classification-select"
          >
            <option value={Classification.Fact}>Fact</option>
            <option value={Classification.Opinion}>Opinion</option>
            <option value={Classification.Unverified}>Unverified</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Bias Indicator *
          </Label>
          <select
            value={form.bias}
            onChange={(e) => set("bias", e.target.value as BiasIndicator)}
            className={selectCls}
            data-ocid="article-bias-select"
          >
            <option value={BiasIndicator.Low}>Low</option>
            <option value={BiasIndicator.Medium}>Medium</option>
            <option value={BiasIndicator.High}>High</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Source Reliability *
          </Label>
          <select
            value={form.source_reliability}
            onChange={(e) =>
              set("source_reliability", e.target.value as SourceReliability)
            }
            className={selectCls}
            data-ocid="article-source-reliability-select"
          >
            <option value={SourceReliability.High}>High</option>
            <option value={SourceReliability.Medium}>Medium</option>
            <option value={SourceReliability.Low}>Low</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Source Reliability Score (0–100)
          </Label>
          <Input
            type="number"
            min={0}
            max={100}
            value={form.source_reliability_score}
            onChange={(e) => set("source_reliability_score", e.target.value)}
            className="bg-background border-border text-foreground font-semibold"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Fact Completeness Score (0–100)
          </Label>
          <Input
            type="number"
            min={0}
            max={100}
            value={form.fact_completeness_score}
            onChange={(e) => set("fact_completeness_score", e.target.value)}
            className="bg-background border-border text-foreground font-semibold"
          />
        </div>
      </div>

      {/* Propaganda flags */}
      <div className="bg-muted/30 border border-border rounded-md p-4 space-y-3">
        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
          Analysis Flags
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            {
              key: "no_contradiction",
              label: "No Contradiction (facts consistent)",
            },
            { key: "emotional_manipulation", label: "Emotional Manipulation" },
            { key: "selective_facts", label: "Selective Facts" },
            { key: "fear_based_language", label: "Fear-Based Language" },
            { key: "ideological_pushing", label: "Ideological Pushing" },
          ].map(({ key, label }) => (
            <label
              key={key}
              className="flex items-center gap-2.5 cursor-pointer"
              data-ocid={`flag-${key}`}
            >
              <input
                type="checkbox"
                checked={form[key as keyof ArticleFormState] as boolean}
                onChange={(e) =>
                  set(key as keyof ArticleFormState, e.target.checked as never)
                }
                className="w-4 h-4 accent-accent rounded"
              />
              <span className="text-xs font-semibold text-foreground">
                {label}
              </span>
            </label>
          ))}
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Suggested Neutral Rewrite (optional)
          </Label>
          <Textarea
            value={form.suggested_rewrite}
            onChange={(e) => set("suggested_rewrite", e.target.value)}
            placeholder="If propaganda detected, provide a neutral rewrite…"
            rows={2}
            className="bg-background border-border text-foreground font-semibold resize-none"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="font-bold"
          onClick={onDone}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="flex-1 h-11 font-black uppercase tracking-widest text-sm bg-accent text-accent-foreground hover:bg-accent/90"
          data-ocid="article-form-submit-btn"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              {editId !== undefined ? "Updating…" : "Creating…"}
            </span>
          ) : editId !== undefined ? (
            "Update Article"
          ) : (
            "Create Article"
          )}
        </Button>
      </div>
    </form>
  );
}

// ── Stream Form ────────────────────────────────────────────────────────────────

interface StreamFormProps {
  initial?: StreamFormState;
  editId?: bigint;
  onDone: () => void;
}

function StreamFormPanel({ initial, editId, onDone }: StreamFormProps) {
  const [form, setForm] = useState<StreamFormState>(
    initial ?? EMPTY_STREAM_FORM,
  );
  const { mutate: submit, isPending: isSubmitting } = useAdminSubmitStream();
  const { mutate: update, isPending: isUpdating } = useUpdateStream();
  const isPending = isSubmitting || isUpdating;

  function set<K extends keyof StreamFormState>(
    key: K,
    value: StreamFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function buildInput(): LiveStreamInput {
    const startMs = form.start_time
      ? new Date(form.start_time).getTime()
      : Date.now();
    return {
      title: form.title,
      description: form.description,
      source: form.source,
      status: form.status,
      start_time: BigInt(startMs) * 1_000_000n,
      embed_url: form.embed_url,
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input = buildInput();
    if (editId !== undefined) {
      update(
        { id: editId, input },
        {
          onSuccess: (r) => {
            if (r.__kind__ === "ok") {
              toast.success("Stream updated");
              onDone();
            } else {
              toast.error(`Failed: ${r.err}`);
            }
          },
          onError: (err) => toast.error(`Error: ${err.message}`),
        },
      );
    } else {
      submit(input, {
        onSuccess: (r) => {
          if (r.__kind__ === "ok") {
            toast.success("Stream created");
            onDone();
          } else {
            toast.error(`Failed: ${r.err}`);
          }
        },
        onError: (err) => toast.error(`Error: ${err.message}`),
      });
    }
  }

  const selectCls =
    "w-full h-10 rounded-md border border-border bg-background px-3 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-accent";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-ocid="stream-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Stream Title *
          </Label>
          <Input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. PM Press Conference — Live"
            required
            data-ocid="stream-title-input"
            className="bg-background border-border text-foreground font-semibold"
          />
        </div>

        <div className="md:col-span-2 space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Description
          </Label>
          <Textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Brief description of the broadcast…"
            rows={2}
            className="bg-background border-border text-foreground font-semibold resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Source / Channel *
          </Label>
          <Input
            value={form.source}
            onChange={(e) => set("source", e.target.value)}
            placeholder="e.g. DD News"
            required
            className="bg-background border-border text-foreground font-semibold"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Status *
          </Label>
          <select
            value={form.status}
            onChange={(e) => set("status", e.target.value as StreamStatus)}
            className={selectCls}
            data-ocid="stream-status-select"
          >
            <option value={StreamStatus.Upcoming}>Upcoming</option>
            <option value={StreamStatus.Live}>Live</option>
            <option value={StreamStatus.Ended}>Ended</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Start Time (IST)
          </Label>
          <Input
            type="datetime-local"
            value={form.start_time}
            onChange={(e) => set("start_time", e.target.value)}
            className="bg-background border-border text-foreground font-semibold"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Embed URL
          </Label>
          <Input
            value={form.embed_url}
            onChange={(e) => set("embed_url", e.target.value)}
            placeholder="https://www.youtube.com/embed/…"
            className="bg-background border-border text-foreground font-semibold"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="font-bold"
          onClick={onDone}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="flex-1 h-11 font-black uppercase tracking-widest text-sm bg-accent text-accent-foreground hover:bg-accent/90"
          data-ocid="stream-form-submit-btn"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              {editId !== undefined ? "Updating…" : "Creating…"}
            </span>
          ) : editId !== undefined ? (
            "Update Stream"
          ) : (
            "Create Stream"
          )}
        </Button>
      </div>
    </form>
  );
}

// ── Articles Tab ───────────────────────────────────────────────────────────────

function ArticlesTab() {
  const { data: articles, isLoading } = useAdminArticles();
  const { mutate: toggle, isPending: isToggling } = useToggleArticlePublished();
  const { mutate: deleteArt, isPending: isDeleting } = useDeleteArticle();

  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [editArticle, setEditArticle] = useState<Article | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null);
  const pendingIdRef = useRef<bigint | null>(null);

  function articleToForm(a: Article): ArticleFormState {
    return {
      headline: a.headline,
      summary: a.summary,
      body: a.body,
      category: a.category,
      author: a.author,
      source_outlet: a.source_outlet,
      classification: a.classification,
      bias: a.bias_indicator as BiasIndicator,
      source_reliability: a.source_reliability,
      source_reliability_score: Number(a.source_reliability_score).toString(),
      fact_completeness_score: Number(a.fact_completeness_score).toString(),
      no_contradiction: a.no_contradiction_flag > 0n,
      emotional_manipulation: a.propaganda_analysis.emotional_manipulation,
      selective_facts: a.propaganda_analysis.selective_facts,
      fear_based_language: a.propaganda_analysis.fear_based_language,
      ideological_pushing: a.propaganda_analysis.ideological_pushing,
      suggested_rewrite: a.propaganda_analysis.suggested_rewrite ?? "",
    };
  }

  if (mode === "create") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMode("list")}
            className="text-xs font-bold text-muted-foreground hover:text-accent transition-colors"
          >
            ← Back to Articles
          </button>
          <h2 className="text-sm font-black uppercase tracking-widest text-foreground">
            New Article
          </h2>
        </div>
        <ArticleFormPanel onDone={() => setMode("list")} />
      </div>
    );
  }

  if (mode === "edit" && editArticle) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setMode("list");
              setEditArticle(null);
            }}
            className="text-xs font-bold text-muted-foreground hover:text-accent transition-colors"
          >
            ← Back to Articles
          </button>
          <h2 className="text-sm font-black uppercase tracking-widest text-foreground">
            Edit Article
          </h2>
        </div>
        <ArticleFormPanel
          initial={articleToForm(editArticle)}
          editId={editArticle.id}
          onDone={() => {
            setMode("list");
            setEditArticle(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4" data-ocid="articles-tab">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-widest text-foreground">
          All Articles
        </h2>
        <Button
          type="button"
          size="sm"
          className="gap-1.5 font-black uppercase tracking-wide text-xs bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => setMode("create")}
          data-ocid="new-article-btn"
        >
          <Plus className="w-3.5 h-3.5" />
          New Article
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-md" />
          ))}
        </div>
      ) : !articles?.length ? (
        <div
          className="flex flex-col items-center justify-center py-16 text-center"
          data-ocid="articles-empty"
        >
          <FileText className="w-10 h-10 text-muted-foreground/40 mb-3" />
          <p className="text-sm font-bold text-muted-foreground">
            No articles yet. Create your first verified article.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-card border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Headline
                </th>
                <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground hidden sm:table-cell">
                  Score
                </th>
                <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Published
                </th>
                <th className="text-right px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr
                  key={a.id.toString()}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  data-ocid={`article-row-${a.id}`}
                >
                  <td className="px-4 py-3">
                    <span
                      className="font-semibold text-foreground text-xs leading-snug"
                      title={a.headline}
                    >
                      {truncate(a.headline, 48)}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs font-bold text-accent">
                      {a.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span
                      className={`text-xs font-black font-mono px-2 py-0.5 rounded-sm ${
                        Number(a.truth_score) >= 70
                          ? "bg-chart-1/20 text-chart-1"
                          : Number(a.truth_score) >= 40
                            ? "bg-chart-2/20 text-chart-2"
                            : "bg-chart-3/20 text-chart-3"
                      }`}
                    >
                      {Number(a.truth_score)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => {
                        pendingIdRef.current = a.id;
                        toggle(a.id, {
                          onSuccess: (r) => {
                            if (r.__kind__ === "ok") {
                              toast.success(
                                a.published ? "Unpublished" : "Published",
                              );
                            } else {
                              toast.error(`Failed: ${r.err}`);
                            }
                          },
                          onError: (err) =>
                            toast.error(`Error: ${err.message}`),
                        });
                      }}
                      disabled={isToggling}
                      className={`inline-flex items-center gap-1.5 text-xs font-black px-2 py-1 rounded-sm border transition-colors ${
                        a.published
                          ? "bg-chart-1/10 text-chart-1 border-chart-1/30 hover:bg-chart-1/20"
                          : "bg-muted/40 text-muted-foreground border-border hover:border-accent"
                      }`}
                      data-ocid={`toggle-publish-${a.id}`}
                    >
                      {a.published ? (
                        <Eye className="w-3 h-3" />
                      ) : (
                        <EyeOff className="w-3 h-3" />
                      )}
                      {a.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setEditArticle(a);
                          setMode("edit");
                        }}
                        className="p-1.5 rounded-sm text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                        aria-label="Edit article"
                        data-ocid={`edit-article-${a.id}`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(a)}
                        className="p-1.5 rounded-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        aria-label="Delete article"
                        data-ocid={`delete-article-${a.id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Article"
          message={`Are you sure you want to delete "${truncate(deleteTarget.headline, 60)}"? This action cannot be undone.`}
          confirmLabel="Delete"
          danger
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => {
            const id = deleteTarget.id;
            setDeleteTarget(null);
            deleteArt(id, {
              onSuccess: (r) => {
                if (r.__kind__ === "ok") {
                  toast.success("Article deleted");
                } else {
                  toast.error(`Failed: ${r.err}`);
                }
              },
              onError: (err) => toast.error(`Error: ${err.message}`),
            });
          }}
        />
      )}
      {isDeleting && null}
    </div>
  );
}

// ── Streams Tab ────────────────────────────────────────────────────────────────

function StreamsTab() {
  const { data: streams, isLoading } = useAdminStreams();
  const { mutate: toggle, isPending: isToggling } = useToggleStreamPublished();
  const { mutate: deleteStr, isPending: isDeleting } = useDeleteStream();

  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [editStream, setEditStream] = useState<LiveStream | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LiveStream | null>(null);

  function streamToForm(s: LiveStream): StreamFormState {
    const ms = Number(s.start_time / 1_000_000n);
    const dt = ms ? new Date(ms).toISOString().slice(0, 16) : "";
    return {
      title: s.title,
      description: s.description,
      source: s.source,
      status: s.status,
      start_time: dt,
      embed_url: s.embed_url,
    };
  }

  const statusColor = (status: StreamStatus) =>
    status === StreamStatus.Live
      ? "bg-chart-3/20 text-chart-3 border-chart-3/30"
      : status === StreamStatus.Upcoming
        ? "bg-accent/10 text-accent border-accent/30"
        : "bg-muted/40 text-muted-foreground border-border";

  if (mode === "create") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMode("list")}
            className="text-xs font-bold text-muted-foreground hover:text-accent transition-colors"
          >
            ← Back to Streams
          </button>
          <h2 className="text-sm font-black uppercase tracking-widest text-foreground">
            New Stream
          </h2>
        </div>
        <StreamFormPanel onDone={() => setMode("list")} />
      </div>
    );
  }

  if (mode === "edit" && editStream) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setMode("list");
              setEditStream(null);
            }}
            className="text-xs font-bold text-muted-foreground hover:text-accent transition-colors"
          >
            ← Back to Streams
          </button>
          <h2 className="text-sm font-black uppercase tracking-widest text-foreground">
            Edit Stream
          </h2>
        </div>
        <StreamFormPanel
          initial={streamToForm(editStream)}
          editId={editStream.id}
          onDone={() => {
            setMode("list");
            setEditStream(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4" data-ocid="streams-tab">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-widest text-foreground">
          All Streams
        </h2>
        <Button
          type="button"
          size="sm"
          className="gap-1.5 font-black uppercase tracking-wide text-xs bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => setMode("create")}
          data-ocid="new-stream-btn"
        >
          <Plus className="w-3.5 h-3.5" />
          New Stream
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-md" />
          ))}
        </div>
      ) : !streams?.length ? (
        <div
          className="flex flex-col items-center justify-center py-16 text-center"
          data-ocid="streams-empty"
        >
          <Radio className="w-10 h-10 text-muted-foreground/40 mb-3" />
          <p className="text-sm font-bold text-muted-foreground">
            No streams yet. Add your first live broadcast.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {streams.map((s) => (
            <div
              key={s.id.toString()}
              className="bg-card border border-border rounded-md p-4 space-y-3"
              data-ocid={`stream-card-${s.id}`}
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`text-xs font-black px-2 py-0.5 rounded-sm border ${statusColor(s.status)}`}
                >
                  {s.status}
                </span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setEditStream(s);
                      setMode("edit");
                    }}
                    className="p-1.5 rounded-sm text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                    aria-label="Edit stream"
                    data-ocid={`edit-stream-${s.id}`}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(s)}
                    className="p-1.5 rounded-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    aria-label="Delete stream"
                    data-ocid={`delete-stream-${s.id}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-sm font-bold text-foreground line-clamp-2 leading-snug">
                {s.title}
              </p>
              <p className="text-xs text-muted-foreground font-semibold">
                {s.source}
              </p>
              <button
                type="button"
                onClick={() =>
                  toggle(s.id, {
                    onSuccess: (r) => {
                      if (r.__kind__ === "ok") {
                        toast.success(
                          s.published ? "Unpublished" : "Published",
                        );
                      } else {
                        toast.error(`Failed: ${r.err}`);
                      }
                    },
                    onError: (err) => toast.error(`Error: ${err.message}`),
                  })
                }
                disabled={isToggling}
                className={`inline-flex items-center gap-1.5 text-xs font-black px-2 py-1 rounded-sm border transition-colors ${
                  s.published
                    ? "bg-chart-1/10 text-chart-1 border-chart-1/30 hover:bg-chart-1/20"
                    : "bg-muted/40 text-muted-foreground border-border hover:border-accent"
                }`}
                data-ocid={`toggle-stream-${s.id}`}
              >
                {s.published ? (
                  <Eye className="w-3 h-3" />
                ) : (
                  <EyeOff className="w-3 h-3" />
                )}
                {s.published ? "Published" : "Draft"}
              </button>
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Stream"
          message={`Delete "${truncate(deleteTarget.title, 60)}"? This cannot be undone.`}
          confirmLabel="Delete"
          danger
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => {
            const id = deleteTarget.id;
            setDeleteTarget(null);
            deleteStr(id, {
              onSuccess: (r) => {
                if (r.__kind__ === "ok") {
                  toast.success("Stream deleted");
                } else {
                  toast.error(`Failed: ${r.err}`);
                }
              },
              onError: (err) => toast.error(`Error: ${err.message}`),
            });
          }}
        />
      )}
      {isDeleting && null}
    </div>
  );
}

// ── Audit Log Tab ──────────────────────────────────────────────────────────────

const AUDIT_PAGE_SIZE = 10n;

function AuditLogTab() {
  const [page, setPage] = useState(0n);
  const offset = page * AUDIT_PAGE_SIZE;
  const { data: entries, isLoading } = useAuditLog(offset, AUDIT_PAGE_SIZE);
  const { mutate: clearLog, isPending: isClearing } = useClearAuditLog();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const hasNext = (entries?.length ?? 0) === Number(AUDIT_PAGE_SIZE);
  const hasPrev = page > 0n;

  return (
    <div className="space-y-4" data-ocid="audit-log-tab">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-widest text-foreground">
          Audit Log
        </h2>
        {entries && entries.length > 0 && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="gap-1.5 font-bold text-xs text-destructive border-destructive/30 hover:bg-destructive/10"
            onClick={() => setShowClearConfirm(true)}
            data-ocid="clear-audit-log-btn"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Log
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-12 w-full rounded-md" />
          ))}
        </div>
      ) : !entries?.length ? (
        <div
          className="flex flex-col items-center py-16 text-center"
          data-ocid="audit-empty"
        >
          <ClipboardList className="w-10 h-10 text-muted-foreground/40 mb-3" />
          <p className="text-sm font-bold text-muted-foreground">
            No audit log entries.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-md border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-card border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Action
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground hidden md:table-cell">
                    Resource
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Timestamp
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground hidden sm:table-cell">
                    Principal
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr
                    key={entry.id.toString()}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                    data-ocid={`audit-row-${entry.id}`}
                  >
                    <td className="px-4 py-3">
                      <span className="text-xs font-black text-accent uppercase tracking-wide">
                        {entry.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs font-semibold text-foreground">
                        {truncate(entry.resource_title, 40)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono text-muted-foreground">
                        {formatTimestamp(entry.timestamp)}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span
                        className="text-xs font-mono text-muted-foreground"
                        title={entry.principal_text}
                      >
                        {truncate(entry.principal_text, 20)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-semibold">
              Page {Number(page) + 1}
            </span>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={!hasPrev}
                onClick={() => setPage((p) => p - 1n)}
                className="font-bold text-xs gap-1"
                data-ocid="audit-prev-btn"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Prev
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={!hasNext}
                onClick={() => setPage((p) => p + 1n)}
                className="font-bold text-xs gap-1"
                data-ocid="audit-next-btn"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </>
      )}

      {showClearConfirm && (
        <ConfirmDialog
          title="Clear Audit Log"
          message="This will permanently delete all audit log entries. This action cannot be undone."
          confirmLabel={isClearing ? "Clearing…" : "Clear All"}
          danger
          onCancel={() => setShowClearConfirm(false)}
          onConfirm={() => {
            setShowClearConfirm(false);
            clearLog(undefined, {
              onSuccess: () => toast.success("Audit log cleared"),
              onError: (err) => toast.error(`Error: ${err.message}`),
            });
          }}
        />
      )}
    </div>
  );
}

// ── Settings Tab ───────────────────────────────────────────────────────────────

function SettingsTab() {
  const { data: adminPrincipal } = useAdminPrincipal();
  const { mutate: transfer, isPending: isTransferring } = useTransferAdmin();
  const [newPrincipal, setNewPrincipal] = useState("");
  const [showTransferConfirm, setShowTransferConfirm] = useState(false);

  return (
    <div className="space-y-6" data-ocid="settings-tab">
      <h2 className="text-sm font-black uppercase tracking-widest text-foreground">
        Admin Settings
      </h2>

      {/* Current principal */}
      <div className="bg-card border border-border rounded-md p-5 space-y-3">
        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
          Current Admin Principal
        </p>
        <div className="flex items-center gap-3 px-4 py-3 bg-background border border-border rounded-sm">
          <Shield className="w-4 h-4 text-accent shrink-0" />
          <span className="text-xs font-mono text-foreground break-all">
            {adminPrincipal ?? "Loading…"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground font-semibold">
          This principal is the sole administrator of Bharat Netra. Keep it
          safe.
        </p>
      </div>

      <Separator />

      {/* Transfer admin */}
      <div className="bg-card border border-border rounded-md p-5 space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-foreground">
              Transfer Admin Access
            </p>
            <p className="text-xs text-muted-foreground font-semibold mt-1">
              Transfer admin rights to another Internet Identity principal. You
              will immediately lose admin access.
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            New Admin Principal
          </Label>
          <Input
            value={newPrincipal}
            onChange={(e) => setNewPrincipal(e.target.value)}
            placeholder="e.g. aaaaa-aa or full principal text"
            className="bg-background border-border text-foreground font-mono text-xs"
            data-ocid="transfer-principal-input"
          />
        </div>
        <Button
          type="button"
          disabled={!newPrincipal.trim() || isTransferring}
          className="font-black uppercase tracking-wide text-xs bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-2"
          onClick={() => setShowTransferConfirm(true)}
          data-ocid="transfer-admin-btn"
        >
          {isTransferring ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Transferring…
            </span>
          ) : (
            "Transfer Admin Rights"
          )}
        </Button>
      </div>

      {showTransferConfirm && (
        <ConfirmDialog
          title="Transfer Admin Rights"
          message={`This will transfer all admin rights to "${newPrincipal}". You will immediately lose access. This cannot be undone.`}
          confirmLabel="Transfer Now"
          danger
          onCancel={() => setShowTransferConfirm(false)}
          onConfirm={() => {
            setShowTransferConfirm(false);
            transfer(newPrincipal.trim(), {
              onSuccess: (r) => {
                if (r.__kind__ === "ok") {
                  toast.success("Admin rights transferred");
                  setNewPrincipal("");
                } else {
                  toast.error(`Failed: ${r.err}`);
                }
              },
              onError: (err) => toast.error(`Error: ${err.message}`),
            });
          }}
        />
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const { identity, isInitializing, clear } = useInternetIdentity();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("articles");

  const isLoggedIn = !!identity && !isInitializing;
  const { data: isAdminData, isLoading: isAdminLoading } = useIsAdmin();

  // Auth guard
  useEffect(() => {
    if (!isInitializing && !identity) {
      void navigate({ to: "/admin/login" });
    }
  }, [identity, isInitializing, navigate]);

  if (isInitializing || !identity) {
    return (
      <div
        className="flex items-center justify-center py-32"
        data-ocid="admin-loading"
      >
        <span className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isLoggedIn && isAdminLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-4">
        <Skeleton className="h-16 w-full rounded-md" />
        <div className="grid grid-cols-4 gap-4">
          <Skeleton className="h-8 w-full rounded-sm" />
          <Skeleton className="h-8 w-full rounded-sm" />
          <Skeleton className="h-8 w-full rounded-sm" />
          <Skeleton className="h-8 w-full rounded-sm" />
        </div>
        <Skeleton className="h-64 w-full rounded-md" />
      </div>
    );
  }

  if (isLoggedIn && isAdminData === false) {
    return (
      <div
        className="flex flex-col items-center justify-center py-32 px-4 text-center"
        data-ocid="admin-403"
      >
        <div className="w-16 h-16 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="text-xl font-black text-foreground uppercase tracking-widest mb-2">
          403 — Unauthorized
        </h1>
        <p className="text-sm text-muted-foreground font-semibold max-w-xs mb-6">
          Your identity does not have admin privileges on this platform.
        </p>
        <Button
          type="button"
          variant="outline"
          className="font-bold gap-2"
          onClick={() => {
            clear();
            void navigate({ to: "/admin/login" });
          }}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    );
  }

  const TABS: {
    key: AdminTab;
    label: string;
    icon: React.ElementType;
  }[] = [
    { key: "articles", label: "Articles", icon: FileText },
    { key: "streams", label: "Streams", icon: Radio },
    { key: "audit", label: "Audit Log", icon: ClipboardList },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      data-ocid="admin-dashboard"
    >
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-accent" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-widest text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-xs text-muted-foreground font-semibold mt-0.5">
              Bharat Netra — Content Management
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="text-xs font-black text-chart-1 border-chart-1/40 bg-chart-1/10 gap-1.5"
          >
            <CheckCircle className="w-3 h-3" />
            Verified Admin
          </Badge>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              clear();
              void navigate({ to: "/admin/login" });
            }}
            className="text-xs font-bold uppercase tracking-wide gap-1.5"
            data-ocid="admin-logout-btn"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </Button>
        </div>
      </div>

      {/* ── Security notice ── */}
      <div className="flex items-center gap-3 px-4 py-3 bg-accent/5 border border-accent/25 rounded-md mb-6">
        <Eye className="w-4 h-4 text-accent shrink-0" />
        <p className="text-xs font-semibold text-foreground">
          All content submitted here is published on Bharat Netra. Ensure every
          article and stream is verified, factual, and free from bias before
          publishing.
        </p>
      </div>

      {/* ── Tab navigation ── */}
      <div
        className="flex items-center gap-1 bg-card border border-border rounded-md p-1 w-fit mb-6 overflow-x-auto"
        data-ocid="admin-tabs"
        role="tablist"
      >
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={activeTab === key}
            onClick={() => setActiveTab(key)}
            data-ocid={`admin-tab-${key}`}
            className={[
              "flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-black uppercase tracking-wider transition-smooth whitespace-nowrap",
              activeTab === key
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            ].join(" ")}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div className="bg-card border border-border rounded-md p-6">
        {activeTab === "articles" && <ArticlesTab />}
        {activeTab === "streams" && <StreamsTab />}
        {activeTab === "audit" && <AuditLogTab />}
        {activeTab === "settings" && <SettingsTab />}
      </div>
    </div>
  );
}
