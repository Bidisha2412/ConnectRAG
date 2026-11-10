import React, { useState } from 'react';
import {
  Database,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  FileCode,
  Tag,
  BookOpen,
  X
} from 'lucide-react';
import { TRAINING_DATASETS } from '../data/mockCorpusData';

export const DatasetExplorerView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [activeDatasetDetail, setActiveDatasetDetail] = useState<any | null>(null);

  const datasetCatalog = [
    {
      id: 'ds-medquad',
      name: 'MedQuAD (Balanced Capped Subset)',
      category: 'Consumer Medical QA',
      type: 'Structured Question-Answer Pairs',
      totalRecords: '45,964 Pairs',
      rawRecords: '47,457 Raw',
      stage: 'Verified & Capped',
      source: 'National Institutes of Health (NIH)',
      license: 'Public Domain / Research',
      lastUpdated: '2024-10-15',
      tokensAvg: '142 tokens/pair',
      description: 'Medical Question Answering Dataset created from 12 NIH institutes. Balanced by placing a 6,500 record cap on GHR and GARD rare diseases to prevent training bias.',
      samplePair: {
        question: 'What are the symptoms of acute meningitis in children?',
        answer: 'Symptoms in infants and children include sudden high fever, constant crying, excessive sleepiness or irritability, stiffness in the neck, and poor feeding. Seek emergency medical care immediately.',
        source: 'CDC / NIH Health Guidelines'
      }
    },
    {
      id: 'ds-medmcqa',
      name: 'MedMCQA (Multi-Subject Clinical QA)',
      category: 'Medical Examination Multiple-Choice',
      type: 'Clinical Reasoning with Explanations',
      totalRecords: '193,155 Questions',
      rawRecords: '193,155 Raw',
      stage: 'Split Verified',
      source: 'AIIMS & NEET-PG Medical Entrance Examinations',
      license: 'MIT Research License',
      lastUpdated: '2024-11-02',
      tokensAvg: '210 tokens/pair',
      description: 'Comprehensive Indian medical entrance examination QA bank spanning 20 medical disciplines. Ideal for training contrastive bi-encoder embeddings on subtle diagnostic distinctions.',
      samplePair: {
        question: 'A 45-year-old diabetic patient with eGFR of 38 mL/min requires glycemic management. What is the recommended metformin strategy?',
        answer: 'In Stage 3b CKD (eGFR 30–44 mL/min), new initiation of metformin is not recommended. If previously established, dose should be capped at 500 mg daily with quarterly eGFR monitoring.',
        source: 'Pharmacology / Nephrology Examination Item #8421'
      }
    },
    {
      id: 'ds-pdf-corpus',
      name: 'Medical Guidelines & Textbooks Corpus',
      category: 'Clinical Reference Documents',
      type: 'Text Chunks with Structural Metadata',
      totalRecords: '8,420 Chunks',
      rawRecords: '7 Core PDFs',
      stage: 'Vectorized (FAISS HNSW)',
      source: 'Harrison\'s 21e, Oxford Handbooks, NHM India, WHO India',
      license: 'Educational & Research Fair Use',
      lastUpdated: '2024-11-08',
      tokensAvg: '320 tokens/chunk',
      description: 'Carefully parsed and chunked clinical manuals, emergency protocols, and internal medicine reference chapters. Overlap set to 64 tokens with structural section headers intact.',
      samplePair: {
        question: 'What is the immediate door-to-needle time and dose for streptokinase in rural STEMI?',
        answer: 'Door-to-needle time should be under 30 minutes when PCI transfer exceeds 120 minutes. Streptokinase dosage is 1.5 million units in 100 mL 5% Dextrose infused over 60 minutes.',
        source: 'NHM Emergency Protocol 2024 (Section 5, p. 112)'
      }
    },
    {
      id: 'ds-pubmedqa',
      name: 'PubMedQA (Golden Expert Annotated)',
      category: 'Biomedical Research QA',
      type: 'Biomedical Papers with Context',
      totalRecords: '1,000 Golden Pairs',
      rawRecords: '1,000 Annotated',
      stage: 'Golden Baseline',
      source: 'PubMed Biomedical Literature',
      license: 'Creative Commons CC-BY 4.0',
      lastUpdated: '2024-09-20',
      tokensAvg: '280 tokens/pair',
      description: 'Expert-annotated biomedical QA dataset with verified ground-truth context abstracts. Used for benchmarking fine-tuned Siamese retrieval precision vs baseline.',
      samplePair: {
        question: 'Does adjunctive dexamethasone reduce hearing loss in adult pneumococcal meningitis?',
        answer: 'Yes. Randomized controlled clinical trials confirm that adjunctive dexamethasone given prior to or with the first dose of antibiotics significantly reduces hearing loss and short-term neurological sequelae in adults with pneumococcal meningitis.',
        source: 'PubMed Central PMC1298412'
      }
    }
  ];

  const filteredDatasets = datasetCatalog.filter((ds) => {
    const matchesSearch =
      ds.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = selectedStage === 'all' || ds.stage.toLowerCase().includes(selectedStage.toLowerCase());
    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#42D9F5]/10 text-[#42D9F5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#42D9F5]/20">
              DATASET CATALOG
            </span>
            <span className="text-xs font-mono text-[#65758B]">4 Partitioned Corpora</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F3F7FC] mt-1">Dataset Explorer</h1>
          <p className="text-xs text-[#98A8BD]">
            Browse dataset provenance, record volumes, curation methodologies, and sample QA pairs.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-2.5 text-[#65758B]" />
            <input
              type="text"
              placeholder="Search datasets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-[#080D18] border border-[#24334A] text-xs text-[#F3F7FC] placeholder:text-[#65758B] focus:border-[#42D9F5] focus:outline-none w-52"
            />
          </div>

          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#080D18] border border-[#24334A] text-xs font-mono text-[#F3F7FC] focus:outline-none"
          >
            <option value="all">All Stages</option>
            <option value="capped">Capped & Balanced</option>
            <option value="verified">Split Verified</option>
            <option value="vectorized">Vectorized</option>
          </select>
        </div>
      </div>

      {/* Dataset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDatasets.map((ds) => (
          <div
            key={ds.id}
            className="p-5 rounded-2xl bg-[#0D1422] border border-[#24334A] hover:border-[#384F73] transition-all flex flex-col justify-between space-y-4 cursor-pointer group"
            onClick={() => setActiveDatasetDetail(ds)}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#162236] text-[#42D9F5] border border-[#24334A]">
                  {ds.category}
                </span>
                <span className="text-xs font-mono font-semibold text-[#34D399] flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  <span>{ds.stage}</span>
                </span>
              </div>

              <h2 className="text-base font-bold text-[#F3F7FC] group-hover:text-[#42D9F5] transition-colors">
                {ds.name}
              </h2>
              <p className="text-xs text-[#98A8BD] mt-1 line-clamp-2">{ds.description}</p>
            </div>

            <div className="space-y-2 pt-3 border-t border-[#24334A] text-xs font-mono">
              <div className="flex justify-between text-[#98A8BD]">
                <span>Record Volume:</span>
                <span className="text-[#F3F7FC] font-semibold">{ds.totalRecords}</span>
              </div>
              <div className="flex justify-between text-[#98A8BD]">
                <span>Authority / Source:</span>
                <span className="text-[#F3F7FC] truncate max-w-[200px]">{ds.source}</span>
              </div>
              <div className="flex justify-between text-[#98A8BD]">
                <span>Token Length Mean:</span>
                <span className="text-[#2DD4BF]">{ds.tokensAvg}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-[#42D9F5] font-mono">
              <span>Inspect Sample Pairs</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Slide-over Inspection Drawer for Selected Dataset */}
      {activeDatasetDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xl bg-[#0D1422] border-l border-[#24334A] h-full overflow-y-auto p-6 space-y-6 shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b border-[#24334A] pb-4">
              <div className="flex items-center gap-2">
                <Database size={18} className="text-[#42D9F5]" />
                <h3 className="font-bold text-base text-[#F3F7FC]">Dataset Inspection</h3>
              </div>
              <button
                onClick={() => setActiveDatasetDetail(null)}
                className="w-8 h-8 rounded-lg text-[#98A8BD] hover:text-[#F3F7FC] hover:bg-[#162236] flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#42D9F5]/10 text-[#42D9F5] border border-[#42D9F5]/20 font-semibold">
                {activeDatasetDetail.category}
              </span>
              <h2 className="text-xl font-bold text-[#F3F7FC]">{activeDatasetDetail.name}</h2>
              <p className="text-xs text-[#98A8BD] leading-relaxed">{activeDatasetDetail.description}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#080D18] border border-[#24334A] space-y-2.5 text-xs font-mono">
              <div className="flex justify-between text-[#98A8BD]">
                <span>Total Partitioned Pairs:</span>
                <span className="text-[#F3F7FC] font-semibold">{activeDatasetDetail.totalRecords}</span>
              </div>
              <div className="flex justify-between text-[#98A8BD]">
                <span>Raw Volume Prior to Cap:</span>
                <span className="text-[#F3F7FC]">{activeDatasetDetail.rawRecords}</span>
              </div>
              <div className="flex justify-between text-[#98A8BD]">
                <span>Source Authority:</span>
                <span className="text-[#F3F7FC]">{activeDatasetDetail.source}</span>
              </div>
              <div className="flex justify-between text-[#98A8BD]">
                <span>Curation License:</span>
                <span className="text-[#2DD4BF]">{activeDatasetDetail.license}</span>
              </div>
              <div className="flex justify-between text-[#98A8BD]">
                <span>Last Updated:</span>
                <span className="text-[#F3F7FC]">{activeDatasetDetail.lastUpdated}</span>
              </div>
            </div>

            {/* Representative Sample QA Pair */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#65758B] uppercase tracking-wider block">
                REPRESENTATIVE TRAINING PAIR SAMPLE:
              </span>
              <div className="p-4 rounded-xl bg-[#111B2C] border border-[#24334A] space-y-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-[#42D9F5] block font-semibold">QUERY / PROMPT</span>
                  <p className="text-sm font-medium text-[#F3F7FC] mt-0.5">{activeDatasetDetail.samplePair.question}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#2DD4BF] block font-semibold">GROUND-TRUTH CONTEXT ANSWER</span>
                  <p className="text-xs text-[#98A8BD] mt-0.5 leading-relaxed font-sans">{activeDatasetDetail.samplePair.answer}</p>
                </div>
                <div className="pt-2 border-t border-[#24334A] text-[11px] font-mono text-[#65758B]">
                  Origin: {activeDatasetDetail.samplePair.source}
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveDatasetDetail(null)}
              className="w-full py-2.5 rounded-lg bg-[#162236] text-[#F3F7FC] text-xs font-medium hover:bg-[#1C2A42] transition-colors"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
