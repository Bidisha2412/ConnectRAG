import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Database,
  Cpu,
  Layers,
  Network,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  ShieldCheck,
  FileText,
  Activity,
  Zap,
  Server,
  HardDrive,
  Flame
} from 'lucide-react';
import { ScreenView } from '../types/connectrag';

interface CommandCenterProps {
  onNavigate: (view: ScreenView) => void;
  nqsScore: number;
  activeTier: 'tier-1-cloud' | 'tier-2-local' | 'tier-3-cache';
}

export const CommandCenterView: React.FC<CommandCenterProps> = ({
  onNavigate,
  nqsScore,
  activeTier
}) => {
  const kpis = [
    {
      label: 'TOTAL CORPUS CHUNKS',
      value: '8,420',
      sub: 'Normalized 256–512 token chunks',
      detail: '7 Medical Textbooks & Protocols',
      icon: FileText,
      accent: 'text-[#42D9F5]',
      border: 'border-[#42D9F5]/30'
    },
    {
      label: 'TRAINING PAIRS',
      value: '256,959',
      sub: 'Balanced with GHR/GARD 6.5k cap',
      detail: 'MedQuAD + MedMCQA + PubMedQA',
      icon: Database,
      accent: 'text-[#2DD4BF]',
      border: 'border-[#2DD4BF]/30'
    },
    {
      label: 'DATASETS PROCESSED',
      value: '4 Corpora',
      sub: '100% split verified & audited',
      detail: 'Train / Val / Test partitioned',
      icon: Layers,
      accent: 'text-[#A78BFA]',
      border: 'border-[#A78BFA]/30'
    },
    {
      label: 'RETRIEVAL MODES',
      value: '3 Tiers',
      sub: 'Autonomic NQS-governed failover',
      detail: 'Cloud · Local Edge SLM · Cache',
      icon: Cpu,
      accent: 'text-[#34D399]',
      border: 'border-[#34D399]/30'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0D1422] via-[#111B2C] to-[#080D18] border border-[#24334A] p-6 sm:p-8 shadow-xl">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#42D9F5]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#2DD4BF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#42D9F5]/10 text-[#42D9F5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#42D9F5]/20">
                RESEARCH PREVIEW & PLATFORM BENCHMARK
              </span>
              <span className="text-[#65758B] text-xs font-mono">v0.9.4</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F3F7FC] text-balance">
              Knowledge That Survives Disconnection.
            </h1>

            <p className="text-sm sm:text-base text-[#98A8BD] leading-relaxed max-w-2xl">
              ConnectRAG introduces a connectivity-aware Retrieval-Augmented Generation framework that actively monitors network health and dynamically routes clinical queries across <strong className="text-[#F3F7FC]">Cloud RAG</strong>, <strong className="text-[#F3F7FC]">Local Edge SLMs</strong>, and <strong className="text-[#F3F7FC]">Cached Knowledge</strong> using fine-tuned Siamese Bi-Encoder embeddings.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('live-demo')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#42D9F5] text-[#080D18] font-semibold text-sm hover:bg-[#38BDF8] shadow-[0_0_15px_rgba(66,217,245,0.3)] transition-all active:scale-[0.98]"
              >
                <Sparkles size={16} />
                <span>Launch Live Demo</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => onNavigate('data-lab')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#111B2C] text-[#F3F7FC] font-medium text-sm border border-[#24334A] hover:bg-[#162236] hover:border-[#384F73] transition-all"
              >
                <Database size={16} className="text-[#2DD4BF]" />
                <span>Explore Data Lab</span>
              </button>

              <button
                onClick={() => onNavigate('architecture')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#111B2C] text-[#98A8BD] font-medium text-sm border border-[#24334A] hover:text-[#F3F7FC] hover:bg-[#162236] transition-all"
              >
                <Network size={16} className="text-[#A78BFA]" />
                <span>Siamese Architecture</span>
              </button>
            </div>
          </div>

          {/* Quick Telemetry Callout */}
          <div className="lg:w-72 shrink-0 p-4 rounded-xl bg-[#080D18]/80 border border-[#24334A] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#65758B] tracking-wider">
                ORCHESTRATOR STATUS
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#34D399]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                ONLINE
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-[#98A8BD]">Current Network Score</span>
                <span className="font-mono text-base font-bold text-[#42D9F5]">{nqsScore} / 100</span>
              </div>
              <div className="w-full bg-[#162236] h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2DD4BF] to-[#42D9F5] transition-all duration-500 rounded-full"
                  style={{ width: `${nqsScore}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-[#24334A] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#65758B]">Active Tier Target:</span>
              <span
                className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                  activeTier === 'tier-1-cloud'
                    ? 'bg-[#42D9F5]/10 text-[#42D9F5] border border-[#42D9F5]/30'
                    : activeTier === 'tier-2-local'
                    ? 'bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/30'
                    : 'bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/30'
                }`}
              >
                {activeTier === 'tier-1-cloud' ? 'TIER 1 CLOUD' : activeTier === 'tier-2-local' ? 'TIER 2 LOCAL' : 'TIER 3 CACHE'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#0D1422] border border-[#24334A] hover:border-[#384F73] transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-semibold tracking-wider text-[#65758B] uppercase">
                  {kpi.label}
                </span>
                <div className={`p-2 rounded-lg bg-[#111B2C] border border-[#24334A] ${kpi.accent} group-hover:scale-110 transition-transform`}>
                  <Icon size={16} />
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[#F3F7FC]">
                  {kpi.value}
                </div>
                <p className="text-xs text-[#98A8BD] mt-1 font-medium">{kpi.sub}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#24334A]/60 flex items-center justify-between text-[11px] text-[#65758B]">
                <span>{kpi.detail}</span>
                <span className="text-[#42D9F5] font-mono">Verified</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive 3-Tier Execution Topology Section */}
      <div className="p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/20 font-semibold">
                AUTONOMOUS ARCHITECTURE
              </span>
              <span className="text-xs font-mono text-[#65758B]">f(NQS, Complexity)</span>
            </div>
            <h2 className="text-lg font-bold text-[#F3F7FC] mt-1">Three-Tier Hybrid Retrieval Topology</h2>
            <p className="text-xs text-[#98A8BD]">
              Automatic runtime failover seamlessly balances reasoning depth against link degradation.
            </p>
          </div>

          <button
            onClick={() => onNavigate('live-demo')}
            className="flex items-center gap-2 text-xs font-mono text-[#42D9F5] hover:underline"
          >
            <span>Simulate Transitions Live</span>
            <ExternalLink size={12} />
          </button>
        </div>

        {/* 3 Tier Cards Grid with Visual Flow Connections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {/* Tier 1: Cloud RAG */}
          <div
            className={`p-5 rounded-xl border transition-all duration-300 relative ${
              activeTier === 'tier-1-cloud'
                ? 'bg-[#111B2C] border-[#42D9F5] shadow-[0_0_20px_rgba(66,217,245,0.2)]'
                : 'bg-[#0A0F1A] border-[#24334A] opacity-75'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#42D9F5]/10 text-[#42D9F5] border border-[#42D9F5]/20">
                  <Server size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[#F3F7FC]">Tier 1: Cloud RAG</h3>
                  <span className="text-[10px] font-mono text-[#65758B]">Hosted Distributed Model</span>
                </div>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                  activeTier === 'tier-1-cloud'
                    ? 'bg-[#42D9F5] text-[#080D18]'
                    : 'bg-[#162236] text-[#98A8BD]'
                }`}
              >
                {activeTier === 'tier-1-cloud' ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>

            <p className="text-xs text-[#98A8BD] leading-relaxed">
              Full 8.4k chunk knowledge graph with deep frontier LLM synthesis (Claude-3.5 / GPT-4o) and multi-hop citations.
            </p>

            <div className="mt-4 pt-3 border-t border-[#24334A] space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-[#98A8BD]">
                <span>Activation Rule:</span>
                <span className="text-[#42D9F5] font-semibold">NQS ≥ 70</span>
              </div>
              <div className="flex justify-between text-[#98A8BD]">
                <span>Typical Latency:</span>
                <span className="text-[#F3F7FC]">~340 ms</span>
              </div>
              <div className="flex justify-between text-[#98A8BD]">
                <span>Index Scope:</span>
                <span className="text-[#F3F7FC]">Global Pinecone</span>
              </div>
            </div>
          </div>

          {/* Tier 2: Local Edge SLM */}
          <div
            className={`p-5 rounded-xl border transition-all duration-300 relative ${
              activeTier === 'tier-2-local'
                ? 'bg-[#111B2C] border-[#2DD4BF] shadow-[0_0_20px_rgba(45,212,191,0.2)]'
                : 'bg-[#0A0F1A] border-[#24334A] opacity-75'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/20">
                  <Cpu size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[#F3F7FC]">Tier 2: Local Edge SLM</h3>
                  <span className="text-[10px] font-mono text-[#65758B]">On-Device Quantized Model</span>
                </div>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                  activeTier === 'tier-2-local'
                    ? 'bg-[#2DD4BF] text-[#080D18]'
                    : 'bg-[#162236] text-[#98A8BD]'
                }`}
              >
                {activeTier === 'tier-2-local' ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>

            <p className="text-xs text-[#98A8BD] leading-relaxed">
              Quantized ONNX embeddings + on-device SLM (Phi-3 Mini / Gemma-2B) paired with local FAISS HNSW index.
            </p>

            <div className="mt-4 pt-3 border-t border-[#24334A] space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-[#98A8BD]">
                <span>Activation Rule:</span>
                <span className="text-[#2DD4BF] font-semibold">30 ≤ NQS &lt; 70</span>
              </div>
              <div className="flex justify-between text-[#98A8BD]">
                <span>Typical Latency:</span>
                <span className="text-[#F3F7FC]">~180 ms</span>
              </div>
              <div className="flex justify-between text-[#98A8BD]">
                <span>Verification:</span>
                <span className="text-[#F3F7FC]">Self-Consistency</span>
              </div>
            </div>
          </div>

          {/* Tier 3: Cached Knowledge */}
          <div
            className={`p-5 rounded-xl border transition-all duration-300 relative ${
              activeTier === 'tier-3-cache'
                ? 'bg-[#111B2C] border-[#A78BFA] shadow-[0_0_20px_rgba(167,139,250,0.2)]'
                : 'bg-[#0A0F1A] border-[#24334A] opacity-75'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20">
                  <HardDrive size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[#F3F7FC]">Tier 3: Cached Store</h3>
                  <span className="text-[10px] font-mono text-[#65758B]">Air-Gapped LRU Store</span>
                </div>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                  activeTier === 'tier-3-cache'
                    ? 'bg-[#A78BFA] text-[#080D18]'
                    : 'bg-[#162236] text-[#98A8BD]'
                }`}
              >
                {activeTier === 'tier-3-cache' ? 'ACTIVE' : 'READY'}
              </span>
            </div>

            <p className="text-xs text-[#98A8BD] leading-relaxed">
              Zero network dependence. Verified Q&A protocol pairs indexed by cosine similarity (≥ 0.85) with 30-day TTL.
            </p>

            <div className="mt-4 pt-3 border-t border-[#24334A] space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-[#98A8BD]">
                <span>Activation Rule:</span>
                <span className="text-[#A78BFA] font-semibold">NQS &lt; 30 (or Offline)</span>
              </div>
              <div className="flex justify-between text-[#98A8BD]">
                <span>Typical Latency:</span>
                <span className="text-[#F3F7FC]">~12 ms (Zero-Net)</span>
              </div>
              <div className="flex justify-between text-[#98A8BD]">
                <span>Invalidation:</span>
                <span className="text-[#F3F7FC]">30-Day TTL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section: Dataset Preparation & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dataset Preparation Summary */}
        <div className="p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Database size={16} className="text-[#42D9F5]" />
                <h3 className="font-semibold text-sm text-[#F3F7FC]">Corpus Preparation Status</h3>
              </div>
              <button
                onClick={() => onNavigate('data-lab')}
                className="text-xs font-mono text-[#42D9F5] hover:underline"
              >
                Inspect Data Lab →
              </button>
            </div>
            <p className="text-xs text-[#98A8BD]">
              Balanced biomedical datasets with GHR/GARD capped at 6,500 records to prevent single-source skew.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-[#111B2C] border border-[#24334A] flex items-center justify-between">
              <div>
                <span className="text-[#F3F7FC] font-sans font-medium block">MedQuAD Balanced Split</span>
                <span className="text-[10px] text-[#65758B]">45,964 Pairs · GHR/GARD Capped</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/30">
                100% BALANCED
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#111B2C] border border-[#24334A] flex items-center justify-between">
              <div>
                <span className="text-[#F3F7FC] font-sans font-medium block">MedMCQA Subject Coverage</span>
                <span className="text-[10px] text-[#65758B]">193,155 Questions · 20 Specialties</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/30">
                VERIFIED
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#111B2C] border border-[#24334A] flex items-center justify-between">
              <div>
                <span className="text-[#F3F7FC] font-sans font-medium block">Clinical PDF Textbook Ingestion</span>
                <span className="text-[10px] text-[#65758B]">8,420 Chunks · Harrison's + NHM + WHO</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/30">
                INDEXED (FAISS)
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#24334A] flex items-center justify-between text-xs text-[#98A8BD]">
            <span>Contrastive Pair Count: <strong className="text-[#F3F7FC]">256,959 pairs</strong></span>
            <button
              onClick={() => onNavigate('training-analytics')}
              className="text-[#2DD4BF] hover:underline"
            >
              View Training Pipeline →
            </button>
          </div>
        </div>

        {/* Recent Pipeline Activity & Viva Highlights */}
        <div className="p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-[#2DD4BF]" />
                <h3 className="font-semibold text-sm text-[#F3F7FC]">Recent Pipeline Verification</h3>
              </div>
              <span className="text-[10px] font-mono text-[#65758B]">AUDIT TRAIL</span>
            </div>
            <p className="text-xs text-[#98A8BD]">
              Continuous integration logs of Siamese encoder weights, FAISS indexing, and prober latency.
            </p>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-[#0A0F1A] border border-[#24334A] flex items-start gap-3">
              <span className="text-[10px] text-[#65758B] mt-0.5">14:32</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[#42D9F5] font-semibold text-[11px]">Siamese Bi-Encoder v1</span>
                  <span className="text-[10px] text-[#34D399] bg-[#34D399]/10 px-1 rounded">ONNX Validated</span>
                </div>
                <p className="text-[11px] text-[#98A8BD] truncate font-sans">
                  Dual-branch weight sharing verified. Model size: 68MB quantized.
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0A0F1A] border border-[#24334A] flex items-start gap-3">
              <span className="text-[10px] text-[#65758B] mt-0.5">14:30</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[#2DD4BF] font-semibold text-[11px]">Hysteresis Layer</span>
                  <span className="text-[10px] text-[#2DD4BF] bg-[#2DD4BF]/10 px-1 rounded">N=3 Enforced</span>
                </div>
                <p className="text-[11px] text-[#98A8BD] truncate font-sans">
                  3 consecutive drop samples required for tier downgrade; single-sample recovery enabled.
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0A0F1A] border border-[#24334A] flex items-start gap-3">
              <span className="text-[10px] text-[#65758B] mt-0.5">14:28</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[#A78BFA] font-semibold text-[11px]">Emergency Cache</span>
                  <span className="text-[10px] text-[#A78BFA] bg-[#A78BFA]/10 px-1 rounded">Pre-Warmed</span>
                </div>
                <p className="text-[11px] text-[#98A8BD] truncate font-sans">
                  12 critical emergency medicine lookup protocols cached with cosine threshold ≥ 0.85.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#24334A] flex items-center justify-between text-xs text-[#98A8BD]">
            <span>Viva Readiness: <strong className="text-[#34D399]">Complete (Phased Plan & Critique)</strong></span>
            <button
              onClick={() => onNavigate('about-methodology')}
              className="text-[#42D9F5] hover:underline"
            >
              Critique Defense →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
