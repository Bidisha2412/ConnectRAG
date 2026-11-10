import React from 'react';

interface LogoProps {
  variant?: 'horizontal' | 'symbol-only' | 'monochrome' | 'compact';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ConnectRAGLogo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  className = '',
  size = 'md'
}) => {
  const sizeMap = {
    sm: { symbol: 24, font: 'text-sm', sub: 'text-[9px]' },
    md: { symbol: 32, font: 'text-base', sub: 'text-[10px]' },
    lg: { symbol: 44, font: 'text-xl', sub: 'text-xs' }
  };

  const { symbol, font, sub } = sizeMap[size];

  // Distinctive geometric SVG symbol representing the 3 tiers (Cloud, Local, Cache)
  // connected through a central retrieval pathway forming an abstract C and forward trajectory
  const SymbolSVG = (
    <svg
      width={symbol}
      height={symbol}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-label="ConnectRAG Geometric Symbol"
    >
      <defs>
        <linearGradient id="cragGradient" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#42D9F5" />
          <stop offset="100%" stopColor="#2DD4BF" />
        </linearGradient>
        <filter id="cragGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Hexagonal / Diamond Circuit Framework */}
      <polygon
        points="20,4 35,12 35,28 20,36 5,28 5,12"
        fill="#0D1422"
        stroke="#24334A"
        strokeWidth="1.5"
      />

      {/* Outer Connection Pathways between Tiers */}
      <path
        d="M20 7 L32 14 L32 26 L20 33 L8 26 L8 14 Z"
        stroke="#162236"
        strokeWidth="1.2"
        strokeDasharray="2 2"
      />

      {/* Dynamic Knowledge Routing Pathway: C-curve sweeping through Cloud (top-right) -> Local (left) -> Cache (bottom) */}
      <path
        d="M24 10 Q32 10 32 18 Q32 26 20 28 L12 28 Q8 28 8 20 Q8 12 18 12 L28 12"
        stroke="url(#cragGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tier 1 Node (Cloud - Upper Right) */}
      <circle cx="30" cy="14" r="3.5" fill="#42D9F5" />
      <circle cx="30" cy="14" r="1.5" fill="#080D18" />

      {/* Tier 2 Node (Local Edge - Left Flank) */}
      <circle cx="10" cy="20" r="3.5" fill="#2DD4BF" />
      <circle cx="10" cy="20" r="1.5" fill="#080D18" />

      {/* Tier 3 Node (Cached Knowledge - Bottom Anchor) */}
      <circle cx="20" cy="30" r="3.5" fill="#A78BFA" />
      <circle cx="20" cy="30" r="1.5" fill="#080D18" />

      {/* Central Retrieval Core Focal Point (Document Index / Seed) */}
      <rect
        x="17.5"
        y="17.5"
        width="5"
        height="5"
        rx="1"
        fill="#F3F7FC"
        transform="rotate(45 20 20)"
      />
    </svg>
  );

  if (variant === 'symbol-only' || variant === 'compact') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {SymbolSVG}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {SymbolSVG}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-semibold tracking-tight text-[#F3F7FC] ${font}`}>
            Connect<span className="text-[#42D9F5]">RAG</span>
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[#42D9F5]/10 text-[#42D9F5] font-mono text-[9px] uppercase tracking-wider font-semibold border border-[#42D9F5]/20">
            Preview
          </span>
        </div>
        <span className={`text-[#98A8BD] font-normal tracking-normal truncate ${sub}`}>
          Adaptive AI Infrastructure
        </span>
      </div>
    </div>
  );
};
