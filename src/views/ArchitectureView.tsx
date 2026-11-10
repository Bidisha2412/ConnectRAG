import React, { useState } from 'react';
import {
  Network,
  Cpu,
  Server,
  HardDrive,
  GitBranch,
  RefreshCw,
  Search,
  CheckCircle2,
  FileText,
  ArrowDown,
  Layers,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'runtime' | 'offline' | 'formulas'>('runtime');

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#42D9F5]/10 text-[#42D9F5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#42D9F5]/20">
              TECHNICAL SPECIFICATION
            </span>
            <span className="text-xs font-mono text-[#34D399]">Siamese Bi-Encoder Integration</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F3F7FC] mt-1">
            System Architecture & Retrieval Topology
          </h1>
          <p className="text-xs text-[#98A8BD]">
            End-to-end architectural flow connecting the Connectivity Monitor, Tier Orchestrator, Siamese Bi-Encoder, FAISS Vector Index, and Predictive Synchronizer.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center p-1 rounded-lg bg-[#080D18] border border-[#24334A] text-xs font-mono">
          <button
            onClick={() => setActiveTab('runtime')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'runtime'
                ? 'bg-[#162236] text-[#42D9F5] font-semibold'
                : 'text-[#98A8BD] hover:text-[#F3F7FC]'
            }`}
          >
            Runtime Flow
          </button>
          <button
            onClick={() => setActiveTab('offline')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'offline'
                ? 'bg-[#162236] text-[#42D9F5] font-semibold'
                : 'text-[#98A8BD] hover:text-[#F3F7FC]'
            }`}
          >
            Offline Indexing Pipeline
          </button>
          <button
            onClick={() => setActiveTab('formulas')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'formulas'
                ? 'bg-[#162236] text-[#42D9F5] font-semibold'
                : 'text-[#98A8BD] hover:text-[#F3F7FC]'
            }`}
          >
            Concrete Formulas
          </button>
        </div>
      </div>

      {/* Main Interactive Diagram Canvas */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1422] border border-[#24334A] space-y-8">
        {/* Diagram Header & Legend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#24334A]">
          <div>
            <h2 className="text-base font-bold text-[#F3F7FC]">
              {activeTab === 'runtime'
                ? 'Real-Time Inference & Multi-Tier Retrieval Topology'
                : activeTab === 'offline'
                ? 'Offline Model Preparation & Dual Artifact Indexing'
                : 'Formal Mathematical Definitions & Routing Policy'}
            </h2>
            <p className="text-xs text-[#98A8BD]">
              {activeTab === 'runtime'
                ? 'Solid arrows represent active real-time runtime flow; dashed arrows indicate asynchronous pre-caching.'
                : 'Offline contrastive learning pipeline feeding serialized artifacts to Tier 1 and Tier 2.'}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-[#42D9F5]">
              <span className="w-4 h-0.5 bg-[#42D9F5]" /> Solid: Runtime Query Flow
            </span>
            <span className="flex items-center gap-1.5 text-[#2DD4BF]">
              <span className="w-4 h-0.5 border-dashed border-b border-[#2DD4BF]" /> Dashed: Sync / Pre-fetch
            </span>
          </div>
        </div>

        {/* TAB 1: RUNTIME FLOW ARCHITECTURE */}
        {activeTab === 'runtime' && (
          <div className="space-y-6">
            {/* Step 1: User Query & Pre-Routing Analysis */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md p-3.5 rounded-xl bg-[#111B2C] border-2 border-[#42D9F5] text-center shadow-[0_0_15px_rgba(66,217,245,0.2)]">
                <span className="text-[10px] font-mono uppercase text-[#42D9F5] font-bold block">INPUT INQUIRY</span>
                <span className="font-semibold text-sm text-[#F3F7FC]">User Medical Query</span>
                <span className="text-[11px] text-[#98A8BD] block font-mono mt-0.5">Clinical Protocol / Rural Emergency Guidance</span>
              </div>

              {/* Forked Arrows down to Complexity & Telemetry */}
              <div className="w-full max-w-2xl flex items-center justify-between px-16 -my-1 text-[#42D9F5]">
                <ArrowDown size={18} className="mx-auto" />
                <ArrowDown size={18} className="mx-auto" />
              </div>
            </div>

            {/* Step 2: Parallel Pre-Routing Evaluators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {/* Left: Query Complexity Estimator */}
              <div className="p-4 rounded-xl bg-[#080D18] border border-[#24334A] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#A78BFA] uppercase font-semibold">HEURISTIC ROUTER</span>
                  <span className="text-[10px] font-mono text-[#65758B]">Tokens + Keywords</span>
                </div>
                <h3 className="font-semibold text-sm text-[#F3F7FC]">Query Complexity Estimator</h3>
                <p className="text-xs text-[#98A8BD]">
                  Computes complexity score (0–1) based on token length and diagnostic triggers (<em>explain, compare, contraindicated</em>).
                </p>
              </div>

              {/* Right: Connectivity Monitor & NQS */}
              <div className="p-4 rounded-xl bg-[#080D18] border border-[#24334A] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#42D9F5] uppercase font-semibold">TELEMETRY LAYER</span>
                  <span className="text-[10px] font-mono text-[#65758B]">EWMA Prober</span>
                </div>
                <h3 className="font-semibold text-sm text-[#F3F7FC]">Connectivity Monitor & NQS</h3>
                <p className="text-xs text-[#98A8BD]">
                  Periodic HTTP HEAD probes compute NQS via normalized bandwidth (0.35), latency (0.30), loss (0.20), and jitter (0.15).
                </p>
              </div>
            </div>

            {/* Step 3: Tier Orchestrator Decision Node */}
            <div className="flex flex-col items-center">
              <div className="text-[#42D9F5] -my-1">
                <ArrowDown size={20} />
              </div>

              <div className="w-full max-w-lg p-4 rounded-xl bg-[#162236] border-2 border-[#2DD4BF] text-center shadow-lg">
                <div className="flex items-center justify-center gap-2">
                  <Cpu size={16} className="text-[#2DD4BF]" />
                  <span className="font-bold text-sm text-[#F3F7FC]">Tier Orchestrator (Decision Table)</span>
                </div>
                <span className="text-[11px] font-mono text-[#2DD4BF] block mt-1">
                  route = f(NQS, Complexity) with Hysteresis (N=3 consecutive drops)
                </span>
              </div>

              <div className="text-[#2DD4BF] -my-1">
                <ArrowDown size={20} />
              </div>
            </div>

            {/* Step 4: Three Retrieval Tiers Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Tier 1 Box */}
              <div className="p-4 rounded-xl bg-[#0A0F1A] border border-[#42D9F5]/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Server size={15} className="text-[#42D9F5]" />
                    <span className="font-semibold text-xs text-[#F3F7FC]">Tier 1: Cloud RAG</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#42D9F5]">NQS ≥ 70</span>
                </div>
                <p className="text-[11px] text-[#98A8BD]">
                  Good connectivity. High-parameter Cloud LLM inference with full 8.4k vector index.
                </p>
              </div>

              {/* Tier 2 Box */}
              <div className="p-4 rounded-xl bg-[#0A0F1A] border border-[#2DD4BF]/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Cpu size={15} className="text-[#2DD4BF]" />
                    <span className="font-semibold text-xs text-[#F3F7FC]">Tier 2: Local RAG</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#2DD4BF]">30 ≤ NQS &lt; 70</span>
                </div>
                <p className="text-[11px] text-[#98A8BD]">
                  Degraded link. Local quantized ONNX Bi-Encoder + on-device SLM with self-consistency gate.
                </p>
              </div>

              {/* Tier 3 Box */}
              <div className="p-4 rounded-xl bg-[#0A0F1A] border border-[#A78BFA]/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <HardDrive size={15} className="text-[#A78BFA]" />
                    <span className="font-semibold text-xs text-[#F3F7FC]">Tier 3: Cached Q&A</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#A78BFA]">NQS &lt; 30 (Air-Gapped)</span>
                </div>
                <p className="text-[11px] text-[#98A8BD]">
                  Zero network dependency. Direct lookup from pre-warmed SQLite LRU cache (cosine ≥ 0.85).
                </p>
              </div>
            </div>

            {/* Step 5: THE SIAMESE BI-ENCODER RETRIEVAL ENGINE (Shared across Tier 1 & Tier 2) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#111B2C] border-2 border-[#42D9F5] shadow-[0_0_20px_rgba(66,217,245,0.15)] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#24334A] pb-3">
                <div className="flex items-center gap-2">
                  <GitBranch size={18} className="text-[#42D9F5]" />
                  <h3 className="font-bold text-sm sm:text-base text-[#F3F7FC]">
                    Siamese Bi-Encoder – Semantic Retrieval Engine
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#2DD4BF] bg-[#2DD4BF]/10 px-2 py-0.5 rounded border border-[#2DD4BF]/20 font-semibold">
                  SHARED WEIGHTS (W_Q = W_D)
                </span>
              </div>

              {/* Dual Parallel Branches converging into FAISS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Branch A: Query Encoder */}
                <div className="p-4 rounded-xl bg-[#080D18] border border-[#24334A] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#42D9F5]">Branch A — Query Encoder</span>
                    <span className="text-[10px] font-mono text-[#34D399]">Real-Time</span>
                  </div>
                  <p className="text-xs text-[#98A8BD]">
                    Accepts the user's clinical query at runtime and encodes it into a dense 768-dimensional semantic embedding vector using fine-tuned biomedical transformer weights.
                  </p>
                  <div className="p-2 rounded bg-[#162236] text-[11px] font-mono text-[#F3F7FC]">
                    e_q = Encoder(Query; θ)
                  </div>
                </div>

                {/* Branch B: Document Encoder */}
                <div className="p-4 rounded-xl bg-[#080D18] border border-[#24334A] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#2DD4BF]">Branch B — Document Encoder</span>
                    <span className="text-[10px] font-mono text-[#65758B]">Offline Precomputed</span>
                  </div>
                  <p className="text-xs text-[#98A8BD]">
                    Encodes all 8,420 medical knowledge chunks into dense representations during offline preprocessing. Shares identical architecture and weights θ with Branch A.
                  </p>
                  <div className="p-2 rounded bg-[#162236] text-[11px] font-mono text-[#F3F7FC]">
                    e_d = Encoder(Doc_Chunk; θ)
                  </div>
                </div>
              </div>

              {/* Convergence into FAISS */}
              <div className="flex flex-col items-center">
                <ArrowDown size={18} className="text-[#42D9F5]" />
                <div className="w-full p-4 rounded-xl bg-[#0A0F1A] border border-[#42D9F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Search size={16} className="text-[#42D9F5]" />
                      <h4 className="font-bold text-sm text-[#F3F7FC]">Vector Similarity Search (FAISS HNSW32)</h4>
                    </div>
                    <p className="text-xs text-[#98A8BD] mt-0.5">
                      Computes normalized cosine similarity: cos(e_q, e_d) = (e_q · e_d) / (||e_q|| ||e_d||)
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded bg-[#42D9F5]/10 text-[#42D9F5] font-mono text-xs font-semibold shrink-0">
                    Top-K Retrieved Context (K=3)
                  </span>
                </div>
              </div>
            </div>

            {/* Step 6: Answer Generation & Synchronizer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Answer Generation */}
              <div className="p-4 rounded-xl bg-[#0D1422] border border-[#34D399]/40 space-y-2">
                <span className="text-[10px] font-mono text-[#34D399] uppercase font-semibold block">FINAL SYNTHESIS</span>
                <h4 className="font-bold text-sm text-[#F3F7FC]">Answer Generation & Self-Consistency Check</h4>
                <p className="text-xs text-[#98A8BD]">
                  In Tier 1, full reasoning context is synthesized. In Tier 2, dual local samples are compared for token overlap; if disagreement is high and NQS improves, query escalates to Cloud.
                </p>
              </div>

              {/* Predictive Synchronizer */}
              <div className="p-4 rounded-xl bg-[#0D1422] border border-[#2DD4BF]/40 space-y-2">
                <span className="text-[10px] font-mono text-[#2DD4BF] uppercase font-semibold block">OPPORTUNISTIC SYNC</span>
                <h4 className="font-bold text-sm text-[#F3F7FC]">Predictive Knowledge Synchronizer</h4>
                <p className="text-xs text-[#98A8BD]">
                  Monitors query history and proactively refreshes local SQLite cache and local FAISS index whenever NQS recovers to ≥80, ensuring Tier 2 stays fresh before the next blackout.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OFFLINE TRAINING & INDEXING WORKFLOW */}
        {activeTab === 'offline' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-[#080D18] border border-[#24334A] text-xs text-[#98A8BD]">
              <strong className="text-[#F3F7FC]">Offline Workflow Principle:</strong> Real-time inference never performs heavy training or full-corpus embedding passes. The complete training and vector indexing lifecycle executes offline, producing a lightweight quantized ONNX bundle and pre-built FAISS index.
            </div>

            {/* Step-by-step Offline Pipeline Boxes */}
            <div className="space-y-3 font-mono text-xs">
              {[
                {
                  step: '01',
                  title: 'Medical Datasets Ingestion',
                  desc: 'MedQuAD (NIH 12 Institutes), MedMCQA (193k Questions), and 7 Clinical PDF Textbooks/Guidelines.',
                  out: 'raw_biomedical_records.jsonl'
                },
                {
                  step: '02',
                  title: 'Query-Document Pair Generation & 6.5k Capping',
                  desc: 'Balancing rare disease distributions (GHR/GARD capped at 6,500) and generating 256,959 contrastive pairs.',
                  out: 'train_pairs_balanced_256959.jsonl'
                },
                {
                  step: '03',
                  title: 'Siamese Bi-Encoder Fine-Tuning',
                  desc: 'Contrastive learning with Multiple Negatives Ranking Loss (MNRL). Trains shared weights θ across dual towers.',
                  out: 'connectrag-biencoder-biolink.onnx'
                },
                {
                  step: '04',
                  title: 'Document Embedding Generation (Branch B)',
                  desc: 'Runs frozen Document Encoder across all 8,420 normalized chunks to produce 768-dimensional dense vectors.',
                  out: 'doc_embeddings_dense_768d.npy'
                },
                {
                  step: '05',
                  title: 'FAISS Vector Index Construction',
                  desc: 'Builds hierarchical navigable small world (HNSW32) index optimized for sub-millisecond similarity retrieval.',
                  out: 'faiss_hnsw32_medical.index (~48MB)'
                },
                {
                  step: '06',
                  title: 'Dual Artifact Deployment',
                  desc: 'Cloud FAISS deployed to Pinecone/pgvector for Tier 1; Quantized ONNX + Local FAISS packaged for Tier 2.',
                  out: 'Deployed to Tier 1 (Cloud) & Tier 2 (Local Edge)'
                }
              ].map((item) => (
                <div key={item.step} className="p-3.5 rounded-xl bg-[#111B2C] border border-[#24334A] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded bg-[#162236] text-[#42D9F5] font-bold flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <span className="font-semibold text-sm text-[#F3F7FC] block">{item.title}</span>
                      <span className="text-[11px] text-[#98A8BD] font-sans">{item.desc}</span>
                    </div>
                  </div>
                  <span className="text-[#2DD4BF] font-semibold text-[11px] shrink-0">{item.out}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CONCRETE MATHEMATICAL DEFINITIONS */}
        {activeTab === 'formulas' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NQS Equation */}
              <div className="p-5 rounded-xl bg-[#080D18] border border-[#24334A] space-y-3">
                <span className="text-[10px] font-mono text-[#42D9F5] font-semibold uppercase">EQUATION 1</span>
                <h3 className="font-bold text-sm text-[#F3F7FC]">Network Quality Score (NQS)</h3>
                <div className="p-3 rounded-lg bg-[#111B2C] border border-[#24334A] font-mono text-xs text-[#42D9F5]">
                  NQS = 0.35·BW_norm + 0.30·(1 - RTT_norm) + 0.20·(1 - Loss_norm) + 0.15·(1 - Jitter_norm)
                </div>
                <p className="text-xs text-[#98A8BD]">
                  Bandwidth is weighted highest (0.35) because RAG retrieval and multi-token generation payloads are token-dense, unlike VoIP or gaming which prioritize latency alone.
                </p>
              </div>

              {/* Hysteresis Policy */}
              <div className="p-5 rounded-xl bg-[#080D18] border border-[#24334A] space-y-3">
                <span className="text-[10px] font-mono text-[#2DD4BF] font-semibold uppercase">POLICY 2</span>
                <h3 className="font-bold text-sm text-[#F3F7FC]">Asymmetric Hysteresis Layer</h3>
                <div className="p-3 rounded-lg bg-[#111B2C] border border-[#24334A] font-mono text-xs text-[#2DD4BF]">
                  Downgrade: Count(NQS &lt; Threshold) ≥ 3 consecutive probes<br />
                  Upgrade: Single-sample recovery allowed (NQS &gt; Threshold)
                </div>
                <p className="text-xs text-[#98A8BD]">
                  Prevents tier-flapping under noisy or jittery wireless links. Downgrades are conservative (avoid false alarms), while upgrades restore frontier cloud quality immediately.
                </p>
              </div>

              {/* Query Complexity Heuristic */}
              <div className="p-5 rounded-xl bg-[#080D18] border border-[#24334A] space-y-3">
                <span className="text-[10px] font-mono text-[#A78BFA] font-semibold uppercase">HEURISTIC 3</span>
                <h3 className="font-bold text-sm text-[#F3F7FC]">Query Complexity Estimator</h3>
                <div className="p-3 rounded-lg bg-[#111B2C] border border-[#24334A] font-mono text-xs text-[#A78BFA]">
                  Complexity = 0.4·(TokenCount / 64) + 0.6·Match(DiagnosticKeywords)
                </div>
                <p className="text-xs text-[#98A8BD]">
                  Lightweight rule evaluating inquiry length and presence of comparative or multi-step reasoning triggers (<em>differential, mechanism, contraindication</em>).
                </p>
              </div>

              {/* Cache Invalidation & Cosine Gate */}
              <div className="p-5 rounded-xl bg-[#080D18] border border-[#24334A] space-y-3">
                <span className="text-[10px] font-mono text-[#34D399] font-semibold uppercase">CACHE RULE 4</span>
                <h3 className="font-bold text-sm text-[#F3F7FC]">Tier 3 Cache Invalidation & Matching</h3>
                <div className="p-3 rounded-lg bg-[#111B2C] border border-[#24334A] font-mono text-xs text-[#34D399]">
                  CacheHit = CosineSimilarity(e_query, e_cached) ≥ 0.85<br />
                  TTL = 30 Days (Health advisories update infrequently)
                </div>
                <p className="text-xs text-[#98A8BD]">
                  Caches complete verified answers with source citations. Directly closes the viva critique question of "what is actually stored and when is it evicted?"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
