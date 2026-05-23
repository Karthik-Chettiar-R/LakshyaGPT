import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, generateObject } from 'ai';
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the Google Generative AI provider with support for both environment variable names
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
});

// Define the dashboard schema using Zod
const dashboardSchema = z.object({
  brandName: z.string(),
  tagline: z.string(),
  executiveSummary: z.string(),
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
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, missionId, score } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Invalid prompt provided.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json({
        error: 'Gemini API Key is missing or invalid. Please set your GEMINI_API_KEY in your .env.local file to unlock true AI generation!'
      }, { status: 400 });
    }

    const isGoodPrompt = score >= 70;

    if (isGoodPrompt) {
      // 1. Excellent Prompt: Generate rich, structured JSON dashboard data
      const systemInstruction = `You are an elite, energetic, and highly professional startup incubator coach and entrepreneurial business advisor.
The kid has written an excellent, highly detailed prompt: "${prompt}" for their business mission: "${missionId}".
They have specified their role, format, and details!
You must generate a comprehensive, highly creative, and fully customized business roadmap and launch deck in a structured format.
Make the ideas exciting, kid-friendly, practical, and highly tailored to the specific details in their prompt (e.g. brand name, colors, budget, audience, product features if specified).

Generate a JSON object containing:
1. brandName: The brand name they specified, or a highly creative one if they didn't specify.
2. tagline: A catchy, energetic slogan.
3. executiveSummary: A glowing, professional 2-3 sentence overview of their startup launch.
4. targetAudience: An array of 3 customer segments (e.g. parents, school students, sports coaches). For each segment, provide:
   - segment: Segment name.
   - description: Why they will buy the product.
   - interest: What grabs their attention.
5. financialModel:
   - unitCost: A reasonable estimated unit cost in dollars (e.g., 0.25 to 1.50 for lemonade, 15.00 to 45.00 for sneakers, etc.).
   - recommendedPrice: A optimized retail price in dollars.
   - estimatedSalesPerMonth: A realistic target sales quantity for the first month (e.g. 50 to 500).
   - explanation: A short, simple 1-2 sentence explanation of why this pricing works and how they can maximize their margins.
6. marketingStrategy: An array of 3 high-impact marketing campaigns, specifying:
   - channel: e.g. "Social Media Hack", "School Flyers", "Local Event Partnership".
   - campaignIdea: A detailed, creative, fun launch campaign.
   - estimatedCost: A budget estimate (e.g. "$5", "Free", "$20").
7. brandIdentity:
   - colors: An array of 3 hex colors with names that represent their brand aesthetic (e.g., if they asked for cyberpunk neon green and dark violet, include exact matches).
   - logoConcept: A visual description of what their logo should look like.
   - toneOfVoice: 2-3 adjectives describing their brand voice (e.g., "Exciting, Trendy, Playful").
8. checklist: An array of 6 concrete, actionable tasks across categories: Sourcing, Marketing, Operations, Finance (at least one in each). Provide:
   - id: a unique string ID (e.g. "task-1", "task-2", etc.).
   - task: e.g. "Buy lemons and cups", "Design flyers on Canva".
   - category: Must be one of 'Sourcing', 'Marketing', 'Operations', 'Finance'.`;

      const result = await generateObject({
        model: google('gemini-2.5-flash'),
        schema: dashboardSchema,
        prompt: `Create a startup launch report for prompt: "${prompt}" and mission: "${missionId}"`,
        system: systemInstruction,
      });

      return NextResponse.json({
        score,
        grade: 'Excellent',
        rawText: `Successfully generated comprehensive startup report for ${result.object.brandName}.`,
        dashboard: result.object,
        coachTips: [
          'Brilliant work! You included a clear role, defined your topic, added specific formats, and gave solid constraints.',
          'Your prompt allowed the AI to execute the boring layout tasks while you did the creative brainstorming!',
        ],
      });
    } else {
      // 2. Bad Prompt: Generate a lazy, unstructured plain text response
      const systemInstruction = `You are a bored, lazy, and completely unhelpful AI assistant. 
The user has asked you to help them with a business plan for their mission: "${missionId}", but they wrote a very bad, short, and unstructured prompt: "${prompt}".
Because their prompt lacks details, roles, formatting, and constraints, you must write a very short, flat, unstructured, bulletless, and completely unhelpful paragraph. 
Make it feel intentionally lazy and slightly sarcastic, like a bored worker who does the absolute bare minimum.
Do not include tables, headers, lists, or details. Just a single block of plain, uninspiring text.
For example, if it's a lemonade stand: "Here is a report. Sell lemons in a cup. Charge money. Good luck."
Keep your response under 80 words.`;

      const result = await generateText({
        model: google('gemini-2.5-flash'),
        prompt: `Help me with my business plan. Here is my prompt: "${prompt}"`,
        system: systemInstruction,
      });

      // Provide coaching tips to help them improve
      const coachTips = [];
      const lower = prompt.toLowerCase();
      
      const hasRole = /act as|role|expert|consultant|analyst|planner|coach|specialist/i.test(lower);
      const hasFormat = /table|bullet|list|checklist|heading|structure/i.test(lower);
      const hasConstraints = /\b\d+\b|\$|budget|price|cost|target/i.test(lower);

      if (!hasRole) {
        coachTips.push('💡 Tip: Try assigning the AI a Role! E.g. "Act as a professional streetwear brand director."');
      }
      if (!hasFormat) {
        coachTips.push('📊 Tip: Demand a structure! Tell the AI to "Organize the pricing details in a structured table."');
      }
      if (!hasConstraints) {
        coachTips.push('🎯 Tip: Set constraints! Give the AI exact budgets, numbers, target audiences, or color palettes.');
      }
      if (prompt.split(/\s+/).length < 8) {
        coachTips.push('✍️ Tip: Write a longer prompt! A good prompt explains the context and does the thinking for the AI.');
      }

      if (coachTips.length === 0) {
        coachTips.push('💡 Tip: Add more detailed specifics like brand colors, budget limits, or target audiences to cross the 70% mark!');
      }

      return NextResponse.json({
        score,
        grade: 'Needs Improvement',
        rawText: result.text,
        coachTips,
      });
    }
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    return NextResponse.json({
      error: `Something went wrong while connecting to the AI brain: ${error.message || error}`
    }, { status: 500 });
  }
}
