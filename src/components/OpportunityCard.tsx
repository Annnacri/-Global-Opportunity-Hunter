import React from 'react';
import { 
  Building2, 
  Globe2, 
  Clock, 
  Euro, 
  ExternalLink, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  AlertCircle,
  FileCheck2,
  Lock
} from 'lucide-react';
import { Opportunity } from '../types/opportunity';
import { ScoreBadge } from './ScoreBadge';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onSelect: (opportunity: Opportunity) => void;
  onStageAction: (opportunity: Opportunity) => void;
  isPriority?: boolean;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onSelect,
  onStageAction,
  isPriority = false,
}) => {
  const isTopScore = opportunity.score.total >= 90;

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
        isPriority
          ? 'border-emerald-500/50 bg-gradient-to-b from-slate-900 to-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30'
          : 'border-slate-800 bg-slate-950/70 hover:border-slate-700 hover:bg-slate-900/60 shadow-lg'
      }`}
    >
      {/* Top Banner & Priority Badge */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider bg-slate-800/80 text-slate-300 border border-slate-700/60">
              {opportunity.category}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono text-cyan-300 bg-cyan-950/50 border border-cyan-800/40">
              <Globe2 className="w-3 h-3 text-cyan-400" />
              <span>{opportunity.country}</span>
            </span>
            {opportunity.evidence.verificationStatus === 'VERIFIED_REAL_ENTITY' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/30">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Entity</span>
              </span>
            )}
          </div>

          <ScoreBadge score={opportunity.score.total} breakdown={opportunity.score.breakdown} size="sm" />
        </div>

        {/* Opportunity Name & Organization */}
        <h3 
          onClick={() => onSelect(opportunity)}
          className="text-base font-bold text-white group-hover:text-emerald-300 transition cursor-pointer line-clamp-2"
        >
          {opportunity.name}
        </h3>

        <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
          <Building2 className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-medium text-slate-300">{opportunity.organization.name}</span>
          <span className="text-slate-600">•</span>
          <span className="text-[11px] font-mono text-slate-400">{opportunity.organization.type}</span>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
          {opportunity.description}
        </p>
      </div>

      {/* Commercial Metrics Grid */}
      <div className="px-5 py-3 border-y border-slate-800/80 bg-slate-900/40 grid grid-cols-2 gap-3 text-xs font-mono">
        <div>
          <span className="text-[10px] uppercase text-slate-500 block mb-0.5">Commercial Yield</span>
          <span className="font-semibold text-emerald-300 line-clamp-1">
            {opportunity.commercialPotential.estimatedValue}
          </span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-slate-500 block mb-0.5">Time to Revenue</span>
          <span className="font-semibold text-cyan-300 flex items-center gap-1 line-clamp-1">
            <Clock className="w-3 h-3 text-cyan-400 shrink-0" />
            <span>{opportunity.timeToFirstRevenue.estimate}</span>
          </span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-slate-500 block mb-0.5">Initial Investment</span>
          <span className="font-semibold text-slate-200 line-clamp-1">
            {opportunity.initialInvestment.amount}
          </span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-slate-500 block mb-0.5">Revenue Model</span>
          <span className="font-semibold text-slate-300 line-clamp-1">
            {opportunity.commercialPotential.revenueModel}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-slate-950 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[11px] text-slate-400 truncate max-w-[55%]">
          <span className="font-mono text-slate-500 shrink-0">Next:</span>
          <span className="truncate text-slate-300 font-medium">
            {opportunity.recommendedNextAction.actionType}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onStageAction(opportunity)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-amber-500/40 bg-amber-950/20 hover:bg-amber-950/40 text-amber-200 text-xs font-mono transition"
            title="Stage outreach draft for Human Approval"
          >
            <Lock className="w-3 h-3 text-amber-400" />
            <span>Stage Pitch</span>
          </button>

          <button
            onClick={() => onSelect(opportunity)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-semibold transition"
          >
            <span>Dossier</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
