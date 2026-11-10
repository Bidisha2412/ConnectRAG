export type ScreenView = 
  | 'command-center'
  | 'live-demo'
  | 'data-lab'
  | 'dataset-explorer'
  | 'training-analytics'
  | 'architecture'
  | 'about-methodology';

export type TierType = 'tier-1-cloud' | 'tier-2-local' | 'tier-3-cache';

export type NetworkQualityState = 'healthy' | 'degraded' | 'critical' | 'offline';

export interface NetworkTelemetry {
  nqs: number;
  latencyMs: number;
  bandwidthMbps: number;
  packetLossPct: number;
  jitterMs: number;
  sampleHistory: number[];
  state: NetworkQualityState;
  consecutiveLowSamples: number;
}

export interface RetrievedSource {
  id: string;
  title: string;
  section: string;
  similarity: number;
  excerpt: string;
  chunkHash: string;
  tokenCount: number;
  model: string;
  sourcePdf: string;
}

export interface SimulationResult {
  tier: TierType;
  tierName: string;
  response: string;
  latencyMs: number;
  cacheHit: boolean;
  confidenceScore: number;
  escalated: boolean;
  sources: RetrievedSource[];
  timestamp: string;
  queryId: string;
  queryText: string;
  complexityScore: number;
}

export interface TelemetryLogEntry {
  id: string;
  timestamp: string;
  query: string;
  tier: TierType;
  tierLabel: string;
  latencyMs: number;
  status: 'OK' | 'FALLBACK' | 'HIT' | 'ESCALATED';
  nqs: number;
}

export interface ClinicalQuery {
  id: string;
  query: string;
  domain: 'rural' | 'clinical';
  complexity: number;
  keywords: string[];
  description: string;
}

export interface MedQuADSourceItem {
  source: string;
  originalCount: number;
  postCapCount: number;
  origPct: number;
  postCapPct: number;
  description: string;
}

export interface MedMCQASubjectItem {
  subject: string;
  questionCount: number;
  percentage: number;
  specialtyGroup: 'Basic Sciences' | 'Clinical Specialities' | 'Surgical & Allied' | 'Public Health';
}

export interface CorpusPdfItem {
  filename: string;
  pages: number;
  chunks: number;
  avgTokensPerChunk: number;
  corpusSharePct: number;
  category: string;
  authority: string;
}

export interface TrainingDatasetItem {
  name: string;
  trainPairs: number;
  valPairs: number;
  testPairs: number;
  totalPairs: number;
  sharePct: number;
  description: string;
  status: 'Ready' | 'Verified' | 'Preprocessed';
}

export interface PipelineStageItem {
  step: number;
  name: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  outputArtifact: string;
  runtime: string;
}

export interface CritiqueItem {
  suggestion: string;
  decision: 'Adopted fully' | 'Adopted (Heuristic)' | 'Adopted (Self-Consistency)' | 'Rejected for Core' | 'Rejected' | 'Deferred to Stretch';
  justification: string;
  statusCategory: 'adopted' | 'rejected' | 'deferred';
}

export interface MethodologyPhase {
  phase: string;
  title: string;
  timeframe: string;
  focus: string;
  deliverables: string[];
}
