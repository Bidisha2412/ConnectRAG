import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, LayoutDashboard, Cpu, BarChart3, Database, Network, BookOpen } from 'lucide-react';
import { ScreenView } from '../types/connectrag';
import { CLINICAL_QUERIES } from '../data/mockCorpusData';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ScreenView) => void;
  onSelectQuery?: (queryText: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectQuery
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickNav = [
    { title: 'Command Center', view: 'command-center' as ScreenView, icon: LayoutDashboard, category: 'View' },
    { title: 'Live ConnectRAG Demo', view: 'live-demo' as ScreenView, icon: Cpu, category: 'Simulation' },
    { title: 'Data Lab (MedQuAD & MedMCQA)', view: 'data-lab' as ScreenView, icon: BarChart3, category: 'Research' },
    { title: 'Dataset Explorer', view: 'dataset-explorer' as ScreenView, icon: Database, category: 'Research' },
    { title: 'System Architecture (Siamese Bi-Encoder)', view: 'architecture' as ScreenView, icon: Network, category: 'Technical' },
    { title: 'Methodology & Critique Defense', view: 'about-methodology' as ScreenView, icon: BookOpen, category: 'Viva' }
  ];

  const filteredNav = quickNav.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
  const filteredQueries = CLINICAL_QUERIES.filter(q => q.query.toLowerCase().includes(query.toLowerCase()) || q.keywords.some(k => k.toLowerCase().includes(query.toLowerCase())));

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="w-full max-w-2xl bg-[#0D1422] border border-[#24334A] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#24334A] flex items-center gap-3 bg-[#080D18]">
          <Search size={18} className="text-[#42D9F5]" />
          <input
            autoFocus
            type="text"
            placeholder="Search screens, datasets, or clinical medical queries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[#F3F7FC] text-sm focus:outline-none placeholder:text-[#65758B] font-mono"
          />
          <kbd className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#162236] text-[#65758B] border border-[#24334A]">
            ESC
          </kbd>
          <button onClick={onClose} className="text-[#65758B] hover:text-[#F3F7FC] p-1">
            <X size={16} />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Quick Views */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#65758B] uppercase tracking-wider px-2">Navigation Targets</span>
            {filteredNav.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  onClick={() => {
                    onNavigate(item.view);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#111B2C] text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded bg-[#162236] text-[#42D9F5]">
                      <Icon size={14} />
                    </div>
                    <span className="text-xs font-medium text-[#F3F7FC] group-hover:text-[#42D9F5] transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#65758B]">{item.category}</span>
                </button>
              );
            })}
          </div>

          {/* Clinical Query Suggestions */}
          {filteredQueries.length > 0 && (
            <div className="space-y-1 pt-2 border-t border-[#24334A]">
              <span className="text-[10px] font-mono text-[#65758B] uppercase tracking-wider px-2">Clinical Queries</span>
              {filteredQueries.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate('live-demo');
                    if (onSelectQuery) onSelectQuery(item.query);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#111B2C] text-left transition-colors group"
                >
                  <div className="truncate pr-2">
                    <span className="text-xs text-[#98A8BD] group-hover:text-[#F3F7FC] transition-colors block truncate">
                      {item.query}
                    </span>
                    <span className="text-[10px] text-[#65758B] font-mono">
                      {item.domain === 'rural' ? 'Rural Health' : 'Clinical Medicine'} · Complexity: {item.complexity}
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-[#42D9F5] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
