import React, { useState, useMemo } from 'react';
import { 
  X, 
  Layers, 
  Building2, 
  Globe2, 
  UserCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Filter, 
  Search, 
  ChevronRight, 
  Trophy, 
  Send, 
  FileText,
  Sparkles,
  MoveRight
} from 'lucide-react';
import { Prospect, PipelineStage, ProspectMarket, ProspectIndustry } from '../types/prospect';

interface SalesPipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  prospects: Prospect[];
  onUpdateProspectStage: (prospectId: string, newStage: PipelineStage) => void;
  onSelectProspect: (prospect: Prospect) => void;
}

const STAGES: Array<{
  stage: PipelineStage;
  title: string;
  badgeColor: string;
  borderColor: string;
  headerBg: string;
  glowEffect: string;
  description: string;
}> = [
  {
    stage: 'Research',
    title: '1. Research & Qualification',
    badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
    borderColor: 'border-cyan-500/30',
    headerBg: 'bg-cyan-950/40',
    glowEffect: 'shadow-[0_0_15px_rgba(6,182,212,0.1)]',
    description: 'Real entity identified, business needs analyzed, decision-maker verified.',
  },
  {
    stage: 'Contacted',
    title: '2. Contacted & Cadence Active',
    badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
    borderColor: 'border-amber-500/30',
    headerBg: 'bg-amber-950/40',
    glowEffect: 'shadow-[0_0_15px_rgba(245,158,11,0.1)]',
    description: 'Personalized email authorized & dispatched; follow-up sequence underway.',
  },
  {
    stage: 'In Discussion',
    title: '3. In Discussion / Demo',
    badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
    borderColor: 'border-indigo-500/30',
    headerBg: 'bg-indigo-950/40',
    glowEffect: 'shadow-[0_0_15px_rgba(99,102,241,0.1)]',
    description: 'Interactive prototype reviewed, pilot scope or pricing proposal evaluating.',
  },
  {
    stage: 'Closed/Won',
    title: '4. Closed / Won (Active Retainer)',
    badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    borderColor: 'border-emerald-500/30',
    headerBg: 'bg-emerald-950/40',
    glowEffect: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    description: 'Commercial contract signed; monthly recurring revenue or voucher secured.',
  },
];

export const SalesPipelineModal: React.FC<SalesPipelineModalProps> = ({
  isOpen,
  onClose,
  prospects,
  onUpdateProspectStage,
  onSelectProspect,
}) => {
  const [filterMarket, setFilterMarket] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [draggingProspectId, setDraggingProspectId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filtered prospects for the pipeline
  const filteredProspects = useMemo(() => {
    return prospects.filter((p) => {
      const matchesMarket = filterMarket === 'ALL' || p.market === filterMarket;
      const matchesQuery = 
        p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.decisionMaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.matchingSolution.productName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesMarket && matchesQuery;
    });
  }, [prospects, filterMarket, searchQuery]);

  // Stage counts
  const stageStats = useMemo(() => {
    return {
      Research: prospects.filter((p) => p.pipelineStage === 'Research').length,
      Contacted: prospects.filter((p) => p.pipelineStage === 'Contacted').length,
      'In Discussion': prospects.filter((p) => p.pipelineStage === 'In Discussion').length,
      'Closed/Won': prospects.filter((p) => p.pipelineStage === 'Closed/Won').length,
    };
  }, [prospects]);

  // Next and previous stage helpers
  const getNextStage = (curr: PipelineStage): PipelineStage | null => {
    if (curr === 'Research') return 'Contacted';
    if (curr === 'Contacted') return 'In Discussion';
    if (curr === 'In Discussion') return 'Closed/Won';
    return null;
  };

  const getPrevStage = (curr: PipelineStage): PipelineStage | null => {
    if (curr === 'Closed/Won') return 'In Discussion';
    if (curr === 'In Discussion') return 'Contacted';
    if (curr === 'Contacted') return 'Research';
    return null;
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggingProspectId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: PipelineStage) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || draggingProspectId;
    if (id) {
      onUpdateProspectStage(id, targetStage);
    }
    setDraggingProspectId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-[96vw] xl:max-w-7xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-4 max-h-[96vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  B2B COMMERCIAL SALES PIPELINE
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-400">STAGE PROGRESSION BOARD</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Visual Client Pipeline: Research → Contacted → Discussion → Closed/Won
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Filter */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <select
                value={filterMarket}
                onChange={(e) => setFilterMarket(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="ALL">All Priority Markets</option>
                <option value="Portugal">Portugal</option>
                <option value="Dubai, UAE">Dubai, UAE</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Qatar">Qatar</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
              </select>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter company..."
                  className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-500 w-36 sm:w-44"
                />
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top KPI Ribbon */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-950/70 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono shrink-0">
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/50 border border-slate-800/80">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">1. Research</span>
              <span className="font-bold text-cyan-300 text-sm">{stageStats.Research} Prospects</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/50 border border-slate-800/80">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">2. Contacted</span>
              <span className="font-bold text-amber-300 text-sm">{stageStats.Contacted} Active Cadences</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/50 border border-slate-800/80">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">3. In Discussion</span>
              <span className="font-bold text-indigo-300 text-sm">{stageStats['In Discussion']} Demos / Terms</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/50 border border-slate-800/80">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">4. Closed / Won</span>
              <span className="font-bold text-emerald-300 text-sm">{stageStats['Closed/Won']} Retainers Active</span>
            </div>
          </div>
        </div>

        {/* Drag & Drop Instructions */}
        <div className="px-6 py-2 bg-slate-950/40 border-b border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>* Drag cards or use the stage selector buttons on each prospect to advance deals through the funnel.</span>
          <span className="text-amber-400">Total Pipeline Value: ~€240k - $310k ARR</span>
        </div>

        {/* Kanban Board Area */}
        <div className="p-4 sm:p-6 overflow-x-auto overflow-y-auto flex-1 bg-slate-950/90">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 min-w-[900px] h-full items-start">
            
            {STAGES.map((col) => {
              const columnProspects = filteredProspects.filter(
                (p) => p.pipelineStage === col.stage
              );

              return (
                <div
                  key={col.stage}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, col.stage)}
                  className={`rounded-2xl border ${col.borderColor} bg-slate-900/40 flex flex-col max-h-[76vh] overflow-hidden ${col.glowEffect}`}
                >
                  {/* Column Header */}
                  <div className={`p-4 border-b border-slate-800 ${col.headerBg} flex items-center justify-between shrink-0`}>
                    <div>
                      <h3 className="font-mono font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                        <span>{col.title}</span>
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{col.description}</p>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold border ${col.badgeColor}`}>
                      {columnProspects.length}
                    </span>
                  </div>

                  {/* Column Cards Dropzone */}
                  <div className="p-3 overflow-y-auto space-y-3 flex-1 min-h-[300px]">
                    {columnProspects.length === 0 ? (
                      <div className="h-40 border border-dashed border-slate-800/80 rounded-xl flex flex-col items-center justify-center text-center p-4 text-xs font-mono text-slate-500">
                        <span>Drop prospects here</span>
                        <span className="text-[10px] text-slate-600 mt-1">or use stage move buttons</span>
                      </div>
                    ) : (
                      columnProspects.map((prospect) => {
                        const nextStage = getNextStage(prospect.pipelineStage);
                        const prevStage = getPrevStage(prospect.pipelineStage);

                        return (
                          <div
                            key={prospect.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, prospect.id)}
                            className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 hover:border-slate-700 transition shadow-md cursor-grab active:cursor-grabbing space-y-2.5 group"
                          >
                            {/* Card Top: Market & Fit */}
                            <div className="flex items-center justify-between text-[10px] font-mono">
                              <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1">
                                <Globe2 className="w-2.5 h-2.5 text-cyan-400" />
                                <span>{prospect.market}</span>
                              </span>
                              <span className="text-emerald-400 font-bold">
                                {prospect.fitScore}% Fit
                              </span>
                            </div>

                            {/* Company Name */}
                            <div>
                              <h4 
                                onClick={() => onSelectProspect(prospect)}
                                className="text-xs font-bold text-white group-hover:text-amber-300 transition cursor-pointer"
                              >
                                {prospect.companyName}
                              </h4>
                              <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                <UserCheck className="w-3 h-3 text-slate-500 shrink-0" />
                                <span className="truncate">{prospect.decisionMaker.name} ({prospect.decisionMaker.role})</span>
                              </div>
                            </div>

                            {/* Value & Solution */}
                            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 text-[11px] font-mono space-y-0.5">
                              <div className="text-slate-300 font-medium line-clamp-1">
                                {prospect.matchingSolution.productName}
                              </div>
                              <div className="text-emerald-400 font-semibold">
                                {prospect.matchingSolution.estimatedContractValue}
                              </div>
                            </div>

                            {/* Stage Shift Controls */}
                            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1 text-[10px] font-mono">
                              {/* Move backward */}
                              {prevStage ? (
                                <button
                                  onClick={() => onUpdateProspectStage(prospect.id, prevStage)}
                                  className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition flex items-center gap-0.5"
                                  title={`Move to ${prevStage}`}
                                >
                                  <ArrowLeft className="w-2.5 h-2.5" />
                                  <span className="hidden sm:inline">{prevStage.split(' ')[0]}</span>
                                </button>
                              ) : (
                                <span />
                              )}

                              {/* Stage Selector Dropdown */}
                              <select
                                value={prospect.pipelineStage}
                                onChange={(e) => onUpdateProspectStage(prospect.id, e.target.value as PipelineStage)}
                                className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 text-[10px] focus:outline-none focus:border-amber-500 font-mono"
                              >
                                <option value="Research">Research</option>
                                <option value="Contacted">Contacted</option>
                                <option value="In Discussion">In Discussion</option>
                                <option value="Closed/Won">Closed/Won</option>
                              </select>

                              {/* Move forward */}
                              {nextStage ? (
                                <button
                                  onClick={() => onUpdateProspectStage(prospect.id, nextStage)}
                                  className="px-2 py-1 rounded bg-amber-950/60 hover:bg-amber-900/80 border border-amber-800/50 text-amber-200 transition flex items-center gap-0.5"
                                  title={`Advance to ${nextStage}`}
                                >
                                  <span className="hidden sm:inline">{nextStage.split(' ')[0]}</span>
                                  <ArrowRight className="w-2.5 h-2.5" />
                                </button>
                              ) : (
                                <span className="text-emerald-400 flex items-center gap-0.5">
                                  <Trophy className="w-3 h-3" />
                                  <span>Won</span>
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </div>
  );
};
