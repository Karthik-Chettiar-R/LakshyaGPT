# LakshyaGPT

LakshyaGPT is an interactive AI entrepreneurship academy that teaches students how to turn real-world social and community problems into structured business ideas. Users choose a mission, such as traffic, corruption, bullying, rural healthcare, waste management, farmer compensation, sports development, or excessive screen time, and write a prompt describing their proposed startup.

The app evaluates the prompt in real time as it is written. A live prompt-strength meter checks whether the prompt includes the key ingredients of a strong business proposal:

- Business name
- Target audience
- AI role or persona
- Proposed solution
- Explanation of how AI will be used

The user receives an immediate score from 0% to 100%, with each required element contributing 20%. The interface also shows which elements have been detected and provides a prompt template and coaching guidance to help the user improve their idea.

When the prompt is submitted, LakshyaGPT performs a deeper AI evaluation using Google Gemini:

- **Strong prompt:** When all required fields are present, the app generates a professional startup report and an interactive business dashboard. This includes an executive summary, problem statement, business overview, target-audience analysis, improved AI solution, implementation strategy, revenue model, social impact, marketing strategy, growth opportunities, recommendations, brand identity, financial estimates, and an actionable launch checklist.
- **Weak or incomplete prompt:** When required information is missing, the app does not pretend the idea is fully developed. Instead, it returns a deliberately limited low-quality report, identifies the missing fields, and displays prompt-coach tips explaining how to improve the submission.

Successful submissions are tracked through a gamified experience system with attempts, mastered prompts, experience points, and user levels. The project is built with Next.js, React, TypeScript, Tailwind CSS, and the Vercel AI SDK, with a Next.js API route connecting the app to Google Gemini.
