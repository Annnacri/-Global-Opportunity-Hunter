import { Opportunity, CeoReport, ResearchArea, GeographicReach, ActionApprovalItem } from '../types/opportunity';

export async function checkServerHealth() {
  try {
    const res = await fetch('/api/health');
    return await res.json();
  } catch (err) {
    return { status: 'OFFLINE', error: String(err) };
  }
}

export async function executeAutonomousHunt(params: {
  category: ResearchArea;
  reach: GeographicReach;
  customFocus?: string;
}): Promise<{ success: boolean; opportunities: Opportunity[]; groundingSources?: any[]; error?: string }> {
  try {
    const res = await fetch('/api/hunt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, opportunities: [], error: err.message || 'Network request failed' };
  }
}

export async function evaluateOpportunity(params: {
  targetName: string;
  targetUrl?: string;
  sector: string;
  rawNotes?: string;
}): Promise<{ success: boolean; opportunity?: Opportunity; error?: string }> {
  try {
    const res = await fetch('/api/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Evaluation failed' };
  }
}

export async function generateCeoBriefing(opportunities: Opportunity[]): Promise<{
  success: boolean;
  report?: CeoReport;
  error?: string;
}> {
  try {
    const res = await fetch('/api/ceo-briefing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ opportunities }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to synthesize CEO report' };
  }
}

export async function generateActionOutreach(params: {
  opportunity: Opportunity;
  tone?: string;
  customAngle?: string;
}): Promise<{
  success: boolean;
  draft?: {
    subject: string;
    body: string;
    targetRole: string;
    riskAssessment: string;
    restrictedActionNotice: string;
  };
  error?: string;
}> {
  try {
    const res = await fetch('/api/generate-outreach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to generate action draft' };
  }
}

export async function executeProspectHunt(params: {
  market: string;
  industry: string;
  targetQuery?: string;
}): Promise<{
  success: boolean;
  prospects?: any[];
  error?: string;
}> {
  try {
    const res = await fetch('/api/prospect-hunt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to scout prospects' };
  }
}

export async function generateCampaignCadence(params: {
  market: string;
  industry: string;
  productOffering: string;
}): Promise<{
  success: boolean;
  campaign?: any;
  error?: string;
}> {
  try {
    const res = await fetch('/api/generate-campaign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to generate campaign' };
  }
}

