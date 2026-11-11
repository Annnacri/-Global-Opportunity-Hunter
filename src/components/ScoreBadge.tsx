import React from 'react';
import { OpportunityScoreBreakdown } from '../types/opportunity';

interface ScoreBadgeProps {
  score: number;
  breakdown?: OpportunityScoreBreakdown;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({
  score,
  breakdown,
  size = 'md',
  showDetails = false,
}) => {
  let colorClasses = 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300';
  let tierLabel = 'GRADE A';
  let glowClasses = 'shadow-[0_0_15px_rgba(16,185,129,0.2)]';

  if (score >= 90) {
    colorClasses = 'border-cyan-400/40 bg-cyan-950/50 text-cyan-200';
    tierLabel = 'GRADE S • TOP PICK';
    glowClasses = 'shadow-[0_0_20px_rgba(6,182,212,0.3)]';
  } else if (score >= 80) {
    colorClasses = 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300';
    tierLabel = 'GRADE A • HIGH POTENTIAL';
    glowClasses = 'shadow-[0_0_15px_rgba(16,185,129,0.2)]';
  } else if (score >= 70) {
    colorClasses = 'border-amber-500/30 bg-amber-950/40 text-amber-300';
    tierLabel = 'GRADE B • VIABLE';
    glowClasses = 'shadow-[0_0_12px_rgba(245,158,11,0.2)]';
  } else {
    colorClasses = 'border-rose-500/30 bg-rose-950/40 text-rose-300';
    tierLabel = 'GRADE C • HIGH RISK';
    glowClasses = 'shadow-[0_0_10px_rgba(244,63,94,0.15)]';
  }

  if (size === 'sm') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono font-semibold ${colorClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
        <span>{score}/100</span>
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div className={`flex flex-col items-center justify-center p-4 rounded-xl border ${colorClasses} ${glowClasses}`}>
        <div className="text-xs uppercase font-mono tracking-wider opacity-80 mb-1">{tierLabel}</div>
        <div className="text-4xl font-extrabold font-mono tracking-tight flex items-baseline gap-1">
          <span>{score}</span>
          <span className="text-sm font-normal opacity-60">/100</span>
        </div>
        {breakdown && (
          <div className="w-full mt-3 pt-3 border-t border-slate-700/50 grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-300">
            <div className="text-center">
              <span className="opacity-60 block">Rev (25)</span>
              <span className="font-bold text-slate-100">{breakdown.revenuePotential}</span>
            </div>
            <div className="text-center">
              <span className="opacity-60 block">Time (20)</span>
              <span className="font-bold text-slate-100">{breakdown.timeToFirstRevenue}</span>
            </div>
            <div className="text-center">
              <span className="opacity-60 block">Demand (20)</span>
              <span className="font-bold text-slate-100">{breakdown.marketDemand}</span>
            </div>
            <div className="text-center">
              <span className="opacity-60 block">Feas (15)</span>
              <span className="font-bold text-slate-100">{breakdown.implementationFeasibility}</span>
            </div>
            <div className="text-center">
              <span className="opacity-60 block">Diff (10)</span>
              <span className="font-bold text-slate-100">{breakdown.competitionAndDifferentiation}</span>
            </div>
            <div className="text-center">
              <span className="opacity-60 block">Inv (10)</span>
              <span className="font-bold text-slate-100">{breakdown.initialInvestmentRequired}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-mono font-semibold ${colorClasses} ${glowClasses}`}>
      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
      <span className="text-base font-bold">{score}</span>
      <span className="text-xs opacity-70">/100</span>
      <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/30 border border-white/10 ml-1">
        {score >= 90 ? 'Grade S' : score >= 80 ? 'Grade A' : score >= 70 ? 'Grade B' : 'Grade C'}
      </span>
    </div>
  );
};
