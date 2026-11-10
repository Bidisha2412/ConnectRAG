import React, { useState, useEffect, useMemo } from 'react';
import { ScreenView, TierType, NetworkTelemetry } from './types/connectrag';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { QuickSearchModal } from './components/QuickSearchModal';

// Views
import { CommandCenterView } from './views/CommandCenterView';
import { LiveDemoView } from './views/LiveDemoView';
import { DataLabView } from './views/DataLabView';
import { DatasetExplorerView } from './views/DatasetExplorerView';
import { TrainingAnalyticsView } from './views/TrainingAnalyticsView';
import { ArchitectureView } from './views/ArchitectureView';
import { AboutMethodologyView } from './views/AboutMethodologyView';

export default function App() {
  const [currentView, setCurrentView] = useState<ScreenView>('command-center');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [domainMode, setDomainMode] = useState<'all' | 'rural' | 'clinical'>('all');

  // Network Simulation State
  const [nqs, setNqs] = useState<number>(88);
  const [consecutiveLowCount, setConsecutiveLowCount] = useState<number>(0);

  // Derive Network Telemetry from current NQS
  const telemetry: NetworkTelemetry = useMemo(() => {
    let latencyMs = 24;
    let bandwidthMbps = 48.2;
    let packetLossPct = 0.02;
    let jitterMs = 2.1;
    let state: 'healthy' | 'degraded' | 'critical' | 'offline' = 'healthy';

    if (nqs >= 70) {
      latencyMs = Math.round(20 + (100 - nqs) * 1.5);
      bandwidthMbps = parseFloat((30 + nqs * 0.2).toFixed(1));
      packetLossPct = 0.02;
      jitterMs = 2.1;
      state = 'healthy';
    } else if (nqs >= 30) {
      latencyMs = Math.round(140 + (70 - nqs) * 2);
      bandwidthMbps = parseFloat((4 + nqs * 0.1).toFixed(1));
      packetLossPct = 3.8;
      jitterMs = 14.6;
      state = 'degraded';
    } else if (nqs > 0) {
      latencyMs = 18;
      bandwidthMbps = 0.5;
      packetLossPct = 42.5;
      jitterMs = 38.0;
      state = 'critical';
    } else {
      latencyMs = 12; // Zero-Net SQLite Cache lookup
      bandwidthMbps = 0.0;
      packetLossPct = 100.0;
      jitterMs = 0.0;
      state = 'offline';
    }

    return {
      nqs,
      latencyMs,
      bandwidthMbps,
      packetLossPct,
      jitterMs,
      sampleHistory: [88, 87, 89, 86, 90, 88, 87, 88, nqs],
      state,
      consecutiveLowSamples: consecutiveLowCount
    };
  }, [nqs, consecutiveLowCount]);

  // Autonomic Tier Orchestration with Hysteresis
  const activeTier: TierType = useMemo(() => {
    if (nqs >= 70) return 'tier-1-cloud';
    if (nqs >= 30) return 'tier-2-local';
    return 'tier-3-cache';
  }, [nqs]);

  // Update NQS handler
  const handleUpdateNqs = (newScore: number) => {
    setNqs(newScore);
    if (newScore < 70) {
      setConsecutiveLowCount((prev) => prev + 1);
    } else {
      setConsecutiveLowCount(0);
    }
  };

  // Keyboard shortcut listener for Command/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#080D18] text-[#F3F7FC] flex">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentView={currentView}
        onSelectView={(view) => setCurrentView(view)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        nqsScore={nqs}
      />

      {/* Top Header Navigation */}
      <TopBar
        currentView={currentView}
        onSelectView={(view) => setCurrentView(view)}
        domainMode={domainMode}
        onChangeDomain={(dom) => setDomainMode(dom)}
        nqsScore={nqs}
        sidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        onOpenQuickSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main
        className={`flex-1 transition-all duration-300 pt-20 px-4 sm:px-8 pb-12 overflow-x-hidden ${
          isSidebarCollapsed ? 'ml-[72px]' : 'ml-[72px] md:ml-[260px]'
        }`}
      >
        {currentView === 'command-center' && (
          <CommandCenterView
            onNavigate={(view) => setCurrentView(view)}
            nqsScore={nqs}
            activeTier={activeTier}
          />
        )}

        {currentView === 'live-demo' && (
          <LiveDemoView
            nqs={nqs}
            onUpdateNqs={handleUpdateNqs}
            telemetry={telemetry}
            activeTier={activeTier}
            selectedDomain={domainMode}
          />
        )}

        {currentView === 'data-lab' && <DataLabView />}

        {currentView === 'dataset-explorer' && <DatasetExplorerView />}

        {currentView === 'training-analytics' && <TrainingAnalyticsView />}

        {currentView === 'architecture' && <ArchitectureView />}

        {currentView === 'about-methodology' && <AboutMethodologyView />}
      </main>

      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(view) => setCurrentView(view)}
      />
    </div>
  );
}
