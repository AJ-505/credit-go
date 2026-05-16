"use client";

import { CheckCircle2, Clock, Hourglass, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type LoanApplication = {
  id: number;
  lender: string;
  product: string;
  amount: string;
  rate: string;
  tenor: string;
  appliedAt: string;
};

type ActiveLoan = {
  id: number;
  product: string;
  lender: string;
  total: number;
  months: number;
  paid: number;
  monthly: number;
  nextPayment: string;
  status: "active";
};

type PastLoan = {
  id: number;
  product: string;
  total: number;
  months: number;
  completedOn: string;
  status: "completed" | "defaulted";
};

const activeLoans: ActiveLoan[] = [
  {
    id: 1,
    product: "Dell XPS 14 (2026)",
    lender: "CredPal",
    total: 598000,
    months: 12,
    paid: 4,
    monthly: 49833,
    nextPayment: "June 1, 2026",
    status: "active",
  },
];

const pastLoans: PastLoan[] = [
  {
    id: 2,
    product: "Tecno Camon 40 Pro",
    total: 350000,
    months: 6,
    completedOn: "Dec 15, 2025",
    status: "completed",
  },
];

function monthlyPayment(total: number, rate: string): number {
  const numericRate = (parseFloat(rate) || 4) / 100;
  return Math.round((total * numericRate * (1 + numericRate)) / 12);
}

export default function LoansPage() {
  const [pending, setPending] = useState<LoanApplication[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("creditgo_loan_applications");
    if (saved) {
      setPending(JSON.parse(saved) as LoanApplication[]);
    }
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-stone-950">
          My Loans
        </h1>
        <p className="mt-2 text-stone-500">
          Track your active loans, pending applications, and payment history.
        </p>
      </div>

      {/* Pending Applications */}
      {pending.length > 0 && (
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-black text-stone-900">
            <Hourglass className="h-5 w-5 text-amber-500" />
            Pending Approval
          </h2>
          <div className="grid gap-4">
            {pending.map((app) => (
              <div
                key={`${app.id}-${app.appliedAt}`}
                className="rounded-xl border border-amber-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-stone-900">
                      {app.product}
                    </h3>
                    <p className="text-sm text-stone-500">{app.lender}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                    <Clock className="h-3 w-3" /> Pending
                  </span>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-bold tracking-wider text-stone-500 uppercase">
                      Amount
                    </p>
                    <p className="mt-1 text-xl font-black text-stone-900">
                      {app.amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-wider text-stone-500 uppercase">
                      Interest
                    </p>
                    <p className="mt-1 text-xl font-black text-stone-900">
                      {app.rate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-wider text-stone-500 uppercase">
                      Timeline
                    </p>
                    <p className="mt-1 text-xl font-black text-stone-900">
                      {app.tenor}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-stone-400">
                  Applied{" "}
                  {new Date(app.appliedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Loans */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-black text-stone-900">
          <FileText className="h-5 w-5 text-blue-500" />
          Active Loans
        </h2>
        {activeLoans.length === 0 ? (
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-8 text-center">
            <p className="font-bold text-stone-500">No active loans</p>
            <Link
              href="/dashboard/marketplace"
              className="mt-2 inline-block text-sm font-bold text-emerald-700 hover:text-emerald-900"
            >
              Browse marketplace →
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {activeLoans.map((loan) => {
              const progress = Math.round((loan.paid / loan.months) * 100);
              return (
                <div
                  key={loan.id}
                  className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-black text-stone-900">
                        {loan.product}
                      </h3>
                      <p className="text-sm text-stone-500">{loan.lender}</p>
                    </div>
                    <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800">
                      Active
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-4">
                    <div>
                      <p className="text-xs font-bold tracking-wider text-stone-500 uppercase">
                        Total
                      </p>
                      <p className="mt-1 text-xl font-black text-stone-900">
                        ₦{loan.total.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-wider text-stone-500 uppercase">
                        Monthly
                      </p>
                      <p className="mt-1 text-xl font-black text-stone-900">
                        ₦{loan.monthly.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-wider text-stone-500 uppercase">
                        Progress
                      </p>
                      <p className="mt-1 text-xl font-black text-stone-900">
                        {loan.paid}/{loan.months}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-wider text-stone-500 uppercase">
                        Next payment
                      </p>
                      <p className="mt-1 text-base font-bold text-stone-900">
                        {loan.nextPayment}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-stone-100">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Past Loans */}
      <div>
        <h2 className="mb-4 text-xl font-black text-stone-900">Past Loans</h2>
        {pastLoans.length === 0 ? (
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-8 text-center">
            <p className="font-bold text-stone-500">No past loans</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {pastLoans.map((loan) => (
              <div
                key={loan.id}
                className="rounded-xl border border-stone-200 bg-white p-6 opacity-80 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-stone-900">
                      {loan.product}
                    </h3>
                    <p className="text-sm text-stone-500">
                      ₦{loan.total.toLocaleString()} • {loan.months} months
                    </p>
                  </div>
                  {loan.status === "completed" ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold text-green-800">
                      <CheckCircle2 className="h-3 w-3" /> Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-800">
                      Defaulted
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-stone-500">
                  {loan.status === "completed"
                    ? `Completed on ${loan.completedOn}`
                    : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
