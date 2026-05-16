import Link from "next/link";
import { ArrowLeft, Bookmark, Send, X } from "lucide-react";

import { PageHeader, Panel, StatusPill } from "@/components/lender/lender-shell";
import { findById, leads } from "@/lib/lender/demo-data";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = findById(leads, id);

  return (
    <div>
      <PageHeader
        eyebrow="Anonymized lead"
        title={`Lead: ${lead.name}`}
        description="Borrower identity is masked until an offer action is taken or the First Right of Refusal window expires."
        action={<Link href="/dashboard/lender/leads" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold"><ArrowLeft className="size-4" /> Back to Leads</Link>}
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="text-lg font-black">Profile</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                ["Persona", `${lead.persona} Worker`],
                ["Trust Score", `${lead.score} (${lead.tier})`],
                ["Risk Band", lead.risk],
                ["State", lead.state],
                ["Employment", "Verified"],
                ["Origin Window", "18h until general pool"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500">{label}</p>
                  <p className="mt-1 font-bold">{value}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-lg font-black">Seeking</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-4">
              {[
                ["Product", lead.product],
                ["Amount", lead.seeking],
                ["Tenor", lead.tenor],
                ["Monthly", lead.monthly],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500">{label}</p>
                  <p className="mt-1 font-bold">{value}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-lg font-black">Behavioral Signals</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {lead.signals.map((signal) => <div key={signal} className="rounded-lg border border-slate-200 p-4 text-sm font-semibold">{signal}</div>)}
            </div>
          </Panel>
        </div>

        <Panel className="h-fit p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black">Lender Actions</h2>
            <StatusPill status={lead.risk} />
          </div>
          <div className="mt-5 space-y-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-3 text-sm font-black text-white"><Send className="size-4" /> Send Offer</button>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-black"><Bookmark className="size-4" /> Save for Later</button>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-black text-rose-700"><X className="size-4" /> Not Interested</button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
