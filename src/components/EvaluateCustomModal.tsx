import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Sparkles, 
  Loader2, 
  Globe2, 
  Building2, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Opportunity } from '../types/opportunity';
import { evaluateOpportunity } from '../services/api';

interface EvaluateCustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpportunityEvaluated: (opp: Opportunity) => void;
}

export const EvaluateCustomModal: React.FC<EvaluateCustomModalProps> = ({
  isOpen,
  onClose,
  onOpportunityEvaluated,
}) => {
  const [targetName, setTargetName] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [sector, setSector] = useState('AI Implementation Services');
  const [rawNotes, setRawNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetName.trim()) {
      setErrorMsg('Target Name or Opportunity title is required.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await evaluateOpportunity({
        targetName,
        targetUrl: targetUrl.trim() || undefined,
        sector,
        rawNotes: rawNotes.trim() || undefined,
      });

      if (res.success && res.opportunity) {
        onOpportunityEvaluated(res.opportunity);
        onClose();
      } else {
        setErrorMsg(res.error || 'Evaluation could not be completed.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error executing evaluation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  OPPORTUNITY EVALUATOR
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-400">0–100 RUBRIC AUDIT</span>
              </div>
              <h2 className="text-base font-bold text-white">
                Evaluate Custom Lead or RFP URL
              </h2>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 font-mono">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block font-mono uppercase text-slate-300 mb-1">
              Target Company / Opportunity Title *
            </label>
            <input
              type="text"
              required
              value={targetName}
              onChange={(e) => setTargetName(e.target.value)}
              placeholder="e.g. Pestana Hotel Group AI Concierge RFP or Upwork Enterprise Contract"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono uppercase text-slate-300 mb-1">
                Website or Source Document URL (Optional)
              </label>
              <input
                type="url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block font-mono uppercase text-slate-300 mb-1">
                Sector / Research Vertical
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
              >
                <option value="AI Agents & Automation">AI Agents & Automation</option>
                <option value="SaaS & White-Label">SaaS & White-Label</option>
                <option value="Tourism & Hospitality Tech">Tourism & Hospitality Tech</option>
                <option value="Web3 & RWA Tokenization">Web3 & RWA Tokenization</option>
                <option value="Remote Projects & Collaborations">Remote Projects & Collaborations</option>
                <option value="Commercial Partnerships">Commercial Partnerships</option>
                <option value="AI Implementation Services">AI Implementation Services</option>
                <option value="Tenders & Public Funding">Tenders & Public Funding</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-mono uppercase text-slate-300 mb-1">
              Additional Context / Intel Notes
            </label>
            <textarea
              rows={3}
              value={rawNotes}
              onChange={(e) => setRawNotes(e.target.value)}
              placeholder="Paste any RFP details, requirements, budget hints, or decision-maker names..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Rubric Notice */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-[11px] font-mono">
            Agent 03 will stress-test Revenue Potential (25), Time to First Revenue (20), Market Demand (20), Implementation Feasibility (15), Competition (10), and Initial Investment (10).
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold transition active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Computing 0–100 Rubric...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Execute Evaluation</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
