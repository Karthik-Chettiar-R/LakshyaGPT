import { BusinessMission } from './types';

export const MISSIONS: BusinessMission[] = [
  {
    id: 'traffic',
    title: 'Mumbai Traffic',
    subtitle: 'Untangle the gridlock on Mumbai\'s busy streets.',
    description: 'Over 12 million people commute daily. Propose a business that uses AI to optimize routes, manage carpooling, or improve traffic flow in Mumbai.',
    icon: 'Car',
    tips: [
      "AI Role: E.g., 'Act as an expert traffic operations consultant'",
      "Business Name: E.g., 'TransitFlow'",
      "Rough Solution: E.g., 'A network of on-demand carpool shuttle buses'",
      "Target Audience: E.g., 'Daily office commuters in Mumbai'",
      "How AI is used: E.g., 'AI dynamically routes the shuttles and matches passengers'"
    ],
    placeholder: "AI Role: Act as an expert traffic operations consultant. Business Name: TransitFlow. Rough Solution: A network of on-demand carpool shuttle buses. Target Audience: Daily office commuters in Mumbai. Tagline: Commute Smart, Live Better. How AI is used: AI dynamically routes the shuttles and matches passengers based on real-time traffic.",
    suggestedTemplate: "AI Role: [Role]. Business Name: [Name]. Rough Solution: [Solution]. Target Audience: [Audience]. Tagline: [Tagline]. How AI is used: [AI Usage].",
    evalKeywords: { role: [], topic: [], format: [], constraints: [] }
  },
  {
    id: 'corruption',
    title: 'Corruption',
    subtitle: 'Promote transparency and accountability.',
    description: 'Corruption drains public resources and trust. Build a business solution using AI to audit records, verify transactions, or report misconduct anonymously.',
    icon: 'ShieldAlert',
    tips: [
      "AI Role: E.g., 'Act as an anti-corruption forensic auditing specialist'",
      "Business Name: E.g., 'VeriTrust'",
      "Rough Solution: E.g., 'An automated invoice verification platform'",
      "Target Audience: E.g., 'Municipal government departments'",
      "How AI is used: E.g., 'AI flags double-billing and vendor inflation patterns'"
    ],
    placeholder: "AI Role: Act as an anti-corruption forensic auditing specialist. Business Name: VeriTrust. Rough Solution: An automated invoice verification platform. Target Audience: Municipal government departments. Tagline: Clean Ledger, Trustworthy Governance. How AI is used: AI flags double-billing and vendor inflation patterns by cross-referencing spending receipts.",
    suggestedTemplate: "AI Role: [Role]. Business Name: [Name]. Rough Solution: [Solution]. Target Audience: [Audience]. Tagline: [Tagline]. How AI is used: [AI Usage].",
    evalKeywords: { role: [], topic: [], format: [], constraints: [] }
  },
  {
    id: 'bullying',
    title: 'School Bullying',
    subtitle: 'Create safe spaces for every student.',
    description: 'Bullying harms mental health and school culture. Propose an AI-powered reporting app, empathy coaching chatbot, or sentiment analysis tool to detect harassment.',
    icon: 'UserX',
    tips: [
      "AI Role: E.g., 'Act as an empathetic counselor and school safety advocate'",
      "Business Name: E.g., 'SafeSpace'",
      "Rough Solution: E.g., 'An anonymous peer reporting chatbot'",
      "Target Audience: E.g., 'High school guidance counselors and students'",
      "How AI is used: E.g., 'AI analyzes threat level and connects students to counselors'"
    ],
    placeholder: "AI Role: Act as an empathetic counselor and school safety advocate. Business Name: SafeSpace. Rough Solution: An anonymous peer reporting chatbot. Target Audience: High school guidance counselors and students. Tagline: You Are Not Alone. How AI is used: AI analyzes conversational sentiment to de-escalate stress and alert human counselors in severe cases.",
    suggestedTemplate: "AI Role: [Role]. Business Name: [Name]. Rough Solution: [Solution]. Target Audience: [Audience]. Tagline: [Tagline]. How AI is used: [AI Usage].",
    evalKeywords: { role: [], topic: [], format: [], constraints: [] }
  },
  {
    id: 'hospitals',
    title: 'Lack of Hospitals in Rural Areas',
    subtitle: 'Bridge the healthcare gap in remote villages.',
    description: 'Rural communities lack quick access to emergency care. Design a business providing AI diagnostic assistants, smart telemedicine kiosks, or drone delivery for medical supplies.',
    icon: 'HeartPulse',
    tips: [
      "AI Role: E.g., 'Act as a rural healthcare access and public health advisor'",
      "Business Name: E.g., 'GramDoc'",
      "Rough Solution: E.g., 'Deploy diagnostic telemedicine kiosks with medical sensors'",
      "Target Audience: E.g., 'Rural village residents'",
      "How AI is used: E.g., 'AI interprets local sensor data and flags triage priority'"
    ],
    placeholder: "AI Role: Act as a rural healthcare access and public health advisor. Business Name: GramDoc. Rough Solution: Deploy diagnostic telemedicine kiosks with medical sensors. Target Audience: Rural village residents. Tagline: Quality Care, No Matter the Distance. How AI is used: AI interprets local sensor data and flags triage priority to help remote doctors treat patients.",
    suggestedTemplate: "AI Role: [Role]. Business Name: [Name]. Rough Solution: [Solution]. Target Audience: [Audience]. Tagline: [Tagline]. How AI is used: [AI Usage].",
    evalKeywords: { role: [], topic: [], format: [], constraints: [] }
  },
  {
    id: 'garbage',
    title: 'Garbage Management in Cities',
    subtitle: 'Clean up urban waste streams.',
    description: 'Cities generate thousands of tons of garbage daily. Invent a business using AI to automate waste sorting, optimize municipal dump trucks, or reward public recycling.',
    icon: 'Trash2',
    tips: [
      "AI Role: E.g., 'Act as a smart city logistics and waste management advisor'",
      "Business Name: E.g., 'EcoCycle AI'",
      "Rough Solution: E.g., 'Color-coded smart bins that reward residents for sorting'",
      "Target Audience: E.g., 'Large urban apartment complexes'",
      "How AI is used: E.g., 'AI camera detects sorted items and awards recycling points'"
    ],
    placeholder: "AI Role: Act as a smart city logistics and waste management advisor. Business Name: EcoCycle AI. Rough Solution: Color-coded smart bins that reward residents for sorting. Target Audience: Large urban apartment complexes. Tagline: Scan, Sort, Reward. How AI is used: AI cameras detect sorted items and award recycling points directly in the resident mobile app.",
    suggestedTemplate: "AI Role: [Role]. Business Name: [Name]. Rough Solution: [Solution]. Target Audience: [Audience]. Tagline: [Tagline]. How AI is used: [AI Usage].",
    evalKeywords: { role: [], topic: [], format: [], constraints: [] }
  },
  {
    id: 'farmers',
    title: 'Farmers Getting Underpaid',
    subtitle: 'Empower agriculture with fair prices.',
    description: 'Middlemen exploit farmers, buying cheap and selling high. Pitch an AI platform that predicts market demand, matches farmers directly to bulk buyers, or optimizes supply chains.',
    icon: 'Sprout',
    tips: [
      "AI Role: E.g., 'Act as a fair-trade agritech supply chain analyst'",
      "Business Name: E.g., 'KisanDirect'",
      "Rough Solution: E.g., 'A digital crop marketplace connecting growers directly to retailers'",
      "Target Audience: E.g., 'Grassroots vegetable farmers'",
      "How AI is used: E.g., 'AI predicts urban market demand and advises fair crop pricing'"
    ],
    placeholder: "AI Role: Act as a fair-trade agritech supply chain analyst. Business Name: KisanDirect. Rough Solution: A digital crop marketplace connecting growers directly to retailers. Target Audience: Grassroots vegetable farmers. Tagline: Growth to the Grower. How AI is used: AI predicts urban market demand and advises fair crop pricing thresholds to protect farmers.",
    suggestedTemplate: "AI Role: [Role]. Business Name: [Name]. Rough Solution: [Solution]. Target Audience: [Audience]. Tagline: [Tagline]. How AI is used: [AI Usage].",
    evalKeywords: { role: [], topic: [], format: [], constraints: [] }
  },
  {
    id: 'sports',
    title: 'Sports Development',
    subtitle: 'Nurture athletic talent from grassroots.',
    description: 'Young talent lacks access to professional coaching and scouts. Propose a business that uses computer vision AI to analyze player moves or scout rising stars.',
    icon: 'Trophy',
    tips: [
      "AI Role: E.g., 'Act as a professional athletic performance coach and talent scout'",
      "Business Name: E.g., 'TalentLens'",
      "Rough Solution: E.g., 'A mobile app that processes training video submissions'",
      "Target Audience: E.g., 'Grassroots football athletes'",
      "How AI is used: E.g., 'AI computer vision tracks skeletal motion to provide feedback'"
    ],
    placeholder: "AI Role: Act as a professional athletic performance coach and talent scout. Business Name: TalentLens. Rough Solution: A mobile app that processes training video submissions. Target Audience: Grassroots football athletes. Tagline: Scouted from Anywhere. How AI is used: AI computer vision tracks skeletal motion to provide immediate physical posturing feedback.",
    suggestedTemplate: "AI Role: [Role]. Business Name: [Name]. Rough Solution: [Solution]. Target Audience: [Audience]. Tagline: [Tagline]. How AI is used: [AI Usage].",
    evalKeywords: { role: [], topic: [], format: [], constraints: [] }
  },
  {
    id: 'screentime',
    title: 'Excessive Screen Time',
    subtitle: 'Balance digital life and physical wellbeing.',
    description: 'Screen addiction affects focus, sleep, and relationships. Create an AI tool that tracks screen engagement, suggests active real-world alternative tasks, or coaches mindful habits.',
    icon: 'Smartphone',
    tips: [
      "AI Role: E.g., 'Act as a child development and digital wellness counselor'",
      "Business Name: E.g., 'Unplugged AI'",
      "Rough Solution: E.g., 'A gamified tracker that maps screen limits to physical play'",
      "Target Audience: E.g., 'Distracted students and worried parents'",
      "How AI is used: E.g., 'AI detects screen fatigue and triggers audio alerts for hobbies'"
    ],
    placeholder: "AI Role: Act as a child development and digital wellness counselor. Business Name: Unplugged AI. Rough Solution: A gamified tracker that maps screen limits to physical play. Target Audience: Distracted students and worried parents. Tagline: Connect to the Real World. How AI is used: AI detects screen fatigue and triggers smart audio alerts recommending physical hobbies.",
    suggestedTemplate: "AI Role: [Role]. Business Name: [Name]. Rough Solution: [Solution]. Target Audience: [Audience]. Tagline: [Tagline]. How AI is used: [AI Usage].",
    evalKeywords: { role: [], topic: [], format: [], constraints: [] }
  }
];
