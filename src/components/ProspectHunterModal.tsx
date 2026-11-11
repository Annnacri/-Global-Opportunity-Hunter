import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Globe2, 
  Building2, 
  Search, 
  Loader2, 
  CheckCircle2, 
  ShieldAlert,
  Target
} from 'lucide-react';
import { Prospect, ProspectMarket, ProspectIndustry } from '../types/prospect';
import { executeProspectHunt } from '../services/api';

interface ProspectHunterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProspectsFound: (newProspects: Prospect[]) => void;
}

const PRIORITY_MARKETS: ProspectMarket[] = [
  'Portugal',
  'Dubai, UAE',
  'United Arab Emirates',
  'Saudi Arabia',
  'Qatar',
  'United Kingdom',
  'United States',
  'European Union',
  'Global International',
];

const TARGET_INDUSTRIES: ProspectIndustry[] = [
  'Hotels and resorts',
  'Tourism and hospitality',
  'Travel agencies',
  'Real estate',
  'Technology companies',
  'Businesses requiring AI automation',
  'Companies interested in custom AI agents and SaaS solutions',
];

export const ProspectHunterModal: React.FC<ProspectHunterModalProps> = ({
  isOpen,
  onClose,
  onProspectsFound,
}) => {
  const [selectedMarket, setSelectedMarket] = useState<ProspectMarket>('Dubai, UAE');
  const [selectedIndustry, setSelectedIndustry] = useState<ProspectIndustry>('Hotels and resorts');
  const [targetQuery, setTargetQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [stepMsg, setStepMsg] = useState('');
  const [results, setResults] = useState<Prospect[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLaunchProspecting = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setErrorMsg('');
    setResults([]);

    setStepMsg(`Deploying search grounding across ${selectedMarket} for ${selectedIndustry}...`);

    const t1 = setTimeout(() => {
      setStepMsg(`Extracting real corporate entities, public contact points & decision-makers...`);
    }, 1400);

    const t2 = setTimeout(() => {
      setStepMsg(`Drafting personalized commercial emails and multi-step follow-up strategies...`);
    }, 2800);

    try {
      const res = await executeProspectHunt({
        market: selectedMarket,
        industry: selectedIndustry,
        targetQuery: targetQuery.trim() || undefined,
      });

      clearTimeout(t1);
      clearTimeout(t2);

      if (res.success && res.prospects && res.prospects.length > 0) {
        setResults(res.prospects);
        onProspectsFound(res.prospects);
        setStepMsg(`Qualified ${res.prospects.length} commercial leads ready for executive review.`);
      } else {
        setErrorMsg(res.error || 'No verified prospects found meeting strict qualification criteria.');
      }
    } catch (err: any) {
      clearTimeout(t1);
      clearTimeout(t2);
      setErrorMsg(err.message || 'Error occurred during prospecting.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Target className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">B2B Active Prospecting Scout</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                  AGENT 03
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Identify real potential clients across priority markets and generate tailored 7-point prospect dossiers
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

        {/* Form Body */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleLaunchProspecting} className="space-y-5">
            
            {/* Priority Markets */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                1. Priority Target Market
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PRIORITY_MARKETS.map((market) => (
                  <button
                    key={market}
                    type="button"
                    onClick={() => setSelectedMarket(market)}
                    className={`px-3 py-2 rounded-xl border text-center text-xs font-medium transition ${
                      selectedMarket === market
                        ? 'border-amber-500 bg-amber-950/60 text-amber-200 ring-1 ring-amber-500/50'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {market}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Industry */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                2. Target Industry
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TARGET_INDUSTRIES.map((ind) => (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => setSelectedIndustry(ind)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition ${
                      selectedIndustry === ind
                        ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 ring-1 ring-emerald-500/50'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Focus */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                3. Company Niche / Target Segment (Optional)
              </label>
              <input
                type="text"
                value={targetQuery}
                onChange={(e) => setTargetQuery(e.target.value)}
                placeholder="e.g. 5-star beachfront resorts in Dubai Marina, or luxury real estate brokers in Cascais"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Compliance Note */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-200 font-medium">Outreach Protocol:</span>
                {' '}Prospects are identified via real web evidence. Tailored emails and follow-up strategies are staged for your review. No external communications are dispatched autonomously.
              </div>
            </div>

            {/* Submit */}
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-lg transition active:scale-[0.98]"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Scouting Qualified Prospects...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Scout Commercial Leads</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Search Status */}
          {isSearching && (
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/30 text-amber-300 space-y-2 animate-pulse font-mono text-xs">
              <div className="flex items-center gap-2 font-bold">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>B2B ACTIVE PROSPECTING SWEEP IN PROGRESS</span>
              </div>
              <p className="text-amber-200/80">{stepMsg}</p>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/40 text-rose-300 text-xs font-mono">
              <strong>Error:</strong> {errorMsg}
            </div>
          )}

          {/* Results Summary */}
          {results.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{results.length} Qualified B2B Prospects Ingested</span>
                </span>
                <span className="text-xs font-mono text-slate-400">Added to Active Leads</span>
              </div>

              <div className="space-y-2">
                {results.map((p) => (
                  <div key={p.id} className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="font-bold text-white text-sm">{p.companyName}</div>
                      <div className="text-slate-400 text-[11px] font-mono">
                        DM: {p.decisionMaker.name} ({p.decisionMaker.role}) • {p.market}
                      </div>
                    </div>
                    <div className="text-right shrink-0 font-mono">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-bold">
                        {p.fitScore}% Fit
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
