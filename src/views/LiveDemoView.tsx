import React, { useState, useEffect } from 'react';
import {
  Activity,
  Sliders,
  Send,
  Sparkles,
  Zap,
  Cpu,
  Server,
  HardDrive,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  WifiOff,
  Radio,
  FileText,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import {
  NetworkTelemetry,
  TierType,
  ClinicalQuery,
  SimulationResult,
  TelemetryLogEntry,
  RetrievedSource
} from '../types/connectrag';
import {
  CLINICAL_QUERIES,
  MOCK_RESPONSES_BY_TIER
} from '../data/mockCorpusData';

interface LiveDemoProps {
  nqs: number;
  onUpdateNqs: (score: number) => void;
  telemetry: NetworkTelemetry;
  activeTier: TierType;
  selectedDomain: 'all' | 'rural' | 'clinical';
}

export const LiveDemoView: React.FC<LiveDemoProps> = ({
  nqs,
  onUpdateNqs,
  telemetry,
  activeTier,
  selectedDomain
}) => {
  // Query Console State
  const [currentQueryId, setCurrentQueryId] = useState<string>('q-meningitis');
  const [customQueryText, setCustomQueryText] = useState<string>(
    'What are the first-line antibiotics for acute bacterial meningitis?'
  );
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [isBlackoutRunning, setIsBlackoutRunning] = useState<boolean>(false);
  const [expandedSourceId, setExpandedSourceId] = useState<string | null>(null);

  // Active simulated result
  const [currentResult, setCurrentResult] = useState<SimulationResult>(() => {
    const defaultResp = MOCK_RESPONSES_BY_TIER['q-meningitis'][activeTier];
    return {
      tier: activeTier,
      tierName: activeTier === 'tier-1-cloud' ? 'TIER 1: CLOUD RAG' : activeTier === 'tier-2-local' ? 'TIER 2: LOCAL SLM' : 'TIER 3: CACHED KNOWLEDGE',
      response: defaultResp.text,
      latencyMs: defaultResp.latencyMs,
      cacheHit: activeTier === 'tier-3-cache',
      confidenceScore: defaultResp.confidenceScore,
      escalated: false,
      sources: defaultResp.sources,
      timestamp: new Date().toLocaleTimeString(),
      queryId: 'q-meningitis',
      queryText: 'What are the first-line antibiotics for acute bacterial meningitis?',
      complexityScore: 0.65
    };
  });

  // Telemetry event log ring buffer
  const [telemetryLogs, setTelemetryLogs] = useState<TelemetryLogEntry[]>([
    {
      id: 'log-104',
      timestamp: '14:32:08',
      query: 'What are the first-line antibiotics for acute bacterial meningitis?',
      tier: 'tier-1-cloud',
      tierLabel: 'TIER 1 CLOUD',
      latencyMs: 348,
      status: 'OK',
      nqs: 88
    },
    {
      id: 'log-103',
      timestamp: '14:31:42',
      query: 'Management of severe anaphylaxis in a rural clinic without IV access',
      tier: 'tier-2-local',
      tierLabel: 'TIER 2 LOCAL',
      latencyMs: 182,
      status: 'FALLBACK',
      nqs: 54
    },
    {
      id: 'log-102',
      timestamp: '14:30:15',
      query: 'WHO Plan C intravenous rehydration guidelines for pediatric cholera',
      tier: 'tier-3-cache',
      tierLabel: 'TIER 3 CACHE',
      latencyMs: 14,
      status: 'HIT',
      nqs: 12
    }
  ]);

  // Filter clinical queries by selected domain
  const availableQueries = CLINICAL_QUERIES.filter(
    (q) => selectedDomain === 'all' || q.domain === selectedDomain
  );

  // Handle Preset selection
  const handleApplyPreset = (targetNqs: number) => {
    if (isBlackoutRunning) return;
    onUpdateNqs(targetNqs);
  };

  // 5-second blackout simulation trigger
  const handleTriggerBlackout = () => {
    if (isBlackoutRunning) return;
    setIsBlackoutRunning(true);

    // Step 1: Drop to 0 immediately (Tier 3 Cache)
    onUpdateNqs(0);

    // Step 2: Partial recovery after 2.5s (Tier 2 Local SLM)
    setTimeout(() => {
      onUpdateNqs(48);
    }, 2500);

    // Step 3: Full restore to 90 after 5s (Tier 1 Cloud)
    setTimeout(() => {
      onUpdateNqs(90);
      setIsBlackoutRunning(false);
    }, 5000);
  };

  // Submit simulated query
  const handleExecuteQuery = () => {
    setIsSynthesizing(true);

    setTimeout(() => {
      setIsSynthesizing(false);

      // Determine matching response from mock dictionary or fallback
      const responsesForQuery = MOCK_RESPONSES_BY_TIER[currentQueryId] || MOCK_RESPONSES_BY_TIER['q-meningitis'];
      const tierData = responsesForQuery[activeTier];

      const newResult: SimulationResult = {
        tier: activeTier,
        tierName:
          activeTier === 'tier-1-cloud'
            ? 'TIER 1: CLOUD RAG'
            : activeTier === 'tier-2-local'
            ? 'TIER 2: LOCAL SLM'
            : 'TIER 3: CACHED KNOWLEDGE',
        response: tierData.text,
        latencyMs: tierData.latencyMs,
        cacheHit: activeTier === 'tier-3-cache',
        confidenceScore: tierData.confidenceScore,
        escalated: false,
        sources: tierData.sources,
        timestamp: new Date().toLocaleTimeString(),
        queryId: currentQueryId,
        queryText: customQueryText,
        complexityScore: 0.72
      };

      setCurrentResult(newResult);

      // Push to telemetry timeline
      const newLog: TelemetryLogEntry = {
        id: `log-${Math.floor(100 + Math.random() * 900)}`,
        timestamp: new Date().toLocaleTimeString(),
        query: customQueryText,
        tier: activeTier,
        tierLabel:
          activeTier === 'tier-1-cloud' ? 'TIER 1 CLOUD' : activeTier === 'tier-2-local' ? 'TIER 2 LOCAL' : 'TIER 3 CACHE',
        latencyMs: tierData.latencyMs,
        status: activeTier === 'tier-1-cloud' ? 'OK' : activeTier === 'tier-2-local' ? 'FALLBACK' : 'HIT',
        nqs
      };

      setTelemetryLogs((prev) => [newLog, ...prev.slice(0, 9)]);
    }, 450);
  };

  // Select quick question
  const handleSelectQuickQuestion = (item: ClinicalQuery) => {
    setCurrentQueryId(item.id);
    setCustomQueryText(item.query);
  };

  // Arc calculation for NQS circular gauge
  const arcRadius = 40;
  const circumference = 2 * Math.PI * arcRadius;
  const arcLength = 251.2;
  const dashOffset = arcLength - (nqs / 100) * 195;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Persistent Disclaimer Banner */}
      <div className="p-3 sm:p-4 rounded-xl bg-[#0D1422] border border-[#24334A] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2DD4BF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2DD4BF]"></span>
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="font-mono text-xs font-semibold text-[#2DD4BF] uppercase tracking-wider">
              INTERACTIVE SIMULATION · BACKEND NOT CONNECTED
            </span>
            <span className="hidden sm:inline text-[#65758B]">·</span>
            <span className="text-xs text-[#98A8BD]">
              Real-time demonstration of autonomous three-tier RAG adaptation across changing link telemetry.
            </span>
          </div>
        </div>

        <button
          onClick={() => handleApplyPreset(88)}
          className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#162236] text-[#98A8BD] hover:text-[#F3F7FC] text-xs font-mono border border-[#24334A]"
          title="Reset simulation to default state"
        >
          <RotateCcw size={12} />
          <span className="hidden md:inline">Reset Defaults</span>
        </button>
      </div>

      {/* Grid: Telemetry Monitor & Connectivity Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SECTION A: Telemetry Monitor & NQS Gauge (5 cols) */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#65758B] tracking-wider block">
                TELEMETRY MONITOR
              </span>
              <h2 className="text-base font-bold text-[#F3F7FC]">Network Quality Score (NQS)</h2>
            </div>
            <div
              className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 border ${
                nqs >= 70
                  ? 'bg-[#34D399]/10 text-[#34D399] border-[#34D399]/30'
                  : nqs >= 30
                  ? 'bg-[#FBBF24]/10 text-[#FBBF24] border-[#FBBF24]/30'
                  : 'bg-[#FB7185]/10 text-[#FB7185] border-[#FB7185]/30'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              <span>
                {nqs >= 70 ? 'HEALTHY (EXCELLENT)' : nqs >= 30 ? 'DEGRADED (LOCAL SLM)' : 'OFFLINE / AIR-GAPPED'}
              </span>
            </div>
          </div>

          {/* Circular Gauge + Sparkline Wave */}
          <div className="p-4 rounded-xl bg-[#080D18] border border-[#24334A] flex items-center justify-between gap-4">
            {/* SVG Arc Gauge */}
            <div className="relative flex items-center justify-center w-28 h-28 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={arcRadius}
                  fill="transparent"
                  stroke="#162236"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset="50.2"
                  strokeLinecap="round"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={arcRadius}
                  fill="transparent"
                  stroke={nqs >= 70 ? '#42D9F5' : nqs >= 30 ? '#2DD4BF' : '#FB7185'}
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-2xl font-bold text-[#F3F7FC] tracking-tight">{nqs}</span>
                <span className="font-mono text-[10px] text-[#65758B] -mt-1">/ 100</span>
              </div>
            </div>

            {/* Stability Waveform & Autonomous Ping */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#98A8BD]">Link Waveform (12s)</span>
                <span className={`text-[10px] font-semibold ${nqs >= 70 ? 'text-[#34D399]' : nqs >= 30 ? 'text-[#FBBF24]' : 'text-[#FB7185]'}`}>
                  {nqs >= 70 ? 'STABLE' : nqs >= 30 ? 'JITTERY' : 'FLAPPING'}
                </span>
              </div>

              {/* Dynamic SVG Waveform */}
              <div className="h-9 w-full flex items-center bg-[#0D1422] rounded p-1 border border-[#24334A]">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 120 30">
                  <polyline
                    fill="none"
                    stroke={nqs >= 70 ? '#2DD4BF' : nqs >= 30 ? '#FBBF24' : '#FB7185'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={
                      nqs >= 70
                        ? '0,15 12,14 24,12 36,16 48,13 60,11 72,13 84,9 96,11 108,10 120,8'
                        : nqs >= 30
                        ? '0,15 12,24 24,6 36,22 48,9 60,25 72,11 84,26 96,8 108,24 120,15'
                        : '0,28 12,28 24,28 36,28 48,28 60,28 72,28 84,28 96,28 108,28 120,28'
                    }
                    className="transition-all duration-300"
                  />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#65758B]">
                <span>HTTP HEAD: 3.2s</span>
                <span>EWMA α = 0.25</span>
              </div>
            </div>
          </div>

          {/* 4 Telemetry Metrics Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-lg bg-[#111B2C] border border-[#24334A]">
              <span className="text-[10px] font-mono text-[#65758B] uppercase block">Round-Trip Latency</span>
              <span className="text-base font-bold font-mono text-[#42D9F5] mt-0.5 block">
                {telemetry.latencyMs} ms
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#111B2C] border border-[#24334A]">
              <span className="text-[10px] font-mono text-[#65758B] uppercase block">Link Bandwidth</span>
              <span className="text-base font-bold font-mono text-[#42D9F5] mt-0.5 block">
                {telemetry.bandwidthMbps} Mbps
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#111B2C] border border-[#24334A]">
              <span className="text-[10px] font-mono text-[#65758B] uppercase block">Packet Loss Rate</span>
              <span className={`text-base font-bold font-mono mt-0.5 block ${telemetry.packetLossPct > 5 ? 'text-[#FB7185]' : 'text-[#2DD4BF]'}`}>
                {telemetry.packetLossPct.toFixed(2)}%
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#111B2C] border border-[#24334A]">
              <span className="text-[10px] font-mono text-[#65758B] uppercase block">Jitter Variance</span>
              <span className="text-base font-bold font-mono text-[#42D9F5] mt-0.5 block">
                {telemetry.jitterMs} ms
              </span>
            </div>
          </div>
        </div>

        {/* SECTION B: Connectivity Simulator & Policies (7 cols) */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders size={18} className="text-[#42D9F5]" />
              <h2 className="text-base font-bold text-[#F3F7FC]">Network Simulator</h2>
            </div>
            <span className="font-mono text-sm font-semibold text-[#42D9F5] bg-[#162236] px-2.5 py-0.5 rounded border border-[#24334A]">
              {nqs} NQS
            </span>
          </div>

          {/* Interactive Range Slider */}
          <div className="space-y-2 p-4 rounded-xl bg-[#080D18] border border-[#24334A]">
            <div className="flex justify-between items-center text-xs font-mono text-[#98A8BD]">
              <span>Simulated Network Quality</span>
              <span className="text-[#F3F7FC] font-semibold">{nqs} / 100</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={nqs}
              disabled={isBlackoutRunning}
              onChange={(e) => onUpdateNqs(parseInt(e.target.value, 10))}
              className="w-full accent-[#42D9F5] h-2.5 bg-[#162236] rounded-lg cursor-pointer disabled:opacity-50"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#65758B] pt-1">
              <span>0 (OFFLINE)</span>
              <span>30 (TIER 2 LOCAL)</span>
              <span>70 (TIER 1 CLOUD)</span>
              <span>100 (OPTIMAL)</span>
            </div>
          </div>

          {/* Scenario Preset Buttons */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-[#65758B] uppercase tracking-wider block">
              CALIBRATED SCENARIO PRESETS:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { label: 'Excellent', val: 90, color: 'hover:border-[#42D9F5]' },
                { label: 'Unstable', val: 54, color: 'hover:border-[#2DD4BF]' },
                { label: 'Weak Link', val: 32, color: 'hover:border-[#FBBF24]' },
                { label: 'Intermittent', val: 18, color: 'hover:border-[#FB7185]' },
                { label: 'Fully Offline', val: 0, color: 'hover:border-[#FB7185]' }
              ].map((preset) => {
                const isSelected = Math.abs(preset.val - nqs) <= 4;
                return (
                  <button
                    key={preset.val}
                    onClick={() => handleApplyPreset(preset.val)}
                    disabled={isBlackoutRunning}
                    className={`px-2.5 py-2 rounded-lg text-xs font-mono transition-all text-center border ${
                      isSelected
                        ? 'bg-[#162236] text-[#42D9F5] border-[#42D9F5] font-semibold shadow-sm'
                        : 'bg-[#111B2C] text-[#98A8BD] border-[#24334A] hover:text-[#F3F7FC]'
                    } ${preset.color} disabled:opacity-50`}
                  >
                    <div>{preset.label}</div>
                    <div className="text-[10px] text-[#65758B] mt-0.5">{preset.val} NQS</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5-Second Blackout Simulator Button */}
          <button
            onClick={handleTriggerBlackout}
            disabled={isBlackoutRunning}
            className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 text-xs font-semibold font-mono transition-all border ${
              isBlackoutRunning
                ? 'bg-[#FB7185]/20 text-[#FB7185] border-[#FB7185]/40 animate-pulse'
                : 'bg-[#162236] hover:bg-[#1C2A42] text-[#F3F7FC] border-[#24334A] hover:border-[#384F73] active:scale-[0.99]'
            }`}
          >
            <WifiOff size={16} className={isBlackoutRunning ? 'text-[#FB7185]' : 'text-[#42D9F5]'} />
            <span>
              {isBlackoutRunning
                ? 'Simulating 5s Blackout & Autonomous Recovery...'
                : 'Simulate 5s Network Blackout & Fallback'}
            </span>
          </button>

          {/* Autonomic Fallback Policy Bar */}
          <div className="p-3 rounded-lg bg-[#080D18] border border-[#24334A] text-xs">
            <span className="text-[10px] font-mono text-[#65758B] uppercase tracking-wider block mb-1.5">
              AUTONOMIC FALLBACK POLICY:
            </span>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#42D9F5]" />
                <span className="text-[#F3F7FC] font-semibold">≥ 70:</span>
                <span className="text-[#98A8BD]">Tier 1 Cloud</span>
              </span>
              <span className="text-[#384F73]">|</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2DD4BF]" />
                <span className="text-[#F3F7FC] font-semibold">30–69:</span>
                <span className="text-[#98A8BD]">Tier 2 Local SLM</span>
              </span>
              <span className="text-[#384F73]">|</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />
                <span className="text-[#F3F7FC] font-semibold">&lt; 30:</span>
                <span className="text-[#98A8BD]">Tier 3 Cache</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION C: Execution Topology Tier Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#F3F7FC] uppercase tracking-wide">
              Active Execution Topology
            </h3>
            <span className="text-xs font-mono text-[#65758B]">· Siamese Bi-Encoder Retrieval Grounding</span>
          </div>
          <span
            className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full border ${
              activeTier === 'tier-1-cloud'
                ? 'bg-[#42D9F5]/10 text-[#42D9F5] border-[#42D9F5]/30'
                : activeTier === 'tier-2-local'
                ? 'bg-[#2DD4BF]/10 text-[#2DD4BF] border-[#2DD4BF]/30'
                : 'bg-[#A78BFA]/10 text-[#A78BFA] border-[#A78BFA]/30'
            }`}
          >
            ● ROUTED: {activeTier === 'tier-1-cloud' ? 'CLOUD CLUSTER' : activeTier === 'tier-2-local' ? 'LOCAL EDGE SLM' : 'AIR-GAPPED CACHE'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tier 1 Card */}
          <div
            className={`p-5 rounded-xl border transition-all duration-300 relative ${
              activeTier === 'tier-1-cloud'
                ? 'bg-[#111B2C] border-[#42D9F5] shadow-[0_0_18px_rgba(66,217,245,0.25)]'
                : 'bg-[#0D1422] border-[#24334A] opacity-65'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Server size={17} className="text-[#42D9F5]" />
                <span className="font-semibold text-sm text-[#F3F7FC]">Tier 1: Cloud RAG</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                  activeTier === 'tier-1-cloud'
                    ? 'bg-[#42D9F5] text-[#080D18]'
                    : 'bg-[#162236] text-[#65758B]'
                }`}
              >
                {activeTier === 'tier-1-cloud' ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>
            <p className="text-xs text-[#98A8BD] leading-relaxed">
              Hosted distributed vector search, Cloud LLM (Claude-3.5 / GPT-4o), full 8.4k chunk medical knowledge graph.
            </p>
            <div className="mt-4 pt-3 border-t border-[#24334A] flex items-center justify-between text-xs font-mono text-[#98A8BD]">
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-[#42D9F5]" />
                <span>Latency: ~340ms</span>
              </span>
              <span className="text-[#42D9F5]">8.4k Embeddings</span>
            </div>
          </div>

          {/* Tier 2 Card */}
          <div
            className={`p-5 rounded-xl border transition-all duration-300 relative ${
              activeTier === 'tier-2-local'
                ? 'bg-[#111B2C] border-[#2DD4BF] shadow-[0_0_18px_rgba(45,212,191,0.25)]'
                : 'bg-[#0D1422] border-[#24334A] opacity-65'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Cpu size={17} className="text-[#2DD4BF]" />
                <span className="font-semibold text-sm text-[#F3F7FC]">Tier 2: Local Edge SLM</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                  activeTier === 'tier-2-local'
                    ? 'bg-[#2DD4BF] text-[#080D18]'
                    : 'bg-[#162236] text-[#65758B]'
                }`}
              >
                {activeTier === 'tier-2-local' ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>
            <p className="text-xs text-[#98A8BD] leading-relaxed">
              Quantized ONNX embeddings (bge-micro), on-device SLM inference (Phi-3 Mini / Gemma-2B), localized FAISS index.
            </p>
            <div className="mt-4 pt-3 border-t border-[#24334A] flex items-center justify-between text-xs font-mono text-[#98A8BD]">
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-[#2DD4BF]" />
                <span>Latency: ~180ms</span>
              </span>
              <span className="text-[#2DD4BF]">Offline Capable</span>
            </div>
          </div>

          {/* Tier 3 Card */}
          <div
            className={`p-5 rounded-xl border transition-all duration-300 relative ${
              activeTier === 'tier-3-cache'
                ? 'bg-[#111B2C] border-[#A78BFA] shadow-[0_0_18px_rgba(167,139,250,0.25)]'
                : 'bg-[#0D1422] border-[#24334A] opacity-65'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <HardDrive size={17} className="text-[#A78BFA]" />
                <span className="font-semibold text-sm text-[#F3F7FC]">Tier 3: Cached Knowledge</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                  activeTier === 'tier-3-cache'
                    ? 'bg-[#A78BFA] text-[#080D18]'
                    : 'bg-[#162236] text-[#65758B]'
                }`}
              >
                {activeTier === 'tier-3-cache' ? 'ACTIVE' : 'READY'}
              </span>
            </div>
            <p className="text-xs text-[#98A8BD] leading-relaxed">
              Zero network dependence. Pre-warmed SQLite LRU vector store and verified protocol safety lookups.
            </p>
            <div className="mt-4 pt-3 border-t border-[#24334A] flex items-center justify-between text-xs font-mono text-[#98A8BD]">
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-[#A78BFA]" />
                <span>Latency: ~12ms</span>
              </span>
              <span className="text-[#A78BFA]">Zero-Net Store</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION D: Knowledge Query Console */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Radio size={18} className="text-[#42D9F5]" />
            <h3 className="text-base font-bold text-[#F3F7FC]">Knowledge Query Console</h3>
          </div>
          <span className="text-xs font-mono text-[#2DD4BF] bg-[#2DD4BF]/10 px-2 py-0.5 rounded border border-[#2DD4BF]/20">
            RAG LIVE SIMULATION TESTBED
          </span>
        </div>

        {/* Suggested Critical Inquiries */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-[#98A8BD]">Suggested Clinical Inquiries:</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {availableQueries.slice(0, 3).map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectQuickQuestion(item)}
                className={`p-2.5 rounded-lg text-left text-xs transition-all border ${
                  currentQueryId === item.id
                    ? 'bg-[#162236] text-[#42D9F5] border-[#42D9F5]/40 font-medium'
                    : 'bg-[#111B2C] text-[#98A8BD] border-[#24334A] hover:text-[#F3F7FC] hover:bg-[#162236]'
                }`}
              >
                <div className="truncate">{item.query}</div>
                <div className="text-[10px] text-[#65758B] mt-1 font-mono">
                  {item.domain === 'rural' ? 'Rural Health Protocol' : 'Clinical Practice'} · Comp: {item.complexity}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Query Input Area */}
        <div className="space-y-3">
          <textarea
            rows={3}
            value={customQueryText}
            onChange={(e) => setCustomQueryText(e.target.value)}
            placeholder="Enter clinical question or medical protocol query..."
            className="w-full p-3.5 rounded-xl bg-[#080D18] border border-[#24334A] focus:border-[#42D9F5] focus:outline-none text-xs sm:text-sm text-[#F3F7FC] font-mono placeholder:text-[#65758B] resize-none"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-[#65758B] font-mono flex items-center gap-2">
              <span>Routing Target:</span>
              <strong className="text-[#42D9F5]">
                {activeTier === 'tier-1-cloud' ? 'Cloud Cluster' : activeTier === 'tier-2-local' ? 'Local Edge SLM' : 'Cached Protocol Store'}
              </strong>
            </div>

            <button
              onClick={handleExecuteQuery}
              disabled={isSynthesizing || !customQueryText.trim()}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#42D9F5] text-[#080D18] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#38BDF8] shadow-[0_0_15px_rgba(66,217,245,0.25)] transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isSynthesizing ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#080D18] border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Retrieval...</span>
                </>
              ) : (
                <>
                  <Zap size={15} />
                  <span>Submit Query (Simulated)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Query Response Display Box */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#080D18] border border-[#24334A] space-y-3 shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold ${
                currentResult.tier === 'tier-1-cloud'
                  ? 'bg-[#42D9F5]/10 text-[#42D9F5] border border-[#42D9F5]/30'
                  : currentResult.tier === 'tier-2-local'
                  ? 'bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/30'
                  : 'bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/30'
              }`}
            >
              Retrieved via {currentResult.tierName}
            </span>

            <div className="flex items-center gap-3 text-xs font-mono text-[#98A8BD]">
              <span>Round-Trip: <strong className="text-[#F3F7FC]">{currentResult.latencyMs} ms</strong></span>
              <span>Confidence: <strong className="text-[#34D399]">{(currentResult.confidenceScore * 100).toFixed(0)}%</strong></span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#F3F7FC] leading-relaxed font-sans">
            {currentResult.response}
          </p>

          <div className="pt-2 border-t border-[#24334A]/80 flex items-center gap-2 text-[11px] text-[#65758B] italic">
            <ShieldAlert size={13} className="text-[#65758B] shrink-0" />
            <span>Illustrative demonstration content for research review · Not medical advice</span>
          </div>
        </div>
      </div>

      {/* SECTION E: Retrieved Source Context */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={17} className="text-[#2DD4BF]" />
            <h3 className="text-sm font-bold text-[#F3F7FC] uppercase tracking-wide">
              Retrieved Source Context (Siamese Bi-Encoder Grounded)
            </h3>
          </div>
          <span className="text-xs font-mono text-[#98A8BD]">
            {currentResult.sources.length} Grounded Nodes
          </span>
        </div>

        <div className="space-y-3">
          {currentResult.sources.map((src) => {
            const isExpanded = expandedSourceId === src.id;
            return (
              <div
                key={src.id}
                className="p-4 rounded-xl bg-[#111B2C] border border-[#24334A] hover:border-[#384F73] transition-all cursor-pointer"
                onClick={() => setExpandedSourceId(isExpanded ? null : src.id)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="p-1 rounded bg-[#162236] text-[#42D9F5]">
                      <FileText size={14} />
                    </span>
                    <span className="font-semibold text-xs sm:text-sm text-[#F3F7FC] truncate">
                      {src.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 text-xs font-mono">
                    <span className="text-[#42D9F5] font-semibold">
                      Sim {(src.similarity).toFixed(3)}
                    </span>
                    {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </div>
                </div>

                <div className="text-[11px] font-mono text-[#98A8BD] mt-1">
                  {src.section} · Source: {src.sourcePdf}
                </div>

                <p className="text-xs text-[#98A8BD] mt-2 italic border-l-2 border-[#2DD4BF]/40 pl-2.5">
                  "{src.excerpt}"
                </p>

                {isExpanded && (
                  <div className="mt-3 p-3 rounded-lg bg-[#080D18] border border-[#24334A] text-xs font-mono text-[#98A8BD] space-y-1">
                    <div>Chunk Hash: <span className="text-[#F3F7FC]">{src.chunkHash}</span></div>
                    <div>Token Length: <span className="text-[#F3F7FC]">{src.tokenCount} tokens</span></div>
                    <div>Embedding Model: <span className="text-[#42D9F5]">{src.model}</span> (Biomedical fine-tuned)</div>
                    <div>FAISS Index Match: <span className="text-[#34D399]">HNSW32 Exact Cosine Match</span></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION F & G: Observability Event Timeline & Recovery Lifecycle Stepper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SECTION F: Retrieval Telemetry Timeline (6 cols) */}
        <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#42D9F5]" />
              <h3 className="font-semibold text-sm text-[#F3F7FC]">Retrieval Telemetry Timeline</h3>
            </div>
            <span className="text-[10px] font-mono text-[#65758B]">RING BUFFER (LAST 10)</span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {telemetryLogs.map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded-lg bg-[#111B2C] border border-[#24334A] flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[10px] text-[#65758B] shrink-0">{log.timestamp}</span>
                  <span className="text-[#98A8BD] shrink-0">{log.id}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] shrink-0 font-semibold ${
                      log.tier === 'tier-1-cloud'
                        ? 'bg-[#42D9F5]/10 text-[#42D9F5]'
                        : log.tier === 'tier-2-local'
                        ? 'bg-[#2DD4BF]/10 text-[#2DD4BF]'
                        : 'bg-[#A78BFA]/10 text-[#A78BFA]'
                    }`}
                  >
                    {log.tierLabel}
                  </span>
                  <span className="text-[#F3F7FC] truncate font-sans text-[11px] hidden sm:inline">
                    {log.query}
                  </span>
                </div>
                <div className="text-right shrink-0 text-[11px]">
                  <span className="text-[#42D9F5] font-semibold">{log.latencyMs}ms</span>
                  <span className="text-[#65758B]"> · {log.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION G: Architectural Recovery Lifecycle Stepper (6 cols) */}
        <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-[#0D1422] border border-[#24334A] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-[#F3F7FC]">Architectural Recovery Lifecycle</h3>
              <span className="text-[10px] font-mono text-[#34D399] uppercase bg-[#34D399]/10 px-2 py-0.5 rounded border border-[#34D399]/20 font-semibold">
                ZERO DISRUPTION
              </span>
            </div>
            <p className="text-xs text-[#98A8BD]">
              How ConnectRAG guarantees query continuity during degradation and seamless cloud resynchronization upon recovery.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
            <div className="p-3 rounded-lg bg-[#111B2C] border border-[#24334A] flex flex-col items-center gap-1.5">
              <WifiOff size={16} className="text-[#FB7185]" />
              <span className="text-[11px] font-semibold text-[#F3F7FC]">1. DROP DETECT</span>
              <span className="text-[10px] text-[#65758B]">&lt; 100ms EWMA</span>
            </div>

            <div className="p-3 rounded-lg bg-[#111B2C] border border-[#24334A] flex flex-col items-center gap-1.5">
              <Cpu size={16} className="text-[#2DD4BF]" />
              <span className="text-[11px] font-semibold text-[#F3F7FC]">2. LOCAL ROUTE</span>
              <span className="text-[10px] text-[#65758B]">Seamless Shift</span>
            </div>

            <div className="p-3 rounded-lg bg-[#111B2C] border border-[#24334A] flex flex-col items-center gap-1.5">
              <Activity size={16} className="text-[#FBBF24]" />
              <span className="text-[11px] font-semibold text-[#F3F7FC]">3. HEALTH PROBE</span>
              <span className="text-[10px] text-[#65758B]">Jitter Check</span>
            </div>

            <div className="p-3 rounded-lg bg-[#111B2C] border border-[#24334A] flex flex-col items-center gap-1.5">
              <Server size={16} className="text-[#42D9F5]" />
              <span className="text-[11px] font-semibold text-[#F3F7FC]">4. CLOUD SYNC</span>
              <span className="text-[10px] text-[#65758B]">Vector Catch-up</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#080D18] border border-[#24334A] text-xs text-[#98A8BD] flex items-center justify-between">
            <span>Hysteresis Rule: Requires 3 consecutive degraded probes before tier downgrade.</span>
            <span className="text-[#42D9F5] font-mono text-[11px]">Anti-Flap Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};
