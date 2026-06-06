export interface BusinessMission {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  tips: string[];
  placeholder: string;
  suggestedTemplate: string;
  evalKeywords: {
    role: string[];
    topic: string[];
    format: string[];
    constraints: string[];
  };
}

export interface PromptScore {
  total: number;
  hasBusinessName: boolean;
  hasTargetAudience: boolean;
  hasAiRole: boolean;
  hasSolution: boolean;
  hasAiUsage: boolean;
  hasTagline: boolean;
}

export interface BusinessReport {
  executiveSummary: string;
  problemStatement: string;
  businessOverview: string;
  targetAudienceAnalysis: string;
  improvedAiEnhancedSolution: string;
  aiImplementationStrategy: string;
  revenueModel: string;
  socialImpact: string;
  marketingStrategy: string;
  futureGrowthOpportunities: string;
  recommendations: string;
  conclusion: string;
}

export interface DashboardData {
  brandName: string;
  tagline: string;
  executiveSummary: string;
  report?: BusinessReport;
  targetAudience: {
    segment: string;
    description: string;
    interest: string;
  }[];
  financialModel: {
    unitCost: number;
    recommendedPrice: number;
    estimatedSalesPerMonth: number;
    explanation: string;
  };
  marketingStrategy: {
    channel: string;
    campaignIdea: string;
    estimatedCost: string;
  }[];
  brandIdentity: {
    colors: { name: string; hex: string }[];
    logoConcept: string;
    toneOfVoice: string;
  };
  checklist: {
    id: string;
    task: string;
    category: 'Sourcing' | 'Marketing' | 'Operations' | 'Finance';
  }[];
}

export interface PromptResult {
  score: number;
  grade: 'Excellent' | 'Needs Improvement';
  rawText: string;
  dashboard?: DashboardData;
  coachTips: string[];
}

