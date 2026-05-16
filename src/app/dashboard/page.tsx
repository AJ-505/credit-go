"use client";

import Link from "next/link";
import {
  ArrowRight,
  Wallet,
  Target,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useState } from "react";

type VaultSetup = {
  amount: number;
  frequencyLabel: string;
  nextSweep: string;
};

type ScoreSummary = {
  trustScore: number;
  safeLimitNgn: number;
  tier: string;
};

export default function DashboardPage() {
  const [vault, setVault] = useState<VaultSetup>({
    amount: 5000,
    frequencyLabel: "Daily",
    nextSweep: "Today at 6:00 PM",
  });
  const [score, setScore] = useState<ScoreSummary>({
    trustScore: 71,
    safeLimitNgn: 1077300,
    tier: "GOLD",
  });

  useEffect(() => {
    const savedVault = localStorage.getItem("creditgo_vault_setup");
    if (savedVault) {
      setVault(JSON.parse(savedVault) as VaultSetup);
    }
    const savedScore = localStorage.getItem("creditgo_score_summary");
    if (savedScore) {
      const parsed = JSON.parse(savedScore) as ScoreSummary;
      setScore({ ...parsed, tier: parsed.tier.toUpperCase() });
    }
  }, []);

  const safeLimitProgress = Math.min(
    100,
    Math.max(10, Math.round((score.safeLimitNgn / 1800000) * 100)),
  );

  return (
    <div className="flex flex-col gap-10 pb-10">
      {/* Header Section */}
      <div className="relative flex flex-col items-start justify-between gap-4 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 to-emerald-900 p-8 text-white shadow-xl md:flex-row md:items-end">
        <div className="pointer-events-none absolute top-[-50%] right-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[100px]"></div>
        <div className="relative z-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-700/50 bg-emerald-800/50 px-3 py-1 text-xs font-bold text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Profile Active
          </div>
          <h1 className="mb-2 text-4xl font-black tracking-tight md:text-5xl">
            Welcome back, Earner.
          </h1>
          <p className="max-w-xl text-lg text-emerald-100/80">
            Your financial leverage is growing. Maintain your streak to unlock
            higher tiers.
          </p>
        </div>
        <Link
          href="/dashboard/vault"
          className="relative z-10 inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold text-emerald-950 shadow-[0_4px_15px_rgba(16,185,129,0.3)] transition-transform hover:-translate-y-1 hover:bg-emerald-400"
        >
          Fund Vault <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Safe Limit Card (Featured) */}
        <div className="group overflow-hidden rounded-[2rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-lg md:col-span-8">
          <div className="relative flex h-full flex-col justify-between p-8">
            <div className="absolute top-0 right-0 p-8 opacity-10 transition-opacity group-hover:opacity-20">
              <ShieldCheck className="h-32 w-32 text-emerald-600" />
            </div>
            <div className="relative z-10">
              <h3 className="mb-4 text-sm font-black tracking-widest text-emerald-600 uppercase">
                Available Safe Limit
              </h3>
              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-5xl font-black tracking-tighter text-stone-900 md:text-7xl">
                  ₦{Math.round(score.safeLimitNgn).toLocaleString()}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-2 w-full max-w-[200px] overflow-hidden rounded-full bg-emerald-100">
                  <div
                    className="relative h-full rounded-full bg-emerald-500"
                    style={{ width: `${safeLimitProgress}%` }}
                  >
                    <div className="absolute inset-0 animate-pulse bg-white/20"></div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700">
                  {safeLimitProgress}% of Max
                </span>
              </div>
            </div>
            <div className="relative z-10 mt-10">
              <Link
                href="/dashboard/marketplace"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-100/50 px-4 py-2 text-sm font-bold text-emerald-700 transition-all hover:bg-emerald-100 hover:text-emerald-800"
              >
                Explore Marketplace <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Score Card */}
        <div className="group relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-8 text-center shadow-lg md:col-span-4">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-50 via-white to-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
          <h3 className="relative z-10 mb-6 text-sm font-black tracking-widest text-stone-500 uppercase">
            Trust Score
          </h3>

          <div className="relative z-10 mb-6 flex h-32 w-32 items-center justify-center rounded-full border-[6px] border-yellow-400 bg-yellow-50 shadow-inner transition-transform duration-300 group-hover:scale-105">
            <span className="text-5xl font-black text-yellow-600">
              {score.trustScore}
            </span>
            <div className="absolute -top-2 -right-2 rounded-full border border-stone-100 bg-white p-1 shadow-md">
              <div className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-black text-emerald-700">
                <ArrowUpRight className="h-3 w-3" /> 3
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="mb-1 flex items-center justify-center gap-2 text-xl font-black text-stone-900">
              {score.tier} TIER <span className="text-yellow-500">✦</span>
            </div>
            <p className="text-sm font-medium text-stone-500">
              Top 15% of Earners
            </p>
          </div>
        </div>
      </div>

      {/* Savings Vault Summary */}
      <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-lg">
        <div className="flex flex-row items-center justify-between border-b border-stone-100 bg-stone-50/50 p-6 px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Savings Vault</h3>
          </div>
          <Link
            href="/dashboard/vault"
            className="flex items-center gap-1 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold text-stone-600 shadow-sm transition-all hover:text-stone-900 hover:shadow"
          >
            Manage <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-8 divide-y divide-stone-100 p-8 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="md:pr-8">
            <p className="mb-2 text-sm font-bold tracking-wider text-stone-500 uppercase">
              Vault Balance
            </p>
            <p className="text-4xl font-black text-stone-900">₦245,000</p>
            <div className="mt-2 inline-block rounded-md bg-emerald-50 px-2 py-1 text-sm font-medium text-emerald-600">
              +₦15,000 this week
            </div>
          </div>
          <div className="pt-6 md:px-8 md:pt-0">
            <p className="mb-2 text-sm font-bold tracking-wider text-stone-500 uppercase">
              Active Streak
            </p>
            <div className="flex items-end gap-2">
              <p className="text-4xl font-black text-orange-500">12</p>
              <p className="pb-1 text-lg font-bold text-stone-600">days</p>
            </div>
            <p className="mt-2 text-sm font-medium text-stone-500">
              18 days to next rate drop
            </p>
          </div>
          <div className="pt-6 md:pt-0 md:pl-8">
            <p className="mb-2 text-sm font-bold tracking-wider text-stone-500 uppercase">
              Auto-sweep
            </p>
            <p className="text-2xl font-black text-stone-900">
              ₦{vault.amount.toLocaleString()}
              <span className="text-lg font-medium text-stone-400">
                /{vault.frequencyLabel.toLowerCase()}
              </span>
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
              <p className="text-sm font-bold text-stone-600">
                Next: {vault.nextSweep}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div>
        <h3 className="mb-6 px-2 text-xl font-black text-stone-900">
          Quick Actions
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/dashboard/marketplace"
            className="group relative block overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl"
          >
            <div className="absolute top-0 right-0 transform p-6 opacity-0 transition-opacity duration-500 group-hover:scale-150 group-hover:opacity-10">
              <Wallet className="h-32 w-32 text-emerald-600" />
            </div>
            <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 shadow-sm transition-colors group-hover:bg-emerald-100 group-hover:text-emerald-700">
              <Wallet className="h-7 w-7 text-stone-600 transition-colors group-hover:text-emerald-600" />
            </div>
            <h4 className="mb-2 text-xl font-black text-stone-900 transition-colors group-hover:text-emerald-700">
              Get a Loan
            </h4>
            <p className="mb-8 leading-relaxed text-stone-500">
              Browse pre-approved assets and cash loans based on your standing.
            </p>
            <span className="inline-flex items-center gap-2 rounded-full bg-stone-50 px-4 py-2 text-sm font-bold text-stone-900 transition-all group-hover:bg-emerald-50 group-hover:text-emerald-600">
              Browse Offers{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/dashboard/vault"
            className="group relative block overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
          >
            <div className="absolute top-0 right-0 transform p-6 opacity-0 transition-opacity duration-500 group-hover:scale-150 group-hover:opacity-10">
              <Target className="h-32 w-32 text-blue-600" />
            </div>
            <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 shadow-sm transition-colors group-hover:bg-blue-100 group-hover:text-blue-700">
              <Target className="h-7 w-7 text-stone-600 transition-colors group-hover:text-blue-600" />
            </div>
            <h4 className="mb-2 text-xl font-black text-stone-900 transition-colors group-hover:text-blue-700">
              Accelerate Savings
            </h4>
            <p className="mb-8 leading-relaxed text-stone-500">
              Boost your auto-sweep to unlock higher limits and lower interest
              rates.
            </p>
            <span className="inline-flex items-center gap-2 rounded-full bg-stone-50 px-4 py-2 text-sm font-bold text-stone-900 transition-all group-hover:bg-blue-50 group-hover:text-blue-600">
              Adjust Vault{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/dashboard/boost"
            className="group relative block overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-200 hover:shadow-xl"
          >
            <div className="absolute top-0 right-0 transform p-6 opacity-0 transition-opacity duration-500 group-hover:scale-150 group-hover:opacity-10">
              <TrendingUp className="h-32 w-32 text-yellow-600" />
            </div>
            <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 shadow-sm transition-colors group-hover:bg-yellow-100 group-hover:text-yellow-700">
              <TrendingUp className="h-7 w-7 text-stone-600 transition-colors group-hover:text-yellow-600" />
            </div>
            <h4 className="mb-2 text-xl font-black text-stone-900 transition-colors group-hover:text-yellow-700">
              Boost Trust Score
            </h4>
            <p className="mb-8 leading-relaxed text-stone-500">
              Complete Credit School modules to instantly gain +2 trust points.
            </p>
            <span className="inline-flex items-center gap-2 rounded-full bg-stone-50 px-4 py-2 text-sm font-bold text-stone-900 transition-all group-hover:bg-yellow-50 group-hover:text-yellow-600">
              Start Learning{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
