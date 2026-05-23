import { BusinessMission } from './types';

export const MISSIONS: BusinessMission[] = [
  {
    id: 'lemonade',
    title: 'Lemonade Stand Empire',
    subtitle: 'Turn sour lemons into sweet profits.',
    description: 'You want to set up a lemonade stand in your local park. You need a business strategy that covers pricing, basic marketing, and operation costs. But remember: don\'t let the AI make all your decisions! Brainstorm the price and target audience yourself, and prompt the AI to do the manual structuring.',
    icon: 'Citrus',
    tips: [
      "Specify a Role: e.g. 'Act as a small business finance advisor.'",
      "State the Topic: e.g. 'Create a launching report for a lemonade stand.'",
      "Enforce Format: e.g. 'Structure the costing plan as a detailed table.'",
      "Provide Constraints: e.g. 'Use a budget of $30 and set the glass price at $1.50.'"
    ],
    placeholder: "Act as a small business finance advisor. Create a detailed launch plan for 'SqueezeFresh Lemonade' targeting weekend park visitors. Include a cost breakdown table with a $30 budget and a glass price of $1.50, and format the output with distinct headers and a 5-step checklist.",
    suggestedTemplate: "Act as a small business finance advisor. Create a launching report for my lemonade stand named '[Brand Name]' targeting [Target Audience]. Organize the cost details in a table, assuming a starting budget of [Budget] and selling each glass for [Glass Price]. Format it with bullet points and a launch checklist.",
    evalKeywords: {
      role: ['advisor', 'consultant', 'expert', 'marketer', 'analyst', 'planner', 'coach', 'assistant', 'strategist', 'accountant', 'specialist', 'mentor'],
      topic: ['lemonade', 'lemon', 'drink', 'beverage', 'juice', 'citrus', 'stand', 'booth', 'park', 'cup', 'glass'],
      format: ['table', 'bullet', 'list', 'checklist', 'heading', 'header', 'section', 'structure', 'format', 'chart', 'graph', 'schedules'],
      constraints: ['budget', '$', 'price', 'cost', 'dollar', 'target', 'audience', 'visitor', 'park', 'kid', 'family', 'teen', 'percent', 'margin', 'pricing', 'cents']
    }
  },
  {
    id: 'sneakers',
    title: 'Custom Sneaker Brand',
    subtitle: 'Kickstart a hype streetwear brand.',
    description: 'You are launching a custom sneaker brand online. You need a hype marketing plan, pricing strategy, and brand color theme. Tell the AI exactly who your target audience is, what aesthetic you want, and how to structure your brand deck!',
    icon: 'Footprints',
    tips: [
      "Establish AI Persona: e.g. 'Act as a streetwear brand director.'",
      "Clarify Core Focus: e.g. 'Write a hype marketing campaign for sneakers.'",
      "Demand Structure: e.g. 'Format with tables for launch steps and lists for colors.'",
      "Add Hard Details: e.g. 'Our brand is RetroKicks, color palette is neon green and dark violet, target is teen gamers.'"
    ],
    placeholder: "Act as a streetwear brand director. Write a hype marketing plan and brand identity guide for 'RetroKicks', a custom sneaker brand targeting teen gamers. Include a launch step-by-step checklist, a brand color scheme of cyberpunk neon green and dark violet, and manufacturing budget guidelines.",
    suggestedTemplate: "Act as a streetwear brand director. Create a hype launch report for '[Brand Name]' targeting [Target Audience]. Include a marketing calendar, a brand color scheme of [Color 1] and [Color 2], and structural tables detailing sneaker manufacturing costs and pricing strategies.",
    evalKeywords: {
      role: ['director', 'designer', 'consultant', 'marketer', 'streetwear', 'fashion', 'advisor', 'expert', 'specialist', 'producer', 'creative'],
      topic: ['sneaker', 'shoe', 'brand', 'footwear', 'kick', 'streetwear', 'hype', 'drop', 'apparel', 'kicks', 'laces', 'sole'],
      format: ['table', 'list', 'bullet', 'checklist', 'heading', 'section', 'calendar', 'timeline', 'guide', 'deck', 'structure', 'tabs'],
      constraints: ['target', 'audience', 'teen', 'gamer', 'kid', 'athlete', 'color', 'palette', 'aesthetic', 'neon', 'budget', '$', 'margin', 'price', 'dollar', 'manufacturing', 'cost']
    }
  },
  {
    id: 'bakery',
    title: 'Cupcake Sale & Bakery',
    subtitle: 'Bake plans for sweet success.',
    description: 'You are hosting a school bakery stall or cupcake sale. You need a production schedule, menu layout, and simple marketing pitch. Work out the starting ingredients budget, cupcake flavors, and what files/formats you need the AI to organize.',
    icon: 'Cake',
    tips: [
      "Choose AI Role: e.g. 'Act as a professional pastry chef and business planner.'",
      "Set the Mission: e.g. 'Create a bakery menu and operation schedule.'",
      "Specify Layout: e.g. 'Use bullet lists for the menu and tables for raw costs.'",
      "Provide constraints: e.g. 'We have a $40 ingredient budget and need to bake 60 cupcakes.'"
    ],
    placeholder: "Act as a professional pastry chef and business planner. Create a bakery menu and production schedule for a school bake sale named 'SweetTreats'. The ingredient budget is $40 to bake 60 cupcakes. Format the menu with bullet points showing prices, and the kitchen prep schedule in a step-by-step table.",
    suggestedTemplate: "Act as a professional chef. Create a bake sale report and menu for '[Bakery Name]' targeting [Target Audience]. Organize ingredient costs in a table with a total budget of [Budget] for [Quantity] cupcakes. Use bullet points for the menu and list promotional slogans.",
    evalKeywords: {
      role: ['chef', 'pastry', 'baker', 'manager', 'planner', 'advisor', 'consultant', 'expert', 'specialist', 'caterer'],
      topic: ['cupcake', 'cake', 'bakery', 'bake', 'cookie', 'sweet', 'treat', 'pastry', 'stall', 'sale', 'baking', 'frosting', 'oven'],
      format: ['menu', 'table', 'bullet', 'list', 'schedule', 'timeline', 'checklist', 'heading', 'format', 'structure', 'pitch'],
      constraints: ['budget', '$', 'cupcake', 'quantity', 'price', 'ingredient', 'cost', 'school', 'charity', 'flavor', 'slogan', 'prep', 'dollar', 'baking', 'pieces', 'batch']
    }
  },
  {
    id: 'startup',
    title: 'Mobile App Startup',
    subtitle: 'Code your way to the top.',
    description: 'You have an idea for a cool mobile app (like a homework helper or local trade app). You want to pitch it to investors! Ask the AI to write a high-impact startup pitch, define the core user problem, and plan the development phases. Do not let the AI guess the app\'s name or who it\'s for—tell it exactly!',
    icon: 'Smartphone',
    tips: [
      "Define the Persona: e.g. 'Act as a tech startup pitch advisor.'",
      "Name the Venture: e.g. 'Write an investor pitch for StudyBuddy app.'",
      "Structure requirements: e.g. 'Provide a 3-stage roadmap table and a bullet list of key features.'",
      "Supply Metrics & Targets: e.g. 'Target middle school students, aim for 1,000 launch users, and a development timeline of 3 months.'"
    ],
    placeholder: "Act as a tech startup pitch advisor. Write an investor pitch and features roadmap for 'StudyBuddy', a homework helper mobile app targeting middle school students. Structure the development phases as a 3-stage roadmap table, and list key features in bullet points. Target acquiring 1,000 launch users in 3 months.",
    suggestedTemplate: "Act as a tech startup advisor. Write an investor pitch and product features list for my mobile app named '[App Name]' targeting [Target Audience]. Organize the launch roadmap in a table across [Timeline] months, and list user acquisition ideas in structured bullet points.",
    evalKeywords: {
      role: ['advisor', 'investor', 'founder', 'analyst', 'consultant', 'director', 'expert', 'specialist', 'architect', 'strategist'],
      topic: ['app', 'mobile', 'software', 'tech', 'startup', 'application', 'platform', 'user', 'feature', 'ios', 'android', 'phone'],
      format: ['pitch', 'roadmap', 'table', 'timeline', 'list', 'bullet', 'phase', 'stage', 'framework', 'deck', 'structure', 'format'],
      constraints: ['target', 'audience', 'user', 'student', 'kid', 'teen', 'month', 'timeline', 'feature', 'problem', 'solve', 'acquisition', 'download', 'metrics', 'budget', '$', 'downloads']
    }
  }
];
