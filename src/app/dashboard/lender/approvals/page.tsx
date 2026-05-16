import Link from "next/link";

import { PageHeader, Panel, StatusPill } from "@/components/lender/lender-shell";
import { approvals } from "@/lib/lender/demo-data";

export default function ApprovalsPage() {
  return (
    <div>
      <PageHeader eyebrow="Manual review" title="Approvals" description="Approval queue for requests above auto-approve threshold or with borderline score movement." />
      <Panel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase tracking-wider text-slate-500">
              <tr>{["Applicant", "Product", "Amount", "Score", "Vault", "Status", ""].map((head) => <th key={head} className="px-5 py-3 font-black">{head}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {approvals.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-black">{item.applicant}</td>
                  <td className="px-5 py-4">{item.product}</td>
                  <td className="px-5 py-4 font-bold">{item.amount}</td>
                  <td className="px-5 py-4">{item.score}</td>
                  <td className="px-5 py-4">{item.vault}</td>
                  <td className="px-5 py-4"><StatusPill status={item.status} /></td>
                  <td className="px-5 py-4 text-right"><Link className="font-black text-blue-800" href={`/dashboard/lender/approvals/${item.id}`}>Review</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
