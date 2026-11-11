export type ProspectMarket =
  | 'Portugal'
  | 'Dubai, UAE'
  | 'United Arab Emirates'
  | 'Saudi Arabia'
  | 'Qatar'
  | 'United Kingdom'
  | 'United States'
  | 'European Union'
  | 'Global International';

export type ProspectIndustry =
  | 'Hotels and resorts'
  | 'Tourism and hospitality'
  | 'Travel agencies'
  | 'Real estate'
  | 'Technology companies'
  | 'Businesses requiring AI automation'
  | 'Companies interested in custom AI agents and SaaS solutions';

export interface DecisionMaker {
  name: string;
  role: string;
  linkedinUrl?: string;
  email?: string;
  department: string;
  confidenceScore: 'VERIFIED' | 'IDENTIFIED_ROLE' | 'PUBLIC_CONTACT';
}

export interface FollowUpStep {
  day: number;
  channel: 'Email' | 'LinkedIn' | 'Follow-up Email' | 'Phone/WhatsApp';
  objective: string;
  subject?: string;
  templateSnippet: string;
}

export type PipelineStage = 'Research' | 'Contacted' | 'In Discussion' | 'Closed/Won';

export interface Prospect {
  id: string;
  companyName: string; // 1. Identify company
  market: ProspectMarket;
  industry: ProspectIndustry;
  pipelineStage: PipelineStage; // Sales Pipeline Stage: Research | Contacted | In Discussion | Closed/Won
  website: string;
  headquarters: string;
  businessSummary: string; // 2. Research business
  potentialNeeds: string[]; // 2. Potential needs
  publicContact: {
    corporateEmail?: string; // 3. Public contact info
    phone?: string;
    hqAddress?: string;
    contactPageUrl?: string;
    verifiedOnWeb: boolean;
  };
  decisionMaker: DecisionMaker; // 4. Relevant decision-maker
  matchingSolution: {
    productName: string; // 5. Matching product/service
    valueProposition: string;
    expectedRoi: string;
    estimatedContractValue: string;
  };
  personalizedEmail: {
    subject: string; // 6. Personalized commercial email
    body: string;
    callToAction: string;
    personalizedHook: string;
  };
  nextSalesAction: {
    action: string; // 7. Recommended next sales action
    targetDate: string;
    urgency: 'High' | 'Medium' | 'Immediate';
    requiresHumanApproval: boolean;
  };
  followUpStrategy: FollowUpStep[]; // Follow-up strategy
  status: 'PROSPECTED' | 'OUTREACH_STAGED' | 'APPROVED_BY_HUMAN' | 'DISPATCHED' | 'IN_CONVERSATION' | 'CLOSED_WON';
  fitScore: number; // 0 to 100
  campaignTag?: string;
  createdAt: string;
  lastUpdated: string;
}

export interface CampaignCadence {
  id: string;
  name: string;
  targetMarket: ProspectMarket;
  targetIndustry: ProspectIndustry;
  offeredProduct: string;
  prospectCount: number;
  steps: Array<{
    stepNumber: number;
    delayDays: number;
    title: string;
    channel: string;
    contentOutline: string;
  }>;
  status: 'ACTIVE' | 'DRAFT' | 'PAUSED';
}
