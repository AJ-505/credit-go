"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  PiggyBank,
  Building,
  TrendingUp,
  HeartPulse,
  Globe,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const colorMap: Record<string, { bg: string; text: string }> = {
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600" },
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
  amber: { bg: "bg-amber-100", text: "text-amber-600" },
  rose: { bg: "bg-rose-100", text: "text-rose-600" },
  cyan: { bg: "bg-cyan-100", text: "text-cyan-600" },
  red: { bg: "bg-red-100", text: "text-red-600" },
};

type Slide = {
  icon: typeof PiggyBank;
  title: string;
  body: string[];
  color: keyof typeof colorMap;
};

const slides: Slide[] = [
  {
    icon: Sparkles,
    title: "Welcome to Credit School",
    color: "emerald",
    body: [
      "This quick course will help you understand how credit works and how to make it work for you.",
      "Complete all 7 slides to earn +2 trust points and unlock better lending opportunities.",
    ],
  },
  {
    icon: PiggyBank,
    title: "Why Savings Matters",
    color: "blue",
    body: [
      "Savings is the foundation of your financial health. It shows lenders you can manage money responsibly.",
      "A consistent savings habit signals reliability. Lenders see you as lower risk when you have a history of putting money aside.",
      "Savings also acts as your safety net. When unexpected expenses come up, you won't need to borrow at high interest — you have your own funds to fall back on.",
    ],
  },
  {
    icon: Building,
    title: "Understanding the Credit Industry",
    color: "purple",
    body: [
      "Credit is simply the ability to borrow money now and pay it back later. Banks, fintechs, and peer-to-peer lenders all provide credit.",
      "Lenders evaluate you based on trust — your income, savings habits, repayment history, and identity stability all feed into your trust score.",
      "The higher your trust score, the better your interest rates and loan terms. A good score can save you millions in interest over time.",
    ],
  },
  {
    icon: TrendingUp,
    title: "How to Access More Lending",
    color: "amber",
    body: [
      "Lenders want to see three things: stability, capacity, and reliability.",
      "Stability: A consistent income source and a verifiable identity.",
      "Capacity: Your income relative to your existing debts. The more free income you have, the more you can borrow.",
      "Reliability: A track record of repaying on time. Every successful repayment increases your trust score and unlocks higher limits.",
    ],
  },
  {
    icon: HeartPulse,
    title: "How Your Credit Health Works",
    color: "rose",
    body: [
      "Your credit health is measured by your trust score — a number from 0 to 100 that sums up your financial behavior.",
      "Your score goes up when you: save consistently, repay loans on time, keep your profile updated, and maintain stable income.",
      "Your score goes down when you: miss repayments, borrow beyond your means, or have long gaps in your financial activity.",
      "Think of it like a health score for your finances. The healthier it is, the more opportunities open up for you.",
    ],
  },
  {
    icon: Globe,
    title: "Lending in Africa",
    color: "cyan",
    body: [
      "Africa's lending model is unique. Traditional bank credit scores (like in the US or Europe) don't exist for most people here.",
      "Instead, African lenders use alternative data — airtime top-ups, mobile money transactions, savings behavior, and even social connections — to assess trustworthiness.",
      "This means your everyday financial habits directly impact your access to credit. Every small positive action builds your digital reputation.",
      "The goal is financial inclusion: giving people who've never had a bank account access to fair, affordable credit based on who they really are.",
    ],
  },
  {
    icon: ShieldAlert,
    title: "Avoiding Debt Traps",
    color: "red",
    body: [
      "A debt trap happens when you borrow to repay existing debt, creating a cycle that's hard to escape.",
      "Warning signs: You're borrowing to cover daily expenses, you're only paying minimum amounts, or you're taking new loans to pay off old ones.",
      "How to avoid them: Never borrow more than 30% of your monthly income. Always have a clear repayment plan before taking a loan.",
      "If you're stuck, pause all new borrowing and focus on paying down existing debt. Use your savings vault as a buffer, not a last resort.",
    ],
  },
  {
    icon: CheckCircle,
    title: "You're Ready!",
    color: "emerald",
    body: [
      "You now understand the fundamentals of credit, savings, and how to build lasting financial health.",
      "You've earned +2 trust points for completing this course. Keep saving, keep repaying, and watch your opportunities grow.",
    ],
  },
];

export default function OnboardingBoostPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [completed, setCompleted] = useState(false);
  const totalSlides = slides.length;
  const isLastSlide = currentSlide === totalSlides - 1;

  const handleNext = () => {
    if (isLastSlide) {
      const saved = localStorage.getItem("creditgo_score_summary");
      if (saved) {
        const parsed = JSON.parse(saved) as {
          trustScore?: number;
          safeLimitNgn?: number;
          tier?: string;
        };
        const currentScore = parsed.trustScore ?? 0;
        parsed.trustScore = currentScore + 2;
        if (parsed.trustScore > 100) parsed.trustScore = 100;
        localStorage.setItem("creditgo_score_summary", JSON.stringify(parsed));
      }
      localStorage.setItem("creditgo_boost_completed", "true");
      setCompleted(true);
    } else {
      setCurrentSlide((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) setCurrentSlide((i) => i - 1);
  };

  if (completed) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle className="h-14 w-14 text-emerald-600" />
        </div>
        <div>
          <h1 className="mb-2 text-3xl font-black tracking-tight text-stone-900">
            Course Complete!
          </h1>
          <p className="max-w-md text-stone-500">
            Your trust score has been increased by
            <span className="font-bold text-emerald-600"> +2 points</span>.
            Continue building good habits to unlock even more.
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard")}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-emerald-700"
        >
          Go to Dashboard <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  const slide = slides[currentSlide]!;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 py-8">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{
              width: `${((currentSlide + 1) / totalSlides) * 100}%`,
            }}
          />
        </div>
        <span className="text-xs font-bold text-stone-400">
          {currentSlide + 1}/{totalSlides}
        </span>
      </div>

      {/* Slide card */}
      <div
        key={currentSlide}
        className="rounded-[2rem] border border-stone-200 bg-white p-10 shadow-lg"
      >
        <div
          className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl ${colorMap[slide.color]!.bg} ${colorMap[slide.color]!.text}`}
        >
          <slide.icon className="h-8 w-8" />
        </div>

        <h2 className="mb-6 text-2xl font-black leading-tight text-stone-900">
          {slide.title}
        </h2>

        <div className="space-y-4">
          {slide.body.map((paragraph, i) => (
            <p
              key={i}
              className="leading-relaxed text-stone-600"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-6 py-3 text-sm font-bold text-stone-600 transition-all hover:border-stone-300 hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {/* Dots */}
        <div className="hidden items-center gap-2 sm:flex">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? "w-8 bg-emerald-500"
                  : "w-2.5 bg-stone-300 hover:bg-stone-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-emerald-700"
        >
          {isLastSlide ? "Complete & Earn +2" : "Next"}{" "}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
