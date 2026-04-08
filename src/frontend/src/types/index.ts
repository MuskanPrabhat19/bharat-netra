import type {
  ArticleId,
  ArticleInput,
  AdminResult as BackendAdminResult,
  Article as BackendArticle,
  AuditLogEntry as BackendAuditLogEntry,
  LiveStream as BackendLiveStream,
  BiasIndicator,
  Classification,
  DashboardStats,
  LiveStreamInput,
  PropagandaAnalysis,
  SourceReliability,
  StreamId,
  StreamStatus,
} from "../backend";

// Re-export backend types directly for frontend use
export type {
  ArticleId,
  ArticleInput,
  Classification,
  DashboardStats,
  LiveStreamInput,
  PropagandaAnalysis,
  SourceReliability,
  StreamId,
  StreamStatus,
  BiasIndicator,
};

export type Article = BackendArticle;
export type LiveStream = BackendLiveStream;
export type AuditLogEntry = BackendAuditLogEntry;
export type AdminResult = BackendAdminResult;

// Re-export enums
export { Classification as ClassificationEnum } from "../backend";
export { SourceReliability as SourceReliabilityEnum } from "../backend";
export { StreamStatus as StreamStatusEnum } from "../backend";
export { BiasIndicator as BiasIndicatorEnum } from "../backend";

// Utility types
export interface NavLink {
  label: string;
  path: string;
  icon?: string;
}
