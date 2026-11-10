import React from 'react';
import {
  Search,
  Activity,
  Layers,
  Sparkles,
  ExternalLink,
  Menu
} from 'lucide-react';
import { ScreenView } from '../types/connectrag';

interface TopBarProps {
  currentView: ScreenView;
  onSelectView: (view: ScreenView) => void;
  domainMode: 'all' | 'rural' | 'clinical';
  onChangeDomain: (domain: 'all' | 'rural' | 'clinical') => void;
  nqsScore: number;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onOpenQuickSearch: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentView,
  onSelectView,
  domainMode,
  onChangeDomain,
  nqsScore,
  sidebarCollapsed,
  onToggleSidebar,
  onOpenQuickSearch
}) => {
  const getBreadcrumb = () => {
    switch (currentView) {
      case 'command-center':
        return { section: 'Overview', title: 'Command Center', subtitle: 'Resilient retrieval intelligence across fluctuating networks' };
      case 'live-demo':
        return { section: 'Simulation', title: 'Live ConnectRAG Demo', subtitle: 'Dynamic 3-tier routing & telemetry testbed' };
      case 'data-lab':
        return { section: 'Research', title: 'Data Lab', subtitle: 'MedQuAD capping, MedMCQA distribution & corpus ingestion analytics' };
      case 'dataset-explorer':
        return { section: 'Research', title: 'Dataset Explorer', subtitle: 'Medical training corpus & chunk inspection catalog' };
      case 'training-analytics':
        return { section: 'Model Training', title: 'Training Analytics', subtitle: 'Siamese Bi-Encoder contrastive learning & FAISS indexing' };
      case 'architecture':
        return { section: 'System Architecture', title: 'Siamese Retrieval Engine', subtitle: 'Dual-branch Bi-Encoder, FAISS search & NQS orchestration' };
      case 'about-methodology':
        return { section: 'Viva Defense', title: 'Methodology & Critique', subtitle: '16-week phased roadmap & academic critique defense' };
      default:
        return { section: 'System', title: 'ConnectRAG', subtitle: 'Connectivity-aware AI infrastructure' };
    }
  };

  const breadcrumb = getBreadcrumb();

  // NQS status color
  const getNqsColor = () => {
    if (nqsScore >= 70) return { bg: 'bg-[#34D399]/10', text: 'text-[#34D399]', border: 'border-[#34D399]/30', dot: 'bg-[#34D399]', label: 'CLOUD TIER 1' };
    if (nqsScore >= 30) return { bg: 'bg-[#FBBF24]/10', text: 'text-[#FBBF24]', border: 'border-[#FBBF24]/30', dot: 'bg-[#FBBF24]', label: 'LOCAL TIER 2' };
    return { bg: 'bg-[#FB7185]/10', text: 'text-[#FB7185]', border: 'border-[#FB7185]/30', dot: 'bg-[#FB7185]', label: 'CACHE TIER 3' };
  };

  const status = getNqsColor();

  return (
    <header
      className={`fixed top-0 right-0 h-16 z-30 bg-[#080D18]/90 backdrop-blur-md border-b border-[#24334A] transition-all duration-300 ${
        sidebarCollapsed ? 'left-[72px]' : 'left-[260px]'
      }`}
    >
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-1.5 rounded-lg text-[#98A8BD] hover:text-[#F3F7FC] hover:bg-[#111B2C]"
            aria-label="Toggle navigation"
          >
            <Menu size={18} />
          </button>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#65758B] font-mono tracking-wide uppercase">{breadcrumb.section}</span>
              <span className="text-[#384F73]">/</span>
              <span className="font-semibold text-[#F3F7FC] truncate">{breadcrumb.title}</span>
            </div>
            <span className="hidden sm:block text-[11px] text-[#98A8BD] truncate max-w-md">
              {breadcrumb.subtitle}
            </span>
          </div>
        </div>

        {/* Center / Right: Domain Switcher & Telemetry Pill */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Domain Focus Segmented Control */}
          <div className="hidden lg:flex items-center p-1 rounded-lg bg-[#0D1422] border border-[#24334A] text-xs">
            <span className="px-2 py-1 text-[10px] font-mono uppercase text-[#65758B] flex items-center gap-1">
              <Layers size={11} className="text-[#42D9F5]" /> Domain:
            </span>
            <button
              onClick={() => onChangeDomain('all')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                domainMode === 'all'
                  ? 'bg-[#162236] text-[#42D9F5] shadow-sm'
                  : 'text-[#98A8BD] hover:text-[#F3F7FC]'
              }`}
            >
              Unified
            </button>
            <button
              onClick={() => onChangeDomain('rural')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                domainMode === 'rural'
                  ? 'bg-[#162236] text-[#2DD4BF] shadow-sm'
                  : 'text-[#98A8BD] hover:text-[#F3F7FC]'
              }`}
            >
              Rural Health (NHM/ICMR)
            </button>
            <button
              onClick={() => onChangeDomain('clinical')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                domainMode === 'clinical'
                  ? 'bg-[#162236] text-[#A78BFA] shadow-sm'
                  : 'text-[#98A8BD] hover:text-[#F3F7FC]'
              }`}
            >
              Clinical (Harrison's)
            </button>
          </div>

          {/* Quick Search Trigger */}
          <button
            onClick={onOpenQuickSearch}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0D1422] border border-[#24334A] text-xs text-[#98A8BD] hover:text-[#F3F7FC] hover:border-[#384F73] transition-all"
            title="Quick Search (Ctrl + K)"
          >
            <Search size={14} className="text-[#42D9F5]" />
            <span className="hidden sm:inline">Search Corpus & Queries...</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#162236] text-[#65758B] rounded border border-[#24334A]">
              ⌘K
            </kbd>
          </button>

          {/* Live NQS Telemetry Badge (Interactive Click to Demo) */}
          <button
            onClick={() => onSelectView('live-demo')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all hover:scale-[1.02] active:scale-[0.98] ${status.bg} ${status.text} ${status.border}`}
            title="Click to view live network simulator"
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${status.dot} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${status.dot}`}></span>
            </span>
            <span className="tabular-nums font-semibold">{nqsScore} NQS</span>
            <span className="hidden xl:inline text-[10px] opacity-80">· {status.label}</span>
          </button>

          {/* Live Demo Quick CTA */}
          {currentView !== 'live-demo' && (
            <button
              onClick={() => onSelectView('live-demo')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#42D9F5] text-[#080D18] font-medium text-xs hover:bg-[#38BDF8] shadow-[0_0_12px_rgba(66,217,245,0.25)] transition-all shrink-0"
            >
              <Sparkles size={13} />
              <span>Launch Demo</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
