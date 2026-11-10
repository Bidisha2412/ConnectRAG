import React from 'react';
import {
  LayoutDashboard,
  Cpu,
  BarChart3,
  Database,
  GitBranch,
  Network,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Terminal
} from 'lucide-react';
import { ScreenView } from '../types/connectrag';
import { ConnectRAGLogo } from './ConnectRAGLogo';

interface SidebarProps {
  currentView: ScreenView;
  onSelectView: (view: ScreenView) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  nqsScore: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  isCollapsed,
  onToggleCollapse,
  nqsScore
}) => {
  const navSections = [
    {
      group: 'OVERVIEW',
      items: [
        { id: 'command-center' as ScreenView, label: 'Command Center', icon: LayoutDashboard, badge: null },
        { id: 'live-demo' as ScreenView, label: 'Live ConnectRAG Demo', icon: Cpu, badge: `${nqsScore} NQS` }
      ]
    },
    {
      group: 'RESEARCH & CORPUS',
      items: [
        { id: 'data-lab' as ScreenView, label: 'Data Lab', icon: BarChart3, badge: 'Curated' },
        { id: 'dataset-explorer' as ScreenView, label: 'Dataset Explorer', icon: Database, badge: '4 Sets' },
        { id: 'training-analytics' as ScreenView, label: 'Training Analytics', icon: GitBranch, badge: 'Bi-Encoder' }
      ]
    },
    {
      group: 'SYSTEM & VIVA DEFENSE',
      items: [
        { id: 'architecture' as ScreenView, label: 'System Architecture', icon: Network, badge: 'Siamese' },
        { id: 'about-methodology' as ScreenView, label: 'Methodology & Critique', icon: BookOpen, badge: 'Phased' }
      ]
    }
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-40 bg-[#0D1422] border-r border-[#24334A] flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
    >
      {/* Top Header / Brand Lockup */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#24334A]/80 shrink-0">
        <div
          onClick={() => onSelectView('command-center')}
          className="cursor-pointer overflow-hidden flex items-center"
        >
          {isCollapsed ? (
            <ConnectRAGLogo variant="symbol-only" size="md" />
          ) : (
            <ConnectRAGLogo variant="horizontal" size="md" />
          )}
        </div>
        <button
          onClick={onToggleCollapse}
          className="w-7 h-7 rounded-md text-[#98A8BD] hover:text-[#F3F7FC] hover:bg-[#162236] flex items-center justify-center transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 pb-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-[#65758B]">
                {section.group}
              </div>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectView(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative group ${
                      isActive
                        ? 'bg-[#162236] text-[#42D9F5] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'
                        : 'text-[#98A8BD] hover:text-[#F3F7FC] hover:bg-[#111B2C]'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    {/* Active Left Indicator Bar */}
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#42D9F5] rounded-r-full" />
                    )}

                    <Icon
                      size={18}
                      className={`shrink-0 transition-colors ${
                        isActive ? 'text-[#42D9F5]' : 'text-[#65758B] group-hover:text-[#98A8BD]'
                      }`}
                    />

                    {!isCollapsed && (
                      <div className="flex items-center justify-between flex-1 min-w-0">
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded border leading-none ${
                              isActive
                                ? 'bg-[#42D9F5]/10 text-[#42D9F5] border-[#42D9F5]/30'
                                : 'bg-[#111B2C] text-[#65758B] border-[#24334A]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Footer Telemetry & System Status */}
      <div className="p-3 border-t border-[#24334A]/80 bg-[#080D18]/40 shrink-0">
        {!isCollapsed ? (
          <div className="space-y-2.5">
            <div className="p-2.5 rounded-lg bg-[#111B2C] border border-[#24334A] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34D399]"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-medium text-[#F3F7FC] leading-none">Simulation Core</span>
                  <span className="text-[9px] font-mono text-[#34D399] mt-0.5">READY · AUTONOMIC</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#98A8BD] px-1.5 py-0.5 bg-[#0D1422] rounded border border-[#24334A]">
                v0.9.4
              </span>
            </div>

            <div className="flex items-center justify-between px-1 text-[11px] text-[#65758B]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-[#42D9F5]" />
                <span>Client Model Grounding</span>
              </span>
              <span className="font-mono text-[10px]">Dual-Mode</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-1">
            <div className="relative flex h-2.5 w-2.5" title="Simulation Ready">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#34D399]"></span>
            </div>
            <Terminal size={14} className="text-[#65758B]" />
          </div>
        )}
      </div>
    </aside>
  );
};
