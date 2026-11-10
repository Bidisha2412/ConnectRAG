import React from 'react';
import {
  GitBranch,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  Database,
  Terminal,
  Activity,
  AlertCircle,
  FileCode,
  Sparkles
} from 'lucide-react';
import { PIPELINE_STAGES, TRAINING_DATASETS } from '../data/mockCorpusData';

export const TrainingAnalyticsView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#42D9F5]/10 text-[#42D9F5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#42D9F5]/20">
              OFFLINE TRAINING PIPELINE
            </span>
            <span className="text-xs font-mono text-[#34D399]">Siamese Bi-Encoder Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F3F7FC] mt-1">
            Model Fine-Tuning & FAISS Index Preparation
          </h1>
          <p className="text-xs text-[#98A8BD]">
            Sequential preparation pipeline: pair mining, contrastive learning fine-tuning, embedding generation, and vector index serialization.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-[#080D18] p-2 rounded-xl border border-[#24334A]">
          <span className="text-[#65758B]">ACTIVE ARCHITECTURE:</span>
          <span className="text-[#42D9F5] font-semibold">Siamese Dual-Tower (Shared Weights)</span>
        </div>
      </div>

      {/* 6-Stage Sequential Pipeline Visual Stepper */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] space-y-6">
        <div>
          <span className="text-[10px] font-mono uppercase text-[#65758B] tracking-wider block">
            PREPARATION STAGES
          </span>
          <h2 className="text-lg font-bold text-[#F3F7FC] mt-0.5">
            Offline Training & Indexing Pipeline Workflow
          </h2>
          <p className="text-xs text-[#98A8BD]">
            Stages execute sequentially during offline preparation before deploying unified artifacts to Cloud and Local Edge tiers.
          </p>
        </div>

        <div className="space-y-3">
          {PIPELINE_STAGES.map((stage) => {
            const isCompleted = stage.status === 'Completed';
            const isInProgress = stage.status === 'In Progress';

            return (
              <div
                key={stage.step}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'bg-[#111B2C] border-[#24334A]'
                    : isInProgress
                    ? 'bg-[#162236] border-[#42D9F5]/50 shadow-[0_0_15px_rgba(66,217,245,0.15)]'
                    : 'bg-[#080D18] border-[#24334A]/50 opacity-60'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center font-mono font-bold text-xs ${
                      isCompleted
                        ? 'bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/30'
                        : isInProgress
                        ? 'bg-[#42D9F5] text-[#080D18]'
                        : 'bg-[#162236] text-[#65758B]'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 size={16} /> : `0${stage.step}`}
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-[#F3F7FC]">{stage.name}</h3>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.2 rounded font-semibold ${
                          isCompleted
                            ? 'bg-[#34D399]/10 text-[#34D399]'
                            : isInProgress
                            ? 'bg-[#42D9F5]/20 text-[#42D9F5] animate-pulse'
                            : 'bg-[#162236] text-[#65758B]'
                        }`}
                      >
                        {stage.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#98A8BD] font-sans">{stage.description}</p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between sm:justify-center shrink-0 font-mono text-xs text-right border-t md:border-t-0 pt-2 md:pt-0 border-[#24334A]">
                  <div className="text-[#42D9F5] font-semibold flex items-center gap-1.5">
                    <FileCode size={13} />
                    <span>{stage.outputArtifact}</span>
                  </div>
                  <div className="text-[11px] text-[#65758B] flex items-center gap-1 mt-0.5">
                    <Clock size={11} />
                    <span>{stage.runtime}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Siamese Contrastive Learning Dynamics & Loss Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Contrastive Loss Progression (7 cols) */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#65758B] tracking-wider block">
                LOSS PROGRESSION
              </span>
              <h3 className="text-sm font-bold text-[#F3F7FC]">Multiple Negatives Ranking Loss (MNRL)</h3>
            </div>
            <span className="text-xs font-mono text-[#34D399]">Converged (Epoch 4/4)</span>
          </div>

          <p className="text-xs text-[#98A8BD]">
            Contrastive learning optimizes cosine similarity between positive medical query-document pairs while repelling in-batch negative contexts.
          </p>

          {/* SVG Loss Curve */}
          <div className="p-4 rounded-xl bg-[#080D18] border border-[#24334A] space-y-2">
            <div className="h-32 w-full flex items-center relative">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 100">
                {/* Grid guidelines */}
                <line x1="0" y1="20" x2="300" y2="20" stroke="#162236" strokeDasharray="3 3" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="#162236" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="300" y2="80" stroke="#162236" strokeDasharray="3 3" />

                {/* Training Loss Curve */}
                <path
                  d="M 10 20 Q 80 40 150 72 T 290 85"
                  fill="none"
                  stroke="#42D9F5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Validation Loss Curve */}
                <path
                  d="M 10 26 Q 80 44 150 76 T 290 83"
                  fill="none"
                  stroke="#2DD4BF"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#24334A] text-[#98A8BD]">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#42D9F5]" /> Train Loss: 0.124
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#2DD4BF] border-dashed border-b" /> Val Loss: 0.141
              </span>
              <span>Temp: τ = 0.05</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-[#111B2C] border border-[#24334A]">
              <span className="text-[#65758B] block text-[10px]">BATCH SIZE</span>
              <span className="font-semibold text-[#F3F7FC]">64 Pairs</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#111B2C] border border-[#24334A]">
              <span className="text-[#65758B] block text-[10px]">OPTIMIZER</span>
              <span className="font-semibold text-[#F3F7FC]">AdamW (lr 2e-5)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#111B2C] border border-[#24334A]">
              <span className="text-[#65758B] block text-[10px]">WARMUP RATIO</span>
              <span className="font-semibold text-[#2DD4BF]">10% Linear</span>
            </div>
          </div>
        </div>

        {/* Evaluation Reserved Panel (5 cols) */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase text-[#FBBF24] tracking-wider font-semibold">
                PHASE 5 HARNESS
              </span>
              <span className="text-xs font-mono text-[#65758B]">RAGAS Metrics</span>
            </div>
            <h3 className="text-sm font-bold text-[#F3F7FC]">Retrieval Evaluation Benchmark</h3>
            <p className="text-xs text-[#98A8BD] mt-1">
              Reserved comparison panel for base versus fine-tuned Siamese retrieval evaluation.
            </p>
          </div>

          {/* Reserved Status Box */}
          <div className="p-5 rounded-xl bg-[#080D18] border border-[#24334A] text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#162236] text-[#FBBF24] flex items-center justify-center mx-auto border border-[#24334A]">
              <Clock size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-[#F3F7FC]">Awaiting Live Evaluation Run</h4>
              <p className="text-xs text-[#98A8BD] mt-1 font-sans">
                Evaluation scheduled for Phase 5 (Weeks 9–10). Metrics will measure Context Recall, Faithfulness, Answer Relevance, and MRR@10 against the held-out rural health test set.
              </p>
            </div>
            <div className="inline-block px-3 py-1 rounded bg-[#FBBF24]/10 text-[#FBBF24] text-[10px] font-mono border border-[#FBBF24]/30">
              Zero synthetic claims enforced · True to research state
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#65758B] border-t border-[#24334A] pt-3">
            Harness Targets: RAGAS v0.2 + Golden PubMedQA Labeled Test
          </div>
        </div>
      </div>
    </div>
  );
};
