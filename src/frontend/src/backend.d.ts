import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AuditLogEntry {
    id: bigint;
    resource_title: string;
    action: string;
    principal_text: string;
    timestamp: bigint;
    resource_id: string;
}
export type ArticleId = bigint;
export interface DashboardStats {
    low_reliability_count: bigint;
    medium_reliability_count: bigint;
    last_updated: bigint;
    propaganda_alert_count: bigint;
    low_bias_count: bigint;
    verified_count: bigint;
    unverified_count: bigint;
    high_bias_count: bigint;
    high_reliability_count: bigint;
    total_articles: bigint;
    medium_bias_count: bigint;
    opinion_count: bigint;
}
export interface LiveStreamInput {
    status: StreamStatus;
    title: string;
    source: string;
    description: string;
    start_time: bigint;
    embed_url: string;
}
export interface PropagandaAnalysis {
    fear_based_language: boolean;
    selective_facts: boolean;
    emotional_manipulation: boolean;
    suggested_rewrite?: string;
    ideological_pushing: boolean;
}
export interface ArticleInput {
    source_reliability: SourceReliability;
    propaganda_analysis: PropagandaAnalysis;
    body: string;
    headline: string;
    fact_completeness_score: bigint;
    source_reliability_score: bigint;
    author: string;
    summary: string;
    no_contradiction_flag: bigint;
    category: string;
    publication_date: bigint;
    bias_indicator: BiasIndicator;
    source_outlet: string;
    classification: Classification;
}
export type StreamId = bigint;
export type AdminResult = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface Article {
    id: ArticleId;
    source_reliability: SourceReliability;
    propaganda_analysis: PropagandaAnalysis;
    body: string;
    published: boolean;
    headline: string;
    fact_completeness_score: bigint;
    source_reliability_score: bigint;
    author: string;
    summary: string;
    no_contradiction_flag: bigint;
    category: string;
    truth_score: bigint;
    publication_date: bigint;
    bias_indicator: BiasIndicator;
    source_outlet: string;
    classification: Classification;
}
export interface LiveStream {
    id: StreamId;
    status: StreamStatus;
    title: string;
    source: string;
    published: boolean;
    description: string;
    start_time: bigint;
    embed_url: string;
}
export enum BiasIndicator {
    Low = "Low",
    High = "High",
    Medium = "Medium"
}
export enum Classification {
    Fact = "Fact",
    Opinion = "Opinion",
    Unverified = "Unverified"
}
export enum SourceReliability {
    Low = "Low",
    High = "High",
    Medium = "Medium",
    NotSet = "NotSet"
}
export enum StreamStatus {
    Ended = "Ended",
    Live = "Live",
    Upcoming = "Upcoming"
}
export interface backendInterface {
    adminSubmitArticle(input: ArticleInput): Promise<{
        __kind__: "ok";
        ok: ArticleId;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminSubmitStream(input: LiveStreamInput): Promise<{
        __kind__: "ok";
        ok: StreamId;
    } | {
        __kind__: "err";
        err: string;
    }>;
    clearAuditLog(): Promise<AdminResult>;
    deleteArticle(id: ArticleId): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteStream(id: StreamId): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAdminPrincipalText(): Promise<string>;
    getArticle(id: ArticleId): Promise<Article | null>;
    getArticles(): Promise<Array<Article>>;
    getAuditLog(offset: bigint, limit: bigint): Promise<Array<AuditLogEntry>>;
    getDashboardStats(): Promise<DashboardStats>;
    getPublishedArticles(): Promise<Array<Article>>;
    getPublishedStreams(): Promise<Array<LiveStream>>;
    getStreams(): Promise<Array<LiveStream>>;
    initAdmin(): Promise<AdminResult>;
    isAdmin(): Promise<boolean>;
    toggleArticlePublished(id: ArticleId): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    toggleStreamPublished(id: StreamId): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    transferAdmin(newPrincipalText: string): Promise<AdminResult>;
    updateArticle(id: ArticleId, input: ArticleInput): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateStream(id: StreamId, input: LiveStreamInput): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
