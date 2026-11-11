import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Calendar, 
  Layers, 
  CheckCircle2, 
  Plus, 
  Globe2, 
  Building2, 
  Loader2 
} from 'lucide-react';
import { CampaignCadence, ProspectMarket, ProspectIndustry } from '../types/prospect';
import { generateCampaignCadence } from '../services/api';

interface CampaignCadenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaigns: CampaignCadence[];
  onAddCampaign: (newCampaign: CampaignCadence) => void;
}

export const CampaignCadenceModal: React.FC<CampaignCadenceModalProps> = ({
  isOpen,
  onClose,
  campaigns,
  onAddCampaign,
}) => {
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignCadence>(
    campaigns[0] || null
  );
  const [isCreating, setIsCreating] = useState(false);
  const [market, setMarket] = useState<ProspectMarket>('Dubai, UAE');
  const [industry, setIndustry] = useState<ProspectIndustry>('Hotels and resorts');
  const [productOffering, setProductOffering] = useState(
    'Enterprise Sovereign Multilingual Concierge & Direct Booking Agent'
  );
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGenerateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await generateCampaignCadence({
        market,
        industry,
        productOffering,
      });

      if (res.success && res.campaign) {
        onAddCampaign(res.campaign);
        setSelectedCampaign(res.campaign);
        setIsCreating(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  OUTREACH CAMPAIGNS & FOLLOW-UP STRATEGIES
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-400">CADENCE MANAGER</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                B2B Multi-Touch Acquisition Cadences
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCreating(!isCreating)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isCreating ? 'View Active Cadences' : 'New Campaign'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {isCreating ? (
            /* Create New Campaign Form */
            <form onSubmit={handleGenerateCampaign} className="space-y-4 max-w-2xl mx-auto p-5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Generate Targeted Outreach Campaign & Follow-up Cadence</h3>
                <p className="text-slate-400 text-xs">
                  Agent 03 will design a multi-touch sequence tailored to the target market and industry pain points.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-slate-300 mb-1">Target Market</label>
                  <select
                    value={market}
                    onChange={(e: any) => setMarket(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Dubai, UAE">Dubai, UAE</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Portugal">Portugal</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="European Union">European Union</option>
                    <option value="Global International">Global International</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono uppercase text-slate-300 mb-1">Target Industry</label>
                  <select
                    value={industry}
                    onChange={(e: any) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                  >
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

              <div>
                <label className="block font-mono uppercase text-slate-300 mb-1">Product / Solution to Pitch</label>
                <input
                  type="text"
                  value={productOffering}
                  onChange={(e) => setProductOffering(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Cadence...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Campaign Cadence</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Active Campaigns List & Steps */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Campaigns Selector */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase text-slate-400 block px-1">
                  Active Outreach Campaigns ({campaigns.length})
                </span>

                {campaigns.map((camp) => (
                  <div
                    key={camp.id}
                    onClick={() => setSelectedCampaign(camp)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition text-left space-y-1.5 ${
                      selectedCampaign?.id === camp.id
                        ? 'border-cyan-500 bg-cyan-950/30 text-white'
                        : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-cyan-400 font-bold">{camp.targetMarket}</span>
                      <span className="text-emerald-400 bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-800/30">
                        {camp.status}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-slate-200">{camp.name}</div>
                    <div className="text-[11px] text-slate-400">{camp.targetIndustry}</div>
                  </div>
                ))}
              </div>

              {/* Right Column: Cadence Steps Visualization */}
              <div className="md:col-span-2 space-y-4">
                {selectedCampaign ? (
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                          CAMPAIGN CADENCE SEQUENCE
                        </span>
                        <h3 className="text-base font-bold text-white mt-1">
                          {selectedCampaign.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <span>Market: {selectedCampaign.targetMarket}</span>
                          <span>•</span>
                          <span>Industry: {selectedCampaign.targetIndustry}</span>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 text-slate-300 border border-slate-700">
                        {selectedCampaign.steps.length} Touchpoints
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs">
                      <span className="font-mono text-slate-500 uppercase text-[10px] block mb-0.5">Offered Solution:</span>
                      <span className="font-semibold text-emerald-300">{selectedCampaign.offeredProduct}</span>
                    </div>

                    {/* Step Timeline */}
                    <div className="space-y-3 pt-2">
                      {selectedCampaign.steps.map((step) => (
                        <div
                          key={step.stepNumber}
                          className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1.5 relative pl-10"
                        >
                          <div className="absolute left-3 top-3.5 w-5 h-5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/40 text-[10px] font-mono font-bold flex items-center justify-center">
                            {step.stepNumber}
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-200">{step.title}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                              Day {step.delayDays} • {step.channel}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {step.contentOutline}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center text-slate-500 font-mono">
                    Select a campaign cadence to inspect touchpoints.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
