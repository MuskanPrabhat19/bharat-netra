import type {
  backendInterface,
  Article,
  LiveStream,
  DashboardStats,
  ArticleInput,
  LiveStreamInput,
  ArticleId,
  StreamId,
  AuditLogEntry,
} from "../backend";
import {
  BiasIndicator,
  Classification,
  SourceReliability,
  StreamStatus,
} from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleArticles: Article[] = [
  {
    id: BigInt(0),
    headline: "Parliament Passes Digital Infrastructure Bill 2026",
    summary:
      "The Lok Sabha passed the Digital Infrastructure Bill 2026 with a two-thirds majority, allocating ₹2.4 lakh crore for rural broadband and 5G rollout over five years.",
    body: "After three days of debate, the Digital Infrastructure Bill 2026 was passed by the Lok Sabha with 412 votes in favour and 73 against. The bill mandates nationwide 5G coverage by 2028.",
    category: "Politics",
    author: "Priya Sharma",
    source_outlet: "The Hindu",
    publication_date: now,
    source_reliability_score: BigInt(90),
    fact_completeness_score: BigInt(85),
    no_contradiction_flag: BigInt(80),
    truth_score: BigInt(85),
    bias_indicator: BiasIndicator.Low,
    source_reliability: SourceReliability.High,
    classification: Classification.Fact,
    published: true,
    propaganda_analysis: {
      emotional_manipulation: false,
      selective_facts: false,
      fear_based_language: false,
      ideological_pushing: false,
    },
  },
  {
    id: BigInt(1),
    headline: "New Tax Policy Will Destroy Middle Class, Critics Warn",
    summary:
      "Opposition leaders claim the revised income-tax slabs unfairly burden salaried employees while large corporations enjoy widened exemptions.",
    body: "Several opposition MPs and economists have voiced strong concern over the Finance Ministry's updated tax framework.",
    category: "Politics",
    author: "Rahul Verma",
    source_outlet: "Outlook India",
    publication_date: now,
    source_reliability_score: BigInt(55),
    fact_completeness_score: BigInt(35),
    no_contradiction_flag: BigInt(35),
    truth_score: BigInt(42),
    bias_indicator: BiasIndicator.High,
    source_reliability: SourceReliability.Medium,
    classification: Classification.Opinion,
    published: true,
    propaganda_analysis: {
      emotional_manipulation: true,
      selective_facts: true,
      fear_based_language: false,
      ideological_pushing: true,
      suggested_rewrite:
        "Revised tax slabs have drawn mixed reactions; independent analysis suggests varied impact across income brackets.",
    },
  },
  {
    id: BigInt(2),
    headline: "ISRO Successfully Tests Reusable Launch Vehicle Landing Autonomously",
    summary:
      "ISRO's RLV-TD completed a fully autonomous landing at Chitradurga aeronautical test range, marking a landmark milestone in India's reusable space launch ambitions.",
    body: "The Indian Space Research Organisation confirmed that its Reusable Launch Vehicle Technology Demonstrator (RLV-TD) executed a precise autonomous runway landing.",
    category: "Science",
    author: "Ananya Krishnan",
    source_outlet: "ISRO Official / Indian Express",
    publication_date: now,
    source_reliability_score: BigInt(95),
    fact_completeness_score: BigInt(90),
    no_contradiction_flag: BigInt(88),
    truth_score: BigInt(91),
    bias_indicator: BiasIndicator.Low,
    source_reliability: SourceReliability.High,
    classification: Classification.Fact,
    published: true,
    propaganda_analysis: {
      emotional_manipulation: false,
      selective_facts: false,
      fear_based_language: false,
      ideological_pushing: false,
    },
  },
  {
    id: BigInt(3),
    headline: "Scientists Claim Breakthrough Cold Fusion Experiment Achieved in Pune Lab",
    summary:
      "An unverified report circulating on social media claims researchers achieved sustained cold fusion at room temperature.",
    body: "A document circulating on social media purports to describe a cold fusion experiment at a private research facility in Pune. The claims have not been published in any peer-reviewed journal.",
    category: "Science",
    author: "Desk Report",
    source_outlet: "Unverified Social Media Claim",
    publication_date: now,
    source_reliability_score: BigInt(15),
    fact_completeness_score: BigInt(40),
    no_contradiction_flag: BigInt(45),
    truth_score: BigInt(33),
    bias_indicator: BiasIndicator.Medium,
    source_reliability: SourceReliability.Low,
    classification: Classification.Unverified,
    published: false,
    propaganda_analysis: {
      emotional_manipulation: false,
      selective_facts: true,
      fear_based_language: false,
      ideological_pushing: false,
      suggested_rewrite:
        "Unverified claim: a document on social media alleges a cold fusion experiment in Pune; no peer-reviewed publication or institutional verification exists.",
    },
  },
  {
    id: BigInt(4),
    headline: "India Clinches IPL 2026 Season Opener with Record Run Chase",
    summary:
      "Mumbai Indians defeated Chennai Super Kings by 4 wickets in a thrilling 218-run chase at Wankhede Stadium.",
    body: "In a pulsating Indian Premier League opener at Wankhede Stadium, Mumbai Indians overhauled Chennai Super Kings' total of 217/4 with 2 balls to spare.",
    category: "Sports",
    author: "Deepak Nair",
    source_outlet: "Cricinfo / BCCI",
    publication_date: now,
    source_reliability_score: BigInt(88),
    fact_completeness_score: BigInt(75),
    no_contradiction_flag: BigInt(70),
    truth_score: BigInt(78),
    bias_indicator: BiasIndicator.Low,
    source_reliability: SourceReliability.High,
    classification: Classification.Fact,
    published: true,
    propaganda_analysis: {
      emotional_manipulation: false,
      selective_facts: false,
      fear_based_language: false,
      ideological_pushing: false,
    },
  },
  {
    id: BigInt(5),
    headline: "Virat Kohli's Test Retirement Will Cripple Indian Batting for a Decade",
    summary:
      "Several former cricketers and commentators argue Kohli's potential Test retirement would leave an irreplaceable void in India's middle-order.",
    body: "Following speculation about Virat Kohli's future in Test cricket, a number of commentators have offered sharply divergent opinions.",
    category: "Sports",
    author: "Sanjay Raut",
    source_outlet: "Times of India Sports",
    publication_date: now,
    source_reliability_score: BigInt(65),
    fact_completeness_score: BigInt(50),
    no_contradiction_flag: BigInt(50),
    truth_score: BigInt(55),
    bias_indicator: BiasIndicator.Medium,
    source_reliability: SourceReliability.Medium,
    classification: Classification.Opinion,
    published: true,
    propaganda_analysis: {
      emotional_manipulation: true,
      selective_facts: false,
      fear_based_language: false,
      ideological_pushing: false,
      suggested_rewrite:
        "Opinions on the impact of Kohli's potential Test retirement vary widely among experts; no announcement has been made.",
    },
  },
  {
    id: BigInt(6),
    headline: "AIIMS Study Confirms Weekly 150-Minute Exercise Reduces Cardiovascular Risk by 35%",
    summary:
      "A peer-reviewed AIIMS cohort study of 12,000 adults found that meeting WHO exercise guidelines reduced the 10-year cardiovascular event risk by 35%.",
    body: "A large-scale longitudinal study conducted by the All India Institute of Medical Sciences followed 12,000 adults across six cities over eight years.",
    category: "Health",
    author: "Dr. Meena Pillai",
    source_outlet: "AIIMS / Indian Journal of Medical Research",
    publication_date: now,
    source_reliability_score: BigInt(95),
    fact_completeness_score: BigInt(88),
    no_contradiction_flag: BigInt(82),
    truth_score: BigInt(88),
    bias_indicator: BiasIndicator.Low,
    source_reliability: SourceReliability.High,
    classification: Classification.Fact,
    published: true,
    propaganda_analysis: {
      emotional_manipulation: false,
      selective_facts: false,
      fear_based_language: false,
      ideological_pushing: false,
    },
  },
  {
    id: BigInt(7),
    headline: "Ayurvedic Supplement Claimed to Reverse Type-2 Diabetes in 30 Days",
    summary:
      "A viral social media campaign promotes an Ayurvedic formulation claiming complete reversal of Type-2 diabetes within 30 days, with no clinical trial data available.",
    body: "A supplement marketed under the brand name 'GlucoReset' has gained significant social media traction with testimonials claiming full reversal of Type-2 diabetes.",
    category: "Health",
    author: "Desk Report",
    source_outlet: "Social Media / Consumer Alert",
    publication_date: now,
    source_reliability_score: BigInt(55),
    fact_completeness_score: BigInt(65),
    no_contradiction_flag: BigInt(72),
    truth_score: BigInt(64),
    bias_indicator: BiasIndicator.Medium,
    source_reliability: SourceReliability.Low,
    classification: Classification.Unverified,
    published: true,
    propaganda_analysis: {
      emotional_manipulation: true,
      selective_facts: true,
      fear_based_language: false,
      ideological_pushing: false,
      suggested_rewrite:
        "A supplement claims to reverse Type-2 diabetes in 30 days; no clinical trial data supports this claim. Consult a physician before changing prescribed treatment.",
    },
  },
];

const sampleStreams: LiveStream[] = [
  {
    id: BigInt(0),
    title: "Budget Session 2026 – Live Coverage",
    description:
      "Live broadcast of the Union Budget Session 2026 proceedings from Parliament House, New Delhi.",
    source: "Rajya Sabha TV",
    status: StreamStatus.Live,
    start_time: now,
    embed_url: "https://www.youtube.com/embed/live_stream?channel=RajyaSabhaTV",
    published: true,
  },
  {
    id: BigInt(1),
    title: "Supreme Court Hearing – Civic Rights Case",
    description:
      "Upcoming live coverage of the Supreme Court constitutional bench hearing on civic digital rights and data privacy.",
    source: "DD National",
    status: StreamStatus.Upcoming,
    start_time: now + BigInt(7_200_000_000_000),
    embed_url: "https://www.youtube.com/embed/live_stream?channel=DDNational",
    published: true,
  },
  {
    id: BigInt(2),
    title: "ISRO Press Conference Recap",
    description:
      "Recorded replay of the ISRO press conference following the successful RLV-TD autonomous landing mission.",
    source: "ISRO Official",
    status: StreamStatus.Ended,
    start_time: now - BigInt(86_400_000_000_000),
    embed_url: "https://www.youtube.com/embed/isro_rlv_recap",
    published: false,
  },
];

let articleIdCounter = sampleArticles.length;
let streamIdCounter = sampleStreams.length;
const auditLog: AuditLogEntry[] = [
  {
    id: BigInt(0),
    action: "INIT_ADMIN",
    principal_text: "2vxsx-fae",
    resource_id: "admin",
    resource_title: "Admin Seat Claimed",
    timestamp: now - BigInt(86_400_000_000_000),
  },
  {
    id: BigInt(1),
    action: "SUBMIT_ARTICLE",
    principal_text: "2vxsx-fae",
    resource_id: "0",
    resource_title: "Parliament Passes Digital Infrastructure Bill 2026",
    timestamp: now - BigInt(3_600_000_000_000),
  },
];

export const mockBackend: backendInterface = {
  getArticles: async () => sampleArticles,
  getPublishedArticles: async () => sampleArticles.filter((a) => a.published),
  getArticle: async (id: ArticleId) =>
    sampleArticles.find((a) => a.id === id) ?? null,
  getDashboardStats: async (): Promise<DashboardStats> => ({
    total_articles: BigInt(8),
    verified_count: BigInt(4),
    unverified_count: BigInt(2),
    opinion_count: BigInt(2),
    low_bias_count: BigInt(4),
    medium_bias_count: BigInt(3),
    high_bias_count: BigInt(1),
    low_reliability_count: BigInt(2),
    medium_reliability_count: BigInt(2),
    high_reliability_count: BigInt(4),
    propaganda_alert_count: BigInt(3),
    last_updated: now,
  }),
  getStreams: async () => sampleStreams,
  getPublishedStreams: async () => sampleStreams.filter((s) => s.published),
  adminSubmitArticle: async (
    input: ArticleInput,
  ): Promise<{ __kind__: "ok"; ok: ArticleId } | { __kind__: "err"; err: string }> => {
    const id = BigInt(articleIdCounter++);
    const truthScore =
      (input.source_reliability_score +
        input.fact_completeness_score +
        input.no_contradiction_flag) /
      BigInt(3);
    sampleArticles.push({
      ...input,
      id,
      truth_score: truthScore,
      published: false,
    });
    return { __kind__: "ok", ok: id };
  },
  adminSubmitStream: async (
    input: LiveStreamInput,
  ): Promise<{ __kind__: "ok"; ok: StreamId } | { __kind__: "err"; err: string }> => {
    const id = BigInt(streamIdCounter++);
    sampleStreams.push({ ...input, id, published: false });
    return { __kind__: "ok", ok: id };
  },
  toggleArticlePublished: async (id: ArticleId) => {
    const a = sampleArticles.find((x) => x.id === id);
    if (!a) return { __kind__: "err", err: "Not found" };
    a.published = !a.published;
    return { __kind__: "ok", ok: `Published: ${a.published}` };
  },
  toggleStreamPublished: async (id: StreamId) => {
    const s = sampleStreams.find((x) => x.id === id);
    if (!s) return { __kind__: "err", err: "Not found" };
    s.published = !s.published;
    return { __kind__: "ok", ok: `Published: ${s.published}` };
  },
  deleteArticle: async (id: ArticleId) => {
    const idx = sampleArticles.findIndex((x) => x.id === id);
    if (idx === -1) return { __kind__: "err", err: "Not found" };
    sampleArticles.splice(idx, 1);
    return { __kind__: "ok", ok: "Deleted" };
  },
  deleteStream: async (id: StreamId) => {
    const idx = sampleStreams.findIndex((x) => x.id === id);
    if (idx === -1) return { __kind__: "err", err: "Not found" };
    sampleStreams.splice(idx, 1);
    return { __kind__: "ok", ok: "Deleted" };
  },
  updateArticle: async (id: ArticleId, input: ArticleInput) => {
    const a = sampleArticles.find((x) => x.id === id);
    if (!a) return { __kind__: "err", err: "Not found" };
    Object.assign(a, input);
    a.truth_score =
      (input.source_reliability_score +
        input.fact_completeness_score +
        input.no_contradiction_flag) /
      BigInt(3);
    return { __kind__: "ok", ok: "Updated" };
  },
  updateStream: async (id: StreamId, input: LiveStreamInput) => {
    const s = sampleStreams.find((x) => x.id === id);
    if (!s) return { __kind__: "err", err: "Not found" };
    Object.assign(s, input);
    return { __kind__: "ok", ok: "Updated" };
  },
  initAdmin: async () => ({ __kind__: "ok", ok: "Admin initialized" }),
  isAdmin: async () => true,
  getAdminPrincipalText: async () => "2vxsx-fae",
  transferAdmin: async (_newPrincipal: string) => ({
    __kind__: "ok",
    ok: "Admin transferred",
  }),
  getAuditLog: async (_offset: bigint, _limit: bigint) => auditLog,
  clearAuditLog: async () => ({ __kind__: "ok", ok: "Audit log cleared" }),
};
