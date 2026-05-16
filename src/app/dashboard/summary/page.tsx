"use client";

import { Download } from "lucide-react";

export default function SummaryPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between print:hidden">
        <h1 className="text-2xl font-black text-stone-900">Product Summary</h1>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2 text-sm font-bold text-white hover:bg-stone-800"
        >
          <Download className="h-4 w-4" /> Download PDF
        </button>
      </div>

      <div
        id="pdf-content"
        className="mx-auto max-w-[210mm] rounded-2xl border border-stone-200 bg-white p-10 text-[10px] leading-snug shadow-lg print:rounded-none print:border-none print:shadow-none print:p-6"
      >
        {/* ── Header ── */}
        <div className="mb-4 flex items-end justify-between border-b border-emerald-200 pb-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-stone-900">CreditGo</h1>
            <p className="text-xs font-bold text-emerald-700">Trust-Linked Credit Marketplace for Africa</p>
          </div>
          <p className="text-[8px] text-stone-400">May 2026</p>
        </div>

        {/* ── What it is ── */}
        <p className="mb-4 text-justify text-stone-600">
          CreditGo connects verified borrowers with lenders using a <strong className="text-stone-900">behavioural trust score</strong>.
          Borrowers onboard once, complete credit education, set up a savings vault, and instantly apply to
          100+ financing offers across 6 categories. Lenders get pre-vetted applicants, portfolio analytics,
          and integrated disbursement &amp; repayment via Squad.
        </p>

        {/* ── Borrower Journey ── */}
        <h2 className="mb-1.5 text-xs font-black tracking-widest text-emerald-700 uppercase">Borrower journey</h2>
        <div className="mb-4 grid grid-cols-4 gap-3">
          {[
            { num: "01", title: "NIN + Phone/Email OTP", body: "Verify identity via Mono API. Choose phone (telco OTP) or email as fallback." },
            { num: "02", title: "BVN + Account Setup", body: "Link BVN for vault, set email, create password." },
            { num: "03", title: "Persona &amp; Income Proof", body: "Freelancer (bank, LinkedIn, gig), Corporate (payslip, bank), Government (agency, payslip)." },
            { num: "04", title: "Score, Vault &amp; Dashboard", body: "ML trust score (0–100), safe limit, tier. Set auto-savings. Done." },
          ].map((s) => (
            <div key={s.num} className="rounded-lg border border-stone-100 bg-stone-50 p-3">
              <span className="text-base font-black text-emerald-600">{s.num}</span>
              <h3 className="mt-0.5 text-[10px] font-black text-stone-900">{s.title}</h3>
              <p className="mt-0.5 text-[9px] text-stone-500">{s.body}</p>
            </div>
          ))}
        </div>

        {/* ── Two-column detail ── */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          {/* Left */}
          <div className="space-y-3">

            {/* Trust Score */}
            <div>
              <h2 className="mb-1 text-[9px] font-black tracking-widest text-emerald-700 uppercase">Trust score</h2>
              <p className="text-justify text-stone-600">
                Scored 0–100 by a <strong className="text-stone-900">Python/XGBoost ML model</strong> (deterministic fallback).
                Factors: identity depth, income stability, savings habits, repayment history.
                Base by persona: freelancer 45, corporate 55, government 60, former worker 35.
                Boost via LinkedIn (+3–5), Credit School (+2), savings consistency.
                Tier ladder: <strong className="text-stone-900">Bronze</strong> (0–30),
                <strong className="text-stone-900"> Silver</strong> (31–55),
                <strong className="text-stone-900"> Gold</strong> (56–75),
                <strong className="text-stone-900"> Platinum</strong> (76–100).
                Higher tier = better rates, higher limits, more offers.
              </p>
            </div>

            {/* Credit School */}
            <div>
              <h2 className="mb-1 text-[9px] font-black tracking-widest text-emerald-700 uppercase">Credit school</h2>
              <p className="text-justify text-stone-600">
                7-slide carousel inside dashboard. Covers: why savings matters, understanding credit,
                accessing lending, credit health, Africa&apos;s lending model, avoiding debt traps.
                Completion awards <strong className="text-stone-900">+2 trust points</strong>.
              </p>
            </div>

            {/* Savings Vault */}
            <div>
              <h2 className="mb-1 text-[9px] font-black tracking-widest text-emerald-700 uppercase">Savings vault</h2>
              <p className="text-justify text-stone-600">
                Auto-sweep amount (₦3K–₦50K) × frequency (daily/weekly/monthly).
                Funds held in Squad virtual accounts. Dashboard shows balance,
                streak, activity log. Stronger savings = higher trust score.
              </p>
            </div>

            {/* Loan Management */}
            <div>
              <h2 className="mb-1 text-[9px] font-black tracking-widest text-emerald-700 uppercase">Loan management</h2>
              <p className="text-justify text-stone-600">
                Pending applications (from one-click apply), active loans with
                monthly payment &amp; progress, past loans. Each loan shows total,
                monthly, interest rate, timeline.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-3">

            {/* Marketplace */}
            <div>
              <h2 className="mb-1 text-[9px] font-black tracking-widest text-emerald-700 uppercase">Marketplace</h2>
              <p className="mb-2 text-justify text-stone-600">
                100+ financing options from 50+ lenders. Every card shows amount range,
                interest rate, timeline, tier requirement. <strong className="text-stone-900">Auto-apply</strong> products
                (Device &amp; Education under ₦2M) get one-click apply. Others route to
                manual review. Filterable by 6 categories.
              </p>
              <div className="flex flex-wrap gap-1">
                {["Rent &amp; Accom. (15)", "Solar &amp; Green (15)", "Education (15)", "Health (15)", "Business &amp; Supply (25)", "Device &amp; Gadget (20)"].map((c) => (
                  <span key={c} className="rounded bg-stone-100 px-1.5 py-0.5 text-[8px] font-bold text-stone-700">{c}</span>
                ))}
              </div>
            </div>

            {/* Lender Side */}
            <div>
              <h2 className="mb-1 text-[9px] font-black tracking-widest text-emerald-700 uppercase">Lender platform</h2>
              <p className="text-justify text-stone-600">
                Separate lender onboarding: CAC verification, director KYC, config
                (min trust score, categories), settlement account.
                Dashboard KPIs: Active Loans, Total Disbursed, <strong className="text-stone-900">Interest Earned</strong>,
                Default Rate, Avg Trust Score. Pending approvals, qualified leads,
                portfolio health (performing/at-risk/defaulted), upsell windows.
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h2 className="mb-1 text-[9px] font-black tracking-widest text-emerald-700 uppercase">Tech stack</h2>
              <div className="flex flex-wrap gap-1">
                {["Next.js 16", "React 19", "Tailwind 4", "tRPC v11", "Drizzle ORM", "libSQL", "Better Auth", "Python ML", "XGBoost", "Squad", "Mono", "LumiID", "Cr3dentials", "Resend"].map((t) => (
                  <span key={t} className="rounded bg-emerald-50 px-1.5 py-0.5 text-[8px] font-bold text-emerald-800">{t}</span>
                ))}
              </div>
            </div>

            {/* Integrations */}
            <div>
              <h2 className="mb-1 text-[9px] font-black tracking-widest text-emerald-700 uppercase">External integrations</h2>
              <table className="w-full text-[8px]">
                <tbody>
                  {[
                    ["Mono", "NIN verification, telco identity, open banking"],
                    ["Squad", "Virtual accounts, direct debit, payouts"],
                    ["LumiID", "Identity look-up &amp; verification"],
                    ["Cr3dentials", "Gig / freelance income verification"],
                    ["Resend", "Transactional email (OTP, alerts)"],
                    ["LinkedIn OAuth", "Professional identity +score boost"],
                  ].map(([api, desc]) => (
                    <tr key={api} className="border-b border-stone-50">
                      <td className="py-0.5 pr-2 font-black text-stone-900">{api}</td>
                      <td className="py-0.5 text-stone-500">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── At a Glance ── */}
        <div className="mb-3">
          <h2 className="mb-1.5 text-[9px] font-black tracking-widest text-emerald-700 uppercase">At a glance</h2>
          <div className="grid grid-cols-5 gap-2">
            {[
              ["50+", "Lenders"],
              ["100+", "Financing Offers"],
              ["6", "Categories"],
              ["0–100", "Trust Score Range"],
              ["4", "Tiers"],
            ].map(([val, lab]) => (
              <div key={lab} className="rounded-lg border border-emerald-100 bg-emerald-50 p-2 text-center">
                <p className="text-lg font-black text-emerald-700">{val}</p>
                <p className="text-[8px] font-bold text-emerald-600">{lab}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="border-t border-stone-100 pt-2 text-center text-[7px] text-stone-400">
          CreditGo — Trust-Linked Credit Marketplace for Africa · creditgo.ng · Confidential
        </div>
      </div>
    </div>
  );
}
