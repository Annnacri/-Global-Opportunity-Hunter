export type ResearchArea =
  | 'AI Agents & Automation'
  | 'SaaS & White-Label'
  | 'Tourism & Hospitality Tech'
  | 'Web3 & RWA Tokenization'
  | 'Remote Projects & Collaborations'
  | 'Commercial Partnerships'
  | 'AI Implementation Services'
  | 'Tenders & Public Funding';

export type GeographicReach =
  | 'Portugal'
  | 'European Union'
  | 'United Kingdom'
  | 'United States'
  | 'Canada'
  | 'International Remote';

export interface OpportunityScoreBreakdown {
  revenuePotential: number; // max 25
  timeToFirstRevenue: number; // max 20
  marketDemand: number; // max 20
  implementationFeasibility: number; // max 15
  competitionAndDifferentiation: number; // max 10
  initialInvestmentRequired: number; // max 10
}

export interface Opportunity {
  id: string;
  name: string; // 1. Opportunity name
  country: string; // 2. Country and geographical reach
  reach: GeographicReach;
  organization: {
    name: string; // 3. Company or organization
    type: 'Enterprise' | 'Startup' | 'Public Body / Gov' | 'Consortium' | 'SME' | 'Ecosystem / DAO';
    website?: string;
    verifiedDomain: boolean;
  };
  category: ResearchArea;
  description: string; // 4. Description
  evidence: {
    sources: Array<{
      title: string;
      url: string;
      snippet?: string;
      publishedDate?: string;
    }>;
    verificationStatus: 'VERIFIED_REAL_ENTITY' | 'CROSS_REFERENCED_RFP' | 'PUBLIC_CALL_DOCUMENTED';
    investigationNotes: string;
  }; // 5. Evidence and source links
  commercialPotential: {
    estimatedValue: string; // 6. Commercial potential
    revenueModel: 'Fixed Contract' | 'Monthly Retainer' | 'Non-Repayable Grant' | 'Revenue Share' | 'SaaS Subscription' | 'Milestone Payment';
    scalability: 'High' | 'Medium' | 'Exceptional';
    annualRunRatePotential: string;
  };
  timeToFirstRevenue: {
    estimate: string; // 7. Estimated time to first revenue
    daysToFirstCash: number;
    initialMilestone: string;
  };
  requiredSkillsAndResources: string[]; // 8. Required skills and resources
  initialInvestment: {
    amount: string; // 9. Initial investment
    capitalIntensity: 'Zero / Sweat Equity' | 'Ultra Low (<€500)' | 'Low (<€2,000)' | 'Moderate (<€5,000)';
    breakdown: string;
  };
  mainRisks: Array<{
    risk: string;
    severity: 'Low' | 'Medium' | 'High';
    mitigation: string;
  }>; // 10. Main risks
  score: {
    total: number; // 11. Opportunity score (0–100)
    breakdown: OpportunityScoreBreakdown;
    rationales: {
      revenuePotential: string;
      timeToRevenue: string;
      marketDemand: string;
      feasibility: string;
      competition: string;
      investment: string;
    };
  };
  recommendedNextAction: {
    action: string; // 12. Recommended next action
    actionType: 'Proposal Draft' | 'RFP Tender Bid' | 'Strategic Partnership Inquiry' | 'Grant Application Prep' | 'Direct Commercial Pitch';
    targetContactRole?: string;
    humanApprovalNeeded: boolean;
    draftOutreachSubject?: string;
    draftOutreachBody?: string;
  };
  priorityTier: 'TOP_10' | 'IMMEDIATE_PRIORITY' | 'WATCHLIST' | 'EVALUATING';
  createdAt: string;
  lastUpdated: string;
}

export interface CeoReport {
  reportId: string;
  generatedAt: string;
  reportingAgent: string;
  targetExecutive: string;
  missionStatus: string;
  top10Opportunities: Opportunity[];
  top3ImmediatePriorities: Array<{
    opportunityId: string;
    name: string;
    whyImmediate: string;
    expectedYield: string;
    firstStepWeek1: string;
    riskProfile: string;
  }>;
  marketTrends: Array<{
    trend: string;
    direction: 'Surging' | 'Emerging' | 'Consolidating';
    relevanceToCEO: string;
    geography: string;
    actionableInsight: string;
  }>;
  potentialCustomersAndPartnerships: Array<{
    name: string;
    type: string;
    strategicFit: string;
    outreachAngle: string;
    targetGeo: string;
  }>;
  importantRisks: Array<{
    riskCategory: string;
    description: string;
    mitigationDirective: string;
  }>;
  recommendedActionsTimeline: Array<{
    timeframe: string;
    deliverables: string[];
    governanceGate: string;
  }>;
  executiveSummary: string;
}

export interface ActionApprovalItem {
  id: string;
  opportunityId: string;
  opportunityName: string;
  targetCompany: string;
  actionType: string;
  subject: string;
  draftContent: string;
  riskAssessment: string;
  status: 'AWAITING_HUMAN_APPROVAL' | 'APPROVED' | 'DISPATCHED' | 'REJECTED';
  restrictedActionNotice: string;
  createdAt: string;
}
