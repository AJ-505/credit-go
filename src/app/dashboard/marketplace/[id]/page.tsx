"use client";

import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Clock,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { use, useMemo, useState } from "react";

const offers = [
  {
    lender: "Spleet",
    product: "Rent Now Pay Later",
    category: "Rent & Accommodation",
    range: "₦200,000 - ₦3,000,000",
    currency: "NGN",
    minTier: "Silver",
    rate: "3.5% monthly",
    tenor: "3 - 12 months",
    disbursement: "Paid directly to landlord or property manager",
    documents: [
      "Tenancy invoice",
      "Landlord account details",
      "Proof of address",
    ],
  },
  {
    lender: "SunKing",
    product: "Pay-As-You-Go Solar",
    category: "Solar & Green Energy",
    range: "₦50,000 - ₦1,500,000",
    currency: "NGN",
    minTier: "Bronze",
    rate: "2.8% monthly",
    tenor: "6 - 18 months",
    disbursement: "Asset financing through approved solar partners",
    documents: ["Installation address", "Utility bill", "Partner quote"],
  },
  {
    lender: "EdFin MFB",
    product: "School Fees Advance",
    category: "Education & School Fees",
    range: "₦100,000 - ₦2,000,000",
    currency: "NGN",
    minTier: "Silver",
    rate: "3.2% monthly",
    tenor: "3 - 9 months",
    disbursement: "Paid directly to the school or education provider",
    documents: ["School invoice", "Student ID", "Admission or enrolment proof"],
  },
  {
    lender: "Reliance Finance",
    product: "Medical Expense Plan",
    category: "Health & Medical",
    range: "₦100,000 - ₦2,500,000",
    currency: "NGN",
    minTier: "Silver",
    rate: "3.0% monthly",
    tenor: "3 - 12 months",
    disbursement: "Paid to hospital, clinic, or care provider",
    documents: ["Medical invoice", "Provider details", "Treatment estimate"],
  },
  {
    lender: "PayHippo",
    product: "Business Invoice Finance",
    category: "Business Invoice & Supply Chain",
    range: "₦250,000 - ₦8,000,000",
    currency: "NGN",
    minTier: "Gold",
    rate: "4.0% monthly",
    tenor: "30 - 120 days",
    disbursement: "Paid to supplier or borrower business account",
    documents: ["Supplier invoice", "Business registration", "Delivery note"],
  },
  {
    lender: "Carbon Zero",
    product: "Device Financing",
    category: "Device & Gadget",
    range: "₦100,000 - ₦1,800,000",
    currency: "NGN",
    minTier: "Bronze",
    rate: "3.8% monthly",
    tenor: "3 - 12 months",
    disbursement: "Device pickup or delivery through approved merchants",
    documents: [
      "Merchant quote",
      "Delivery address",
      "Device insurance consent",
    ],
  },
];

export default function MarketplaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [submitted, setSubmitted] = useState(false);
  const option = useMemo(() => {
    const index = Math.max(0, (Number(id) || 1) - 1) % offers.length;
    return offers[index];
  }, [id]);

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
              Eligible
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-stone-200 p-5">
            <Clock className="h-5 w-5 text-emerald-700" />
            <h2 className="mt-3 font-black text-stone-950">Repayment</h2>
            <p className="mt-1 text-sm text-stone-500">
              {option.tenor} at {option.rate}
            </p>
          </div>
          <div className="rounded-lg border border-stone-200 p-5">
            <ShieldCheck className="h-5 w-5 text-emerald-700" />
            <h2 className="mt-3 font-black text-stone-950">Disbursement</h2>
            <p className="mt-1 text-sm text-stone-500">{option.disbursement}</p>
          </div>
          <div className="rounded-lg border border-stone-200 p-5">
            <BadgeCheck className="h-5 w-5 text-emerald-700" />
            <h2 className="mt-3 font-black text-stone-950">Decision</h2>
            <p className="mt-1 text-sm text-stone-500">
              Pre-qualified from your current trust profile.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-emerald-100 bg-emerald-50 p-5">
          <div className="flex items-start gap-3">
            <FileCheck2 className="mt-0.5 h-5 w-5 text-emerald-700" />
            <div>
              <h2 className="font-black text-emerald-950">
                Required documents
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {option.documents.map((document) => (
                  <span
                    key={document}
                    className="rounded-full bg-white px-3 py-1 text-sm font-bold text-emerald-900"
                  >
                    {document}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="mt-8 rounded-lg border border-emerald-200 bg-white p-5">
            <p className="flex items-center gap-2 font-black text-emerald-800">
              <CheckCircle2 className="h-5 w-5" />
              Application started
            </p>
            <p className="mt-2 text-sm text-stone-500">
              Your profile, cash-flow score, and selected offer have been
              prepared for lender review.
            </p>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="h-11 rounded-lg bg-emerald-600 px-5 text-sm font-bold text-white hover:bg-emerald-700"
          >
            Start Application
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
