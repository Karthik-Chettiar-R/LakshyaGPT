import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the Google Generative AI provider
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
});

// Zod schema for validation and generation output
const responseSchema = z.object({
  isValid: z.boolean(),
  score: z.number(),
  missingFields: z.array(z.string()),
  coachTips: z.array(z.string()),
  fallbackText: z.string(),
  dashboard: z.object({
    brandName: z.string(),
    tagline: z.string(),
    executiveSummary: z.string(),
    report: z.object({
      executiveSummary: z.string(),
      problemStatement: z.string(),
      businessOverview: z.string(),
      targetAudienceAnalysis: z.string(),
      improvedAiEnhancedSolution: z.string(),
      aiImplementationStrategy: z.string(),
      revenueModel: z.string(),
      socialImpact: z.string(),
      marketingStrategy: z.string(),
      futureGrowthOpportunities: z.string(),
      recommendations: z.string(),
      conclusion: z.string(),
    }),
    targetAudience: z.array(z.object({
      segment: z.string(),
      description: z.string(),
      interest: z.string(),
    })),
    financialModel: z.object({
      unitCost: z.number(),
      recommendedPrice: z.number(),
      estimatedSalesPerMonth: z.number(),
      explanation: z.string(),
    }),
    marketingStrategy: z.array(z.object({
      channel: z.string(),
      campaignIdea: z.string(),
      estimatedCost: z.string(),
    })),
    brandIdentity: z.object({
      colors: z.array(z.object({
        name: z.string(),
        hex: z.string(),
      })),
      logoConcept: z.string(),
      toneOfVoice: z.string(),
    }),
    checklist: z.array(z.object({
      id: z.string(),
      task: z.string(),
      category: z.enum(['Sourcing', 'Marketing', 'Operations', 'Finance']),
    })),
  }).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, missionId } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Invalid prompt provided.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json({
        error: 'Gemini API Key is missing or invalid. Please set your GEMINI_API_KEY in your .env.local file to unlock true AI generation!'
      }, { status: 400 });
    }

    const systemInstruction = `You are an elite, energetic, and highly professional startup incubator coach and entrepreneurial business advisor.
You are evaluating a student's business proposal for the predefined problem statement: "${missionId}".

The student has submitted the following prompt describing their proposed business:
"${prompt}"

Your tasks:

1. VALIDATION OF PROMPT FIELDS:
Analyze the student's prompt and check if they have provided information representing these 5 required fields and 1 optional field:
* Business Name (synonyms: startup name, company name, project name, brand name, name, etc.)
* Target Audience (synonyms: customers, users, beneficiaries, who is it for, targeting, etc.)
* AI Role / Persona (synonyms: act as, assume role, AI persona, expert type, perspective, role, etc.)
* Rough Solution (synonyms: idea, plan, concept, proposed solution, approach, method, business idea, etc.)
* Tagline (synonyms: tagline, slogan, motto, catchphrase, brand line, etc.) [OPTIONAL]
* How AI Will Be Used (synonyms: AI usage, how AI is used, AI features, AI integration, AI functionality, etc.)

Validation Rules:
- Be generous when validating.
- Accept minor wording variations.
- Accept natural language responses.
- Ignore field order.
- Ignore extra text.
- Do not require exact keywords.
- Consider fuzzy matching and synonym matching.

Set 'isValid' to true if and only if all 5 required fields (Business Name, Target Audience, AI Role, Rough Solution, How AI Will Be Used) are semantically present in the prompt. (Tagline is optional, so its absence does NOT make the prompt invalid).
Compute 'score' as the percentage of required fields present (20% for each present field, up to 100%).

If 'isValid' is false:
- Set 'missingFields' to the list of missing required fields (use labels: "Business Name", "Target Audience", "AI Role / Persona", "Rough Solution", "How AI Will Be Used").
- Write 2-3 friendly, constructive coaching tips in 'coachTips' on how they can improve their prompt to supply these missing details.
- Provide a bored, lazy, sarcastic, single-paragraph response under 80 words in 'fallbackText' (e.g. for traffic: "Here is a report. Carpool more. Charge money. Good luck."). Do not use bullet points or lists in 'fallbackText'.
- Do not include the 'dashboard' property in the JSON output (leave it undefined/omitted).

If 'isValid' is true:
- Set 'missingFields' to an empty array.
- Set 'coachTips' to a list of positive feedback (e.g. 2 tips praising their prompt).
- Set 'fallbackText' to an empty string.
- Generate a comprehensive Professional Business Report in the 'dashboard.report' field containing the following 12 sections. Each section must be a professional 1-2 paragraph description, written in a clear, startup-ready tone:
  1. executiveSummary: Executive Summary
  2. problemStatement: Problem Statement
  3. businessOverview: Business Overview
  4. targetAudienceAnalysis: Target Audience Analysis
  5. improvedAiEnhancedSolution: Improved AI-Enhanced Solution
  6. aiImplementationStrategy: AI Implementation Strategy
  7. revenueModel: Revenue Model
  8. socialImpact: Social Impact
  9. marketingStrategy: Marketing Strategy
  10. futureGrowthOpportunities: Future Growth Opportunities
  11. recommendations: Recommendations
  12. conclusion: Conclusion
- Generate structured 'dashboard' details for the premium widgets:
  - brandName: The business name they specified, or a creative brand name matching their idea.
  - tagline: The tagline they specified, or a catchy one you generate for them.
  - executiveSummary: A glowing 2-sentence summary of the business.
  - targetAudience: 3 specific customer segments with 'segment', 'description' (why they buy), and 'interest' (what grabs them).
  - financialModel:
    - unitCost: Reasonable cost in dollars (e.g. 0.50 to 5.00 for services, 10.00 to 50.00 for products).
    - recommendedPrice: Retail price in dollars.
    - estimatedSalesPerMonth: Realistic estimate (e.g. 20 to 1000).
    - explanation: A 1-2 sentence explanation of why this pricing model is recommended.
  - marketingStrategy: 3 creative campaign channels (channel name, campaign idea, estimated cost in dollars or 'Free').
  - brandIdentity:
    - colors: Array of 3 hex colors with names that represent the brand (e.g., matching neon colors if specified, or standard premium startup colors).
    - logoConcept: Visual description of a logo design.
    - toneOfVoice: 2-3 adjectives (e.g., 'Energetic, Friendly, Sincere').
  - checklist: Array of 6 concrete, actionable tasks across Sourcing, Marketing, Operations, and Finance (at least one in each category), with unique string IDs like 'task-1', 'task-2', etc.`;

    const result = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: responseSchema,
      prompt: `Analyze the startup prompt for mission: "${missionId}". Prompt: "${prompt}"`,
      system: systemInstruction,
    });

    const parsedData = result.object;

    if (parsedData.isValid && parsedData.dashboard) {
      return NextResponse.json({
        score: parsedData.score,
        grade: 'Excellent',
        rawText: `Successfully generated comprehensive startup report for ${parsedData.dashboard.brandName}.`,
        dashboard: parsedData.dashboard,
        coachTips: parsedData.coachTips,
      });
    } else {
      return NextResponse.json({
        score: parsedData.score,
        grade: 'Needs Improvement',
        rawText: parsedData.fallbackText || 'Validation failed. Please supply all required fields.',
        coachTips: parsedData.coachTips,
      });
    }
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    return NextResponse.json({
      error: `Something went wrong while connecting to the AI brain: ${error.message || error}`
    }, { status: 500 });
  }
}
