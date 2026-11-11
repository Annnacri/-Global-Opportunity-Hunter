import React from 'react';
import { 
  Building2, 
  Globe2, 
  Mail, 
  Phone, 
  UserCheck, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Send,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Prospect, PipelineStage } from '../types/prospect';

interface ProspectCardProps {
  prospect: Prospect;
  onSelect: (prospect: Prospect) => void;
  onReviewEmail: (prospect: Prospect) => void;
  onAuthorizeAndSend: (prospect: Prospect) => void;
  onUpdateStage?: (prospectId: string, newStage: PipelineStage) => void;
}

export const ProspectCard: React.FC<ProspectCardProps> = ({
  prospect,
  onSelect,
  onReviewEmail,
  onAuthorizeAndSend,
  onUpdateStage,
}) => {
  const getMarketColor = (market: string) => {
    if (market.includes('Dubai') || market.includes('UAE') || market.includes('Emirates')) {
      return 'border-amber-500/40 bg-amber-950/40 text-amber-300';
    }
    if (market.includes('Saudi') || market.includes('Qatar')) {
      return 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300';
    }
    if (market.includes('Portugal')) {
      return 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300';
    }
    if (market.includes('United Kingdom') || market.includes('United States')) {
      return 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300';
    }
    return 'border-slate-700 bg-slate-900 text-slate-300';
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/80 hover:border-slate-700 transition flex flex-col justify-between overflow-hidden shadow-lg group">
      
      {/* Top Banner */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border ${getMarketColor(prospect.market)}`}>
              <Globe2 className="w-3 h-3 inline mr-1" />
              {prospect.market}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60">
              {prospect.industry}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs">
            {onUpdateStage ? (
              <select
                value={prospect.pipelineStage}
                onChange={(e) => onUpdateStage(prospect.id, e.target.value as PipelineStage)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border focus:outline-none cursor-pointer ${
                  prospect.pipelineStage === 'Closed/Won' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                  prospect.pipelineStage === 'In Discussion' ? 'bg-indigo-950 text-indigo-300 border-indigo-800' :
                  prospect.pipelineStage === 'Contacted' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                  'bg-cyan-950 text-cyan-300 border-cyan-800'
                }`}
              >
                <option value="Research">Stage: Research</option>
                <option value="Contacted">Stage: Contacted</option>
                <option value="In Discussion">Stage: In Discussion</option>
                <option value="Closed/Won">Stage: Closed/Won</option>
              </select>
            ) : (
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                prospect.pipelineStage === 'Closed/Won' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                prospect.pipelineStage === 'In Discussion' ? 'bg-indigo-950 text-indigo-300 border-indigo-800' :
                prospect.pipelineStage === 'Contacted' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                'bg-cyan-950 text-cyan-300 border-cyan-800'
              }`}>
                {prospect.pipelineStage}
              </span>
            )}
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 font-bold">
              {prospect.fitScore}%
            </span>
          </div>
        </div>

        {/* Company Title */}
        <h3
          onClick={() => onSelect(prospect)}
          className="text-base font-bold text-white group-hover:text-emerald-300 transition cursor-pointer line-clamp-1"
        >
          {prospect.companyName}
        </h3>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
          {prospect.businessSummary}
        </p>

        {/* Decision Maker Box */}
        <div className="mt-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
              DM
            </div>
            <div>
              <div className="font-semibold text-slate-200">{prospect.decisionMaker.name}</div>
              <div className="text-[11px] text-slate-400 line-clamp-1">{prospect.decisionMaker.role}</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/30">
            {prospect.decisionMaker.confidenceScore}
          </span>
        </div>
      </div>

      {/* Solution & Public Contact */}
      <div className="px-5 py-3 border-y border-slate-800/80 bg-slate-900/30 space-y-2 text-xs font-mono">
        <div>
          <span className="text-[10px] uppercase text-slate-500 block mb-0.5">Matched AI Solution:</span>
          <span className="font-semibold text-cyan-300 line-clamp-1">
            {prospect.matchingSolution.productName}
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/50">
          <span className="truncate flex items-center gap-1">
            <Mail className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="truncate">{prospect.publicContact.corporateEmail || 'Public Contact Form'}</span>
          </span>
          <span className="text-emerald-400 font-semibold shrink-0 ml-2">
            {prospect.matchingSolution.estimatedContractValue}
          </span>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="p-4 bg-slate-950 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <Lock className="w-3 h-3 text-amber-400" />
          <span className="font-mono text-amber-300/90 font-medium">
            {prospect.status === 'OUTREACH_STAGED' ? 'Draft Staged' : prospect.status}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onReviewEmail(prospect)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/40 text-amber-200 text-xs font-mono transition"
          >
            <Mail className="w-3 h-3 text-amber-400" />
            <span>Review Pitch</span>
          </button>

          <button
            onClick={() => onSelect(prospect)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-semibold transition"
          >
            <span>7-Pt Dossier</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
