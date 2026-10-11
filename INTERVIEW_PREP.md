# LakshyaGPT - Complete Interview Preparation Guide

> **Note:** This document is optimized for TCS Prime interview preparation. Read through this before your interview tomorrow!

---

## 📋 Table of Contents

1. [Project Overview - The "Elevator Pitch"](#1-project-overview---the-elevator-pitch)
2. [Technical Architecture Deep Dive](#2-technical-architecture-deep-dive)
3. [Tech Stack Breakdown](#3-tech-stack-breakdown)
4. [Key Features & Implementation Details](#4-key-features--implementation-details)
5. [Interview Q\&A - By Difficulty Level](#5-interview-qa---by-difficulty-level)
6. [ TCS-Specific Questions You Might Get](#6-tcs-specific-questions-you-might-get)
7. [How to Explain Your Project](#7-how-to-explain-your-project)
8. [Quick Revision - Key Terms](#8-quick-revision---key-terms)

---

## 1. Project Overview - The "Elevator Pitch"

### One-Line Summary
**LakshyaGPT is an educational web application that teaches young students (kidpreneurs) how to write effective AI prompts to generate professional business proposals.**

### 2-Minute Explanation

> "I built **LakshyaGPT**, a Next.js web application for the **Kidpreneur Prompt Academy**. It's an interactive learning platform where students select a real-world business challenge—like Mumbai traffic, rural healthcare, or farmer payments—and learn to craft AI prompts that generate complete startup reports.
>
> The app has two key innovations:
> 1. **Real-time prompt scoring** - As users type, the app uses regex patterns to analyze their prompt and show which required fields they've included (business name, target audience, AI role, solution, AI usage)
> 2. **AI-powered report generation** - When the prompt meets quality standards, it calls Google's Gemini API through a secure server-side route to generate a full business dashboard including market analysis, financial projections, marketing strategy, and brand identity.
>
> I also added gamification with XP points, levels, and confetti celebrations to make learning engaging. The app persists progress in localStorage so users can continue where they left off."

---

## 2. Technical Architecture Deep Dive

### High-Level System Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           USER'S BROWSER                              │
│                                                                      │
│  ┌─────────────────┐    ┌─────────────────┐    ┌───────────────┐ │
│  │ Mission Select │───▶│ Prompt Input    │───▶│ Live Scoring │ │
│  │ (8 Missions)   │    │ (Textarea)      │    │ (Regex)       │ │
│  └─────────────────┘    └─────────────────┘    └───────┬───────┘ │
│                                                        │           │
│                                                        ▼           │
│  ┌────────────────────────────────────────────────────────────────┐│
│  │                     REACT STATE MANAGEMENT                     ││
│  │  • selectedMission    • liveScore    • result    • exp      ││
│  │  • promptInput        • isLoading    • dashboard  • level   ││
│  └────────────────────────────────────────────────────────────────┘│
│                                │                                      │
│                                ▼                                      │
│                     POST /api/prompt                                 │
└────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      NEXT.JS SERVER (API ROUTE)                      │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                    SYSTEM INSTRUCTION                           │ │
│  │  "You are an elite startup incubator coach..."                │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                │                                      │
│                                ▼                                      │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │              VALIDATION LAYER (Zod Schema)                    │ │
│  │  • isValid (boolean)                                          │ │
│  │  • score (0-100)                                              │ │
│  │  • missingFields, coachTips, dashboard                        │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                │                                      │
│                                ▼                                      │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                  GEMINI 2.5 FLASH API                         │ │
│  │                  (Google Generative AI)                        │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                │                                      │
│                                ▼                                      │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │              RESPONSE ROUTING                                   │ │
│  │  • isValid=true  → Full Dashboard (Excellent)                 │ │
│  │  • isValid=false → Fallback Text (Needs Improvement)          │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### Data Flow Walkthrough

1. **User lands on app** → Sees 8 mission cards (Traffic, Corruption, Bullying, etc.)
2. **Selects a mission** → Mission object loads into React state
3. **Types prompt** → Every keystroke triggers `useEffect` → regex scoring → live score badge updates
4. **Clicks "Execute Prompt"** → 
   - Loading state activates (scanning animation)
   - POST request sent to `/api/prompt` with `{ prompt, missionId, score }`
5. **Server receives request** →
   - Validates API key exists
   - Builds system instruction with mission context
   - Calls Gemini with prompt + schema
6. **Gemini responds** →
   - If 5/5 fields present → generates full dashboard JSON
   - If missing fields → returns lazy fallback + coach tips
7. **Client renders** →
   - Excellent grade → Full dashboard with 6 tabs + confetti
   - Needs Improvement → CRT terminal style + coach advice

### Key Design Decisions

| Decision | Why It Matters |
|----------|----------------|
| **Client-side scoring first** | Instant feedback without API costs |
| **Server-side validation second** | Authoritative check, hides API key |
| **Zod for schema validation** | Prevents malformed AI responses from breaking UI |
| **localStorage for progress** | Simple persistence without backend DB |
| **Two-tier grading** | Clear success criteria for young learners |

---

## 3. Tech Stack Breakdown

### Core Technologies

| Technology | Version | Why Used |
|------------|---------|----------|
| **Next.js** | 16.2.6 | App Router, API routes, SSR capabilities |
| **React** | 19.2.4 | UI components, state management |
| **TypeScript** | 5.x | Type safety, better IDE support |
| **Tailwind CSS** | 4 | Utility-first styling, responsive design |
| **@ai-sdk/google** | 3.0.79 | Unified AI SDK for Gemini |
| **Zod** | 4.4.3 | Schema validation for AI responses |
| **canvas-confetti** | 1.9.4 | Celebration animation for success |
| **lucide-react** | 1.16.0 | Icon library |

### File Structure

```
lakshyagpt/
├── app/
│   ├── api/
│   │   └── prompt/
│   │       └── route.ts          # Server-side API route
│   ├── globals.css              # Global Tailwind styles
│   ├── layout.tsx               # Root layout with fonts
│   ├── missions.ts              # Mission data (8 scenarios)
│   ├── page.tsx                # Main UI (1800+ lines)
│   └── types.ts                # TypeScript interfaces
├── package.json                 # Dependencies
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript config
└── eslint.config.mjs            # Linting rules
```

---

## 4. Key Features & Implementation Details

### Feature 1: Real-Time Prompt Scoring

**Location:** [page.tsx:125-154](app/page.tsx#L125-L154)

```typescript
// This runs on every keystroke (useEffect dependency on promptInput)
useEffect(() => {
  if (!selectedMission) return;

  const text = promptInput;
  const lower = text.toLowerCase();

  // Regex patterns to detect required fields
  const hasBusinessName = /(name|brand|company|startup|venture|...)/i.test(lower);
  const hasTargetAudience = /(audience|customer|user|beneficiar|...)/i.test(lower);
  const hasAiRole = /(role|act as|expert|consultant|advisor|...)/i.test(lower);
  const hasSolution = /(solution|idea|plan|concept|approach|...)/i.test(lower);
  const hasAiUsage = /(ai (will|is|can|...)|use ai|using ai|...)/i.test(lower);
  const hasTagline = /(tagline|slogan|motto|catchphrase|...)/i.test(lower);

  // Each field = 20 points (optional tagline doesn't affect score)
  let score = 0;
  if (hasBusinessName) score += 20;
  if (hasTargetAudience) score += 20;
  if (hasAiRole) score += 20;
  if (hasSolution) score += 20;
  if (hasAiUsage) score += 20;

  setLiveScore({ total: score, ... });
}, [promptInput, selectedMission]);
```

**Why regex?** Fast, client-side, no API cost, instant feedback.

---

### Feature 2: API Route with Gemini Integration

**Location:** [route.ts:68-184](app/api/prompt/route.ts#L68-L184)

```typescript
// Server-side only - API key never exposed to client
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
});

// Zod schema ensures AI returns exactly what we need
const responseSchema = z.object({
  isValid: z.boolean(),
  score: z.number(),
  missingFields: z.array(z.string()),
  coachTips: z.array(z.string()),
  fallbackText: z.string(),
  dashboard: z.object({
    brandName: z.string(),
    tagline: z.string(),
    // ... full dashboard structure
  }).optional(),
});

export async function POST(req: NextRequest) {
  // 1. Validate API key exists
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing API Key' }, { status: 400 });
  }

  // 2. Build system instruction (the "persona" for Gemini)
  const systemInstruction = `You are an elite startup incubator coach...`;

  // 3. Call Gemini with structured output
  const result = await generateObject({
    model: google('gemini-2.5-flash'),
    schema: responseSchema,
    prompt: `Analyze the startup prompt for mission: "${missionId}"...`,
    system: systemInstruction,
  });

  // 4. Return appropriate response based on isValid
  if (parsedData.isValid && parsedData.dashboard) {
    return NextResponse.json({ grade: 'Excellent', dashboard: ... });
  } else {
    return NextResponse.json({ grade: 'Needs Improvement', ... });
  }
}
```

**Security:** API key stored in `.env.local`, accessed only server-side.

---

### Feature 3: Gamification System

**Location:** [page.tsx:94-122](app/page.tsx#L94-L122)

```typescript
// Load from localStorage on app start
useEffect(() => {
  const savedExp = localStorage.getItem("lakshya_exp");
  const savedAttempts = localStorage.getItem("lakshya_attempts");
  const savedSuccess = localStorage.getItem("lakshya_success");
  if (savedExp) setExp(parseInt(savedExp, 10));
  if (savedAttempts) setAttempts(parseInt(savedAttempts, 10));
  if (savedSuccess) setSuccessfulAttempts(parseInt(savedSuccess, 10));
}, []);

// Award XP based on performance
const addExp = (amount: number, isSuccess: boolean) => {
  const newExp = exp + amount;
  const newAttempts = attempts + 1;
  const newSuccess = successfulAttempts + (isSuccess ? 1 : 0);

  setExp(newExp);
  setAttempts(newAttempts);
  setSuccessfulAttempts(newSuccess);

  // Persist to localStorage
  localStorage.setItem("lakshya_exp", newExp.toString());
  localStorage.setItem("lakshya_attempts", newAttempts.toString());
  localStorage.setItem("lakshya_success", newSuccess.toString());
};

// Level calculation: 100 XP per level
const userLevel = Math.floor(exp / 100) + 1;
const expProgress = exp % 100;
```

**XP Awards:**
- Excellent prompt: +120 XP + confetti celebration
- Needs Improvement: +30 XP

---

### Feature 4: Interactive Financial Calculator

**Location:** [page.tsx:254-258](app/page.tsx#L254-L258), [786-908](app/page.tsx#L786-L908)

```typescript
// Derived state (no separate useState needed)
const computedMargin = calcRetailPrice - calcUnitCost;
const computedMarginPercent = calcRetailPrice > 0 
  ? (computedMargin / calcRetailPrice) * 100 
  : 0;
const computedMonthlyRevenue = calcRetailPrice * calcSalesVolume;
const computedMonthlyProfit = computedMargin * calcSalesVolume;

// UI shows interactive sliders that update these values in real-time
```

**User can adjust:**
- Unit Manufacturing Cost (slider)
- Customer Retail Price (slider)
- Estimated Sales Volume (slider)

**See instant:** Revenue, profit, and margin percentage updates

---

### Feature 5: The 8 Business Missions

**Location:** [missions.ts](app/missions.ts)

| ID | Title | Problem | Icon |
|----|-------|---------|------|
| traffic | Mumbai Traffic | 12M daily commuters, gridlock | Car |
| corruption | Corruption | Audit records, verify transactions | ShieldAlert |
| bullying | School Bullying | Mental health, safe spaces | UserX |
| hospitals | Rural Healthcare | No hospitals in villages | HeartPulse |
| garbage | Garbage Management | 1000s tons daily waste | Trash2 |
| farmers | Farmer Payments | Middlemen exploit farmers | Sprout |
| sports | Sports Development | No access to scouts/coaches | Trophy |
| screentime | Excessive Screen Time | Addiction affects focus/sleep | Smartphone |

---

## 5. Interview Q&A - By Difficulty Level

### Beginner Level

#### Q1: What is the purpose of the MISSIONS array? How would you add a new mission?

**Answer:**
The `MISSIONS` array stores all business challenge scenarios. Each mission has:
- `id`: Unique identifier
- `title`/`subtitle`/`description`: Display text
- `icon`: Lucide icon name for visual
- `tips`: Structured prompt guidance
- `placeholder`/`suggestedTemplate`: Example text

To add a new mission, append to the array in `missions.ts`:

```typescript
{
  id: 'water-scarcity',
  title: 'Water Scarcity',
  subtitle: 'Conserve water resources.',
  description: 'Many regions face water shortages...',
  icon: 'Droplets',
  tips: [...],
  placeholder: '...',
  suggestedTemplate: '...',
  evalKeywords: { role: [], topic: [], format: [], constraints: [] }
}
```

---

#### Q2: Explain the real-time prompt scoring system. Why is it client-side?

**Answer:**
The scoring uses regex patterns to detect 5 required fields:
- Business Name (20 pts)
- Target Audience (20 pts)
- AI Role (20 pts)
- Solution (20 pts)
- AI Usage (20 pts)

**Why client-side:**
1. **Instant feedback** - No API delay while typing
2. **No cost** - Doesn't consume Gemini credits
3. **Better UX** - Users see score update live

The server does authoritative validation using Gemini's AI.

---

#### Q3: What is Zod and why is it used in the API route?

**Answer:**
Zod is a TypeScript-first schema validation library. In this project:

```typescript
const responseSchema = z.object({
  isValid: z.boolean(),
  score: z.number(),
  dashboard: z.object({ ... }).optional(),
});
```

**Why Zod:**
1. **Runtime validation** - AI can return malformed JSON
2. **Type safety** - Auto-generates TypeScript types
3. **AI SDK integration** - `generateObject()` uses it for structured output
4. **Documentation** - Schema = self-documenting API contract

---

### Intermediate Level

#### Q4: How does the API handle different response types (Excellent vs Needs Improvement)?

**Answer:**
The server checks `parsedData.isValid`:

```typescript
if (parsedData.isValid && parsedData.dashboard) {
  return NextResponse.json({
    grade: 'Excellent',
    dashboard: parsedData.dashboard,  // Full report
    coachTips: parsedData.coachTips,
  });
} else {
  return NextResponse.json({
    grade: 'Needs Improvement',
    rawText: parsedData.fallbackText,  // Lazy response only
    coachTips: parsedData.coachTips,
  });
}
```

This implements the **Null Object pattern** - dashboard is optional.

---

#### Q5: Explain the gamification system and localStorage usage.

**Answer:**
Three values persisted:
- `lakshya_exp` - Total experience points
- `lakshya_attempts` - Total attempts made
- `lakshya_success` - Successful (Excellent) attempts

```typescript
// Load on mount
useEffect(() => {
  const savedExp = localStorage.getItem("lakshya_exp");
  if (savedExp) setExp(parseInt(savedExp, 10));
}, []);

// Save on update
localStorage.setItem("lakshya_exp", newExp.toString());

// Level = floor(exp / 100) + 1
const userLevel = Math.floor(exp / 100) + 1;
```

**XP Awards:**
- Excellent: +120 XP + confetti
- Needs Improvement: +30 XP

---

#### Q6: How does the financial calculator work? What React patterns are used?

**Answer:**
**Controlled inputs:**
```typescript
const [calcUnitCost, setCalcUnitCost] = useState<number>(0);
// ... sliders update state
```

**Derived state (no useState needed):**
```typescript
const computedMargin = calcRetailPrice - calcUnitCost;
const computedMarginPercent = calcRetailPrice > 0 
  ? (computedMargin / calcRetailPrice) * 100 
  : 0;
```

**Patterns used:**
1. **Derived state** - Computed from existing state
2. **Controlled components** - Inputs bound to state
3. **Conditional rendering** - Tab-based display

---

### Advanced Level

#### Q7: What security measures are implemented? What could be improved?

**Answer:**
**Current measures:**
- ✅ Server-side API key storage (not exposed to client)
- ✅ Input type validation (`typeof prompt !== 'string'`)
- ✅ Environment variable checks

**Potential improvements:**
1. **Rate limiting** - Prevent API abuse (e.g., Upstash)
2. **Input sanitization** - Sanitize before sending to Gemini
3. **Prompt injection prevention** - Validate user input
4. **Max token limits** - Prevent runaway billing

---

#### Q8: Why use hardcoded system instruction vs. vector database?

**Answer:**
**Hardcoded system instruction:**
- ✅ Simple, single file
- ✅ No infrastructure needed
- ❌ Higher token usage
- ❌ Hard to maintain if complex

**For 8 fixed missions**, hardcoded works well. Alternatives for larger scale:
- **Prompt templates** - Separate files per mission
- **Few-shot examples** - Add example prompt→response pairs
- **Vector database** - Retrieve relevant instructions dynamically

---

#### Q9: How would you add a third "Good" grade?

**Answer:**
1. **Update grading logic** (in system instruction):
   - 90-100% = Excellent
   - 60-89% = Good
   - 0-59% = Needs Improvement

2. **Update types** ([types.ts](app/types.ts)):
   ```typescript
   grade: 'Excellent' | 'Good' | 'Needs Improvement';
   ```

3. **Add UI component** - Partial dashboard for "Good" prompts

4. **Adjust XP**: Excellent: +120, Good: +60, Needs: +30

---

### Tech-Stack Specific

#### Q10: Why is "use client" at the top of page.tsx?

**Answer:**
"use client" marks this as a **Client Component** in Next.js App Router.

**Required because:**
- Uses `useState`, `useEffect`, `useRef` (React hooks)
- Handles events (form submit, button clicks)
- Uses browser APIs (navigator.clipboard)

**Next.js App Router:**
| Component | Can Use | Cannot Use |
|-----------|---------|------------|
| Server (default) | fetch, DB, secrets | useState, useEffect |
| Client ("use client") | useState, events | Server ops |

---

#### Q11: How does @ai-sdk/google integrate with the API route?

**Answer:**
```typescript
// 1. Create provider with API key
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// 2. Select model
const model = google('gemini-2.5-flash');

// 3. Generate with schema
const result = await generateObject({
  model: model,
  schema: responseSchema,
  prompt: '...',
  system: systemInstruction,
});
```

**Flow:**
1. `createGoogleGenerativeAI` → Factory with API key
2. `google('gemini-2.5-flash')` → Model instance
3. `generateObject` → Sends to Gemini, validates with Zod, returns typed object

---

## 6. TCS-Specific Questions You Might Get

### Project Explanation Questions

**Q: Tell me about your project.**
> "I built LakshyaGPT, an educational web application that teaches students to write effective AI prompts for business proposals. It's built with Next.js, React, TypeScript, and integrates with Google's Gemini AI. The app features real-time prompt scoring, gamification with XP and levels, and generates comprehensive business dashboards when users write quality prompts."

**Q: What problem does your project solve?**
> "It solves the problem of teaching prompt engineering to young students. Instead of abstract lessons, students select real-world challenges like traffic or healthcare, write prompts, and immediately see AI generate complete startup reports. It's like a hands-on apprenticeship for entrepreneurship."

**Q: Who is the target audience?**
> "The primary audience is students (kidpreneurs) learning about entrepreneurship and AI. It's designed for young learners with gamified elements, simple UI, and encouraging feedback."

### Technical Questions

**Q: What is the difference between useState and useEffect?**
> "useState creates reactive state that triggers re-renders when changed. useEffect runs side effects (data fetching, subscriptions, DOM manipulation) after render. useState is synchronous state; useEffect is for async operations."

**Q: Why client-side AND server-side validation?**
> "Client-side gives instant feedback while typing without API costs. Server-side is the authoritative check that actually calls the AI and hides the API key. Both are necessary for good UX + security."

**Q: What is Zod used for?**
> "Zod is a schema validation library. I use it to ensure the AI returns exactly the structure I expect—brandName, dashboard, checklist, etc. It validates at runtime and generates TypeScript types."

**Q: How do you secure API keys in Next.js?**
> "Store in .env.local (not committed to git). Access only in server-side code (API routes, getServerSideProps). Never expose to client components. Check if key exists before making API calls."

### HR/Managerial Questions

**Q: What was your biggest challenge?**
> "Making the prompt scoring accurate. Simple regex matching isn't perfect—users might use synonyms the regex doesn't catch. I solved it by being generous in matching and letting the server-side AI do the authoritative check."

**Q: What improvements would you make?**
> "Add user authentication so progress syncs across devices. Add more missions. Implement rate limiting for the API. Currently it's single-user; multi-user would need a database."

**Q: How do you handle errors?**
> "The API route has try-catch blocks. If Gemini fails, it returns a 500 error with the message. The UI shows an error state with instructions to check the API key. There's also client-side validation to prevent empty prompts."

---

## 7. How to Explain Your Project

### The 2-Minute Version

> "I built **LakshyaGPT**, a Next.js educational web app for the Kidpreneur Prompt Academy. It's an interactive platform where students select real-world business challenges—like Mumbai traffic, rural healthcare, or farmer payments—and learn to craft AI prompts that generate complete startup reports.
>
> The app has two key features:
> 1. **Real-time scoring** - As users type, regex patterns analyze their prompt for 5 required fields (business name, target audience, AI role, solution, AI usage) and show a live score
> 2. **AI-powered reports** - When the prompt meets quality standards, it calls Google's Gemini API through a secure server-side route to generate a full business dashboard with market analysis, financial projections, marketing strategy, and brand identity
>
> I also added gamification with XP points, levels, and confetti celebrations. The app uses localStorage to persist progress. Tech stack: Next.js, React, TypeScript, Tailwind CSS, Gemini AI SDK, Zod for validation."

### The 5-Minute Version

Add these details:

- **Architecture:** Client → API Route → Gemini → Response routing
- **Security:** API key stored server-side, never exposed
- **UX:** Two UI states (Excellent = full dashboard, Needs Improvement = coach tips)
- **Gamification:** 120 XP for success, 30 XP for attempt, levels every 100 XP
- **8 Missions:** Traffic, Corruption, Bullying, Hospitals, Garbage, Farmers, Sports, Screentime

---

## 8. Quick Revision - Key Terms

| Term | One-Line Definition |
|------|-------------------|
| **Next.js App Router** | Modern Next.js with file-based routing, server/client components |
| **API Route** | Server-side endpoint in `/app/api/*/route.ts` |
| **useState** | React hook for component state |
| **useEffect** | React hook for side effects after render |
| **Zod** | TypeScript schema validation library |
| **@ai-sdk/google** | Vercel's unified SDK for Google Gemini |
| **generateObject** | AI SDK function for structured JSON output |
| **Tailwind CSS** | Utility-first CSS framework |
| **localStorage** | Browser key-value storage for persistence |
| **Regex** | Pattern matching for text analysis |
| **System Instruction** | Persona/context sent to AI model |
| **Structured Output** | AI response conforming to a schema |

---

## 🎯 Final Checklist Before Interview

- [ ] Can explain project in 2 minutes
- [ ] Know tech stack (Next.js, React, TypeScript, Tailwind, Gemini)
- [ ] Know why client-side AND server-side validation
- [ ] Know how Zod is used
- [ ] Know how API key is secured
- [ ] Can explain the data flow
- [ ] Know the 5 required prompt fields
- [ ] Can explain gamification (XP, levels)
- [ ] Ready for "Tell me about your project"
- [ ] Ready for "What was your biggest challenge"

---

## 🚀 Good Luck!

You're well-prepared. Trust your preparation, be honest about what you don't know, and show enthusiasm. You've got this! 🍀

---

*Generated on: 2026-08-06*
*Project: LakshyaGPT v0.1.0*
