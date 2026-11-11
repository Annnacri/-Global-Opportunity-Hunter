import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Globe2, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  FileText,
  Lock,
  Zap,
  Layers,
  ChevronRight,
  ExternalLink,
  Info,
  Calendar
} from 'lucide-react';
import { Opportunity, ActionApprovalItem, ResearchArea, GeographicReach } from './types/opportunity';
import { Prospect, CampaignCadence, ProspectMarket, ProspectIndustry, PipelineStage } from './types/prospect';
import { SEED_OPPORTUNITIES } from './data/seedOpportunities';
import { SEED_PROSPECTS, SEED_CAMPAIGNS } from './data/seedProspects';
import { Header } from './components/Header';
import { OpportunityCard } from './components/OpportunityCard';
import { OpportunityDossierModal } from './components/OpportunityDossierModal';
import { HunterConsoleModal } from './components/HunterConsoleModal';
import { CeoBriefingModal } from './components/CeoBriefingModal';
import { ApprovalQueueModal } from './components/ApprovalQueueModal';
import { EvaluateCustomModal } from './components/EvaluateCustomModal';
import { StagePitchModal } from './components/StagePitchModal';
import { ProspectCard } from './components/ProspectCard';
import { ProspectDossierModal } from './components/ProspectDossierModal';
import { ProspectHunterModal } from './components/ProspectHunterModal';
import { CampaignCadenceModal } from './components/CampaignCadenceModal';
import { SalesPipelineModal } from './components/SalesPipelineModal';

export default function App() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(SEED_OPPORTUNITIES);
  const [prospects, setProspects] = useState<Prospect[]>(SEED_PROSPECTS);
  const [campaigns, setCampaigns] = useState<CampaignCadence[]>(SEED_CAMPAIGNS);
  
  // Pre-seed staged drafts to demonstrate human governance gatekeeper immediately
  const [approvalQueue, setApprovalQueue] = useState<ActionApprovalItem[]>([
    {
      id: 'approval-seed-1',
      opportunityId: 'opp-prr-pme-ai',
      opportunityName: 'PRR Vouchers: Transição Digital & Automação com IA para PMEs',
      targetCompany: 'PMEs Elegíveis Aceleradoras de Comércio Digital',
      actionType: 'Direct Commercial Pitch',
      subject: 'Auditoria Rápida: Ativação do Voucher PRR com Agente de Atendimento IA',
      draftContent: `Estimado(a) Diretor(a),\n\nIdentificámos que a vossa empresa está elegível para as medidas de modernização digital apoiadas pelo PRR / Portugal 2030. Desenvolvemos soluções turnkey de Agentes de IA que automatizam o suporte ao cliente e triagem de pedidos comerciais sem exigir investimento de capital próprio.\n\nGostaria de agendar uma breve chamada de 10 minutos esta semana para demonstrar como desbloquear 100% da verba com uma solução operacional em 14 dias?\n\nCom os melhores cumprimentos,\n[Assinatura Executiva]`,
      riskAssessment: 'Baixo risco comercial. A elegibilidade do beneficiário deve ser conferida previamente na lista do IAPMEI. Requer assinatura humana antes do envio.',
      status: 'AWAITING_HUMAN_APPROVAL',
      restrictedActionNotice: 'RESTRIÇÃO: Retido no centro de aprovações. Nenhuma mensagem externa enviada.',
      createdAt: '2026-11-05T12:00:00Z',
    },
    {
      id: 'approval-seed-2',
      opportunityId: 'opp-turismo-fit-ai',
      opportunityName: 'FIT 2.0 & Hub Turismo de Portugal: Agentes Multilíngues de Concierge',
      targetCompany: 'Grupos Hoteleiros Boutique (Algarve / Lisboa / Porto)',
      actionType: 'Direct Commercial Pitch',
      subject: 'Demonstração: Agente Concierge IA 24/7 para reservas diretas no seu Hotel',
      draftContent: `Exmo(a) Diretor(a) Geral,\n\nCriámos um protótipo específico para hotéis boutique que atende hóspedes em 12 idiomas no WhatsApp, consulta tarifas em tempo real e fecha reservas diretas sem pagar os habituais 18% de comissão da Booking.com.\n\nPreparámos um link de teste de 60 segundos com o vosso inventário de quartos. Posso partilhar convosco para recolher o vosso feedback profissional?\n\nCom os melhores cumprimentos,\n[Assinatura Executiva]`,
      riskAssessment: 'Risco reputacional mínimo com piloto em sandbox. Exige validação do catálogo de preços antes de submissão ao Diretor Geral.',
      status: 'AWAITING_HUMAN_APPROVAL',
      restrictedActionNotice: 'RESTRIÇÃO: Retido no centro de aprovações. Nenhuma mensagem externa enviada.',
      createdAt: '2026-11-05T15:30:00Z',
    }
  ]);

  // Modal States
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [stageTargetOpportunity, setStageTargetOpportunity] = useState<Opportunity | null>(null);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [isHuntModalOpen, setIsHuntModalOpen] = useState(false);
  const [isEvaluateModalOpen, setIsEvaluateModalOpen] = useState(false);
  const [isCeoReportOpen, setIsCeoReportOpen] = useState(false);
  const [isApprovalQueueOpen, setIsApprovalQueueOpen] = useState(false);
  const [isProspectHunterOpen, setIsProspectHunterOpen] = useState(false);
  const [isCampaignsOpen, setIsCampaignsOpen] = useState(false);
  const [isPipelineOpen, setIsPipelineOpen] = useState(false);

  // View States
  const [activeView, setActiveView] = useState<'matrix' | 'priorities' | 'trends' | 'prospecting'>('prospecting');

  // Filters for Prospects
  const [prospectSearchQuery, setProspectSearchQuery] = useState('');
  const [selectedProspectMarket, setSelectedProspectMarket] = useState<string>('ALL');
  const [selectedProspectIndustry, setSelectedProspectIndustry] = useState<string>('ALL');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedReach, setSelectedReach] = useState<string>('ALL');
  const [minScore, setMinScore] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'score' | 'time' | 'investment'>('score');

  // Filtered & Sorted Opportunities
  const filteredOpportunities = useMemo(() => {
    return opportunities
      .filter((opp) => {
        const matchesQuery = 
          opp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.organization.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.country.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'ALL' || opp.category === selectedCategory;
        const matchesReach = selectedReach === 'ALL' || opp.reach === selectedReach;
        const matchesScore = opp.score.total >= minScore;

        return matchesQuery && matchesCategory && matchesReach && matchesScore;
      })
      .sort((a, b) => {
        if (sortBy === 'score') {
          return b.score.total - a.score.total;
        } else if (sortBy === 'time') {
          return a.timeToFirstRevenue.daysToFirstCash - b.timeToFirstRevenue.daysToFirstCash;
        } else if (sortBy === 'investment') {
          return a.score.breakdown.initialInvestmentRequired - b.score.breakdown.initialInvestmentRequired;
        }
        return 0;
      });
  }, [opportunities, searchQuery, selectedCategory, selectedReach, minScore, sortBy]);

  // Handlers
  const handleOpportunitiesFound = (newOpps: Opportunity[]) => {
    setOpportunities((prev) => [...newOpps, ...prev]);
  };

  const handleOpportunityEvaluated = (newOpp: Opportunity) => {
    setOpportunities((prev) => [newOpp, ...prev]);
    setSelectedOpportunity(newOpp);
  };

  const handleUpdateOpportunityScore = (updated: Opportunity) => {
    setOpportunities((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    setSelectedOpportunity(updated);
  };

  const handlePitchStaged = (item: ActionApprovalItem) => {
    setApprovalQueue((prev) => [item, ...prev]);
    setIsApprovalQueueOpen(true);
  };

  const handleApproveItem = (id: string) => {
    setApprovalQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'APPROVED' } : item))
    );
  };

  const handleRejectItem = (id: string) => {
    setApprovalQueue((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDispatchItem = (id: string) => {
    setApprovalQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'DISPATCHED' } : item))
    );
  };

  // Top 3 Immediate Priorities from data
  const immediatePriorities = useMemo(() => {
    return [...opportunities]
      .sort((a, b) => {
        // High score + lowest days to cash
        const aScore = a.score.total + (100 - a.timeToFirstRevenue.daysToFirstCash);
        const bScore = b.score.total + (100 - b.timeToFirstRevenue.daysToFirstCash);
        return bScore - aScore;
      })
      .slice(0, 3);
  }, [opportunities]);

  // Filtered Prospects
  const filteredProspects = useMemo(() => {
    return prospects.filter((p) => {
      const matchesQuery =
        p.companyName.toLowerCase().includes(prospectSearchQuery.toLowerCase()) ||
        p.businessSummary.toLowerCase().includes(prospectSearchQuery.toLowerCase()) ||
        p.decisionMaker.name.toLowerCase().includes(prospectSearchQuery.toLowerCase()) ||
        p.market.toLowerCase().includes(prospectSearchQuery.toLowerCase()) ||
        p.industry.toLowerCase().includes(prospectSearchQuery.toLowerCase());

      const matchesMarket = selectedProspectMarket === 'ALL' || p.market === selectedProspectMarket;
      const matchesIndustry = selectedProspectIndustry === 'ALL' || p.industry === selectedProspectIndustry;

      return matchesQuery && matchesMarket && matchesIndustry;
    });
  }, [prospects, prospectSearchQuery, selectedProspectMarket, selectedProspectIndustry]);

  const handleProspectsFound = (newProspects: Prospect[]) => {
    setProspects((prev) => [...newProspects, ...prev]);
  };

  const handleUpdateProspect = (updated: Prospect) => {
    setProspects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setSelectedProspect(updated);
  };

  const handleUpdateProspectStage = (prospectId: string, newStage: PipelineStage) => {
    setProspects((prev) =>
      prev.map((p) => {
        if (p.id === prospectId) {
          const newStatus =
            newStage === 'Closed/Won'
              ? 'CLOSED_WON'
              : newStage === 'In Discussion'
              ? 'IN_CONVERSATION'
              : newStage === 'Contacted'
              ? 'APPROVED_BY_HUMAN'
              : 'PROSPECTED';
          return {
            ...p,
            pipelineStage: newStage,
            status: newStatus,
            lastUpdated: new Date().toISOString(),
          };
        }
        return p;
      })
    );
  };

  const handleAuthorizeAndSendProspect = (p: Prospect) => {
    // Add to approval queue as approved / dispatched
    const approvalItem: ActionApprovalItem = {
      id: `approval-${Date.now()}`,
      opportunityId: p.id,
      opportunityName: `${p.companyName} (${p.matchingSolution.productName})`,
      targetCompany: p.companyName,
      actionType: 'B2B Commercial Outreach',
      subject: p.personalizedEmail.subject,
      draftContent: p.personalizedEmail.body,
      riskAssessment: `Authorized outreach to ${p.decisionMaker.name} (${p.decisionMaker.role}) via email integration.`,
      status: 'APPROVED',
      restrictedActionNotice: 'AUTHORIZED BY HUMAN EXECUTIVE. Ready for client integration dispatch.',
      createdAt: new Date().toISOString(),
    };
    setApprovalQueue((prev) => [approvalItem, ...prev]);
    setProspects((prev) =>
      prev.map((item) => (item.id === p.id ? { ...item, status: 'APPROVED_BY_HUMAN' } : item))
    );
  };

  const handleAddCampaign = (newCamp: CampaignCadence) => {
    setCampaigns((prev) => [newCamp, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Top Header & Ticker Bar */}
      <Header
        opportunities={opportunities}
        prospects={prospects}
        pendingApprovals={approvalQueue.filter(a => a.status === 'AWAITING_HUMAN_APPROVAL')}
        onOpenHuntModal={() => setIsHuntModalOpen(true)}
        onOpenEvaluateModal={() => setIsEvaluateModalOpen(true)}
        onOpenCeoReport={() => setIsCeoReportOpen(true)}
        onOpenApprovalQueue={() => setIsApprovalQueueOpen(true)}
        onOpenProspectScout={() => setIsProspectHunterOpen(true)}
        onOpenCampaigns={() => setIsCampaignsOpen(true)}
        onOpenPipeline={() => setIsPipelineOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main App Content */}
      <main className="flex-1 px-4 lg:px-8 py-6 max-w-7xl w-full mx-auto space-y-6">

        {/* ======================================================== */}
        {/* VIEW 1: INTELLIGENCE MATRIX                              */}
        {/* ======================================================== */}
        {activeView === 'matrix' && (
          <div className="space-y-6">
            
            {/* Filter & Control Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search opportunities by company, tender name, technology, or location..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Scope & Sort Selectors */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="ALL">All Research Verticals</option>
                    <option value="AI Agents & Automation">AI Agents & Automation</option>
                    <option value="SaaS & White-Label">SaaS & White-Label</option>
                    <option value="Tourism & Hospitality Tech">Tourism & Hospitality Tech</option>
                    <option value="Web3 & RWA Tokenization">Web3 & RWA Tokenization</option>
                    <option value="Remote Projects & Collaborations">Remote Projects & Collaborations</option>
                    <option value="Commercial Partnerships">Commercial Partnerships</option>
                    <option value="AI Implementation Services">AI Implementation Services</option>
                    <option value="Tenders & Public Funding">Tenders & Public Funding</option>
                  </select>

                  {/* Reach Filter */}
                  <select
                    value={selectedReach}
                    onChange={(e) => setSelectedReach(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="ALL">Global Reach (All)</option>
                    <option value="Portugal">Portugal Only</option>
                    <option value="European Union">European Union</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="International Remote">International Remote</option>
                  </select>

                  {/* Sort By */}
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400">
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                    <select
                      value={sortBy}
                      onChange={(e: any) => setSortBy(e.target.value)}
                      className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
                    >
                      <option value="score">Sort: Highest Viability (0–100)</option>
                      <option value="time">Sort: Fastest Time to Revenue</option>
                      <option value="investment">Sort: Lowest Capital Intensity</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Quick Filter Tags & Counts */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60 text-xs">
                <div className="flex items-center gap-2 flex-wrap font-mono text-[11px]">
                  <span className="text-slate-500">Filter Viability:</span>
                  <button
                    onClick={() => setMinScore(0)}
                    className={`px-2.5 py-1 rounded-md transition ${
                      minScore === 0 ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    All ({opportunities.length})
                  </button>
                  <button
                    onClick={() => setMinScore(80)}
                    className={`px-2.5 py-1 rounded-md transition ${
                      minScore === 80 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Grade A+ (80+)
                  </button>
                  <button
                    onClick={() => setMinScore(90)}
                    className={`px-2.5 py-1 rounded-md transition ${
                      minScore === 90 ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Grade S (90+)
                  </button>
                </div>

                <div className="text-[11px] font-mono text-slate-400">
                  Showing <span className="font-bold text-white">{filteredOpportunities.length}</span> of {opportunities.length} opportunities
                </div>
              </div>
            </div>

            {/* Opportunities Grid */}
            {filteredOpportunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredOpportunities.map((opp) => (
                  <OpportunityCard
                    key={opp.id}
                    opportunity={opp}
                    isPriority={immediatePriorities.some(p => p.id === opp.id)}
                    onSelect={(target) => setSelectedOpportunity(target)}
                    onStageAction={(target) => setStageTargetOpportunity(target)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 space-y-4">
                <Info className="w-8 h-8 text-slate-500 mx-auto" />
                <div>
                  <h3 className="text-sm font-bold text-white">No opportunities match the current filters</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                    Try adjusting the search query, score threshold, or launch an autonomous hunt to discover fresh leads.
                  </p>
                </div>
                <button
                  onClick={() => setIsHuntModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch Autonomous Hunt</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: TOP 3 IMMEDIATE PRIORITIES                       */}
        {/* ======================================================== */}
        {activeView === 'priorities' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  EXECUTIVE DIRECTIVE FOR WEEK 1
                </span>
                <h2 className="text-xl font-bold text-white">Top 3 Immediate Commercial Priorities</h2>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  Selected by Agent 03 using the core mandate: low upfront capital (&lt;€500), fastest velocity to first cashflow (&lt;30 days), and overwhelming market demand.
                </p>
              </div>

              <button
                onClick={() => setIsCeoReportOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold shrink-0"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Open Full CEO Briefing</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {immediatePriorities.map((opp, idx) => (
                <div
                  key={opp.id}
                  className="p-6 rounded-2xl border border-emerald-500/40 bg-slate-900 flex flex-col justify-between space-y-5 shadow-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />

                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        PRIORITY #{idx + 1}
                      </span>
                      <div className="text-right">
                        <span className="text-lg font-mono font-bold text-emerald-400">{opp.score.total}</span>
                        <span className="text-xs font-mono text-slate-400">/100</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                        {opp.country} • {opp.category}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1">{opp.name}</h3>
                      <p className="text-xs text-slate-400 mt-1">{opp.organization.name}</p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {opp.description}
                    </p>

                    {/* Metrics Checklist */}
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Commercial Yield:</span>
                        <span className="font-bold text-emerald-300">{opp.commercialPotential.estimatedValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Time to Cash:</span>
                        <span className="font-bold text-cyan-300">{opp.timeToFirstRevenue.estimate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Initial Capital:</span>
                        <span className="font-bold text-slate-200">{opp.initialInvestment.amount}</span>
                      </div>
                    </div>

                    {/* Action Step */}
                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs">
                      <span className="font-mono text-[10px] uppercase text-amber-400 font-bold block mb-1">
                        Immediate Week 1 Execution Step:
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {opp.recommendedNextAction.action}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-800">
                    <button
                      onClick={() => setSelectedOpportunity(opp)}
                      className="px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs text-slate-300 transition"
                    >
                      View 12-Pt Dossier
                    </button>
                    <button
                      onClick={() => setStageTargetOpportunity(opp)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-md transition"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Stage Action Pitch</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 4: B2B ACTIVE PROSPECTING                           */}
        {/* ======================================================== */}
        {activeView === 'prospecting' && (
          <div className="space-y-6">
            
            {/* Mission Hero Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    B2B CUSTOMER ACQUISITION — ACTIVE PROSPECTING
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-800">
                    GCC • IBERIA • UK • US • EU
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white">Direct Client Acquisition & Commercial Lead Engine</h2>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Autonomous discovery of real commercial prospects across luxury hotels, resorts, real estate, and enterprise tech. Preparing verified decision-makers, custom value propositions, and tailored commercial emails.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                <button
                  onClick={() => setIsPipelineOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-950 to-blue-950 hover:from-cyan-900 hover:to-blue-900 text-cyan-300 border border-cyan-700/60 text-xs font-mono font-medium transition shadow-sm active:scale-95"
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sales Pipeline</span>
                </button>
                <button
                  onClick={() => setIsCampaignsOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium transition"
                >
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Campaign Cadences ({campaigns.length})</span>
                </button>
                <button
                  onClick={() => setIsProspectHunterOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-lg transition active:scale-[0.98]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Scout Prospects</span>
                </button>
              </div>
            </div>

            {/* Filter & Control Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={prospectSearchQuery}
                    onChange={(e) => setProspectSearchQuery(e.target.value)}
                    placeholder="Search prospects by company name, decision-maker, industry, or city..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  {prospectSearchQuery && (
                    <button
                      onClick={() => setProspectSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Priority Markets & Industries Filter */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  {/* Priority Markets */}
                  <select
                    value={selectedProspectMarket}
                    onChange={(e) => setSelectedProspectMarket(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-amber-500"
                  >
                    <option value="ALL">All Priority Markets</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Dubai, UAE">Dubai, UAE</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Qatar">Qatar</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="European Union">European Union</option>
                    <option value="Global International">Global International</option>
                  </select>

                  {/* Target Industries */}
                  <select
                    value={selectedProspectIndustry}
                    onChange={(e) => setSelectedProspectIndustry(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="ALL">All Target Industries</option>
                    <option value="Hotels and resorts">Hotels and resorts</option>
                    <option value="Tourism and hospitality">Tourism and hospitality</option>
                    <option value="Travel agencies">Travel agencies</option>
                    <option value="Real estate">Real estate</option>
                    <option value="Technology companies">Technology companies</option>
                    <option value="Businesses requiring AI automation">Businesses requiring AI automation</option>
                    <option value="Companies interested in custom AI agents and SaaS solutions">Companies interested in custom AI agents</option>
                  </select>
                </div>
              </div>

              {/* Counts & Quick Status */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60 text-xs font-mono">
                <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                  <span>Active Leads: <strong className="text-white">{filteredProspects.length}</strong></span>
                  <span>•</span>
                  <span className="text-amber-400">GCC & Middle East: <strong>4 Flagships</strong></span>
                  <span>•</span>
                  <span className="text-cyan-400">Iberia & Europe: <strong>3 Luxury Groups</strong></span>
                </div>

                <div className="text-[11px] text-amber-300/80 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Outreach gated by authorized human sign-off</span>
                </div>
              </div>
            </div>

            {/* Prospects Grid */}
            {filteredProspects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProspects.map((prospect) => (
                  <ProspectCard
                    key={prospect.id}
                    prospect={prospect}
                    onSelect={(p) => setSelectedProspect(p)}
                    onReviewEmail={(p) => setSelectedProspect(p)}
                    onAuthorizeAndSend={handleAuthorizeAndSendProspect}
                    onUpdateStage={handleUpdateProspectStage}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 space-y-4">
                <Building2 className="w-8 h-8 text-slate-500 mx-auto" />
                <div>
                  <h3 className="text-sm font-bold text-white">No prospects match the chosen market or filter</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                    Scout new qualified commercial leads across Dubai, UAE, Saudi Arabia, Qatar, Portugal, UK, and US.
                  </p>
                </div>
                <button
                  onClick={() => setIsProspectHunterOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Scout New Prospects</span>
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Global Modals for Opportunities */}
      <OpportunityDossierModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        onUpdateOpportunityScore={handleUpdateOpportunityScore}
        onStageAction={(opp) => {
          setSelectedOpportunity(null);
          setStageTargetOpportunity(opp);
        }}
      />

      <HunterConsoleModal
        isOpen={isHuntModalOpen}
        onClose={() => setIsHuntModalOpen(false)}
        onOpportunitiesFound={handleOpportunitiesFound}
      />

      <EvaluateCustomModal
        isOpen={isEvaluateModalOpen}
        onClose={() => setIsEvaluateModalOpen(false)}
        onOpportunityEvaluated={handleOpportunityEvaluated}
      />

      <CeoBriefingModal
        isOpen={isCeoReportOpen}
        onClose={() => setIsCeoReportOpen(false)}
        opportunities={opportunities}
      />

      <ApprovalQueueModal
        isOpen={isApprovalQueueOpen}
        onClose={() => setIsApprovalQueueOpen(false)}
        items={approvalQueue}
        onApproveItem={handleApproveItem}
        onRejectItem={handleRejectItem}
        onDispatchItem={handleDispatchItem}
      />

      <StagePitchModal
        opportunity={stageTargetOpportunity}
        onClose={() => setStageTargetOpportunity(null)}
        onPitchStaged={handlePitchStaged}
      />

      {/* Global Modals for B2B Active Prospecting */}
      <ProspectDossierModal
        prospect={selectedProspect}
        onClose={() => setSelectedProspect(null)}
        onUpdateProspect={handleUpdateProspect}
        onAuthorizeAndSend={handleAuthorizeAndSendProspect}
      />

      <ProspectHunterModal
        isOpen={isProspectHunterOpen}
        onClose={() => setIsProspectHunterOpen(false)}
        onProspectsFound={handleProspectsFound}
      />

      <CampaignCadenceModal
        isOpen={isCampaignsOpen}
        onClose={() => setIsCampaignsOpen(false)}
        campaigns={campaigns}
        onAddCampaign={handleAddCampaign}
      />

      <SalesPipelineModal
        isOpen={isPipelineOpen}
        onClose={() => setIsPipelineOpen(false)}
        prospects={prospects}
        onUpdateProspectStage={handleUpdateProspectStage}
        onSelectProspect={(p) => {
          setSelectedProspect(p);
          setIsPipelineOpen(false);
        }}
      />

      {/* Persistent Bottom Governance Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 px-4 lg:px-8 py-3 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>AGENT 03 — GLOBAL OPPORTUNITY HUNTER</span>
          <span className="text-slate-600">|</span>
          <span>B2B CUSTOMER ACQUISITION & ACTIVE PROSPECTING</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-amber-400/90 flex items-center gap-1">
            <Lock className="w-3 h-3" />
            <span>Outreach Authorized via Human Approval Only</span>
          </span>
          <span className="text-slate-400">Priority Markets: Portugal • Dubai/UAE • Saudi • Qatar • UK • US</span>
        </div>
      </footer>
    </div>
  );
}
