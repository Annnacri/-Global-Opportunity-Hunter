import React from 'react';
import { 
  Radar, 
  Crosshair, 
  FileText, 
  ShieldCheck, 
  Search, 
  Sparkles,
  TrendingUp,
  Globe2,
  Clock,
  Euro,
  AlertTriangle,
  Layers
} from 'lucide-react';
import { Opportunity, ActionApprovalItem } from '../types/opportunity';
import { Prospect } from '../types/prospect';

interface HeaderProps {
  opportunities: Opportunity[];
  prospects: Prospect[];
  pendingApprovals: ActionApprovalItem[];
  onOpenHuntModal: () => void;
  onOpenEvaluateModal: () => void;
  onOpenCeoReport: () => void;
  onOpenApprovalQueue: () => void;
  onOpenProspectScout: () => void;
  onOpenCampaigns: () => void;
  onOpenPipeline: () => void;
  activeView: 'matrix' | 'priorities' | 'trends' | 'prospecting';
  setActiveView: (view: 'matrix' | 'priorities' | 'trends' | 'prospecting') => void;
}

export const Header: React.FC<HeaderProps> = ({
  opportunities,
  prospects,
  pendingApprovals,
  onOpenHuntModal,
  onOpenEvaluateModal,
  onOpenCeoReport,
  onOpenApprovalQueue,
  onOpenProspectScout,
  onOpenCampaigns,
  onOpenPipeline,
  activeView,
  setActiveView,
}) => {
  const topCount = opportunities.filter(o => o.score.total >= 85).length;
  const avgScore = opportunities.length > 0
    ? Math.round(opportunities.reduce((acc, curr) => acc + curr.score.total, 0) / opportunities.length)
    : 0;

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-30">
      {/* Top Intelligence Mission Bar */}
      <div className="border-b border-slate-800/80 px-4 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-mono font-bold tracking-widest text-emerald-400">AGENT 03</span>
            <span className="text-slate-500">|</span>
            <span className="font-semibold text-slate-200 uppercase tracking-wider">GLOBAL OPPORTUNITY HUNTER</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 text-slate-300 font-mono text-[11px]">
            <span className="text-slate-400">SUPERVISOR:</span>
            <span className="text-emerald-300 font-semibold">CEO AGENT</span>
          </span>
          <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 font-mono text-[11px]">
            <Globe2 className="w-3 h-3 text-cyan-400" />
            <span>PORTUGAL & GLOBAL REACH</span>
          </span>
        </div>

        {/* Live Metrics Ticker */}
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Scanned:</span>
            <span className="font-bold text-white">{opportunities.length} Leads</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Grade S/A:</span>
            <span className="font-bold text-cyan-300">{topCount} High-Yield</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-400">Avg Viability:</span>
            <span className="font-bold text-emerald-400">{avgScore}/100</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/30 text-emerald-300">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>EXTERNAL ACTION GUARD: ARMED</span>
          </div>
        </div>
      </div>

      {/* Main Action Header */}
      <div className="px-4 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/10 border border-emerald-400/30">
            <Radar className="w-5 h-5 text-slate-950 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">Market Intelligence Terminal</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                Grounding v3.8
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Autonomous discovery & 12-point rubric evaluation across Portugal, EU, UK, US & Canada
            </p>
          </div>
        </div>

        {/* View Switcher & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex rounded-lg bg-slate-900 border border-slate-800 p-1">
            <button
              onClick={() => setActiveView('matrix')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeView === 'matrix'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Intelligence Matrix
            </button>
            <button
              onClick={() => setActiveView('priorities')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeView === 'priorities'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Top 3 Immediate Priorities
            </button>
            <button
              onClick={() => setActiveView('trends')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeView === 'trends'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Macro Trends Radar
            </button>
            <button
              onClick={() => setActiveView('prospecting')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeView === 'prospecting'
                  ? 'bg-amber-600 text-slate-950 font-bold shadow-sm'
                  : 'text-amber-400 hover:text-amber-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>B2B Active Prospecting ({prospects.length})</span>
            </button>
          </div>

          <div className="h-6 w-px bg-slate-800 hidden md:block" />

          {/* Scout B2B Leads */}
          <button
            onClick={onOpenProspectScout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/40 text-amber-200 text-xs font-medium transition"
            title="Active B2B Prospecting Scout across GCC, Portugal, UK, US"
          >
            <Crosshair className="w-3.5 h-3.5 text-amber-400" />
            <span>Scout B2B Leads</span>
          </button>

          {/* Sales Pipeline */}
          <button
            onClick={onOpenPipeline}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/50 bg-amber-950/40 hover:bg-amber-900/60 text-amber-200 text-xs font-medium transition"
            title="Open Interactive B2B Sales Pipeline Board"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Sales Pipeline</span>
          </button>

          {/* Campaigns */}
          <button
            onClick={onOpenCampaigns}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-900/40 text-cyan-200 text-xs font-medium transition"
          >
            <span>Campaigns</span>
          </button>

          {/* Autonomous Hunt Button */}
          <button
            onClick={onOpenHuntModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-md shadow-emerald-950 transition active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            <span>Hunt Opps</span>
          </button>

          {/* CEO Briefing Generator */}
          <button
            onClick={onOpenCeoReport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-500/40 bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-200 text-xs font-medium transition"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>CEO Report</span>
          </button>

          {/* Action Approval Gatekeeper */}
          <button
            onClick={onOpenApprovalQueue}
            className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/40 text-amber-200 text-xs font-medium transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Approval Outbox</span>
            {pendingApprovals.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center font-mono">
                {pendingApprovals.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
