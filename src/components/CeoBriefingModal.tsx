import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileText, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Building2, 
  Calendar,
  Layers,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { Opportunity, CeoReport } from '../types/opportunity';
import { generateCeoBriefing } from '../services/api';

interface CeoBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunities: Opportunity[];
}

export const CeoBriefingModal: React.FC<CeoBriefingModalProps> = ({
  isOpen,
  onClose,
  opportunities,
}) => {
  const [report, setReport] = useState<CeoReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'briefing' | 'top10' | 'trends' | 'timeline'>('briefing');

  useEffect(() => {
    if (isOpen && !report) {
      loadReport();
    }
  }, [isOpen]);

  const loadReport = async () => {
    setIsLoading(true);
    try {
      const sorted = [...opportunities].sort((a, b) => b.score.total - a.score.total);
      const top10 = sorted.slice(0, 10);
      const res = await generateCeoBriefing(top10);
      if (res.success && res.report) {
        setReport(res.report);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  // Format full markdown memo for CEO
  const generateMarkdownMemo = () => {
    if (!report) return '';
    const top10 = [...opportunities].sort((a, b) => b.score.total - a.score.total).slice(0, 10);

    return `# MEMORANDUM FOR THE CEO AGENT
**FROM:** AGENT 03 — GLOBAL OPPORTUNITY HUNTER  
**DATE:** ${new Date().toISOString().split('T')[0]}  
**MISSION:** Commercial Intelligence & High-Yield Revenue Investigation  
**STATUS:** ${report.missionStatus || 'ACTIVE'}  

---

## 1. EXECUTIVE BRIEFING
${report.executiveSummary}

---

## 2. TOP 3 IMMEDIATE PRIORITIES
${report.top3ImmediatePriorities.map((p, idx) => `
### Priority ${idx + 1}: ${p.name}
- **Why Immediate:** ${p.whyImmediate}
- **Expected Yield:** ${p.expectedYield}
- **First Action (Week 1):** ${p.firstStepWeek1}
- **Risk Shield:** ${p.riskProfile}
`).join('\n')}

---

## 3. TOP 10 OPPORTUNITIES MATRIX
| # | Opportunity | Country | Score | Commercial Potential | Time to Revenue |
|---|---|---|---|---|---|
${top10.map((o, idx) => `| ${idx + 1} | ${o.name} | ${o.country} | **${o.score.total}/100** | ${o.commercialPotential.estimatedValue} | ${o.timeToFirstRevenue.estimate} |`).join('\n')}

---

## 4. NEW MARKET TRENDS RADAR
${report.marketTrends.map(t => `- **[${t.direction}] ${t.trend} (${t.geography}):** ${t.relevanceToCEO} (Action: ${t.actionableInsight})`).join('\n')}

---

## 5. POTENTIAL CUSTOMERS & PARTNERSHIPS
${report.potentialCustomersAndPartnerships.map(c => `- **${c.name}** (${c.targetGeo} / ${c.type}): ${c.strategicFit} — *Outreach Angle:* ${c.outreachAngle}`).join('\n')}

---

## 6. IMPORTANT RISKS & MITIGATION DIRECTIVES
${report.importantRisks.map(r => `- **[${r.riskCategory}]** ${r.description} -> **Directive:** ${r.mitigationDirective}`).join('\n')}

---

## 7. RECOMMENDED ACTIONS TIMELINE
${report.recommendedActionsTimeline.map(tl => `
### ${tl.timeframe}
${tl.deliverables.map(d => `- [ ] ${d}`).join('\n')}
*Governance Gate:* ${tl.governanceGate}
`).join('\n')}

---
*Report generated strictly complying with Agent 03 autonomous framework. External actions require CEO/Human approval.*
`;
  };

  const handleCopyMemo = () => {
    navigator.clipboard.writeText(generateMarkdownMemo());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-6 max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                  EXECUTIVE BRIEFING DISPATCH
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-400">TO: CEO AGENT</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Global Opportunity Hunter: Structured CEO Intelligence Report
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMemo}
              disabled={!report}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Memo Copied!' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2 border-b border-slate-800 bg-slate-950/60 flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab('briefing')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'briefing'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Executive Summary & Priorities
          </button>
          <button
            onClick={() => setActiveTab('top10')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'top10'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Top 10 Opportunities Ranking
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'trends'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Market Trends & Partnerships
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'timeline'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Execution Timeline & Risks
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-300">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
              <p className="text-xs font-mono text-indigo-300">Synthesizing executive briefing with Gemini 3.8 Flash...</p>
            </div>
          ) : !report ? (
            <div className="py-16 text-center space-y-4">
              <p className="text-slate-400 text-sm">Failed to generate briefing. Click below to retry.</p>
              <button
                onClick={loadReport}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
              >
                Synthesize Report
              </button>
            </div>
          ) : (
            <>
              {/* TAB 1: EXECUTIVE BRIEFING & TOP 3 PRIORITIES */}
              {activeTab === 'briefing' && (
                <div className="space-y-6">
                  {/* Executive Summary Box */}
                  <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider">
                        Executive Intel Briefing
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        Generated {new Date().toLocaleDateString()} • Confidential
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-200">
                      {report.executiveSummary}
                    </p>
                  </div>

                  {/* Top 3 Immediate Priorities */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        <span>Top 3 Immediate Priorities (Start Week 1)</span>
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400">Low upfront barrier • Fastest cashflow</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {report.top3ImmediatePriorities.map((p, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl border border-emerald-500/30 bg-slate-950 flex flex-col justify-between space-y-3"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                Priority #{idx + 1}
                              </span>
                              <span className="text-xs font-mono font-bold text-emerald-400">{p.expectedYield}</span>
                            </div>
                            <h4 className="text-sm font-bold text-white line-clamp-2">{p.name}</h4>
                            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                              {p.whyImmediate}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs font-mono">
                            <div>
                              <span className="text-slate-500 block text-[10px] uppercase">Week 1 Action:</span>
                              <span className="text-cyan-300 font-semibold">{p.firstStepWeek1}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[10px] uppercase">Risk Shield:</span>
                              <span className="text-slate-300 text-[11px]">{p.riskProfile}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: TOP 10 RANKING */}
              {activeTab === 'top10' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                      Top 10 Global Opportunities Ranked by Viability (0–100)
                    </h3>
                    <span className="text-xs font-mono text-slate-500">6-Factor Evaluated Matrix</span>
                  </div>

                  <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900 border-b border-slate-800 font-mono text-slate-400 text-[11px]">
                        <tr>
                          <th className="p-3">Rank</th>
                          <th className="p-3">Opportunity</th>
                          <th className="p-3">Reach</th>
                          <th className="p-3">Yield Potential</th>
                          <th className="p-3">Time to Rev</th>
                          <th className="p-3 text-right">Score</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {[...opportunities].sort((a, b) => b.score.total - a.score.total).slice(0, 10).map((opp, idx) => (
                          <tr key={opp.id} className="hover:bg-slate-900/50 transition">
                            <td className="p-3 font-bold text-slate-500">#{idx + 1}</td>
                            <td className="p-3 font-sans">
                              <span className="font-bold text-slate-100 block">{opp.name}</span>
                              <span className="text-[11px] text-slate-400">{opp.organization.name}</span>
                            </td>
                            <td className="p-3 text-cyan-300">{opp.country}</td>
                            <td className="p-3 text-emerald-400 font-bold">{opp.commercialPotential.estimatedValue}</td>
                            <td className="p-3 text-slate-300">{opp.timeToFirstRevenue.estimate}</td>
                            <td className="p-3 text-right">
                              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-700 font-bold text-emerald-400">
                                {opp.score.total}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: TRENDS & PARTNERSHIPS */}
              {activeTab === 'trends' && (
                <div className="space-y-6">
                  {/* Trends */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" />
                      <span>New Market Trends Radar</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {report.marketTrends.map((t, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{t.trend}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                              {t.direction} • {t.geography}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">{t.relevanceToCEO}</p>
                          <div className="pt-1 text-[11px] font-mono text-emerald-400">
                            <strong>Monetization Angle: </strong>{t.actionableInsight}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Potential Customers & Partnerships */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" />
                      <span>Potential Customers & Commercial Partnerships</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {report.potentialCustomersAndPartnerships.map((c, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-200">{c.name}</span>
                            <span className="text-[10px] font-mono text-slate-400">{c.targetGeo} ({c.type})</span>
                          </div>
                          <p className="text-xs text-slate-400">{c.strategicFit}</p>
                          <p className="text-[11px] font-mono text-cyan-300 pt-1">
                            <strong>Angle: </strong>{c.outreachAngle}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: TIMELINE & RISKS */}
              {activeTab === 'timeline' && (
                <div className="space-y-6">
                  {/* Timeline */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      <span>Recommended Actions Timeline</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {report.recommendedActionsTimeline.map((tl, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                            {tl.timeframe}
                          </span>
                          <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                            {tl.deliverables.map((d, dIdx) => (
                              <li key={dIdx}>{d}</li>
                            ))}
                          </ul>
                          <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-amber-300">
                            <strong>Gate: </strong>{tl.governanceGate}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risks */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      <span>Important Macro Risks & Mitigation Directives</span>
                    </h3>

                    <div className="space-y-2">
                      {report.importantRisks.map((r, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div>
                            <span className="font-mono text-rose-300 font-semibold uppercase text-[10px] block">
                              [{r.riskCategory}]
                            </span>
                            <span className="text-slate-300">{r.description}</span>
                          </div>
                          <div className="sm:max-w-md text-[11px] font-mono text-emerald-300 bg-slate-900 p-2 rounded-lg border border-slate-800 shrink-0">
                            <strong>CEO Directive: </strong>{r.mitigationDirective}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
