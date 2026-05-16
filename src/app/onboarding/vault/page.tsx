"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Banknote } from "lucide-react";
import { useState } from "react";

const frequencies = [
  { value: "daily", label: "Daily", next: "Today at 6:00 PM" },
  { value: "weekly", label: "Weekly", next: "Friday at 6:00 PM" },
  { value: "monthly", label: "Monthly", next: "Month-end at 6:00 PM" },
] as const;

export default function VaultSetupPage() {
  const router = useRouter();
  const [amount, setAmount] = useState(5000);
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">(
    "daily",
  );

  const options = [
    { value: 3000, label: "₦3,000" },
    { value: 5000, label: "₦5,000" },
    { value: 10000, label: "₦10,000" },
    { value: 20000, label: "₦20,000" },
  ];

  const handleSave = () => {
    const selected = frequencies.find((f) => f.value === frequency);
    localStorage.setItem(
      "creditgo_vault_setup",
      JSON.stringify({
        amount,
        frequency,
        frequencyLabel: selected?.label ?? "Daily",
        nextSweep: selected?.next ?? "Today at 6:00 PM",
      }),
    );
    router.push("/dashboard");
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 py-8">
      <div className="rounded-[2rem] border border-stone-200 bg-white p-10 shadow-lg">
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
          <Banknote className="h-8 w-8" />
        </div>

        <h2 className="mb-2 text-2xl font-black leading-tight text-stone-900">
          Set up your savings vault
        </h2>
        <p className="mb-8 text-stone-500">
          Choose how much you want to save automatically. Stronger savings
          habits improve your available limit over time.
        </p>

        <div className="mb-6">
          <div className="mb-3 text-sm font-black text-stone-700">
            Auto-save amount
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setAmount(option.value)}
                className={`rounded-lg border px-4 py-3 text-left font-black transition ${
                  amount === option.value
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-500"
                    : "border-stone-200 text-stone-800 hover:border-emerald-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="mb-3 text-sm font-black text-stone-700">
            Savings frequency
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {frequencies.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFrequency(option.value)}
                className={`rounded-lg border px-4 py-3 text-left transition ${
                  frequency === option.value
                    ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                    : "border-stone-200 hover:border-emerald-200"
                }`}
              >
                <div className="font-black text-stone-900">{option.label}</div>
                <div className="mt-1 text-xs font-semibold text-stone-500">
                  {option.next}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-emerald-700"
        >
          Save & Go to Dashboard <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
