import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Globe2, 
  Clock, 
  Euro, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Lock,
  Sliders,
  Send,
  Sparkles,
  Layers,
  TrendingUp,
  Award
} from 'lucide-react';
import { Opportunity, OpportunityScoreBreakdown } from '../types/opportunity';
import { ScoreBadge } from './ScoreBadge';

interface OpportunityDossierModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
  onUpdateOpportunityScore: (updatedOpp: Opportunity) => void;
  onStageAction: (opportunity: Opportunity) => void;
}

export const OpportunityDossierModal: React.FC<OpportunityDossierModalProps> = ({
  opportunity,
  onClose,
  onUpdateOpportunityScore,
  onStageAction,
}) => {
  if (!opportunity) return null;

  const [isEditingScore, setIsEditingScore] = useState(false);
  const [breakdown, setBreakdown] = useState<OpportunityScoreBreakdown>({
    ...opportunity.score.breakdown,
  });

  const totalScore = 
    breakdown.revenuePotential +
    breakdown.timeToFirstRevenue +
    breakdown.marketDemand +
    breakdown.implementationFeasibility +
    breakdown.competitionAndDifferentiation +
    breakdown.initialInvestmentRequired;

  const handleSliderChange = (field: keyof OpportunityScoreBreakdown, val: number) => {
    setBreakdown((prev) => ({
      ...prev,
      [field]: val,
    }));
  };

  const handleSaveRecalculation = () => {
    const updated: Opportunity = {
      ...opportunity,
      score: {
        ...opportunity.score,
        total: totalScore,
        breakdown,
      },
    };
    onUpdateOpportunityScore(updated);
    setIsEditingScore(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Dossier Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
              03
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                  CLASSIFIED INTELLIGENCE DOSSIER
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-400">12-POINT EXECUTIVE REPORT</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1">
                {opportunity.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onStageAction(opportunity)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/40 text-amber-200 text-xs font-medium transition"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Stage Action Pitch</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dossier Content - 12 Points Scrollable Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-300">
          
          {/* Top Score & Meta Hero */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-200">
                  {opportunity.category}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono text-cyan-300 bg-cyan-950/50 border border-cyan-800/40">
                  <Globe2 className="w-3 h-3" />
                  <span>{opportunity.country} ({opportunity.reach})</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/40">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{opportunity.evidence.verificationStatus}</span>
                </span>
              </div>

              <div className="pt-1">
                <div className="text-xs uppercase font-mono text-slate-500">3. Target Organization</div>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <span>{opportunity.organization.name}</span>
                  <span className="text-xs font-normal text-slate-400">({opportunity.organization.type})</span>
                  {opportunity.organization.website && (
                    <a
                      href={opportunity.organization.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 text-xs"
                    >
                      <span>Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-400">
                <span className="font-mono text-slate-500 block">4. Opportunity Description:</span>
                <p className="mt-1 leading-relaxed text-slate-200">{opportunity.description}</p>
              </div>
            </div>

            {/* Score Display & Rubric Recalculator */}
            <div className="flex flex-col justify-between items-center md:items-end">
              <ScoreBadge score={opportunity.score.total} breakdown={opportunity.score.breakdown} size="lg" />
              <button
                onClick={() => setIsEditingScore(!isEditingScore)}
                className="mt-3 inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-emerald-400 transition"
              >
                <Sliders className="w-3 h-3" />
                <span>{isEditingScore ? 'Close Rubric Editor' : 'Stress-Test 0-100 Rubric'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Rubric Sliders (if open) */}
          {isEditingScore && (
            <div className="p-4 rounded-xl border border-emerald-500/40 bg-slate-950/90 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Executive 0–100 Rubric Recalculator
                  </span>
                </div>
                <div className="text-sm font-mono font-bold text-emerald-400">
                  New Score: {totalScore}/100
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">Revenue Potential (max 25):</span>
                    <span className="font-bold text-white">{breakdown.revenuePotential} pts</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={breakdown.revenuePotential}
                    onChange={(e) => handleSliderChange('revenuePotential', parseInt(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">Time to First Revenue (max 20):</span>
                    <span className="font-bold text-white">{breakdown.timeToFirstRevenue} pts</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={breakdown.timeToFirstRevenue}
                    onChange={(e) => handleSliderChange('timeToFirstRevenue', parseInt(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">Market Demand (max 20):</span>
                    <span className="font-bold text-white">{breakdown.marketDemand} pts</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={breakdown.marketDemand}
                    onChange={(e) => handleSliderChange('marketDemand', parseInt(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">Implementation Feasibility (max 15):</span>
                    <span className="font-bold text-white">{breakdown.implementationFeasibility} pts</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={breakdown.implementationFeasibility}
                    onChange={(e) => handleSliderChange('implementationFeasibility', parseInt(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">Competition & Differentiation (max 10):</span>
                    <span className="font-bold text-white">{breakdown.competitionAndDifferentiation} pts</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={breakdown.competitionAndDifferentiation}
                    onChange={(e) => handleSliderChange('competitionAndDifferentiation', parseInt(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">Initial Investment Required (max 10):</span>
                    <span className="font-bold text-white">{breakdown.initialInvestmentRequired} pts</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={breakdown.initialInvestmentRequired}
                    onChange={(e) => handleSliderChange('initialInvestmentRequired', parseInt(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsEditingScore(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRecalculation}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-mono font-bold text-white shadow"
                >
                  Save Recalculated Score
                </button>
              </div>
            </div>
          )}

          {/* Detailed Points 5 - 12 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Point 5: Evidence & Source Links */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>5. Evidence & Source Links</span>
              </span>
              <p className="text-xs text-slate-400 italic">
                {opportunity.evidence.investigationNotes}
              </p>
              <div className="space-y-1.5 pt-1">
                {opportunity.evidence.sources.map((src, idx) => (
                  <a
                    key={idx}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-2 rounded-lg bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-xs transition"
                  >
                    <div className="font-semibold text-cyan-300 flex items-center justify-between">
                      <span className="line-clamp-1">{src.title}</span>
                      <ExternalLink className="w-3 h-3 shrink-0 ml-1 opacity-70" />
                    </div>
                    {src.snippet && (
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{src.snippet}</p>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Point 6: Commercial Potential */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <Euro className="w-3.5 h-3.5 text-emerald-400" />
                <span>6. Commercial Potential</span>
              </span>
              <div className="text-base font-bold text-emerald-300 font-mono">
                {opportunity.commercialPotential.estimatedValue}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1 text-slate-300">
                <div>
                  <span className="text-slate-500 block">Model:</span>
                  <span className="font-semibold">{opportunity.commercialPotential.revenueModel}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Scalability:</span>
                  <span className="font-semibold text-cyan-300">{opportunity.commercialPotential.scalability}</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-slate-800">
                  <span className="text-slate-500 block">Run-Rate Potential:</span>
                  <span className="text-emerald-400">{opportunity.commercialPotential.annualRunRatePotential}</span>
                </div>
              </div>
            </div>

            {/* Point 7: Estimated Time to First Revenue */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>7. Estimated Time to First Revenue</span>
              </span>
              <div className="text-base font-bold text-cyan-300 font-mono">
                {opportunity.timeToFirstRevenue.estimate}
              </div>
              <p className="text-xs text-slate-400">
                <strong className="text-slate-300">Target Cash Milestone: </strong>
                {opportunity.timeToFirstRevenue.initialMilestone}
              </p>
            </div>

            {/* Point 8: Required Skills & Resources */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>8. Required Skills & Resources</span>
              </span>
              <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                {opportunity.requiredSkillsAndResources.map((skill, idx) => (
                  <li key={idx} className="leading-relaxed">{skill}</li>
                ))}
              </ul>
            </div>

            {/* Point 9: Initial Investment */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>9. Initial Investment Required</span>
              </span>
              <div className="text-base font-bold text-white font-mono">
                {opportunity.initialInvestment.amount}
              </div>
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                {opportunity.initialInvestment.capitalIntensity}
              </span>
              <p className="text-xs text-slate-400 mt-1">{opportunity.initialInvestment.breakdown}</p>
            </div>

            {/* Point 10: Main Risks */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>10. Main Risks & Mitigations</span>
              </span>
              <div className="space-y-2">
                {opportunity.mainRisks.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-rose-300">{item.risk}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        item.severity === 'High' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                        item.severity === 'Medium' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {item.severity} Risk
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      <strong className="text-emerald-400">Shield: </strong>{item.mitigation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Point 12: Recommended Next Action Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-amber-300 font-bold flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>12. Recommended Next Action (Human Sign-off Gated)</span>
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-900/40 text-amber-200 border border-amber-700/50">
                {opportunity.recommendedNextAction.actionType}
              </span>
            </div>

            <p className="text-sm font-semibold text-white">
              {opportunity.recommendedNextAction.action}
            </p>

            {opportunity.recommendedNextAction.targetContactRole && (
              <div className="text-xs font-mono text-slate-400">
                <span className="text-slate-500">Target Role: </span>
                <span className="text-slate-200">{opportunity.recommendedNextAction.targetContactRole}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
              <div className="text-xs text-amber-300/80 font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>No automated contact is made. Proposal will be drafted for your executive signature.</span>
              </div>

              <button
                onClick={() => onStageAction(opportunity)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg transition active:scale-[0.98]"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Stage Draft for Human Approval</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
