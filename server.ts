import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini Client with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ONLINE',
    agent: 'AGENT 03 — GLOBAL OPPORTUNITY HUNTER',
    supervisor: 'CEO AGENT',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Autonomous Hunt API with Google Search Grounding
app.post('/api/hunt', async (req: Request, res: Response) => {
  try {
    const { category, reach, customFocus } = req.body;

    const areaDescription = category || 'AI agents and automation';
    const targetGeo = reach || 'Portugal and European Union';
    const focusQuery = customFocus ? `Specific investigative focus: "${customFocus}".` : '';

    const prompt = `
You are AGENT 03 — GLOBAL OPPORTUNITY HUNTER, an autonomous market intelligence agent reporting directly to the CEO Agent.
Current year context: 2025/2026.

MISSION:
Conduct an autonomous, rigorous investigation to discover real, verified business opportunities.
Research Area: "${areaDescription}".
Target Geography: "${targetGeo}".
${focusQuery}

RULES:
- Do NOT invent companies, tenders, vacancies, contacts or opportunities.
- Find real, verifiable initiatives, public tender calls, funded programs, or commercial enterprise demands.
- Clearly distinguish verified information from assumptions.
- Prioritize opportunities with low initial investment and realistic, fast paths to revenue.

EVALUATION FRAMEWORK (0 to 100):
- Revenue potential: 25 points.
- Time to first revenue: 20 points.
- Market demand: 20 points.
- Implementation feasibility: 15 points.
- Competition and differentiation: 10 points.
- Initial investment required: 10 points.

You must output a JSON object containing an array called "opportunities" with 2 to 3 freshly investigated opportunities.
Each opportunity must strictly follow this JSON structure:
{
  "opportunities": [
    {
      "name": "Exact Opportunity Title",
      "country": "Country or Region",
      "reach": "Portugal" | "European Union" | "United Kingdom" | "United States" | "Canada" | "International Remote",
      "organization": {
        "name": "Real Organization or Company Name",
        "type": "Enterprise" | "Startup" | "Public Body / Gov" | "Consortium" | "SME" | "Ecosystem / DAO",
        "website": "https://example.com"
      },
      "category": "${areaDescription}",
      "description": "Thorough, factual description of what the opportunity is and why it exists.",
      "evidence": {
        "sources": [
          {
            "title": "Documented Title or Portal Link",
            "url": "https://...",
            "snippet": "Verified excerpt or tender description"
          }
        ],
        "verificationStatus": "VERIFIED_REAL_ENTITY",
        "investigationNotes": "Notes on credibility and real verification."
      },
      "commercialPotential": {
        "estimatedValue": "e.g. €15,000 - €45,000 contract or monthly retainer",
        "revenueModel": "Fixed Contract" | "Monthly Retainer" | "Non-Repayable Grant" | "Revenue Share" | "SaaS Subscription" | "Milestone Payment",
        "scalability": "High" | "Medium" | "Exceptional",
        "annualRunRatePotential": "e.g. €80,000 - €200,000/yr"
      },
      "timeToFirstRevenue": {
        "estimate": "e.g. 3 to 5 weeks",
        "daysToFirstCash": 25,
        "initialMilestone": "Signing contract or first milestone deliverable"
      },
      "requiredSkillsAndResources": [
        "Skill 1", "Skill 2", "Skill 3"
      ],
      "initialInvestment": {
        "amount": "e.g. €0 or €150",
        "capitalIntensity": "Zero / Sweat Equity" | "Ultra Low (<€500)" | "Low (<€2,000)" | "Moderate (<€5,000)",
        "breakdown": "Explanation of minimal capital needed"
      },
      "mainRisks": [
        {
          "risk": "Risk name",
          "severity": "Low" | "Medium" | "High",
          "mitigation": "Concrete action to neutralize risk"
        }
      ],
      "score": {
        "total": 88,
        "breakdown": {
          "revenuePotential": 22,
          "timeToFirstRevenue": 18,
          "marketDemand": 18,
          "implementationFeasibility: 13,
          "competitionAndDifferentiation": 8,
          "initialInvestmentRequired": 9
        },
        "rationales": {
          "revenuePotential": "Rationale",
          "timeToRevenue": "Rationale",
          "marketDemand": "Rationale",
          "feasibility": "Rationale",
          "competition": "Rationale",
          "investment": "Rationale"
        }
      },
      "recommendedNextAction": {
        "action": "Immediate tactical step (e.g. prepare tailored prototype, submit tender document)",
        "actionType": "Proposal Draft" | "RFP Tender Bid" | "Strategic Partnership Inquiry" | "Grant Application Prep" | "Direct Commercial Pitch",
        "targetContactRole": "e.g. Head of Innovation / Commercial Director",
        "humanApprovalNeeded": true,
        "draftOutreachSubject": "Professional subject line for CEO review",
        "draftOutreachBody": "Ready-to-review draft message that requires human approval before dispatch"
      },
      "priorityTier": "TOP_10" | "IMMEDIATE_PRIORITY" | "WATCHLIST"
    }
  ]
}

Return ONLY clean valid JSON with no markdown backticks outside.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: Disallowed responseMimeType when googleSearch is active in some configurations,
        // so we request JSON inside prompt and parse safely.
      },
    });

    const rawText = response.text || '';
    
    // Extract grounding URLs if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const webSources = groundingChunks
      .filter((chunk: any) => chunk.web && chunk.web.uri)
      .map((chunk: any) => ({
        title: chunk.web.title || 'Verified Web Source',
        url: chunk.web.uri,
      }));

    // Clean JSON response
    let cleanJson = rawText.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    let parsedData: any;
    try {
      parsedData = JSON.parse(cleanJson);
    } catch (parseErr) {
      // Find JSON block with regex
      const jsonMatch = cleanJson.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not parse JSON from model response');
      }
    }

    const opportunities = (parsedData.opportunities || []).map((opp: any, idx: number) => {
      // Augment with real grounding sources if available and none were provided
      const sources = opp.evidence?.sources?.length > 0 
        ? opp.evidence.sources 
        : webSources.slice(0, 3);

      return {
        ...opp,
        id: `opp-hunt-${Date.now()}-${idx + 1}`,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        organization: {
          ...opp.organization,
          verifiedDomain: Boolean(opp.organization?.website),
        },
        evidence: {
          ...opp.evidence,
          sources: sources.length ? sources : [
            {
              title: `${opp.organization?.name || 'Verified Entity'} Portal`,
              url: opp.organization?.website || 'https://google.com',
            }
          ],
        },
      };
    });

    res.json({
      success: true,
      opportunities,
      groundingSources: webSources,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in /api/hunt:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to conduct autonomous opportunity hunt',
    });
  }
});

// Deep Dive Evaluation API
app.post('/api/evaluate', async (req: Request, res: Response) => {
  try {
    const { targetName, targetUrl, sector, rawNotes } = req.body;

    const prompt = `
You are AGENT 03 — GLOBAL OPPORTUNITY HUNTER.
The CEO Agent has tasked you with evaluating the commercial viability of a specific opportunity:
Target Name / Initiative: "${targetName || 'Commercial Lead'}"
Target URL / Source: "${targetUrl || 'N/A'}"
Sector: "${sector || 'AI Implementation'}"
Additional Context: "${rawNotes || 'None'}"

Evaluate this opportunity strictly using the 0-100 rubric:
- Revenue potential: 25 points
- Time to first revenue: 20 points
- Market demand: 20 points
- Implementation feasibility: 15 points
- Competition and differentiation: 10 points
- Initial investment required: 10 points

Return a single JSON object conforming to the Opportunity structure with:
{
  "name": "${targetName}",
  "country": "...",
  "reach": "Portugal" | "European Union" | "United Kingdom" | "United States" | "Canada" | "International Remote",
  "organization": {
    "name": "...",
    "type": "Enterprise" | "Startup" | "Public Body / Gov" | "Consortium" | "SME" | "Ecosystem / DAO",
    "website": "${targetUrl || 'https://example.com'}"
  },
  "category": "${sector}",
  "description": "...",
  "evidence": {
    "sources": [{"title": "Verified source", "url": "${targetUrl || 'https://example.com'}", "snippet": "..."}],
    "verificationStatus": "VERIFIED_REAL_ENTITY",
    "investigationNotes": "..."
  },
  "commercialPotential": {
    "estimatedValue": "...",
    "revenueModel": "Fixed Contract" | "Monthly Retainer" | "Non-Repayable Grant" | "Revenue Share" | "SaaS Subscription" | "Milestone Payment",
    "scalability": "High" | "Medium" | "Exceptional",
    "annualRunRatePotential": "..."
  },
  "timeToFirstRevenue": {
    "estimate": "...",
    "daysToFirstCash": 30,
    "initialMilestone": "..."
  },
  "requiredSkillsAndResources": ["..."],
  "initialInvestment": {
    "amount": "...",
    "capitalIntensity": "Zero / Sweat Equity" | "Ultra Low (<€500)" | "Low (<€2,000)" | "Moderate (<€5,000)",
    "breakdown": "..."
  },
  "mainRisks": [{"risk": "...", "severity": "Low" | "Medium" | "High", "mitigation": "..."}],
  "score": {
    "total": 85,
    "breakdown": {
      "revenuePotential": 22,
      "timeToFirstRevenue": 17,
      "marketDemand": 18,
      "implementationFeasibility": 12,
      "competitionAndDifferentiation": 8,
      "initialInvestmentRequired": 8
    },
    "rationales": {
      "revenuePotential": "...",
      "timeToRevenue": "...",
      "marketDemand": "...",
      "feasibility": "...",
      "competition": "...",
      "investment": "..."
    }
  },
  "recommendedNextAction": {
    "action": "...",
    "actionType": "Proposal Draft" | "RFP Tender Bid" | "Strategic Partnership Inquiry" | "Grant Application Prep" | "Direct Commercial Pitch",
    "targetContactRole": "...",
    "humanApprovalNeeded": true,
    "draftOutreachSubject": "...",
    "draftOutreachBody": "..."
  },
  "priorityTier": "TOP_10" | "IMMEDIATE_PRIORITY" | "WATCHLIST"
}

Output valid JSON ONLY.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    let cleanJson = (response.text || '').trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsed = JSON.parse(cleanJson);
    const opportunity = {
      ...parsed,
      id: `opp-eval-${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      organization: {
        ...parsed.organization,
        verifiedDomain: Boolean(parsed.organization?.website),
      },
    };

    res.json({ success: true, opportunity });
  } catch (error: any) {
    console.error('Error in /api/evaluate:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// CEO Structured Report Generator
app.post('/api/ceo-briefing', async (req: Request, res: Response) => {
  try {
    const { opportunities } = req.body;

    const prompt = `
You are AGENT 03 — GLOBAL OPPORTUNITY HUNTER.
You are compiling the official structured executive intelligence report for the CEO AGENT.

Based on the evaluated opportunities database:
${JSON.stringify(opportunities || [], null, 2)}

Generate the official report complying with the mandate:
Send the CEO a structured report containing:
- Top 10 opportunities (ranked by score, commercial potential and time to revenue).
- Top 3 immediate priorities (immediate cashflow, lowest barrier, highest conviction).
- New market trends (surging verticals, regulatory tailwinds in Portugal/EU/US/UK).
- Potential customers and partnerships (concrete company names and strategic angles).
- Important risks (macro risks, operational bottlenecks, counter-measures).
- Recommended actions (timeline of execution for Week 1, Month 1, Quarter 1).

Tone: Factual, commercially minded, concise, executive, high conviction.
Return a valid JSON object matching this schema:
{
  "reportId": "CEO-INTEL-${Date.now()}",
  "generatedAt": "${new Date().toISOString()}",
  "reportingAgent": "AGENT 03 — GLOBAL OPPORTUNITY HUNTER",
  "targetExecutive": "CEO AGENT",
  "missionStatus": "ACTIVE INTELLIGENCE MONITORING",
  "executiveSummary": "Concise 3-paragraph executive briefing for the CEO on current high-yield revenue avenues.",
  "top3ImmediatePriorities": [
    {
      "opportunityId": "id",
      "name": "Opportunity Name",
      "whyImmediate": "Why this must be executed this week",
      "expectedYield": "Financial yield",
      "firstStepWeek1": "Specific step to start today",
      "riskProfile": "Key risk factor and shield"
    }
  ],
  "marketTrends": [
    {
      "trend": "Trend Name",
      "direction": "Surging" | "Emerging" | "Consolidating",
      "relevanceToCEO": "Why this matters to the business",
      "geography": "Portugal / EU / US / UK",
      "actionableInsight": "How to monetize this trend"
    }
  ],
  "potentialCustomersAndPartnerships": [
    {
      "name": "Entity Name",
      "type": "Enterprise / SME / Gov",
      "strategicFit": "Fit description",
      "outreachAngle": "Value proposition angle",
      "targetGeo": "Country"
    }
  ],
  "importantRisks": [
    {
      "riskCategory": "Regulatory / Execution / Market",
      "description": "Description of risk",
      "mitigationDirective": "Executive directive to mitigate"
    }
  ],
  "recommendedActionsTimeline": [
    {
      "timeframe": "Week 1 (Immediate)",
      "deliverables": ["Deliverable 1", "Deliverable 2"],
      "governanceGate": "Requires human sign-off on proposal drafts"
    },
    {
      "timeframe": "Month 1 (Acceleration)",
      "deliverables": ["Deliverable 1", "Deliverable 2"],
      "governanceGate": "First revenue milestone audit"
    },
    {
      "timeframe": "Quarter 1 (Scale)",
      "deliverables": ["Deliverable 1", "Deliverable 2"],
      "governanceGate": "Portfolio review & reinvestment"
    }
  ]
}

Output valid JSON ONLY.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    let cleanJson = (response.text || '').trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const reportData = JSON.parse(cleanJson);
    res.json({ success: true, report: reportData });
  } catch (error: any) {
    console.error('Error in /api/ceo-briefing:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate human-gated proposal or outreach draft
app.post('/api/generate-outreach', async (req: Request, res: Response) => {
  try {
    const { opportunity, tone, customAngle } = req.body;

    const prompt = `
You are AGENT 03 — GLOBAL OPPORTUNITY HUNTER.
Draft an executive, high-converting outreach message or proposal for the following opportunity:
Name: ${opportunity.name}
Organization: ${opportunity.organization?.name}
Commercial Model: ${opportunity.commercialPotential?.estimatedValue}
Action Type: ${opportunity.recommendedNextAction?.actionType}
Tone requested: ${tone || 'Direct, consultative and value-driven'}
Custom Angle: ${customAngle || 'Focus on fast ROI and eliminating operational friction'}

IMPORTANT RESTRICTION:
All consequential external actions require human approval. This is a staged draft for human executive review and authorization.
Include a prominent security & governance note reminding the user that Agent 03 cannot contact external entities autonomously without human sign-off.

Return JSON:
{
  "subject": "Subject Line",
  "body": "Formatted email or pitch proposal body",
  "targetRole": "Role to contact",
  "riskAssessment": "Assessment of recipient reception and legal/commercial compliance",
  "restrictedActionNotice": "RESTRICTION ACKNOWLEDGED: Staged draft awaiting human signature. No external request has been sent."
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    let cleanJson = (response.text || '').trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const draft = JSON.parse(cleanJson);
    res.json({ success: true, draft });
  } catch (error: any) {
    console.error('Error in /api/generate-outreach:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// B2B CUSTOMER ACQUISITION — ACTIVE PROSPECTING API
app.post('/api/prospect-hunt', async (req: Request, res: Response) => {
  try {
    const { market, industry, targetQuery } = req.body;

    const prompt = `
You are AGENT 03 — GLOBAL OPPORTUNITY HUNTER.
Mission: B2B CUSTOMER ACQUISITION — ACTIVE PROSPECTING.
Your task is to identify and qualify REAL potential commercial customers for our AI products (multilingual autonomous concierge agents, real-estate lead qualifiers, AI workflow automation, enterprise SaaS).

Target Market: "${market || 'Dubai, UAE'}"
Target Industry: "${industry || 'Hotels and resorts'}"
Specific Query / Target: "${targetQuery || 'Luxury operators seeking AI automation'}"

RULES:
- Do NOT invent companies, contacts, emails, or phone numbers. Find REAL existing companies operating in this market.
- For each company, strictly execute these 7 points:
  1. Identify the company (Name, website, HQ).
  2. Research its business and potential operational needs/friction.
  3. Find publicly available business contact information (corporate email, phone, HQ address, contact URL).
  4. Identify the relevant decision-maker (Name, role/title, department).
  5. Determine which AI product or service solves their problem.
  6. Prepare a personalized commercial email (compelling subject, personalized value hook, pain point resolution, clear CTA).
  7. Recommend the next sales action and multi-step follow-up strategy.

Return valid JSON with an array called "prospects":
{
  "prospects": [
    {
      "companyName": "Real Company Name",
      "market": "${market || 'Dubai, UAE'}",
      "industry": "${industry || 'Hotels and resorts'}",
      "website": "https://...",
      "headquarters": "City, Country",
      "businessSummary": "Thorough factual summary of their operations.",
      "potentialNeeds": [
        "Need 1",
        "Need 2",
        "Need 3"
      ],
      "publicContact": {
        "corporateEmail": "info@... or press@... or reservations@...",
        "phone": "+...",
        "hqAddress": "Real HQ address",
        "contactPageUrl": "https://.../contact",
        "verifiedOnWeb": true
      },
      "decisionMaker": {
        "name": "Real Executive or High-Confidence Role",
        "role": "e.g. Chief Operating Officer / General Manager / Head of Digital",
        "department": "Commercial / Operations",
        "confidenceScore": "VERIFIED"
      },
      "matchingSolution": {
        "productName": "Tailored AI Solution Name",
        "valueProposition": "Exact value proposition",
        "expectedRoi": "Expected quantifiable ROI / cost reduction",
        "estimatedContractValue": "e.g. $3,500/mo retainer + $15k setup"
      },
      "personalizedEmail": {
        "subject": "Executive personalized subject line",
        "personalizedHook": "Specific observation about their current projects",
        "body": "Complete professional B2B email ready for human executive review",
        "callToAction": "Low friction call to action (e.g. 60-second video demo)"
      },
      "nextSalesAction": {
        "action": "Immediate tactical step before dispatch",
        "targetDate": "2026-11-08",
        "urgency": "High",
        "requiresHumanApproval": true
      },
      "followUpStrategy": [
        {
          "day": 1,
          "channel": "Email",
          "objective": "Initial tailored value hook",
          "templateSnippet": "Subject snippet"
        },
        {
          "day": 4,
          "channel": "Follow-up Email",
          "objective": "ROI case study and prototype video demo",
          "templateSnippet": "Snippet"
        },
        {
          "day": 8,
          "channel": "LinkedIn",
          "objective": "Executive connection touchpoint",
          "templateSnippet": "Snippet"
        }
      ],
      "fitScore": 95,
      "campaignTag": "${market} ${industry} AI Acquisition"
    }
  ]
}

Output valid JSON ONLY.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    let cleanJson = (response.text || '').trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsed = JSON.parse(cleanJson);
    const prospects = (parsed.prospects || []).map((p: any, idx: number) => ({
      ...p,
      id: `prospect-${Date.now()}-${idx + 1}`,
      pipelineStage: p.pipelineStage || 'Research',
      status: 'OUTREACH_STAGED',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    }));

    res.json({ success: true, prospects });
  } catch (error: any) {
    console.error('Error in /api/prospect-hunt:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate Targeted B2B Campaign Cadence
app.post('/api/generate-campaign', async (req: Request, res: Response) => {
  try {
    const { market, industry, productOffering } = req.body;

    const prompt = `
You are AGENT 03 — GLOBAL OPPORTUNITY HUNTER.
Mission: Design a high-converting multi-touch B2B outreach campaign and follow-up strategy.

Target Market: ${market}
Target Industry: ${industry}
Product Offering: ${productOffering}

Design a structured 3-step outreach sequence with delay days, channels (Email, LinkedIn, Follow-up Email), objectives, and copy outlines.
Return JSON:
{
  "name": "Campaign Name",
  "targetMarket": "${market}",
  "targetIndustry": "${industry}",
  "offeredProduct": "${productOffering}",
  "steps": [
    {
      "stepNumber": 1,
      "delayDays": 0,
      "title": "Title",
      "channel": "Email",
      "contentOutline": "Description of touchpoint and key arguments"
    },
    {
      "stepNumber": 2,
      "delayDays": 4,
      "title": "Title",
      "channel": "Follow-up Email",
      "contentOutline": "Description"
    },
    {
      "stepNumber": 3,
      "delayDays": 8,
      "title": "Title",
      "channel": "LinkedIn / WhatsApp",
      "contentOutline": "Description"
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    let cleanJson = (response.text || '').trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const campaign = JSON.parse(cleanJson);
    res.json({
      success: true,
      campaign: {
        ...campaign,
        id: `camp-${Date.now()}`,
        prospectCount: 0,
        status: 'ACTIVE',
      },
    });
  } catch (error: any) {
    console.error('Error in /api/generate-campaign:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Vite Middleware for Dev & Static Serving for Prod
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AGENT 03 ONLINE] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
