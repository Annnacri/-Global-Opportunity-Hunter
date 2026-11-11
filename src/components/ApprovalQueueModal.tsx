import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Check, 
  Copy, 
  Trash2, 
  Send, 
  AlertOctagon,
  Building2,
  FileText,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { ActionApprovalItem } from '../types/opportunity';

interface ApprovalQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ActionApprovalItem[];
  onApproveItem: (id: string) => void;
  onRejectItem: (id: string) => void;
  onDispatchItem: (id: string) => void;
}

export const ApprovalQueueModal: React.FC<ApprovalQueueModalProps> = ({
  isOpen,
  onClose,
  items,
  onApproveItem,
  onRejectItem,
  onDispatchItem,
}) => {
  const [selectedItem, setSelectedItem] = useState<ActionApprovalItem | null>(
    items.length > 0 ? items[0] : null
  );
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentItem = selectedItem || items[0] || null;

  const handleCopyDraft = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  HUMAN GOVERNANCE GATEKEEPER
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-400">EXTERNAL ACTION AUTHORIZATION</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Staged Commercial Proposals & Outreach Approval Queue
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

        {/* Mandatory Guardrail Banner */}
        <div className="px-6 py-2.5 bg-amber-950/30 border-b border-amber-500/20 flex items-center gap-3 text-xs text-amber-300">
          <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <span className="font-mono font-bold">MANDATORY PROTOCOL: </span>
            Agent 03 cannot spend capital, contact external clients, submit tenders, or publish content autonomously. Every draft below is held in quarantine until human executive sign-off.
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Column: Items List */}
          <div className="w-full md:w-80 border-r border-slate-800 bg-slate-950/60 overflow-y-auto p-3 space-y-2 shrink-0">
            <div className="text-[11px] font-mono text-slate-400 px-2 uppercase tracking-wider">
              Staged Proposals ({items.length})
            </div>

            {items.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 font-mono">
                No drafts awaiting approval. Click "Stage Pitch" on any opportunity card to prepare an outreach memo.
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-3 rounded-xl border cursor-pointer transition text-left space-y-1 ${
                    currentItem?.id === item.id
                      ? 'border-amber-500/50 bg-amber-950/20 text-white'
                      : 'border-slate-800/80 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-amber-400 font-semibold">{item.actionType}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] ${
                      item.status === 'APPROVED' ? 'bg-emerald-950 text-emerald-300' :
                      item.status === 'DISPATCHED' ? 'bg-cyan-950 text-cyan-300' :
                      'bg-amber-950 text-amber-300'
                    }`}>
                      {item.status === 'AWAITING_HUMAN_APPROVAL' ? 'PENDING' : item.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{item.opportunityName}</h4>
                  <div className="text-[11px] text-slate-400 truncate">{item.targetCompany}</div>
                </div>
              ))
            )}
          </div>

          {/* Right Column: Active Draft Review */}
          <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-slate-900/50">
            {currentItem ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {currentItem.actionType}
                    </span>
                    <h3 className="text-base font-bold text-white mt-2">
                      {currentItem.subject}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>Target: {currentItem.targetCompany}</span>
                      <span className="text-slate-600">•</span>
                      <span>Ref: {currentItem.opportunityName}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyDraft(`${currentItem.subject}\n\n${currentItem.draftContent}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{copied ? 'Copied' : 'Copy Pitch'}</span>
                    </button>

                    <button
                      onClick={() => onRejectItem(currentItem.id)}
                      className="p-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-950/40 transition"
                      title="Discard / Reject Draft"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Risk Assessment Box */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <div className="font-mono text-slate-400 uppercase text-[10px] tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Agent 03 Risk & Compliance Assessment</span>
                  </div>
                  <p className="text-slate-300 font-mono text-[11px]">{currentItem.riskAssessment}</p>
                </div>

                {/* Draft Content Box */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono uppercase text-slate-400">
                    Draft Message / Proposal Body:
                  </span>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs leading-relaxed text-slate-200 font-sans whitespace-pre-wrap selection:bg-amber-500/30">
                    {currentItem.draftContent}
                  </div>
                </div>

                {/* Sign-off Actions */}
                <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Status: {currentItem.status}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentItem.status === 'AWAITING_HUMAN_APPROVAL' ? (
                      <button
                        onClick={() => onApproveItem(currentItem.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Authorize & Approve Pitch</span>
                      </button>
                    ) : currentItem.status === 'APPROVED' ? (
                      <button
                        onClick={() => onDispatchItem(currentItem.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg transition"
                      >
                        <Send className="w-4 h-4" />
                        <span>Mark as Dispatched / Sent</span>
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-300 text-xs font-mono">
                        Dispatched by Executive
                      </span>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-500 font-mono">
                Select an item from the left panel to review.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
