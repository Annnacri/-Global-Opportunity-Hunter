import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Globe2, 
  Mail, 
  Phone, 
  ExternalLink, 
  ShieldCheck, 
  UserCheck, 
  Lock, 
  Send, 
  Copy, 
  Check, 
  Calendar, 
  Sparkles, 
  AlertOctagon,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers
} from 'lucide-react';
import { Prospect, PipelineStage } from '../types/prospect';

interface ProspectDossierModalProps {
  prospect: Prospect | null;
  onClose: () => void;
  onUpdateProspect: (updated: Prospect) => void;
  onAuthorizeAndSend: (prospect: Prospect) => void;
}

export const ProspectDossierModal: React.FC<ProspectDossierModalProps> = ({
  prospect,
  onClose,
  onUpdateProspect,
  onAuthorizeAndSend,
}) => {
  if (!prospect) return null;

  const [emailSubject, setEmailSubject] = useState(prospect.personalizedEmail.subject);
  const [emailBody, setEmailBody] = useState(prospect.personalizedEmail.body);
  const [copied, setCopied] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${emailSubject}\n\n${emailBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEmail = () => {
    onUpdateProspect({
      ...prospect,
      personalizedEmail: {
        ...prospect.personalizedEmail,
        subject: emailSubject,
        body: emailBody,
      },
    });
    setIsEditingEmail(false);
  };

  const handleSendViaClient = () => {
    // Authorized email integration trigger via standard mailto client or simulated authorized sender
    const recipient = prospect.publicContact.corporateEmail || '';
    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(emailBody);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    onAuthorizeAndSend(prospect);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-6 max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-xs">
              B2B
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  ACTIVE PROSPECTING DOSSIER
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-400">7-POINT COMMERCIAL QUALIFICATION</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1">
                {prospect.companyName}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copied' : 'Copy Pitch'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Governance Restriction Notice */}
        <div className="px-6 py-2 bg-amber-950/20 border-b border-amber-500/20 flex items-center gap-2.5 text-xs text-amber-300 font-mono">
          <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            HUMAN AUTHORIZATION REQUIRED: Agent 03 prepared this prospect independently. Actual external messages require human review and authorized dispatch.
          </span>
        </div>

        {/* Content Body: All 7 Points */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-300">
          
          {/* Points 1 & 2: Company ID & Business Research */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800">
                  {prospect.market}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-slate-800 text-slate-300">
                  {prospect.industry}
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40 font-bold">
                  {prospect.fitScore}/100 Match
                </span>

                <div className="flex items-center gap-1.5 ml-1">
                  <span className="text-[11px] font-mono text-slate-400">Stage:</span>
                  <select
                    value={prospect.pipelineStage}
                    onChange={(e) => {
                      const newStage = e.target.value as PipelineStage;
                      const newStatus =
                        newStage === 'Closed/Won'
                          ? 'CLOSED_WON'
                          : newStage === 'In Discussion'
                          ? 'IN_CONVERSATION'
                          : newStage === 'Contacted'
                          ? 'APPROVED_BY_HUMAN'
                          : 'PROSPECTED';
                      onUpdateProspect({
                        ...prospect,
                        pipelineStage: newStage,
                        status: newStatus,
                        lastUpdated: new Date().toISOString(),
                      });
                    }}
                    className={`px-2 py-0.5 rounded text-xs font-mono font-bold border focus:outline-none cursor-pointer ${
                      prospect.pipelineStage === 'Closed/Won' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                      prospect.pipelineStage === 'In Discussion' ? 'bg-indigo-950 text-indigo-300 border-indigo-800' :
                      prospect.pipelineStage === 'Contacted' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                      'bg-cyan-950 text-cyan-300 border-cyan-800'
                    }`}
                  >
                    <option value="Research">Stage 1: Research</option>
                    <option value="Contacted">Stage 2: Contacted</option>
                    <option value="In Discussion">Stage 3: In Discussion</option>
                    <option value="Closed/Won">Stage 4: Closed/Won</option>
                  </select>
                </div>
              </div>

              {prospect.website && (
                <a
                  href={prospect.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1"
                >
                  <span>{prospect.website}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div>
              <span className="text-xs uppercase font-mono text-slate-500 block mb-1">
                1 & 2. Business Overview & Operational Context
              </span>
              <p className="text-sm leading-relaxed text-slate-200">
                {prospect.businessSummary}
              </p>
            </div>

            {/* Potential Needs */}
            <div className="pt-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Identified Operational Needs & Inefficiencies:
              </span>
              <div className="space-y-1.5">
                {prospect.potentialNeeds.map((need, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span>{need}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Points 3 & 4: Public Contact & Decision Maker */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Point 3: Public Business Contact Information */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>3. Public Business Contact Info</span>
              </span>

              <div className="space-y-2 text-xs font-mono pt-1 text-slate-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="text-slate-200 font-semibold truncate">
                    {prospect.publicContact.corporateEmail || 'Via verified web portal'}
                  </span>
                </div>
                {prospect.publicContact.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{prospect.publicContact.phone}</span>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span className="text-slate-400">{prospect.publicContact.hqAddress || prospect.headquarters}</span>
                </div>
              </div>
            </div>

            {/* Point 4: Relevant Decision-Maker */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>4. Relevant Decision-Maker</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {prospect.decisionMaker.confidenceScore}
                </span>
              </div>

              <div className="pt-1">
                <div className="text-sm font-bold text-white">{prospect.decisionMaker.name}</div>
                <div className="text-xs text-emerald-300 font-mono mt-0.5">{prospect.decisionMaker.role}</div>
                <div className="text-[11px] text-slate-400 mt-1 font-mono">{prospect.decisionMaker.department}</div>
              </div>
            </div>
          </div>

          {/* Point 5: Matched AI Product & Commercial Solution */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>5. Matching AI Product / Solution</span>
            </span>

            <div className="text-base font-bold text-cyan-300">
              {prospect.matchingSolution.productName}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {prospect.matchingSolution.valueProposition}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono border-t border-slate-800">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Expected Client ROI:</span>
                <span className="text-emerald-400 font-semibold">{prospect.matchingSolution.expectedRoi}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Estimated Contract Value:</span>
                <span className="text-white font-semibold">{prospect.matchingSolution.estimatedContractValue}</span>
              </div>
            </div>
          </div>

          {/* Point 6: Personalized Commercial Email */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-amber-300 font-bold flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                <span>6. Personalized Commercial Outreach Email</span>
              </span>
              <button
                onClick={() => setIsEditingEmail(!isEditingEmail)}
                className="text-xs font-mono text-slate-400 hover:text-white transition"
              >
                {isEditingEmail ? 'Done Editing' : 'Customize Email'}
              </button>
            </div>

            {/* Email Subject */}
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Subject Line:</span>
              {isEditingEmail ? (
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                />
              ) : (
                <div className="font-mono text-xs font-bold text-white p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  {emailSubject}
                </div>
              )}
            </div>

            {/* Email Body */}
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Message Body:</span>
              {isEditingEmail ? (
                <textarea
                  rows={8}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-100 font-sans focus:outline-none focus:border-amber-500 leading-relaxed"
                />
              ) : (
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-wrap selection:bg-amber-500/30">
                  {emailBody}
                </div>
              )}
            </div>

            {isEditingEmail && (
              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={handleSaveEmail}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white font-mono"
                >
                  Save Customized Pitch
                </button>
              </div>
            )}
          </div>

          {/* Point 7: Recommended Next Sales Action & Multi-step Follow-up Strategy */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 border border-amber-500/30 space-y-4">
            <div>
              <span className="text-xs font-mono uppercase text-amber-300 font-bold block mb-1">
                7. Recommended Next Sales Action
              </span>
              <p className="text-sm font-semibold text-white">
                {prospect.nextSalesAction.action}
              </p>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-2">
                <span>Target Date: <strong className="text-slate-200">{prospect.nextSalesAction.targetDate}</strong></span>
                <span>Urgency: <strong className="text-amber-400">{prospect.nextSalesAction.urgency}</strong></span>
              </div>
            </div>

            {/* Multi-step Follow-up Strategy */}
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono uppercase text-slate-300 block mb-2">
                Multi-Touch Follow-up Sequence Cadence:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {prospect.followUpStrategy.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-emerald-400 font-bold">Day {step.day}</span>
                      <span className="text-slate-400">{step.channel}</span>
                    </div>
                    <div className="font-semibold text-slate-200">{step.objective}</div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{step.templateSnippet}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Authorization Action */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Status: {prospect.status}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendViaClient}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg transition active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>Authorize & Send via Email Integration</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
