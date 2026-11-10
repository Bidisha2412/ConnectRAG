import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  HelpCircle,
  FileText,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { METHODOLOGY_PHASES, CRITIQUE_DIFFERENTIATIONS } from '../data/mockCorpusData';

export const AboutMethodologyView: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'adopted' | 'rejected' | 'deferred'>('all');

  const filteredCritiques = CRITIQUE_DIFFERENTIATIONS.filter(
    (item) => filterCategory === 'all' || item.statusCategory === filterCategory
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#42D9F5]/10 text-[#42D9F5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#42D9F5]/20">
              VIVA EXAMINATION DEFENSE
            </span>
            <span className="text-xs font-mono text-[#34D399]">16-Week Phased Methodology</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F3F7FC] mt-1">
            Methodology, Scoping & Critique Differentiation
          </h1>
          <p className="text-xs text-[#98A8BD]">
            Academic defense framework defending mechanism choices, 16-week execution timeline, and rigorous differentiation between core and stretch goals.
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-[#080D18] border border-[#24334A] text-xs font-mono text-right">
          <span className="text-[#65758B] block text-[10px]">THESIS STATUS</span>
          <span className="text-[#34D399] font-bold">DEFENSIBLE · CONCRETE MECHANISMS</span>
        </div>
      </div>

      {/* SECTION 1: Critique Differentiation Matrix */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#65758B] tracking-wider block">
              ACADEMIC REVIEW
            </span>
            <h2 className="text-lg font-bold text-[#F3F7FC] mt-0.5">
              Critique Differentiation — What They Suggested vs. What We Built
            </h2>
            <p className="text-xs text-[#98A8BD]">
              Every suggestion evaluated against implementation feasibility within a single-semester timeline without relying on unvalidated synthetic labels.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center p-1 rounded-lg bg-[#080D18] border border-[#24334A] text-xs font-mono">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-2.5 py-1 rounded transition-all ${
                filterCategory === 'all' ? 'bg-[#162236] text-[#42D9F5] font-semibold' : 'text-[#98A8BD]'
              }`}
            >
              All (9)
            </button>
            <button
              onClick={() => setFilterCategory('adopted')}
              className={`px-2.5 py-1 rounded transition-all ${
                filterCategory === 'adopted' ? 'bg-[#162236] text-[#34D399] font-semibold' : 'text-[#98A8BD]'
              }`}
            >
              Adopted (5)
            </button>
            <button
              onClick={() => setFilterCategory('rejected')}
              className={`px-2.5 py-1 rounded transition-all ${
                filterCategory === 'rejected' ? 'bg-[#162236] text-[#FB7185] font-semibold' : 'text-[#98A8BD]'
              }`}
            >
              Rejected (3)
            </button>
            <button
              onClick={() => setFilterCategory('deferred')}
              className={`px-2.5 py-1 rounded transition-all ${
                filterCategory === 'deferred' ? 'bg-[#162236] text-[#FBBF24] font-semibold' : 'text-[#98A8BD]'
              }`}
            >
              Stretch (1)
            </button>
          </div>
        </div>

        {/* Table of Critique Differentiations */}
        <div className="overflow-x-auto rounded-xl border border-[#24334A]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#080D18] border-b border-[#24334A] text-[#98A8BD] font-mono uppercase text-[10px]">
                <th className="py-3 px-4 w-1/4">Critique's Suggestion</th>
                <th className="py-3 px-4 w-1/6">Our Decision</th>
                <th className="py-3 px-4">Academic & Engineering Justification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#24334A]/60">
              {filteredCritiques.map((item, idx) => {
                const isAdopted = item.statusCategory === 'adopted';
                const isRejected = item.statusCategory === 'rejected';
                const isDeferred = item.statusCategory === 'deferred';

                return (
                  <tr key={idx} className="hover:bg-[#111B2C] transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#F3F7FC]">
                      {item.suggestion}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px]">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-semibold ${
                          isAdopted
                            ? 'bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/30'
                            : isRejected
                            ? 'bg-[#FB7185]/10 text-[#FB7185] border border-[#FB7185]/30'
                            : 'bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/30'
                        }`}
                      >
                        {isAdopted ? <CheckCircle2 size={12} /> : isRejected ? <XCircle size={12} /> : <Clock size={12} />}
                        <span>{item.decision}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#98A8BD] leading-relaxed font-sans">
                      {item.justification}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Key Decision Principle Box */}
        <div className="p-4 rounded-xl bg-[#080D18] border border-[#24334A] space-y-1.5 text-xs text-[#98A8BD]">
          <strong className="text-[#42D9F5] font-mono">Governing Principle for Review Defense:</strong> Every adopted suggestion is implementable with data and tools already available, without creating new prerequisite simulation sub-projects. Every rejected suggestion is logged as explicit future work in the final thesis report.
        </div>
      </div>

      {/* SECTION 2: 16-Week Phased Methodology Roadmap */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] space-y-6">
        <div>
          <span className="text-[10px] font-mono uppercase text-[#65758B] tracking-wider block">
            PROJECT TIMELINE
          </span>
          <h2 className="text-lg font-bold text-[#F3F7FC] mt-0.5">
            Phased Implementation Methodology (Weeks 1–16)
          </h2>
          <p className="text-xs text-[#98A8BD]">
            Seven distinct execution phases systematically advancing from corpus preparation to controlled degradation experiments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {METHODOLOGY_PHASES.map((p, idx) => (
            <div
              key={p.phase}
              className="p-4 rounded-xl bg-[#111B2C] border border-[#24334A] flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-[#42D9F5]">{p.phase}</span>
                  <span className="font-mono text-[10px] text-[#65758B] bg-[#080D18] px-2 py-0.5 rounded border border-[#24334A]">
                    {p.timeframe}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#F3F7FC]">{p.title}</h3>
                <p className="text-xs text-[#98A8BD] mt-1 font-sans">{p.focus}</p>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-[#24334A] text-xs">
                <span className="text-[10px] font-mono text-[#65758B] uppercase block">Key Milestones:</span>
                <ul className="space-y-1">
                  {p.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="text-[#98A8BD] flex items-start gap-1.5 text-[11px] font-sans">
                      <span className="text-[#2DD4BF] font-mono">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Revised Core vs Stretch Scope */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Scope (Must-Have) */}
        <div className="p-5 rounded-2xl bg-[#0D1422] border border-[#34D399]/40 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#34D399]" />
            <h3 className="font-bold text-sm text-[#F3F7FC]">Core Scope (Must-Have)</h3>
          </div>
          <p className="text-xs text-[#98A8BD]">
            Essential pillars required for thesis validation and working demonstration:
          </p>
          <ul className="space-y-1.5 text-xs font-mono text-[#F3F7FC]">
            <li className="flex items-center gap-2">✓ Connectivity Monitor & explicit NQS</li>
            <li className="flex items-center gap-2">✓ Hysteresis Layer (N=3 drops)</li>
            <li className="flex items-center gap-2">✓ Query Complexity Estimator heuristic</li>
            <li className="flex items-center gap-2">✓ Tier Orchestrator decision table</li>
            <li className="flex items-center gap-2">✓ Siamese Bi-Encoder + FAISS index</li>
            <li className="flex items-center gap-2">✓ Tier 1, Tier 2, Tier 3 pipelines</li>
            <li className="flex items-center gap-2">✓ Tier 2 Self-Consistency check</li>
            <li className="flex items-center gap-2">✓ Controlled degradation test</li>
          </ul>
        </div>

        {/* Stretch Scope */}
        <div className="p-5 rounded-2xl bg-[#0D1422] border border-[#FBBF24]/40 space-y-3">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[#FBBF24]" />
            <h3 className="font-bold text-sm text-[#F3F7FC]">Stretch Scope (Phased)</h3>
          </div>
          <p className="text-xs text-[#98A8BD]">
            Attempted only if earlier milestones finish ahead of schedule:
          </p>
          <ul className="space-y-1.5 text-xs font-mono text-[#F3F7FC]">
            <li className="flex items-center gap-2">⚡ Predictive Synchronizer v1 (Heuristic)</li>
            <li className="flex items-center gap-2">⚡ Predictive Synchronizer v2 (Sequence)</li>
            <li className="flex items-center gap-2">⚡ Mid-stream context-preserving handoff</li>
            <li className="flex items-center gap-2">⚡ Multi-device local sync simulation</li>
          </ul>
        </div>

        {/* Explicit Future Work */}
        <div className="p-5 rounded-2xl bg-[#0D1422] border border-[#24334A] space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#A78BFA]" />
            <h3 className="font-bold text-sm text-[#F3F7FC]">Explicit Future Work (Mention)</h3>
          </div>
          <p className="text-xs text-[#98A8BD]">
            Explicitly cited in final report as natural horizons beyond single-semester scope:
          </p>
          <ul className="space-y-1.5 text-xs font-mono text-[#98A8BD]">
            <li>○ ML-learned routing policy (XGBoost/RL)</li>
            <li>○ ₹/query financial cost optimizer</li>
            <li>○ Edge-to-edge inter-hospital mesh sync</li>
            <li>○ Federated vector index aggregation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
