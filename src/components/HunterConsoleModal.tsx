import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Search, 
  Globe2, 
  ShieldAlert, 
  Compass, 
  CheckCircle2, 
  Loader2, 
  ExternalLink,
  Target,
  ArrowRight
} from 'lucide-react';
import { ResearchArea, GeographicReach, Opportunity } from '../types/opportunity';
import { executeAutonomousHunt } from '../services/api';

interface HunterConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpportunitiesFound: (newOpps: Opportunity[]) => void;
}

const RESEARCH_AREAS: ResearchArea[] = [
  'AI Agents & Automation',
  'SaaS & White-Label',
  'Tourism & Hospitality Tech',
  'Web3 & RWA Tokenization',
  'Remote Projects & Collaborations',
  'Commercial Partnerships',
  'AI Implementation Services',
  'Tenders & Public Funding',
];

const GEOGRAPHIC_REACHES: GeographicReach[] = [
  'Portugal',
  'European Union',
  'United Kingdom',
  'United States',
  'Canada',
  'International Remote',
];

export const HunterConsoleModal: React.FC<HunterConsoleModalProps> = ({
  isOpen,
  onClose,
  onOpportunitiesFound,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ResearchArea>('Tourism & Hospitality Tech');
  const [selectedReach, setSelectedReach] = useState<GeographicReach>('Portugal');
  const [customFocus, setCustomFocus] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchStep, setSearchStep] = useState<string>('');
  const [results, setResults] = useState<Opportunity[]>([]);
  const [groundingSources, setGroundingSources] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleLaunchHunt = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setErrorMsg('');
    setResults([]);
    setGroundingSources([]);

    setSearchStep('Initializing Google Search grounding tool with Gemini 3.8 Flash...');
    
    const timer1 = setTimeout(() => {
      setSearchStep(`Scanning verified public records, corporate portals & tenders in ${selectedReach}...`);
    }, 1200);

    const timer2 = setTimeout(() => {
      setSearchStep('Filtering unverified claims & computing 0-100 evaluation rubric...');
    }, 2800);

    try {
      const response = await executeAutonomousHunt({
        category: selectedCategory,
        reach: selectedReach,
        customFocus: customFocus.trim() || undefined,
      });

      clearTimeout(timer1);
      clearTimeout(timer2);

      if (response.success && response.opportunities.length > 0) {
        setResults(response.opportunities);
        setGroundingSources(response.groundingSources || []);
        onOpportunitiesFound(response.opportunities);
        setSearchStep('Investigation completed: verified opportunities ingested into database.');
      } else {
        setErrorMsg(response.error || 'No verified opportunities meeting high-viability thresholds were returned.');
      }
    } catch (err: any) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setErrorMsg(err.message || 'An error occurred during autonomous research.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-8">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Autonomous Hunt Mission Dispatch</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                  AGENT 03
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Execute live web search grounded investigation with strict anti-fabrication enforcement
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleLaunchHunt} className="space-y-5">
            {/* Sector Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                1. Target Research Area
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {RESEARCH_AREAS.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition ${
                      selectedCategory === cat
                        ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 ring-1 ring-emerald-500/50'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span className="line-clamp-2">{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Geographical Scope */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>2. Geographical Scope</span>
                </label>
                <span className="text-[11px] text-amber-400/90 font-mono">
                  *Mandate: Never restrict research to Portugal
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {GEOGRAPHIC_REACHES.map((reach) => (
                  <button
                    key={reach}
                    type="button"
                    onClick={() => setSelectedReach(reach)}
                    className={`px-3 py-2 rounded-xl border text-center text-xs font-medium transition ${
                      selectedReach === reach
                        ? 'border-cyan-500 bg-cyan-950/60 text-cyan-200 ring-1 ring-cyan-500/50'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {reach}
                  </button>
                ))}
              </div>
            </div>

            {/* Specific Investigative Focus */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                3. Specific Investigative Angle / Target Keywords (Optional)
              </label>
              <input
                type="text"
                value={customFocus}
                onChange={(e) => setCustomFocus(e.target.value)}
                placeholder="e.g. Luxury boutique hotel chains in Algarve needing WhatsApp concierges, or Horizon Europe AI grants"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Mandate Compliance Notice */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
              <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-200 font-medium">Anti-Hallucination & Evidence Protocol:</span>
                {' '}Agent 03 uses Google Search Grounding to identify verified active programs, real corporate requests, and public tenders. All findings are scored 0–100 with the strict CEO evaluation rubric.
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-medium hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSearching}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-emerald-950 transition active:scale-[0.98]"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Executing Autonomous Hunt...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>Launch Autonomous Hunt</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Research Progress State */}
          {isSearching && (
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/30 text-emerald-300 space-y-2 animate-pulse">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>ACTIVE INTELLIGENCE SWEEP IN PROGRESS</span>
              </div>
              <p className="text-xs text-emerald-200/80 font-mono">{searchStep}</p>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/40 text-rose-300 text-xs font-mono">
              <strong>Error:</strong> {errorMsg}
            </div>
          )}

          {/* Newly Discovered Results Preview */}
          {results.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{results.length} Verified Opportunities Discovered & Ingested</span>
                </span>
                <span className="text-[11px] text-slate-400">Added to your Intelligence Matrix</span>
              </div>

              <div className="space-y-2.5">
                {results.map((opp) => (
                  <div key={opp.id} className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-100">{opp.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {opp.organization.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                          {opp.country}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">{opp.description}</p>
                      <div className="flex items-center gap-3 text-[11px] font-mono pt-1">
                        <span className="text-emerald-400 font-semibold">{opp.commercialPotential.estimatedValue}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-cyan-400">Cash in {opp.timeToFirstRevenue.estimate}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-lg font-mono font-bold text-emerald-400">{opp.score.total}<span className="text-xs opacity-60">/100</span></div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                        {opp.score.total >= 90 ? 'Grade S' : 'Grade A'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {groundingSources.length > 0 && (
                <div className="pt-2 text-[11px] text-slate-400">
                  <span className="font-mono text-slate-300">Grounding Citations Verified: </span>
                  {groundingSources.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-400 hover:underline mr-3"
                    >
                      <span>{s.title}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
