import Link from "next/link";
import { Download, ShieldAlert } from "lucide-react";

import { PageHeader, Panel, StatusPill } from "@/components/lender/lender-shell";
import { borrowers } from "@/lib/lender/demo-data";

export default function BorrowersPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Active monitoring"
        title="My Borrowers"
        description="Real-time borrower health with score movement, vault streaks, and early warning status."
        action={<div className="flex gap-2"><button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold"><ShieldAlert className="size-4" /> Alerts Only</button><button className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-3 py-2 text-sm font-bold text-white"><Download className="size-4" /> Export</button></div>}
      />
      <Panel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase tracking-wider text-slate-500">
              <tr>{["Name", "Product", "Score", "Vault", "Streak", "Health", ""].map((head) => <th key={head} className="px-5 py-3 font-black">{head}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {borrowers.map((borrower) => (
                <tr key={borrower.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-black">{borrower.masked}</td>
                  <td className="px-5 py-4">{borrower.product}</td>
                  <td className="px-5 py-4 font-bold">{borrower.score}</td>
                  <td className="px-5 py-4">{borrower.vault}</td>
                  <td className="px-5 py-4">{borrower.streak}</td>
                  <td className="px-5 py-4"><StatusPill status={borrower.health} /></td>
                  <td className="px-5 py-4 text-right"><Link className="font-black text-blue-800" href={`/dashboard/lender/borrowers/${borrower.id}`}>View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
