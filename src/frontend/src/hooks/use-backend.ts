import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  Article,
  ArticleInput,
  AuditLogEntry,
  DashboardStats,
  LiveStream,
  LiveStreamInput,
} from "../types";

// ── Public feeds (published only) ─────────────────────────────────────────────

export function useArticles() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Article[]>({
    queryKey: ["articles-published"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedArticles();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useStreams() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LiveStream[]>({
    queryKey: ["streams-published"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedStreams();
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
  });
}

// ── Admin feeds (all items including unpublished) ──────────────────────────────

export function useAdminArticles() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Article[]>({
    queryKey: ["articles-admin"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getArticles();
    },
    enabled: !!actor && !isFetching,
    staleTime: 10_000,
  });
}

export function useAdminStreams() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LiveStream[]>({
    queryKey: ["streams-admin"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStreams();
    },
    enabled: !!actor && !isFetching,
    staleTime: 10_000,
  });
}

// ── Single article ─────────────────────────────────────────────────────────────

export function useArticle(id: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Article | null>({
    queryKey: ["article", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getArticle(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
    staleTime: 60_000,
  });
}

// ── Dashboard stats ────────────────────────────────────────────────────────────

export function useDashboard() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DashboardStats | null>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDashboardStats();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ── Admin checks ───────────────────────────────────────────────────────────────

export function useIsAdmin() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["is-admin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isAdmin();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useAdminPrincipal() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<string>({
    queryKey: ["admin-principal"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getAdminPrincipalText();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

// ── Admin mutations ────────────────────────────────────────────────────────────

export function useInitAdmin() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.initAdmin();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["is-admin"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-principal"] });
    },
  });
}

export function useTransferAdmin() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    { __kind__: "ok"; ok: string } | { __kind__: "err"; err: string },
    Error,
    string
  >({
    mutationFn: async (newPrincipalText: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.transferAdmin(newPrincipalText);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-principal"] });
    },
  });
}

export function useAdminSubmitArticle() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    { __kind__: "ok"; ok: bigint } | { __kind__: "err"; err: string },
    Error,
    ArticleInput
  >({
    mutationFn: async (input: ArticleInput) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminSubmitArticle(input);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["articles-admin"] });
      void queryClient.invalidateQueries({ queryKey: ["articles-published"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useAdminSubmitStream() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    { __kind__: "ok"; ok: bigint } | { __kind__: "err"; err: string },
    Error,
    LiveStreamInput
  >({
    mutationFn: async (input: LiveStreamInput) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminSubmitStream(input);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["streams-admin"] });
      void queryClient.invalidateQueries({ queryKey: ["streams-published"] });
    },
  });
}

export function useUpdateArticle() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    { __kind__: "ok"; ok: string } | { __kind__: "err"; err: string },
    Error,
    { id: bigint; input: ArticleInput }
  >({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateArticle(id, input);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["articles-admin"] });
      void queryClient.invalidateQueries({ queryKey: ["articles-published"] });
    },
  });
}

export function useUpdateStream() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    { __kind__: "ok"; ok: string } | { __kind__: "err"; err: string },
    Error,
    { id: bigint; input: LiveStreamInput }
  >({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateStream(id, input);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["streams-admin"] });
      void queryClient.invalidateQueries({ queryKey: ["streams-published"] });
    },
  });
}

export function useToggleArticlePublished() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    { __kind__: "ok"; ok: string } | { __kind__: "err"; err: string },
    Error,
    bigint
  >({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.toggleArticlePublished(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["articles-admin"] });
      void queryClient.invalidateQueries({ queryKey: ["articles-published"] });
    },
  });
}

export function useToggleStreamPublished() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    { __kind__: "ok"; ok: string } | { __kind__: "err"; err: string },
    Error,
    bigint
  >({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.toggleStreamPublished(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["streams-admin"] });
      void queryClient.invalidateQueries({ queryKey: ["streams-published"] });
    },
  });
}

export function useDeleteArticle() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    { __kind__: "ok"; ok: string } | { __kind__: "err"; err: string },
    Error,
    bigint
  >({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteArticle(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["articles-admin"] });
      void queryClient.invalidateQueries({ queryKey: ["articles-published"] });
    },
  });
}

export function useDeleteStream() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    { __kind__: "ok"; ok: string } | { __kind__: "err"; err: string },
    Error,
    bigint
  >({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteStream(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["streams-admin"] });
      void queryClient.invalidateQueries({ queryKey: ["streams-published"] });
    },
  });
}

export function useAuditLog(offset: bigint, limit: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<AuditLogEntry[]>({
    queryKey: ["audit-log", offset.toString(), limit.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAuditLog(offset, limit);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useClearAuditLog() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.clearAuditLog();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["audit-log"] });
    },
  });
}
