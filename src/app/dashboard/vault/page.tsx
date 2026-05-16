"use client";

import Link from "next/link";
import { Share, ArrowRight, Pause, Play, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const amountOptions = [3000, 5000, 10000, 20000, 50000];
const frequencies = [
  { value: "daily", label: "Daily", nextSweep: "Today at 6:00 PM" },
  { value: "weekly", label: "Weekly", nextSweep: "Friday at 6:00 PM" },
  { value: "monthly", label: "Monthly", nextSweep: "Month-end at 6:00 PM" },
] as const;

export default function VaultPage() {
  const [sweepAmount, setSweepAmount] = useState(5000);
  const [frequency, setFrequency] = useState<(typeof frequencies)[number]>(
    frequencies[0],
  );
  const [paused, setPaused] = useState(false);
  const [showAmountPicker, setShowAmountPicker] = useState(false);
  const [showFreqPicker, setShowFreqPicker] = useState(false);
  const [showAllActivity, setShowAllActivity] = useState(false);

  const activity = [
    { date: "May 15", amount: "+₦5,000", type: "Auto-sweep", status: "success" },
    { date: "May 14", amount: "+₦5,000", type: "Auto-sweep", status: "success" },
    { date: "May 13", amount: "+₦10,000", type: "Manual top-up", status: "success" },
    { date: "May 12", amount: "+₦5,000", type: "Auto-sweep", status: "success" },
    { date: "May 11", amount: "MISSED", type: "Auto-sweep", status: "failed" },
    { date: "May 10", amount: "+₦5,000", type: "Auto-sweep", status: "success" },
    { date: "May 09", amount: "+₦5,000", type: "Auto-sweep", status: "success" },
  ];
  const visibleActivity = showAllActivity ? activity : activity.slice(0, 5);

  useEffect(() => {
    const saved = localStorage.getItem("creditgo_vault_setup");
    if (!saved) return;
    const parsed = JSON.parse(saved) as {
      amount?: number;
      frequencyLabel?: string;
      nextSweep?: string;
    };
    if (parsed.amount) setSweepAmount(parsed.amount);
    if (parsed.frequencyLabel) {
      const match = frequencies.find((f) => f.label === parsed.frequencyLabel);
      if (match) setFrequency(match);
    }
  }, []);

  const saveVault = (amount: number, freq: typeof frequency) => {
    localStorage.setItem(
      "creditgo_vault_setup",
      JSON.stringify({
        amount,
        frequency: freq.value,
        frequencyLabel: freq.label,
        nextSweep: freq.nextSweep,
      }),
    );
  };

  const handleAdjustAmount = (amount: number) => {
    setSweepAmount(amount);
    saveVault(amount, frequency);
    setShowAmountPicker(false);
    toast.success(`Next sweep set to ₦${amount.toLocaleString()}.`);
  };

  const handleChangeFrequency = (freq: (typeof frequencies)[number]) => {
    setFrequency(freq);
    saveVault(sweepAmount, freq);
    setShowFreqPicker(false);
    toast.success(`Frequency changed to ${freq.label}.`);
  };

  const handleShare = async () => {
    const text = `🔥 CreditGo Vault\nBalance: ₦245,000\nStreak: 12 days\nAuto-sweep: ₦${sweepAmount.toLocaleString()}/${frequency.label.toLowerCase()}`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Vault summary copied to clipboard.");
    } catch {
      toast.success("Vault progress copied to share card.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Savings Vault</h1>
          <p className="text-muted-foreground">
            Manage your auto-sweep and repayment funds.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-6 shadow">
          <div>
            <p className="text-muted-foreground text-sm font-medium">Balance</p>
            <div className="mt-1 text-4xl font-bold">₦245,000</div>
            <div className="bg-muted mt-4 h-2 w-full overflow-hidden rounded-full">
              <div className="bg-primary h-full w-[40%]"></div>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              40% toward ₦600K active loan
            </p>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600 text-lg">
                🔥
              </span>
              <span className="font-semibold">12-day streak</span>
            </div>
            <button
              onClick={handleShare}
              className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
            >
              <Share className="h-4 w-4" /> Share
            </button>
          </div>
        </div>

        <div className="bg-card text-card-foreground flex flex-col gap-4 rounded-xl border p-6 shadow">
          <h3 className="border-b pb-2 text-lg font-semibold">Next Sweep</h3>
          <div>
            <p className="text-muted-foreground text-sm">
              {paused ? "Paused" : frequency.nextSweep}
            </p>
            <p className="mt-1 text-2xl font-bold">
              ₦{sweepAmount.toLocaleString()}
            </p>
          </div>

          {/* Amount picker */}
          <div className="relative">
            <button
              onClick={() => setShowAmountPicker(!showAmountPicker)}
              className="bg-background hover:bg-muted inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium"
            >
              ₦{sweepAmount.toLocaleString()} <ChevronDown className="h-4 w-4" />
            </button>
            {showAmountPicker && (
              <div className="absolute bottom-full left-0 right-0 mb-2 z-10 rounded-lg border bg-white p-2 shadow-xl">
                {amountOptions.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handleAdjustAmount(amt)}
                    className={`w-full rounded-md px-4 py-2 text-left text-sm font-semibold transition ${
                      amt === sweepAmount
                        ? "bg-emerald-50 text-emerald-800"
                        : "text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    ₦{amt.toLocaleString()}/sweep
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Frequency picker */}
          <div className="relative">
            <button
              onClick={() => setShowFreqPicker(!showFreqPicker)}
              className="bg-background hover:bg-muted inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium"
            >
              {frequency.label} <ChevronDown className="h-4 w-4" />
            </button>
            {showFreqPicker && (
              <div className="absolute bottom-full left-0 right-0 mb-2 z-10 rounded-lg border bg-white p-2 shadow-xl">
                {frequencies.map((freq) => (
                  <button
                    key={freq.value}
                    onClick={() => handleChangeFrequency(freq)}
                    className={`w-full rounded-md px-4 py-2 text-left text-sm font-semibold transition ${
                      freq.value === frequency.value
                        ? "bg-emerald-50 text-emerald-800"
                        : "text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    {freq.label} — {freq.nextSweep}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto flex gap-3">
            <button
              onClick={() => {
                setPaused((prev) => {
                  const next = !prev;
                  toast.success(
                    next
                      ? "Auto-sweep paused."
                      : `Auto-sweep resumed.`,
                  );
                  return next;
                });
              }}
              className="bg-background hover:bg-muted inline-flex h-10 flex-1 items-center justify-center rounded-md border px-4 text-sm font-medium"
            >
              {paused ? (
                <Play className="mr-2 h-4 w-4" />
              ) : (
                <Pause className="mr-2 h-4 w-4" />
              )}
              {paused ? "Resume Sweep" : "Pause Sweep"}
            </button>
            <Link
              href="/dashboard"
              className="bg-background hover:bg-muted inline-flex h-10 flex-1 items-center justify-center rounded-md border px-4 text-sm font-medium"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-card text-card-foreground overflow-hidden rounded-xl border shadow">
        <div className="border-b p-6 pb-4">
          <h3 className="text-lg font-semibold">Recent Vault Activity</h3>
        </div>
        <div className="divide-y">
          {visibleActivity.map((tx, i) => (
            <div
              key={`${tx.date}-${i}`}
              className="hover:bg-muted/50 flex items-center justify-between p-4 px-6 transition-colors"
            >
              <div>
                <p className="font-medium">{tx.date}</p>
                <p className="text-muted-foreground text-sm">{tx.type}</p>
              </div>
              <div
                className={`font-semibold ${
                  tx.status === "failed"
                    ? "text-destructive"
                    : "text-green-600"
                }`}
              >
                {tx.amount}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-muted/20 flex justify-center p-4">
          <button
            onClick={() => setShowAllActivity((v) => !v)}
            className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
          >
            {showAllActivity ? "Show Recent" : "View All Transactions"}{" "}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
