"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Smartphone,
  Sparkles,
  TrendingUp,
  Coins,
  MessageSquare,
  Rocket,
  Palette,
  CheckSquare,
  Info,
  Lock,
  Unlock,
  Settings,
  Send,
  Terminal,
  Brain,
  Award,
  BookOpen,
  ChevronsRight,
  Copy,
  Check,
  RotateCcw,
  ArrowLeft,
  X,
  Target,
  DollarSign,
  Car,
  ShieldAlert,
  UserX,
  HeartPulse,
  Trash2,
  Sprout,
  Trophy
} from "lucide-react";
import confetti from "canvas-confetti";
import { MISSIONS } from "./missions";
import { BusinessMission, PromptScore, PromptResult, DashboardData } from "./types";

// Helper component to render icons dynamically
const MissionIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "Car":
      return <Car className={className} />;
    case "ShieldAlert":
      return <ShieldAlert className={className} />;
    case "UserX":
      return <UserX className={className} />;
    case "HeartPulse":
      return <HeartPulse className={className} />;
    case "Trash2":
      return <Trash2 className={className} />;
    case "Sprout":
      return <Sprout className={className} />;
    case "Trophy":
      return <Trophy className={className} />;
    case "Smartphone":
      return <Smartphone className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export default function Home() {
  // Application State
  const [selectedMission, setSelectedMission] = useState<BusinessMission | null>(null);
  const [promptInput, setPromptInput] = useState<string>("");
  const [liveScore, setLiveScore] = useState<PromptScore>({
    total: 0,
    hasBusinessName: false,
    hasTargetAudience: false,
    hasAiRole: false,
    hasSolution: false,
    hasAiUsage: false,
    hasTagline: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [result, setResult] = useState<PromptResult | null>(null);
  const [showPromptCoach, setShowPromptCoach] = useState<boolean>(false);
  const [activeDashboardTab, setActiveDashboardTab] = useState<string>("report");

  // Calculator Interactive State
  const [calcUnitCost, setCalcUnitCost] = useState<number>(0);
  const [calcRetailPrice, setCalcRetailPrice] = useState<number>(0);
  const [calcSalesVolume, setCalcSalesVolume] = useState<number>(0);

  // Interactive Brand Checklist State
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [copySuccess, setCopySuccess] = useState<Record<string, boolean>>({});

  // Level & Experience System (persisted in localStorage)
  const [exp, setExp] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [successfulAttempts, setSuccessfulAttempts] = useState<number>(0);

  // Load stats on mount
  useEffect(() => {
    const savedExp = localStorage.getItem("lakshya_exp");
    const savedAttempts = localStorage.getItem("lakshya_attempts");
    const savedSuccess = localStorage.getItem("lakshya_success");
    if (savedExp) setExp(parseInt(savedExp, 10));
    if (savedAttempts) setAttempts(parseInt(savedAttempts, 10));
    if (savedSuccess) setSuccessfulAttempts(parseInt(savedSuccess, 10));
  }, []);

  // Update stats helper
  const addExp = (amount: number, isSuccess: boolean) => {
    const newExp = exp + amount;
    const newAttempts = attempts + 1;
    const newSuccess = successfulAttempts + (isSuccess ? 1 : 0);

    setExp(newExp);
    setAttempts(newAttempts);
    setSuccessfulAttempts(newSuccess);

    localStorage.setItem("lakshya_exp", newExp.toString());
    localStorage.setItem("lakshya_attempts", newAttempts.toString());
    localStorage.setItem("lakshya_success", newSuccess.toString());
  };

  // Evaluate the prompt locally in real-time as the user types
  useEffect(() => {
    if (!selectedMission) return;

    const text = promptInput;
    const lower = text.toLowerCase();

    const hasBusinessName = /(name|brand|company|startup|venture|project|business|called|titled|named|firm|agency)/i.test(lower);
    const hasTargetAudience = /(audience|audidence|customer|user|beneficiar|who is it for|who will use|target|aimed at|focus on|kids|student|commuter|farmer|citizen|people|patient|resident|athlete|scout|parent|counselor|government|department)/i.test(lower);
    const hasAiRole = /(role|act as|act like|assume|persona|expert|consultant|advisor|perspective|mentor|analyst|strategist|coach|specialist|assistant|agent|advocate|counselor)/i.test(lower);
    const hasSolution = /(solution|idea|plan|concept|approach|method|solve|service|product|app|platform|system|offer|proposal|pitch|business model|technology|tool|hardware|software|lock|kiosk|van|shuttle|bin|chatbot)/i.test(lower);
    const hasAiUsage = /(ai (will|is|can|to|could|should|usage|use|feature|integration|function|component|helper|buddy|chat|model|system|tool|implement)|use ai|using ai|artificial intelligence|machine learning|computer vision|skeletal vision|sentiment analysis|algorithms)/i.test(lower);
    const hasTagline = /(tagline|slogan|motto|catchphrase|phrase|brand line|brandline|saying|quote)/i.test(lower);

    let score = 0;
    if (hasBusinessName) score += 20;
    if (hasTargetAudience) score += 20;
    if (hasAiRole) score += 20;
    if (hasSolution) score += 20;
    if (hasAiUsage) score += 20;

    setLiveScore({
      total: score,
      hasBusinessName,
      hasTargetAudience,
      hasAiRole,
      hasSolution,
      hasAiUsage,
      hasTagline,
    });
  }, [promptInput, selectedMission]);

  // Reset calculator states when dashboard data loads
  useEffect(() => {
    if (result?.dashboard?.financialModel) {
      const model = result.dashboard.financialModel;
      setCalcUnitCost(model.unitCost);
      setCalcRetailPrice(model.recommendedPrice);
      setCalcSalesVolume(model.estimatedSalesPerMonth);

      // Initialize interactive checklist state
      const taskStates: Record<string, boolean> = {};
      result.dashboard.checklist.forEach(item => {
        taskStates[item.id] = false;
      });
      setCompletedTasks(taskStates);
    }
  }, [result]);

  // Calculate user level based on XP (100xp per level)
  const userLevel = Math.floor(exp / 100) + 1;
  const expProgress = exp % 100;

  // Handle template insertion
  const insertTemplate = () => {
    if (selectedMission) {
      setPromptInput(selectedMission.suggestedTemplate);
    }
  };

  // Submit Prompt to Next.js Secure Backend Router
  const handleSubmitPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMission || promptInput.trim() === "") return;

    setIsLoading(true);
    setApiError(null);
    setResult(null);
    setShowPromptCoach(false);

    try {
      const response = await fetch("/api/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptInput,
          missionId: selectedMission.id,
          score: liveScore.total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to communicate with AI");
      }

      setResult(data);

      if (data.grade === "Excellent") {
        // Fire celebration confetti!
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#8b5cf6", "#06b6d4", "#f43f5e", "#10b981"]
        });
        addExp(120, true);
        setActiveDashboardTab("report");
      } else {
        addExp(30, false);
        setShowPromptCoach(true);
      }
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || "Something went wrong. Make sure you set your API key in .env.local!");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle checklist item
  const toggleTask = (id: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Copy-to-clipboard utility
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopySuccess(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  // Interactive Financial Calculator Computations
  const computedMargin = calcRetailPrice - calcUnitCost;
  const computedMarginPercent = calcRetailPrice > 0 ? (computedMargin / calcRetailPrice) * 100 : 0;
  const computedMonthlyRevenue = calcRetailPrice * calcSalesVolume;
  const computedMonthlyProfit = computedMargin * calcSalesVolume;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">

      {/* Dynamic Background Glowing Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Modern Cyber Academy Header */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-violet-600 to-cyan-500 rounded-xl shadow-lg shadow-violet-500/20">
            <Brain className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-rose-400 text-transparent bg-clip-text tracking-tight">
              LakshyaGPT
            </h1>
            <p className="text-xs text-slate-400 font-medium">The Kidpreneur Prompt Academy</p>
          </div>
        </div>

        {/* Gamified Visual Stats Box */}
        <div className="flex items-center gap-6 glass-panel px-4 py-2 rounded-xl border border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
              <Award className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 leading-none">PROMPT LEVEL</p>
              <p className="text-sm font-bold text-violet-300">{userLevel}</p>
            </div>
          </div>

          <div className="w-32 hidden md:block">
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>XP PROGRESS</span>
              <span>{expProgress}/100</span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${expProgress}%` }}
              />
            </div>
          </div>

          <div className="flex gap-4 border-l border-white/10 pl-4 text-xs font-semibold text-slate-400">
            <div>
              <span className="text-white font-bold">{attempts}</span> Tries
            </div>
            <div>
              <span className="text-cyan-400 font-bold">{successfulAttempts}</span> Mastered
            </div>
          </div>
        </div>
      </header>

      {/* Main Sandbox Frame */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col justify-center">

        {/* State 1: Mission Selection Screen */}
        {!selectedMission ? (
          <div className="py-8 md:py-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="px-3 py-1 text-xs font-bold bg-violet-500/10 text-violet-300 border border-violet-500/20 rounded-full uppercase tracking-wider">
                Interactive Training Grounds
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-4 mb-4 tracking-tight">
                Select Your <span className="bg-gradient-to-r from-violet-400 to-cyan-300 text-transparent bg-clip-text">Business Mission</span>
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                Welcome, future founders! Pick a business challenge below. You will learn to think like an entrepreneur, design your core offer, and prompt the AI to compile and structure your launch!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {MISSIONS.map((mission) => (
                <div
                  key={mission.id}
                  onClick={() => setSelectedMission(mission)}
                  className="group relative cursor-pointer glass-panel p-6 rounded-2xl border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-slate-900/50 flex gap-5 overflow-hidden"
                >
                  {/* Glowing card ring */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center group-hover:border-violet-500/40 transition-colors">
                    <MissionIcon name={mission.icon} className="w-6 h-6 text-cyan-400 group-hover:text-violet-400 transition-colors" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors flex items-center gap-2">
                        {mission.title}
                        <ChevronsRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-violet-400" />
                      </h3>
                      <p className="text-xs font-semibold text-cyan-400/80 mb-2">{mission.subtitle}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{mission.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (

          /* State 2: Active Chat & Sandbox Screen */
          <div className="flex flex-col gap-6">

            {/* Top Navigation & Mission Summary Panel */}
            <div className="glass-panel p-4 rounded-xl border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedMission(null);
                    setPromptInput("");
                    setResult(null);
                    setApiError(null);
                  }}
                  className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-white/10 flex items-center justify-center">
                  <MissionIcon name={selectedMission.icon} className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-md font-bold text-white flex items-center gap-2">
                    {selectedMission.title}
                  </h3>
                  <p className="text-xs text-cyan-400/90">{selectedMission.subtitle}</p>
                </div>
              </div>

              {/* Quick instructions target */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-lg border border-white/5 text-[11px] max-w-md">
                <Target className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span className="text-slate-300">
                  <strong className="text-white">Goal:</strong> Target a Prompt Score of <strong className="text-emerald-400">100%</strong> by specifying the Business Name, Target Audience, AI Role, Solution, and AI Usage.
                </span>
              </div>
            </div>

            {/* Split Screen Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              {/* LEFT COLUMN: THE PROMPT COCH CONSOLE (5 COLS) */}
              <div className="lg:col-span-5 flex flex-col gap-6">

                {/* 1. Prompting Coach Instructions Card */}
                <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 uppercase tracking-wider">
                    <BookOpen className="w-4 h-4 text-violet-400" />
                    How to construct a great prompt
                  </h4>

                  <div className="grid grid-cols-1 gap-2.5">
                    {selectedMission.tips.map((tip, idx) => {
                      const label = tip.split(":")[0];
                      const val = tip.split(":")[1];
                      return (
                        <div key={idx} className="p-2.5 bg-slate-900/60 rounded-lg border border-white/5 text-xs flex gap-2 items-start">
                          <span className="w-5 h-5 rounded bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center font-bold flex-shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            <span className="text-violet-300 font-bold">{label}:</span>
                            <span className="text-slate-400">{val}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Chat Input and Live Typing Assistant */}
                <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col gap-4 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 uppercase tracking-wider">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      Prompt Sandbox Console
                    </h4>

                    {/* Active Template Helper Slinger */}
                    <button
                      onClick={insertTemplate}
                      className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 px-2 py-1 rounded bg-cyan-500/5 transition-all flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      Use Blueprint Template
                    </button>
                  </div>

                  {/* Real-time Prompt strength meter */}
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-white/5 flex flex-col gap-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-400">PROMPT STRENGTH</span>
                      <span className={`font-black ${liveScore.total === 100 ? "text-emerald-400" : liveScore.total >= 60 ? "text-yellow-400" : "text-rose-500"
                        }`}>
                        {liveScore.total}% {liveScore.total === 100 ? "(EXCELLENT)" : liveScore.total >= 60 ? "(OKAY)" : "(WEAK)"}
                      </span>
                    </div>

                    {/* Progress Slider bar */}
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden flex">
                      <div
                        className={`h-full transition-all duration-300 bg-gradient-to-r ${liveScore.total === 100
                            ? "from-violet-500 to-emerald-400"
                            : liveScore.total >= 60
                              ? "from-violet-500 to-yellow-400"
                              : "from-rose-600 to-rose-400"
                          }`}
                        style={{ width: `${liveScore.total}%` }}
                      />
                    </div>

                    {/* Live Blueprint Checklist Badges */}
                    <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/5">
                      <div className={`flex items-center gap-2 text-[10px] transition-colors duration-300 ${liveScore.hasAiRole ? "text-emerald-400" : "text-slate-500"
                        }`}>
                        <div className={`w-2 h-2 rounded-full ${liveScore.hasAiRole ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
                        <span>1. AI Role / Persona</span>
                      </div>
                      <div className={`flex items-center gap-2 text-[10px] transition-colors duration-300 ${liveScore.hasBusinessName ? "text-emerald-400" : "text-slate-500"
                        }`}>
                        <div className={`w-2 h-2 rounded-full ${liveScore.hasBusinessName ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
                        <span>2. Business Name</span>
                      </div>
                      <div className={`flex items-center gap-2 text-[10px] transition-colors duration-300 ${liveScore.hasSolution ? "text-emerald-400" : "text-slate-500"
                        }`}>
                        <div className={`w-2 h-2 rounded-full ${liveScore.hasSolution ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
                        <span>3. Rough Solution</span>
                      </div>
                      <div className={`flex items-center gap-2 text-[10px] transition-colors duration-300 ${liveScore.hasTargetAudience ? "text-emerald-400" : "text-slate-500"
                        }`}>
                        <div className={`w-2 h-2 rounded-full ${liveScore.hasTargetAudience ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
                        <span>4. Target Audience</span>
                      </div>
                      <div className={`flex items-center gap-2 text-[10px] transition-colors duration-300 ${liveScore.hasAiUsage ? "text-emerald-400" : "text-slate-500"
                        }`}>
                        <div className={`w-2 h-2 rounded-full ${liveScore.hasAiUsage ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
                        <span>5. AI Usage</span>
                      </div>
                      <div className={`flex items-center gap-2 text-[10px] transition-colors duration-300 ${liveScore.hasTagline ? "text-emerald-400/80" : "text-slate-500"
                        }`}>
                        <div className={`w-2 h-2 rounded-full ${liveScore.hasTagline ? "bg-emerald-400/80" : "bg-slate-600"}`} />
                        <span>6. Tagline (Optional)</span>
                      </div>
                    </div>
                  </div>

                  {/* Input TextArea */}
                  <form onSubmit={handleSubmitPrompt} className="flex flex-col gap-3">
                    <div className="relative">
                      <textarea
                        value={promptInput}
                        onChange={(e) => setPromptInput(e.target.value)}
                        placeholder={`Explain how you want the report... E.g. ${selectedMission.placeholder}`}
                        className="w-full min-h-[140px] max-h-[300px] p-4 bg-slate-900 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 text-xs font-mono leading-relaxed resize-y placeholder:text-slate-600 text-slate-100 outline-none transition-all"
                      />

                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold bg-slate-950/80 px-2 py-1 rounded border border-white/5">
                        <Lock className="w-3.5 h-3.5 text-rose-400" />
                        <span>Secure API Mode</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || promptInput.trim() === ""}
                      className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${promptInput.trim() === ""
                          ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5"
                          : "bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:brightness-110 shadow-violet-500/10 cursor-pointer active:scale-[0.98]"
                        }`}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>Generating AI Output...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Execute Prompt</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* RIGHT COLUMN: THE AI MATRIX OUTPUT (7 COLS) */}
              <div className="lg:col-span-7">

                {/* Visual State A: Loading Grid Scan */}
                {isLoading && (
                  <div className="glass-panel p-12 rounded-2xl border border-white/5 min-h-[480px] flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                    {/* Scanning Laser line */}
                    <div className="absolute left-0 right-0 h-0.5 bg-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-pulse" style={{
                      animation: 'scan 2s linear infinite',
                      top: '0%'
                    }} />
                    <style jsx>{`
                      @keyframes scan {
                        0% { top: 0%; }
                        50% { top: 100%; }
                        100% { top: 0%; }
                      }
                    `}</style>

                    <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mb-6 animate-pulse">
                      <Brain className="w-8 h-8 text-cyan-400" />
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 animate-bounce">Consulting the AI Brain</h3>
                    <p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed">
                      Analyzing prompt parameters against {selectedMission.title} guidelines. Fetching model data...
                    </p>

                    {/* Retro console mock logs */}
                    <div className="w-full max-w-md bg-slate-950 p-4 rounded-lg border border-white/5 font-mono text-[10px] text-left text-slate-500 space-y-1">
                      <p className="text-cyan-400">&gt; INITIALIZING SECURE NEXTJS SERVER ROUTE...</p>
                      <p>&gt; DETECTED PROMPT SCORE: {liveScore.total}%</p>
                      <p>&gt; DETECTED FIELDS: N={liveScore.hasBusinessName ? "1" : "0"} A={liveScore.hasTargetAudience ? "1" : "0"} R={liveScore.hasAiRole ? "1" : "0"} S={liveScore.hasSolution ? "1" : "0"} U={liveScore.hasAiUsage ? "1" : "0"}</p>
                      <p className="text-violet-400">&gt; TRANSMITTING STRUCTURAL INSTRUCTIONS TO GEMINI-2.5-FLASH...</p>
                      <p className="animate-pulse text-yellow-500">&gt; WAITING FOR RESPONSES FROM ORBITAL SERVERS...</p>
                    </div>
                  </div>
                )}

                {/* Visual State B: Default Idle Console */}
                {!isLoading && !result && !apiError && (
                  <div className="glass-panel p-12 rounded-2xl border border-white/5 min-h-[480px] flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center mb-6 text-slate-400">
                      <Terminal className="w-8 h-8 animate-pulse text-cyan-400/80" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">AI Execution Matrix</h3>
                    <p className="text-xs text-slate-400 max-w-md leading-relaxed mb-6">
                      Your generated business plans and dashboards will render here. Type in your prompt and execute it to see the outcomes!
                    </p>
                    <div className="px-4 py-2.5 bg-slate-900 rounded-lg border border-white/5 inline-flex items-center gap-2 text-xs">
                      <Lock className="w-3.5 h-3.5 text-rose-400" />
                      <span className="text-slate-400">Write a detailed prompt containing all required fields to unlock the dashboard!</span>
                    </div>
                  </div>
                )}

                {/* Visual State C: API Connection / Missing Key Error */}
                {!isLoading && apiError && (
                  <div className="glass-panel p-8 rounded-2xl border border-rose-500/20 bg-rose-950/10 min-h-[480px] flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-6 text-rose-400">
                      <Info className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">API Connection Failed</h3>
                    <p className="text-xs text-rose-300 max-w-md leading-relaxed mb-6">
                      {apiError}
                    </p>

                    <div className="w-full max-w-md bg-slate-950 p-4 rounded-xl border border-white/5 text-left text-xs text-slate-400 leading-relaxed space-y-2">
                      <p className="font-bold text-white flex items-center gap-1.5">
                        <Settings className="w-4 h-4 text-violet-400" />
                        How to add your API Key:
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-slate-400 pl-1 text-[11px]">
                        <li>Open the file explorer inside your editor.</li>
                        <li>Find the <code className="text-violet-400 bg-slate-900 px-1 py-0.5 rounded font-mono">.env.local</code> file in your project root.</li>
                        <li>Paste your Google AI Studio API key: <code className="text-cyan-400 bg-slate-900 px-1 py-0.5 rounded font-mono">GEMINI_API_KEY=AIzaSy...</code></li>
                        <li>Restart your dev server if needed and click "Execute Prompt" again!</li>
                      </ol>
                    </div>
                  </div>
                )}

                {/* Visual State D: Response loaded */}
                {!isLoading && result && (
                  <div className="flex flex-col gap-6">

                    {/* CASE D1: EXCELLENT PROMPT -> HIGH-FIDELITY BUSINESS DASHBOARD */}
                    {result.grade === "Excellent" && result.dashboard && (
                      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden flex flex-col min-h-[520px]">

                        {/* Premium Dashboard Header swatch */}
                        <div className="bg-gradient-to-r from-violet-900/40 via-cyan-900/40 to-slate-900 px-6 py-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2.5">
                              <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black rounded-full tracking-wider uppercase">
                                SUCCESS • 90%+ PROMPT
                              </span>
                              <span className="text-xs text-slate-400">Brand Portfolio</span>
                            </div>
                            <h2 className="text-2xl font-black text-white mt-1 tracking-tight">
                              {result.dashboard.brandName}
                            </h2>
                            <p className="text-xs text-cyan-300 italic font-medium">"{result.dashboard.tagline}"</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 font-semibold">Dashboard Theme:</span>
                            <div className="flex gap-1.5">
                              {result.dashboard.brandIdentity.colors.map((color, idx) => (
                                <div
                                  key={idx}
                                  className="w-4 h-4 rounded-full border border-white/20 shadow"
                                  style={{ backgroundColor: color.hex }}
                                  title={`${color.name}: ${color.hex}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Navigation Tabs bar */}
                        <div className="flex overflow-x-auto border-b border-white/5 bg-slate-950/60 scrollbar-none px-4">
                          {[
                            { id: "report", label: "Business Report", icon: BookOpen },
                            { id: "overview", label: "Launch Strategy", icon: Rocket },
                            { id: "financials", label: "Profit Calculator", icon: Coins },
                            { id: "marketing", label: "Marketing Campaigns", icon: MessageSquare },
                            { id: "brand", label: "Identity Deck", icon: Palette },
                            { id: "checklist", label: "Launch Steps", icon: CheckSquare },
                          ].map((tab) => {
                            const IconComp = tab.icon;
                            const isActive = activeDashboardTab === tab.id;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => setActiveDashboardTab(tab.id)}
                                className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${isActive
                                    ? "border-cyan-400 text-cyan-300 bg-cyan-400/5"
                                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/2"
                                  }`}
                              >
                                <IconComp className="w-4 h-4" />
                                {tab.label}
                              </button>
                            );
                          })}
                        </div>

                        {/* Dashboard Body Contents */}
                        <div className="p-6 flex-1 flex flex-col bg-slate-900/30">

                          {/* TAB: BUSINESS REPORT */}
                          {activeDashboardTab === "report" && result.dashboard?.report && (
                            <div className="space-y-6">
                              <div className="p-4 bg-gradient-to-r from-violet-600/10 to-cyan-500/10 rounded-xl border border-violet-500/20">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                  <BookOpen className="w-5 h-5 text-violet-400" />
                                  Professional Business Report
                                </h3>
                                <p className="text-xs text-slate-400 mt-1">
                                  This complete professional feasibility and startup deck is dynamically generated by LakshyaGPT AI.
                                </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                  { title: "1. Executive Summary", text: result.dashboard.report.executiveSummary, color: "text-violet-400" },
                                  { title: "2. Problem Statement", text: result.dashboard.report.problemStatement, color: "text-rose-400" },
                                  { title: "3. Business Overview", text: result.dashboard.report.businessOverview, color: "text-cyan-400" },
                                  { title: "4. Target Audience Analysis", text: result.dashboard.report.targetAudienceAnalysis, color: "text-amber-400" },
                                  { title: "5. Improved AI-Enhanced Solution", text: result.dashboard.report.improvedAiEnhancedSolution, color: "text-emerald-400" },
                                  { title: "6. AI Implementation Strategy", text: result.dashboard.report.aiImplementationStrategy, color: "text-sky-400" },
                                  { title: "7. Revenue Model", text: result.dashboard.report.revenueModel, color: "text-indigo-400" },
                                  { title: "8. Social Impact", text: result.dashboard.report.socialImpact, color: "text-teal-400" },
                                  { title: "9. Marketing Strategy", text: result.dashboard.report.marketingStrategy, color: "text-pink-400" },
                                  { title: "10. Future Growth Opportunities", text: result.dashboard.report.futureGrowthOpportunities, color: "text-orange-400" },
                                  { title: "11. Recommendations", text: result.dashboard.report.recommendations, color: "text-yellow-400" },
                                  { title: "12. Conclusion", text: result.dashboard.report.conclusion, color: "text-emerald-300" }
                                ].map((sec, idx) => (
                                  <div key={idx} className="p-5 bg-slate-950/60 rounded-xl border border-white/5 hover:border-white/10 transition-colors space-y-2">
                                    <h4 className={`text-xs font-bold ${sec.color} uppercase tracking-wider`}>
                                      {sec.title}
                                    </h4>
                                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                                      {sec.text}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* TAB 1: OVERVIEW */}
                          {activeDashboardTab === "overview" && (
                            <div className="space-y-6">
                              <div className="p-4 bg-slate-950/80 rounded-xl border border-white/5 space-y-2">
                                <h3 className="text-xs font-bold text-violet-400 flex items-center gap-1.5 uppercase">
                                  <Award className="w-4 h-4" />
                                  Executive Summary
                                </h3>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                  {result.dashboard.executiveSummary}
                                </p>
                              </div>

                              <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                  Target Market Segments
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {result.dashboard.targetAudience.map((audience, idx) => (
                                    <div key={idx} className="p-4 bg-slate-950/40 rounded-xl border border-white/5 flex flex-col justify-between hover:border-violet-500/20 transition-all">
                                      <div>
                                        <div className="w-7 h-7 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-xs font-black text-cyan-400 mb-3">
                                          0{idx + 1}
                                        </div>
                                        <h4 className="text-xs font-bold text-white mb-1.5">{audience.segment}</h4>
                                        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                                          {audience.description}
                                        </p>
                                      </div>
                                      <div className="pt-2.5 border-t border-white/5 text-[10px] text-cyan-300 font-semibold italic flex items-center gap-1">
                                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                                        <span>Focus: {audience.interest}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* TAB 2: INTERACTIVE FINANCIALS CALCULATOR */}
                          {activeDashboardTab === "financials" && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Controls Box */}
                                <div className="p-5 bg-slate-950/80 rounded-xl border border-white/5 space-y-4">
                                  <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <TrendingUp className="w-4 h-4" />
                                    Interactive Price Controls
                                  </h3>

                                  {/* Slider 1: Unit Cost */}
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-semibold">
                                      <span className="text-slate-400">Unit Manufacturing Cost</span>
                                      <span className="text-white">${calcUnitCost.toFixed(2)}</span>
                                    </div>
                                    <input
                                      type="range"
                                      min={Math.max(0.1, result.dashboard.financialModel.unitCost * 0.4)}
                                      max={result.dashboard.financialModel.unitCost * 2}
                                      step="0.05"
                                      value={calcUnitCost}
                                      onChange={(e) => setCalcUnitCost(parseFloat(e.target.value))}
                                      className="w-full h-1.5 bg-slate-900 rounded-full appearance-none cursor-pointer accent-cyan-400"
                                    />
                                  </div>

                                  {/* Slider 2: Retail Price */}
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-semibold">
                                      <span className="text-slate-400">Customer Retail Price</span>
                                      <span className="text-cyan-300 font-bold">${calcRetailPrice.toFixed(2)}</span>
                                    </div>
                                    <input
                                      type="range"
                                      min={calcUnitCost + 0.1}
                                      max={result.dashboard.financialModel.recommendedPrice * 2.5}
                                      step="0.10"
                                      value={calcRetailPrice}
                                      onChange={(e) => setCalcRetailPrice(parseFloat(e.target.value))}
                                      className="w-full h-1.5 bg-slate-900 rounded-full appearance-none cursor-pointer accent-cyan-400"
                                    />
                                  </div>

                                  {/* Slider 3: Sales Volume */}
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-semibold">
                                      <span className="text-slate-400">Estimated Sales Volume</span>
                                      <span className="text-white">{calcSalesVolume} units/mo</span>
                                    </div>
                                    <input
                                      type="range"
                                      min="5"
                                      max={result.dashboard.financialModel.estimatedSalesPerMonth * 3}
                                      step="5"
                                      value={calcSalesVolume}
                                      onChange={(e) => setCalcSalesVolume(parseInt(e.target.value, 10))}
                                      className="w-full h-1.5 bg-slate-900 rounded-full appearance-none cursor-pointer accent-cyan-400"
                                    />
                                  </div>

                                  <div className="pt-2 border-t border-white/5 text-[10px] text-slate-500 leading-relaxed italic">
                                    Adjust these metrics to see how your profit margins shift as you scale your business!
                                  </div>
                                </div>

                                {/* Results Box */}
                                <div className="p-5 bg-slate-950/40 rounded-xl border border-white/5 flex flex-col justify-between gap-6">

                                  {/* Big Stats Row */}
                                  <div className="grid grid-cols-2 gap-4">

                                    <div className="p-3 bg-slate-900 rounded-lg border border-white/5 text-center">
                                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Projected Revenue</p>
                                      <p className="text-lg font-black text-white">${computedMonthlyRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </div>

                                    <div className="p-3 bg-slate-900 rounded-lg border border-cyan-500/20 text-center">
                                      <p className="text-[10px] text-cyan-400 uppercase font-semibold">Projected Profit</p>
                                      <p className="text-lg font-black text-cyan-300">${computedMonthlyProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </div>

                                  </div>

                                  {/* Dynamic Visual Profit Margin Bar */}
                                  <div className="space-y-2">
                                    <div className="flex justify-between items-center text-xs">
                                      <span className="text-slate-400">Profit Margin %</span>
                                      <span className={`font-bold ${computedMarginPercent > 50 ? "text-emerald-400" : computedMarginPercent > 20 ? "text-yellow-400" : "text-rose-400"}`}>
                                        {computedMarginPercent.toFixed(1)}%
                                      </span>
                                    </div>

                                    <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/5 flex">
                                      <div
                                        className={`h-full rounded-full transition-all duration-300 bg-gradient-to-r ${computedMarginPercent > 50
                                            ? "from-violet-500 to-emerald-400"
                                            : computedMarginPercent > 20
                                              ? "from-violet-500 to-yellow-400"
                                              : "from-rose-500 to-rose-400"
                                          }`}
                                        style={{ width: `${Math.min(100, Math.max(0, computedMarginPercent))}%` }}
                                      />
                                    </div>
                                  </div>

                                  {/* AI Financial Advice Box */}
                                  <div className="p-3 bg-violet-950/20 rounded-lg border border-violet-500/10 flex gap-2.5 items-start">
                                    <Info className="w-4.5 h-4.5 text-violet-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                      <p className="text-[10px] font-bold text-violet-300 uppercase">AI Strategy Advice</p>
                                      <p className="text-[11px] text-slate-400 leading-relaxed">
                                        {result.dashboard.financialModel.explanation}
                                      </p>
                                    </div>
                                  </div>

                                </div>

                              </div>
                            </div>
                          )}

                          {/* TAB 3: MARKETING STRATEGIES */}
                          {activeDashboardTab === "marketing" && (
                            <div className="space-y-4">
                              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Recommended Launch Campaigns
                              </h3>

                              <div className="space-y-3">
                                {result.dashboard.marketingStrategy.map((strategy, idx) => (
                                  <div
                                    key={idx}
                                    className="p-4 bg-slate-950/60 rounded-xl border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-950 transition-colors"
                                  >
                                    <div className="flex gap-4">
                                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-bold text-cyan-400 flex-shrink-0">
                                        {idx + 1}
                                      </div>
                                      <div>
                                        <h4 className="text-xs font-black text-white">{strategy.channel}</h4>
                                        <p className="text-xs text-slate-400 leading-relaxed mt-1">
                                          {strategy.campaignIdea}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex-shrink-0">
                                      <span className="px-3 py-1 text-[10px] font-bold bg-slate-900 text-cyan-300 border border-cyan-500/20 rounded-full">
                                        EST. BUDGET: {strategy.estimatedCost}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* TAB 4: BRAND DECK */}
                          {activeDashboardTab === "brand" && (
                            <div className="space-y-6">

                              {/* Swatches Deck */}
                              <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                  Custom Swatch Palette (Click hex to copy)
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                  {result.dashboard.brandIdentity.colors.map((color, idx) => {
                                    const copyId = `color-${idx}`;
                                    const isCopied = copySuccess[copyId];
                                    return (
                                      <div
                                        key={idx}
                                        onClick={() => copyToClipboard(color.hex, copyId)}
                                        className="p-3 bg-slate-950/60 rounded-xl border border-white/5 flex items-center justify-between cursor-pointer hover:bg-slate-950 transition-all group"
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 rounded-lg border border-white/10" style={{ backgroundColor: color.hex }} />
                                          <div>
                                            <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">{color.name}</p>
                                            <p className="text-[10px] font-mono text-slate-500">{color.hex}</p>
                                          </div>
                                        </div>

                                        <button className="p-1 text-slate-500 hover:text-white transition-colors">
                                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Logo Concept */}
                                <div className="p-4 bg-slate-950/60 rounded-xl border border-white/5 space-y-2">
                                  <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase">
                                    <Sparkles className="w-4 h-4 text-rose-400" />
                                    Logo Visual Description
                                  </h4>
                                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                    {result.dashboard.brandIdentity.logoConcept}
                                  </p>
                                </div>

                                {/* Tone of Voice */}
                                <div className="p-4 bg-slate-950/60 rounded-xl border border-white/5 space-y-2">
                                  <h4 className="text-xs font-bold text-violet-400 flex items-center gap-1.5 uppercase">
                                    <MessageSquare className="w-4 h-4 text-violet-400" />
                                    Brand Voice & Tone
                                  </h4>
                                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                    Our voice is described as: <strong className="text-white bg-slate-900 border border-white/5 px-2 py-0.5 rounded font-mono text-[10px]">{result.dashboard.brandIdentity.toneOfVoice}</strong>
                                  </p>
                                  <p className="text-[10px] text-slate-500 italic mt-2">
                                    Keep this tone consistent across all social media and marketing slogans!
                                  </p>
                                </div>

                              </div>

                            </div>
                          )}

                          {/* TAB 5: LAUNCH CHECKLIST KANBAN */}
                          {activeDashboardTab === "checklist" && (
                            <div className="space-y-4">

                              <div className="flex justify-between items-center">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                  Launch checklist
                                </h3>

                                <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded-full">
                                  {Math.round(
                                    (Object.values(completedTasks).filter(Boolean).length /
                                      (result.dashboard.checklist.length || 1)) * 100
                                  )}% COMPLETED
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {result.dashboard.checklist.map((item) => {
                                  const isChecked = completedTasks[item.id] || false;

                                  // Map category labels to styled colors
                                  const categoryColors: Record<string, string> = {
                                    Marketing: "bg-violet-500/10 text-violet-300 border-violet-500/20",
                                    Finance: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
                                    Sourcing: "bg-rose-500/10 text-rose-300 border-rose-500/20",
                                    Operations: "bg-slate-800 text-slate-400 border-slate-700",
                                  };

                                  return (
                                    <div
                                      key={item.id}
                                      onClick={() => toggleTask(item.id)}
                                      className={`p-3.5 bg-slate-950/60 rounded-xl border cursor-pointer flex items-center justify-between gap-4 transition-all ${isChecked ? "border-emerald-500/40 bg-slate-950/20 opacity-60" : "border-white/5 hover:bg-slate-950"
                                        }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${isChecked ? "bg-emerald-500 border-emerald-400 text-slate-950" : "border-slate-700 bg-slate-900"
                                          }`}>
                                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[4]" />}
                                        </div>
                                        <span className={`text-xs ${isChecked ? "line-through text-slate-500" : "text-white"}`}>
                                          {item.task}
                                        </span>
                                      </div>

                                      <span className={`text-[9px] font-bold border px-2 py-0.5 rounded uppercase flex-shrink-0 ${categoryColors[item.category] || categoryColors.Operations
                                        }`}>
                                        {item.category}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                        </div>
                      </div>
                    )}

                    {/* CASE D2: BAD PROMPT -> CRT TERMINAL SCREEN WITH LAZY TEXT */}
                    {result.grade === "Needs Improvement" && (
                      <div className="flex flex-col gap-6">

                        {/* CRT Terminal Screen Container */}
                        <div className="crt-screen rounded-2xl p-6 min-h-[300px] flex flex-col justify-between">

                          {/* Monitor Frame Top Bar */}
                          <div className="flex items-center justify-between border-b border-sky-400/20 pb-3 mb-4 text-[10px] text-sky-400/80 font-mono tracking-widest uppercase">
                            <span className="flex items-center gap-1.5 animate-pulse">
                              <Terminal className="w-3.5 h-3.5" />
                              CRT-MONITOR-X300: DISCONNECTED MODEL STATE
                            </span>
                            <span>FAIL-MODE ACTIVE</span>
                          </div>

                          {/* Terminal Output Content */}
                          <div className="flex-1 font-mono text-xs md:text-sm text-sky-400 leading-relaxed p-2 space-y-4">
                            <p className="text-[11px] text-sky-500/80 mb-2">
                              &gt; analyzing prompt... rating=F grade="IMAGINATION NOT FOUND"
                            </p>
                            <p className="text-[11px] text-sky-500/80">
                              &gt; initiating fallback lazyprompt answer schema:
                            </p>
                            <p className="text-cyan-300 font-bold border-l-2 border-cyan-500 pl-4 py-1.5 italic bg-sky-950/20 rounded">
                              "{result.rawText}"
                            </p>
                            <p className="text-[10px] text-rose-400 animate-pulse mt-4">
                              *** WARNING: Low prompt score. Output is unstructured and not useful. Please review Coach tips on the side. ***
                            </p>
                          </div>

                          {/* Frame Bottom bar */}
                          <div className="text-[9px] text-sky-500/50 text-right mt-4 pt-2 border-t border-sky-400/10 font-mono">
                            REFRESH REQUEST TO RE-ENGAGE
                          </div>
                        </div>

                        {/* Prompt Coach Widget Panel */}
                        {showPromptCoach && (
                          <div className="glass-panel p-5 rounded-2xl border border-rose-500/20 bg-rose-950/5 flex flex-col gap-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                                  <Info className="w-4 h-4 text-rose-400" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-white">AI Prompt Coach advice</h4>
                                  <p className="text-[10px] text-slate-500">How to unlock premium quality</p>
                                </div>
                              </div>
                              <button
                                onClick={() => setShowPromptCoach(false)}
                                className="p-1 text-slate-500 hover:text-white rounded"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed pl-1">
                              Your prompt didn't supply enough details, so the AI went on strike! To wake it up, make sure your prompt checkmarks light up. Here are things you can do right now:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {result.coachTips.map((tip, idx) => (
                                <div key={idx} className="p-3 bg-slate-950/80 rounded-xl border border-white/5 text-[11px] leading-relaxed text-slate-400">
                                  {tip}
                                </div>
                              ))}
                            </div>

                            <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
                              <span className="text-[10px] text-slate-500 leading-relaxed font-medium">
                                Tip: Click "Use Blueprint Template" on the console to load a strong structure, then swap in your brand name!
                              </span>

                              <button
                                onClick={insertTemplate}
                                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-lg text-xs font-bold shadow hover:brightness-110 active:scale-[0.98] transition-all"
                              >
                                Load Blueprint Now
                              </button>
                            </div>
                          </div>
                        )}

                      </div>
                    )}

                  </div>
                )}

              </div>
            </div>

          </div>
        )}

      </main>

      {/* Sleek footer */}
      <footer className="w-full text-center py-6 mt-12 border-t border-white/5 bg-slate-950/80 text-xs text-slate-600">
        <p className="mt-1 font-semibold text-slate-500">Made with ❤️ by Team Lakshya</p>
      </footer>
    </div>
  );
}
