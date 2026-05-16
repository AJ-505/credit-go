"use client";

import Link from "next/link";
import { Settings, Share, ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function VaultPage() {
  const [sweepAmount, setSweepAmount] = useState(5000);
  const [frequencyLabel, setFrequencyLabel] = useState("Daily");
  const [nextSweep, setNextSweep] = useState("Today at 6:00 PM");
  const [paused, setPaused] = useState(false);
  const [showAllActivity, setShowAllActivity] = useState(false);
  const activity = [
    {
      date: "May 15",
      amount: "+₦5,000",
      type: "Auto-sweep",
      status: "success",
    },
    {
      date: "May 14",
      amount: "+₦5,000",
      type: "Auto-sweep",
      status: "success",
    },
    {
      date: "May 13",
      amount: "+₦10,000",
      type: "Manual top-up",
      status: "success",
    },
    {
      date: "May 12",
      amount: "+₦5,000",
      type: "Auto-sweep",
      status: "success",
    },
    {
      date: "May 11",
      amount: "MISSED",
      type: "Auto-sweep",
      status: "failed",
    },
    {
      date: "May 10",
      amount: "+₦5,000",
      type: "Auto-sweep",
      status: "success",
    },
    {
      date: "May 09",
      amount: "+₦5,000",
      type: "Auto-sweep",
      status: "success",
    },
  ];
  const visibleActivity = showAllActivity ? activity : activity.slice(0, 5);

  useEffect(() => {
    const savedVault = localStorage.getItem("creditgo_vault_setup");
    if (!savedVault) return;
    const parsed = JSON.parse(savedVault) as {
      amount?: number;
      frequencyLabel?: string;
      nextSweep?: string;
    };
    if (parsed.amount) setSweepAmount(parsed.amount);
    if (parsed.frequencyLabel) setFrequencyLabel(parsed.frequencyLabel);
    if (parsed.nextSweep) setNextSweep(parsed.nextSweep);
  }, []);

  const saveVault = (amount: number) => {
    localStorage.setItem(
      "creditgo_vault_setup",
      JSON.stringify({
        amount,
        frequencyLabel,
        nextSweep,
      }),
    );
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
        <button
          onClick={() =>
            toast.success("Vault settings saved for this session.")
          }
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          <Settings className="mr-2 h-4 w-4" /> Settings
        </button>
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
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                🔥
              </span>
              <span className="font-semibold">12-day streak</span>
            </div>
            <button
              onClick={() =>
                toast.success("Vault progress copied to share card.")
              }
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
              {paused ? "Paused" : nextSweep}
            </p>
            <p className="mt-1 text-2xl font-bold">
              ₦{sweepAmount.toLocaleString()}
            </p>
          </div>
          <div className="mt-auto flex gap-3">
            <button
              onClick={() => {
                const nextAmount = sweepAmount === 5000 ? 10000 : 5000;
                setSweepAmount(nextAmount);
                saveVault(nextAmount);
                toast.success(
                  `Next sweep approved at ₦${nextAmount.toLocaleString()}.`,
                );
              }}
              className="bg-background hover:bg-muted inline-flex h-10 flex-1 items-center justify-center rounded-md border px-4 text-sm font-medium"
            >
              Adjust Amount
            </button>
            <button
              onClick={() => {
                setPaused((value) => {
                  const next = !value;
                  toast.success(
                    next
                      ? "Auto-sweep paused. No debit will run today."
                      : `Auto-sweep resumed for ${nextSweep}.`,
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
                  tx.status === "failed" ? "text-destructive" : "text-green-600"
                }`}
              >
                {tx.amount}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-muted/20 flex justify-center p-4">
          <button
            onClick={() => {
              setShowAllActivity((value) => !value);
              toast.success(
                showAllActivity
                  ? "Showing recent transactions."
                  : "Full transaction history loaded.",
              );
            }}
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
