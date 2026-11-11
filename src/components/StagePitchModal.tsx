import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Send, 
  Sparkles, 
  Loader2, 
  ShieldAlert, 
  Building2, 
  FileText 
} from 'lucide-react';
import { Opportunity, ActionApprovalItem } from '../types/opportunity';
import { generateActionOutreach } from '../services/api';

interface StagePitchModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
  onPitchStaged: (item: ActionApprovalItem) => void;
}

export const StagePitchModal: React.FC<StagePitchModalProps> = ({
  opportunity,
  onClose,
  onPitchStaged,
}) => {
  if (!opportunity) return null;

  const [tone, setTone] = useState('Consultative, direct, and ROI-driven');
  const [customAngle, setCustomAngle] = useState(
    'Highlight immediate operational relief, zero friction pilot, and fast cashflow payback.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleStageProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setErrorMsg('');

    try {
      const res = await generateActionOutreach({
        opportunity,
        tone,
        customAngle,
      });

      if (res.success && res.draft) {
        const approvalItem: ActionApprovalItem = {
          id: `approval-${Date.now()}`,
          opportunityId: opportunity.id,
          opportunityName: opportunity.name,
          targetCompany: opportunity.organization.name,
          actionType: opportunity.recommendedNextAction.actionType,
          subject: res.draft.subject,
          draftContent: res.draft.body,
          riskAssessment: res.draft.riskAssessment,
          status: 'AWAITING_HUMAN_APPROVAL',
          restrictedActionNotice: res.draft.restrictedActionNotice,
          createdAt: new Date().toISOString(),
        };

        onPitchStaged(approvalItem);
        onClose();
      } else {
        // Fallback to pre-existing draft from opportunity if model generation fails
        const fallbackDraft: ActionApprovalItem = {
          id: `approval-${Date.now()}`,
          opportunityId: opportunity.id,
          opportunityName: opportunity.name,
          targetCompany: opportunity.organization.name,
          actionType: opportunity.recommendedNextAction.actionType,
          subject: opportunity.recommendedNextAction.draftOutreachSubject || `Proposal: Strategic Collaboration — ${opportunity.name}`,
          draftContent: opportunity.recommendedNextAction.draftOutreachBody || `Dear Team,\n\nWe have identified an actionable commercial avenue to collaborate on ${opportunity.name}.\n\nBest regards,\nAgent 03`,
          riskAssessment: 'Standard commercial outreach. Must be signed and dispatched by human executive.',
          status: 'AWAITING_HUMAN_APPROVAL',
          restrictedActionNotice: 'RESTRICTION: Held in human approval queue.',
          createdAt: new Date().toISOString(),
        };
        onPitchStaged(fallbackDraft);
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to generate outreach pitch.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  HUMAN GOVERNANCE GATE
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-400">STAGE DRAFT OUTREACH</span>
              </div>
              <h2 className="text-base font-bold text-white line-clamp-1">
                Draft Pitch for {opportunity.organization.name}
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
        <form onSubmit={handleStageProposal} className="p-6 space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-300 font-mono text-[11px] flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              Agent 03 will draft this proposal for your approval. No external email or message will be sent until a human manually approves and dispatches it.
            </div>
          </div>

          <div>
            <span className="text-slate-400 font-mono uppercase block mb-1">Target Opportunity</span>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-semibold text-sm">
              {opportunity.name}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-slate-400 font-mono uppercase block mb-1">Action Type</span>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs">
                {opportunity.recommendedNextAction.actionType}
              </div>
            </div>
            <div>
              <span className="text-slate-400 font-mono uppercase block mb-1">Target Role</span>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs truncate">
                {opportunity.recommendedNextAction.targetContactRole || 'Executive Decision Maker'}
              </div>
            </div>
          </div>

          <div>
            <label className="block font-mono uppercase text-slate-300 mb-1">
              Desired Tone & Positioning
            </label>
            <input
              type="text"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-slate-300 mb-1">
              Custom Value Proposition Angle
            </label>
            <textarea
              rows={3}
              value={customAngle}
              onChange={(e) => setCustomAngle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 font-mono text-xs">
              {errorMsg}
            </div>
          )}

          {/* Action Footer */}
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
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-950 font-bold transition active:scale-[0.98]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Drafting Proposal...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Draft & Stage for Approval</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
