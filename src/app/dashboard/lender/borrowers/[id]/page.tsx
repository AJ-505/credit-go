import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PageHeader, Panel, StatusPill } from "@/components/lender/lender-shell";
import { borrowers, findById } from "@/lib/lender/demo-data";

export default async function BorrowerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const borrower = findById(borrowers, id);

  return (
    <div>
      <PageHeader
        eyebrow="Borrower detail"
        title={borrower.name}
        description="Non-anonymized customer view because this borrower has an active loan with the lender."
        action={<Link href="/dashboard/lender/borrowers" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold"><ArrowLeft className="size-4" /> Back</Link>}
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Panel className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-black">Personal Info</h2>
              <StatusPill status={borrower.health} />
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Metric label="Phone" value={borrower.phone} />
              <Metric label="Email" value={borrower.email} />
              <Metric label="Product" value={borrower.product} />
            </div>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-black">Current Loan</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-4">
              <Metric label="Remaining" value={borrower.remaining} />
              <Metric label="Last Payment" value={borrower.lastPayment} />
              <Metric label="Vault" value={borrower.vault} />
              <Metric label="Auto-sweep" value="Active 6pm daily" />
            </div>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-black">Score History</h2>
            <div className="mt-5 flex h-44 items-end gap-2 rounded-lg bg-slate-50 p-4">
              {[42, 54, 61, 58, 66, 70, 64, 74, 83, 78, 86, 92].map((height, index) => (
                <div key={index} className="flex-1 rounded-t bg-blue-800" style={{ height: `${height}%` }} />
              ))}
            </div>
          </Panel>
        </div>
        <Panel className="h-fit p-5">
          <h2 className="text-lg font-black">Payment Schedule</h2>
          <div className="mt-4 space-y-3">
            {["Paid", "Paid", borrower.health === "Alert" ? "Missed" : "Pending", "Pending"].map((status, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <span className="text-sm font-bold">Installment {index + 1}</span>
                <StatusPill status={status} />
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg bg-amber-50 p-4 text-sm font-semibold text-amber-900">
            Early warning: if streak drops to 0 and vault does not recover in 7 days, webhook alert is sent.
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg bg-slate-50 p-4"><p className="text-xs font-black uppercase tracking-widest text-slate-500">{label}</p><p className="mt-1 break-words font-bold">{value}</p></div>;
}
