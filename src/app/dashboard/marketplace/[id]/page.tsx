"use client";

import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function MarketplaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const option = {
    id,
    lender: `Marketplace Offer #${id}`,
    product: "Mock financing application",
    category: "CreditGo Marketplace",
    range: "Based on your safe limit",
    currency: "NGN",
    minTier: "Gold",
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <Link
        href="/dashboard/marketplace"
        className="inline-flex w-fit items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to marketplace
      </Link>

      <section className="rounded-xl border border-emerald-100 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black tracking-widest text-emerald-700 uppercase">
              {option.category}
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-stone-950">
              {option.lender}
            </h1>
            <p className="mt-3 text-lg text-stone-500">{option.product}</p>
          </div>
          <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-800">
            {option.minTier}+ tier
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs font-black tracking-widest text-stone-500 uppercase">
              Financing range
            </p>
            <p className="mt-2 text-2xl font-black text-stone-950">
              {option.range}
            </p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs font-black tracking-widest text-stone-500 uppercase">
              Currency
            </p>
            <p className="mt-2 text-2xl font-black text-stone-950">
              {option.currency}
            </p>
          </div>
          <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-xs font-black tracking-widest text-emerald-700 uppercase">
              Status
            </p>
            <p className="mt-2 flex items-center gap-2 text-lg font-black text-emerald-900">
              <CheckCircle2 className="h-5 w-5" />
              Mock eligible
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-emerald-100 bg-emerald-50 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-700" />
            <div>
              <h2 className="font-black text-emerald-950">
                Prototype application
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-emerald-900">
                This mock detail page keeps the marketplace journey working
                while lender application workflows are being wired.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="h-11 rounded-lg bg-emerald-600 px-5 text-sm font-bold text-white hover:bg-emerald-700"
          >
            Start Mock Application
          </button>
          <Link
            href="/dashboard/marketplace"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-emerald-200 px-5 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
          >
            Compare More Offers
          </Link>
        </div>
      </section>
    </div>
  );
}
