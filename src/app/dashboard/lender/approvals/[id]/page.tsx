import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

import { PageHeader, Panel, StatusPill } from "@/components/lender/lender-shell";
import { approvals, findById } from "@/lib/lender/demo-data";

export default async function ApprovalReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = findById(approvals, id);

  return (
    <div>
      <PageHeader
        eyebrow="Decision workspace"
        title={`Review: ${app.applicant}`}
        description="Underwriting summary with borrower signals, vault behavior, and decision actions."
        action={<Link href="/dashboard/lender/approvals" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold"><ArrowLeft className="size-4" /> Back</Link>}
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="text-lg font-black">Application</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-4">
              {[
                { label: "Product", value: app.product },
                { label: "Amount", value: app.amount },
                { label: "Tenor", value: "12 months" },
                { label: "Monthly", value: app.id === "app-ya" ? "₦283,333" : "₦66,667" },
              ].map((metric) => <Metric key={metric.label} label={metric.label} value={metric.value} />)}
            </div>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-black">Borrower Profile</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                { label: "Trust Score", value: `${app.score} Gold` },
                { label: "Vault Balance", value: app.vault },
                { label: "Income", value: app.income },
                { label: "DTI Ratio", value: `${app.dti} low` },
                { label: "Bank Statement", value: "8 months" },
                { label: "Guardrails", value: app.status === "Flagged" ? "Score drop active" : "None active" },
              ].map((metric) => <Metric key={metric.label} label={metric.label} value={metric.value} />)}
            </div>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-black">Risk Assessment</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Metric label="Default Probability" value={`${app.probability} Low`} />
              <Metric label="Safe Limit" value={app.safeLimit} />
              <Metric label="Request vs Limit" value={app.status === "Flagged" ? "Needs exception" : "Within limit"} />
            </div>
          </Panel>
        </div>
        <Panel className="h-fit p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black">Decision</h2>
            <StatusPill status={app.status} />
          </div>
          <div className="mt-5 space-y-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-3 text-sm font-black text-white"><CheckCircle2 className="size-4" /> Approve - Auto-disburse</button>
            <button className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-black">Approve with conditions</button>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-black text-rose-700"><XCircle className="size-4" /> Reject</button>
            <textarea className="mt-2 h-28 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-800" placeholder="Reason for rejection or conditions" />
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-xs font-black uppercase tracking-widest text-slate-500">{label}</p>
      <p className="mt-1 font-bold">{value}</p>
    </div>
  );
}
