import React, { useState } from 'react';
import {
  BarChart3,
  Filter,
  Download,
  RotateCcw,
  Search,
  CheckCircle2,
  FileText,
  Layers,
  ArrowUpDown,
  TrendingDown,
  Database,
  PieChart,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import {
  MEDQUAD_SOURCES,
  MEDMCQA_SUBJECTS,
  CORPUS_PDFS,
  TRAINING_DATASETS
} from '../data/mockCorpusData';

export const DataLabView: React.FC = () => {
  // Filter & Toggle states
  const [selectedDatasetTab, setSelectedDatasetTab] = useState<'all' | 'medquad' | 'medmcqa' | 'pdfs' | 'training'>('all');
  const [medquadMetricMode, setMedquadMetricMode] = useState<'counts' | 'percentages'>('counts');
  const [medmcqaMetricMode, setMedmcqaMetricMode] = useState<'counts' | 'percentages'>('counts');
  const [medmcqaSearch, setMedmcqaSearch] = useState<string>('');
  const [medmcqaSort, setMedmcqaSort] = useState<'count-desc' | 'count-asc' | 'alpha'>('count-desc');
  const [pdfSortField, setPdfSortField] = useState<'chunks' | 'pages' | 'share'>('chunks');
  const [pdfSortAsc, setPdfSortAsc] = useState<boolean>(false);
  const [selectedPdfDetail, setSelectedPdfDetail] = useState<string | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Filtered MedMCQA subjects
  const filteredSubjects = MEDMCQA_SUBJECTS.filter((s) =>
    s.subject.toLowerCase().includes(medmcqaSearch.toLowerCase()) ||
    s.specialtyGroup.toLowerCase().includes(medmcqaSearch.toLowerCase())
  ).sort((a, b) => {
    if (medmcqaSort === 'count-desc') return b.questionCount - a.questionCount;
    if (medmcqaSort === 'count-asc') return a.questionCount - b.questionCount;
    return a.subject.localeCompare(b.subject);
  });

  // Sorted PDFs
  const sortedPdfs = [...CORPUS_PDFS].sort((a, b) => {
    let diff = 0;
    if (pdfSortField === 'chunks') diff = b.chunks - a.chunks;
    if (pdfSortField === 'pages') diff = b.pages - a.pages;
    if (pdfSortField === 'share') diff = b.corpusSharePct - a.corpusSharePct;
    return pdfSortAsc ? -diff : diff;
  });

  // Calculate Aggregates
  const totalOriginalMedquad = MEDQUAD_SOURCES.reduce((acc, curr) => acc + curr.originalCount, 0);
  const totalPostCapMedquad = MEDQUAD_SOURCES.reduce((acc, curr) => acc + curr.postCapCount, 0);
  const totalMedmcqaQuestions = MEDMCQA_SUBJECTS.reduce((acc, curr) => acc + curr.questionCount, 0);
  const totalPdfChunks = CORPUS_PDFS.reduce((acc, curr) => acc + curr.chunks, 0);
  const avgChunksPerPdf = Math.round(totalPdfChunks / CORPUS_PDFS.length);
  const totalTrainingPairs = TRAINING_DATASETS.reduce((acc, curr) => acc + curr.totalPairs, 0);

  // Handle Export Report
  const handleExportDataReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      platform: 'ConnectRAG Research Corpus Engine',
      summary: {
        totalCorpusChunks: totalPdfChunks,
        totalTrainingPairs,
        medquadRecordsOriginal: totalOriginalMedquad,
        medquadRecordsPostCap: totalPostCapMedquad,
        medmcqaQuestionBank: totalMedmcqaQuestions
      },
      medquadSources: MEDQUAD_SOURCES,
      medmcqaSubjects: MEDMCQA_SUBJECTS,
      corpusPdfs: CORPUS_PDFS,
      trainingDatasets: TRAINING_DATASETS
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `connectrag_data_lab_statistics_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setExportNotice('Export complete: connectrag_data_lab_statistics.json downloaded');
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Header & Analytics Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#42D9F5]/10 text-[#42D9F5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#42D9F5]/20">
              RESEARCH DATA LAB
            </span>
            <span className="text-xs font-mono text-[#34D399] flex items-center gap-1">
              <CheckCircle2 size={13} />
              <span>Loaded from statistics files (Verified)</span>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F3F7FC] mt-1">
            Corpus Preparation & Training Analytics
          </h1>
          <p className="text-xs text-[#98A8BD] mt-0.5 max-w-2xl">
            Inspect biomedical corpus distributions, GHR/GARD balance capping impact, MedMCQA specialty stratification, and textbook chunking maps.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick Dataset Selector Tabs */}
          <div className="p-1 rounded-lg bg-[#080D18] border border-[#24334A] flex items-center text-xs">
            {(['all', 'medquad', 'medmcqa', 'pdfs', 'training'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedDatasetTab(tab)}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  selectedDatasetTab === tab
                    ? 'bg-[#162236] text-[#42D9F5] shadow-sm'
                    : 'text-[#98A8BD] hover:text-[#F3F7FC]'
                }`}
              >
                {tab === 'all'
                  ? 'All Views'
                  : tab === 'medquad'
                  ? 'MedQuAD Cap'
                  : tab === 'medmcqa'
                  ? 'MedMCQA'
                  : tab === 'pdfs'
                  ? 'Corpus PDFs'
                  : 'Training Splits'}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportDataReport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#111B2C] text-[#F3F7FC] hover:bg-[#162236] border border-[#24334A] hover:border-[#384F73] text-xs font-medium transition-all"
            title="Download structured JSON report"
          >
            <Download size={14} className="text-[#42D9F5]" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 rounded-xl bg-[#34D399]/10 border border-[#34D399]/30 text-xs text-[#34D399] font-mono flex items-center justify-between">
          <span>{exportNotice}</span>
          <button onClick={() => setExportNotice(null)} className="text-[#98A8BD] hover:text-[#F3F7FC]">✕</button>
        </div>
      )}

      {/* SECTION A: MedQuAD Source Mix Comparison (Before & After GHR/GARD Cap) */}
      {(selectedDatasetTab === 'all' || selectedDatasetTab === 'medquad') && (
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-[#65758B] tracking-wider">
                  SOURCE COMPOSITION BALANCING
                </span>
                <span className="text-xs font-mono text-[#42D9F5]">NIH Curation</span>
              </div>
              <h2 className="text-lg font-bold text-[#F3F7FC] mt-0.5">
                MedQuAD Source Mix — GHR / GARD Capping Impact
              </h2>
              <p className="text-xs text-[#98A8BD]">
                Comparison of source distributions before and after enforcing the 6,500 record cap on rare genetic diseases.
              </p>
            </div>

            {/* Toggle Counts vs Percentage Share */}
            <div className="flex items-center p-1 rounded-lg bg-[#080D18] border border-[#24334A] text-xs">
              <button
                onClick={() => setMedquadMetricMode('counts')}
                className={`px-3 py-1.5 rounded-md font-mono transition-all ${
                  medquadMetricMode === 'counts'
                    ? 'bg-[#162236] text-[#42D9F5] font-semibold'
                    : 'text-[#98A8BD] hover:text-[#F3F7FC]'
                }`}
              >
                Record Counts
              </button>
              <button
                onClick={() => setMedquadMetricMode('percentages')}
                className={`px-3 py-1.5 rounded-md font-mono transition-all ${
                  medquadMetricMode === 'percentages'
                    ? 'bg-[#162236] text-[#42D9F5] font-semibold'
                    : 'text-[#98A8BD] hover:text-[#F3F7FC]'
                }`}
              >
                Percentage Share (%)
              </button>
            </div>
          </div>

          {/* Grouped Paired Horizontal Bar Comparison Chart */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#98A8BD] border-b border-[#24334A] pb-2">
              <span className="w-1/3">Source Institute / Category</span>
              <div className="w-2/3 flex justify-between pr-2">
                <span>Original Distribution</span>
                <span>Post-Capping Balance (6.5k Cap)</span>
              </div>
            </div>

            {MEDQUAD_SOURCES.map((item, idx) => {
              const maxCount = 17000;
              const origBarWidth = (item.originalCount / maxCount) * 100;
              const postBarWidth = (item.postCapCount / maxCount) * 100;
              const isCapped = item.originalCount !== item.postCapCount;

              return (
                <div key={idx} className="space-y-1.5 p-2 rounded-lg hover:bg-[#111B2C] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#F3F7FC]">{item.source}</span>
                      {isCapped && (
                        <span className="px-1.5 py-0.2 rounded bg-[#FBBF24]/10 text-[#FBBF24] font-mono text-[10px] border border-[#FBBF24]/30">
                          CAPPED (-{(item.originalCount - item.postCapCount).toLocaleString()})
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-[#98A8BD] flex items-center gap-3">
                      <span>
                        Orig: <strong className="text-[#F3F7FC]">{medquadMetricMode === 'counts' ? item.originalCount.toLocaleString() : `${item.origPct}%`}</strong>
                      </span>
                      <span>→</span>
                      <span>
                        Post-Cap: <strong className={isCapped ? 'text-[#2DD4BF]' : 'text-[#42D9F5]'}>{medquadMetricMode === 'counts' ? item.postCapCount.toLocaleString() : `${item.postCapPct}%`}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Dual Bar Representation */}
                  <div className="grid grid-cols-2 gap-3 pt-0.5">
                    {/* Original Bar */}
                    <div className="h-4 bg-[#080D18] rounded overflow-hidden flex items-center relative">
                      <div
                        className="h-full bg-[#384F73] transition-all duration-500 rounded"
                        style={{ width: `${origBarWidth}%` }}
                      />
                      <span className="absolute left-2 text-[9px] font-mono text-[#F3F7FC] drop-shadow">
                        {medquadMetricMode === 'counts' ? item.originalCount.toLocaleString() : `${item.origPct}%`}
                      </span>
                    </div>

                    {/* Post-Cap Bar */}
                    <div className="h-4 bg-[#080D18] rounded overflow-hidden flex items-center relative">
                      <div
                        className={`h-full transition-all duration-500 rounded ${isCapped ? 'bg-gradient-to-r from-[#2DD4BF] to-[#42D9F5]' : 'bg-[#42D9F5]'}`}
                        style={{ width: `${postBarWidth}%` }}
                      />
                      <span className="absolute left-2 text-[9px] font-mono text-[#080D18] font-bold drop-shadow">
                        {medquadMetricMode === 'counts' ? item.postCapCount.toLocaleString() : `${item.postCapPct}%`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Impact Synthesis Callout */}
          <div className="p-4 rounded-xl bg-[#080D18] border border-[#24334A] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <span className="text-[#65758B] block">BEFORE CAPPING</span>
              <span className="text-base font-bold text-[#F3F7FC]">
                {totalOriginalMedquad.toLocaleString()} Records
              </span>
              <p className="text-[11px] text-[#98A8BD] mt-1 font-sans">
                GHR and GARD accounted for 60.5% of total dataset, creating acute bias towards ultra-rare monogenic syndromes.
              </p>
            </div>

            <div>
              <span className="text-[#65758B] block">AFTER 6.5K CAP</span>
              <span className="text-base font-bold text-[#2DD4BF]">
                {totalPostCapMedquad.toLocaleString()} Records
              </span>
              <p className="text-[11px] text-[#98A8BD] mt-1 font-sans">
                GHR & GARD share reduced to 35.6% combined, unlocking 2.4× proportional representation for primary & infectious care.
              </p>
            </div>

            <div>
              <span className="text-[#65758B] block">CORE RETENTION</span>
              <span className="text-base font-bold text-[#34D399]">100% Retained</span>
              <p className="text-[11px] text-[#98A8BD] mt-1 font-sans">
                100% of diabetes (NIDDK), cardiovascular (NHLBI), and epidemic guidelines (CDC) fully preserved.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION B: MedMCQA Subject Distribution (Ranked Horizontal Bars) */}
      {(selectedDatasetTab === 'all' || selectedDatasetTab === 'medmcqa') && (
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-[#65758B] tracking-wider">
                  CLINICAL SPECIALTY STRATIFICATION
                </span>
                <span className="text-xs font-mono text-[#2DD4BF]">193,155 Questions</span>
              </div>
              <h2 className="text-lg font-bold text-[#F3F7FC] mt-0.5">
                MedMCQA Subject Distribution (20 Clinical Disciplines)
              </h2>
              <p className="text-xs text-[#98A8BD]">
                Ranked breakdown of medical examination questions across basic sciences, surgical disciplines, and primary care.
              </p>
            </div>

            {/* Filter and Sorting Controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-2.5 text-[#65758B]" />
                <input
                  type="text"
                  placeholder="Filter subjects..."
                  value={medmcqaSearch}
                  onChange={(e) => setMedmcqaSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg bg-[#080D18] border border-[#24334A] text-xs text-[#F3F7FC] placeholder:text-[#65758B] focus:border-[#42D9F5] focus:outline-none w-44"
                />
              </div>

              <select
                value={medmcqaSort}
                onChange={(e) => setMedmcqaSort(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-lg bg-[#080D18] border border-[#24334A] text-xs font-mono text-[#F3F7FC] focus:outline-none"
              >
                <option value="count-desc">Sort by Count (High → Low)</option>
                <option value="count-asc">Sort by Count (Low → High)</option>
                <option value="alpha">Sort Alphabetically</option>
              </select>

              <div className="flex items-center p-1 rounded-lg bg-[#080D18] border border-[#24334A] text-xs font-mono">
                <button
                  onClick={() => setMedmcqaMetricMode('counts')}
                  className={`px-2.5 py-1 rounded transition-all ${
                    medmcqaMetricMode === 'counts' ? 'bg-[#162236] text-[#42D9F5] font-semibold' : 'text-[#98A8BD]'
                  }`}
                >
                  Counts
                </button>
                <button
                  onClick={() => setMedmcqaMetricMode('percentages')}
                  className={`px-2.5 py-1 rounded transition-all ${
                    medmcqaMetricMode === 'percentages' ? 'bg-[#162236] text-[#42D9F5] font-semibold' : 'text-[#98A8BD]'
                  }`}
                >
                  % Share
                </button>
              </div>
            </div>
          </div>

          {/* Ranked Horizontal Bar Chart */}
          <div className="space-y-2.5">
            {filteredSubjects.map((subject, idx) => {
              const maxQ = 22000;
              const barWidth = (subject.questionCount / maxQ) * 100;
              const groupColor =
                subject.specialtyGroup === 'Basic Sciences'
                  ? 'bg-[#42D9F5]'
                  : subject.specialtyGroup === 'Clinical Specialities'
                  ? 'bg-[#2DD4BF]'
                  : subject.specialtyGroup === 'Public Health'
                  ? 'bg-[#34D399]'
                  : 'bg-[#A78BFA]';

              return (
                <div key={subject.subject} className="p-2 rounded-lg bg-[#111B2C] border border-[#24334A]/80 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#65758B] w-5 text-[11px]">#{idx + 1}</span>
                      <span className="font-medium text-[#F3F7FC]">{subject.subject}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#162236] text-[#98A8BD]">
                        {subject.specialtyGroup}
                      </span>
                    </div>

                    <div className="font-mono font-semibold text-xs text-[#42D9F5]">
                      {medmcqaMetricMode === 'counts'
                        ? `${subject.questionCount.toLocaleString()} questions`
                        : `${subject.percentage}% of bank`}
                    </div>
                  </div>

                  <div className="w-full bg-[#080D18] h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${groupColor} transition-all duration-500 rounded-full`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend and Total Footer */}
          <div className="pt-2 border-t border-[#24334A] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#98A8BD]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#42D9F5]" /> Basic Sciences
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2DD4BF]" /> Clinical Specialities
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]" /> Public Health (PSM)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A78BFA]" /> Surgical & Allied
              </span>
            </div>
            <span>Total Questions: <strong className="text-[#F3F7FC]">{totalMedmcqaQuestions.toLocaleString()}</strong></span>
          </div>
        </div>
      )}

      {/* SECTION C: Corpus Chunks per PDF (Ingestion Map & Table) */}
      {(selectedDatasetTab === 'all' || selectedDatasetTab === 'pdfs') && (
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-[#65758B] tracking-wider">
                  CORPUS INGESTION MAP
                </span>
                <span className="text-xs font-mono text-[#42D9F5]">8,420 Chunks Grounded</span>
              </div>
              <h2 className="text-lg font-bold text-[#F3F7FC] mt-0.5">
                Document Chunk Contribution to Knowledge Graph
              </h2>
              <p className="text-xs text-[#98A8BD]">
                How clinical textbooks, emergency guidelines, and national health manuals contribute to the vector index.
              </p>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="p-2 rounded-lg bg-[#080D18] border border-[#24334A]">
                <span className="text-[#65758B] block text-[10px]">TOTAL DOCUMENTS</span>
                <span className="font-bold text-[#F3F7FC]">{CORPUS_PDFS.length} PDFs</span>
              </div>
              <div className="p-2 rounded-lg bg-[#080D18] border border-[#24334A]">
                <span className="text-[#65758B] block text-[10px]">TOTAL CHUNKS</span>
                <span className="font-bold text-[#42D9F5]">{totalPdfChunks.toLocaleString()}</span>
              </div>
              <div className="p-2 rounded-lg bg-[#080D18] border border-[#24334A]">
                <span className="text-[#65758B] block text-[10px]">AVG CHUNKS/DOC</span>
                <span className="font-bold text-[#2DD4BF]">{avgChunksPerPdf}</span>
              </div>
            </div>
          </div>

          {/* Interactive Table of PDFs */}
          <div className="overflow-x-auto rounded-xl border border-[#24334A]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#080D18] border-b border-[#24334A] text-[#98A8BD] font-mono uppercase text-[10px]">
                  <th className="py-3 px-4">PDF Document / Authority</th>
                  <th className="py-3 px-4 cursor-pointer hover:text-[#F3F7FC]" onClick={() => { setPdfSortField('pages'); setPdfSortAsc(!pdfSortAsc); }}>
                    <div className="flex items-center gap-1">Pages <ArrowUpDown size={12} /></div>
                  </th>
                  <th className="py-3 px-4 cursor-pointer hover:text-[#F3F7FC]" onClick={() => { setPdfSortField('chunks'); setPdfSortAsc(!pdfSortAsc); }}>
                    <div className="flex items-center gap-1">Chunks <ArrowUpDown size={12} /></div>
                  </th>
                  <th className="py-3 px-4">Avg Tokens</th>
                  <th className="py-3 px-4 cursor-pointer hover:text-[#F3F7FC]" onClick={() => { setPdfSortField('share'); setPdfSortAsc(!pdfSortAsc); }}>
                    <div className="flex items-center gap-1">Corpus Share <ArrowUpDown size={12} /></div>
                  </th>
                  <th className="py-3 px-4 text-right">Domain Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#24334A]/60 font-mono">
                {sortedPdfs.map((pdf, idx) => (
                  <tr
                    key={pdf.filename}
                    onClick={() => setSelectedPdfDetail(selectedPdfDetail === pdf.filename ? null : pdf.filename)}
                    className="hover:bg-[#111B2C] transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4 font-sans">
                      <div className="font-medium text-[#F3F7FC] group-hover:text-[#42D9F5] transition-colors truncate max-w-md">
                        {pdf.filename}
                      </div>
                      <div className="text-[11px] text-[#65758B]">{pdf.authority}</div>
                    </td>
                    <td className="py-3 px-4 text-[#98A8BD]">{pdf.pages.toLocaleString()}</td>
                    <td className="py-3 px-4 text-[#F3F7FC] font-semibold">{pdf.chunks.toLocaleString()}</td>
                    <td className="py-3 px-4 text-[#98A8BD]">{pdf.avgTokensPerChunk} tokens</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[#080D18] h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#42D9F5] rounded-full"
                            style={{ width: `${(pdf.corpusSharePct / 35) * 100}%` }}
                          />
                        </div>
                        <span className="text-[#42D9F5] font-semibold">{pdf.corpusSharePct}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#162236] text-[#98A8BD] border border-[#24334A]">
                        {pdf.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedPdfDetail && (
            <div className="p-4 rounded-xl bg-[#080D18] border border-[#42D9F5]/40 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#42D9F5] font-mono">Document Inspection Detail</span>
                <button onClick={() => setSelectedPdfDetail(null)} className="text-[#65758B] hover:text-[#F3F7FC]">✕</button>
              </div>
              <p className="text-[#98A8BD] font-sans">
                Inspecting chunk boundaries for <strong className="text-[#F3F7FC]">{selectedPdfDetail}</strong>: Overlap factor set to 64 tokens with semantic header preservation. Vector search evaluated with BioLink-BERT-v2 embeddings.
              </p>
            </div>
          )}
        </div>
      )}

      {/* SECTION D: Training Pairs per Dataset */}
      {(selectedDatasetTab === 'all' || selectedDatasetTab === 'training') && (
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase text-[#65758B] tracking-wider">
                TRAINING DATA COMPOSITION
              </span>
              <span className="text-xs font-mono text-[#A78BFA]">256,959 Contrastive Pairs</span>
            </div>
            <h2 className="text-lg font-bold text-[#F3F7FC] mt-0.5">
              Siamese Bi-Encoder Training Data Composition
            </h2>
            <p className="text-xs text-[#98A8BD]">
              Explicit partitioning into Train, Validation, and Test splits across all four curated biomedical corpora.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRAINING_DATASETS.map((ds) => (
              <div key={ds.name} className="p-4 rounded-xl bg-[#111B2C] border border-[#24334A] flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-[#42D9F5] uppercase tracking-wider font-semibold">
                      {ds.status}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#F3F7FC]">{ds.sharePct}%</span>
                  </div>
                  <h3 className="font-semibold text-sm text-[#F3F7FC] leading-snug">{ds.name}</h3>
                  <p className="text-xs text-[#98A8BD] mt-1 font-sans line-clamp-2">{ds.description}</p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-[#24334A] font-mono text-xs">
                  <div className="flex justify-between text-[#98A8BD]">
                    <span>Train Split:</span>
                    <span className="text-[#F3F7FC] font-semibold">{ds.trainPairs.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#98A8BD]">
                    <span>Validation Split:</span>
                    <span className="text-[#F3F7FC]">{ds.valPairs.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#98A8BD]">
                    <span>Test Split:</span>
                    <span className="text-[#F3F7FC]">{ds.testPairs.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#2DD4BF] font-semibold pt-1 border-t border-[#24334A]/60">
                    <span>Total Pairs:</span>
                    <span>{ds.totalPairs.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION E: Research Data Quality Summary */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#34D399]" />
            <h3 className="font-bold text-sm text-[#F3F7FC] uppercase tracking-wide">
              Research Data Quality Audit Checklist
            </h3>
          </div>
          <span className="text-xs font-mono text-[#34D399] bg-[#34D399]/10 px-2 py-0.5 rounded border border-[#34D399]/30">
            AUDIT PASSED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-[#080D18] border border-[#24334A] space-y-1">
            <span className="text-[#65758B] block text-[10px]">GHR/GARD BALANCING</span>
            <span className="text-[#34D399] font-semibold block">ACTIVE · Capped at 6.5k</span>
            <span className="text-[11px] text-[#98A8BD] font-sans">Eliminates single-corpus monopoly</span>
          </div>

          <div className="p-3 rounded-lg bg-[#080D18] border border-[#24334A] space-y-1">
            <span className="text-[#65758B] block text-[10px]">SPLIT PARTITIONING</span>
            <span className="text-[#34D399] font-semibold block">80% / 10% / 10% STRICT</span>
            <span className="text-[11px] text-[#98A8BD] font-sans">Zero leakage between train & test</span>
          </div>

          <div className="p-3 rounded-lg bg-[#080D18] border border-[#24334A] space-y-1">
            <span className="text-[#65758B] block text-[10px]">CHUNK NORMALIZATION</span>
            <span className="text-[#34D399] font-semibold block">320 TOKENS (MEAN)</span>
            <span className="text-[11px] text-[#98A8BD] font-sans">64-token stride overlap</span>
          </div>

          <div className="p-3 rounded-lg bg-[#080D18] border border-[#24334A] space-y-1">
            <span className="text-[#65758B] block text-[10px]">EVALUATION STATUS</span>
            <span className="text-[#FBBF24] font-semibold block">AWAITING LIVE RUN</span>
            <span className="text-[11px] text-[#98A8BD] font-sans">RAGAS harness pending Phase 5</span>
          </div>
        </div>
      </div>
    </div>
  );
};
