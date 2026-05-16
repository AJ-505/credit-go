import { Download } from "lucide-react";

import { PageHeader, Panel, StatusPill } from "@/components/lender/lender-shell";
import { registry } from "@/lib/lender/demo-data";

export default function ReportsPage() {
  const exports = ["Transaction log", "Commission / fee statement", "Borrower portfolio", "Monthly portfolio summary", "Default registry"];
  return (
    <div>
      <PageHeader eyebrow="Exports" title="Reports" description="CSV-ready reports and the shared default registry for participating lenders." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {exports.map((item) => (
          <Panel key={item} className="p-5">
            <p className="font-black">{item}</p>
            <p className="mt-2 text-sm text-slate-500">May 2026 • CSV</p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold"><Download className="size-4" /> Export</button>
          </Panel>
        ))}
      </div>
      <Panel className="mt-6 overflow-hidden">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-black">Shared Default Registry</h2>
          <p className="text-sm text-slate-500">Automatic defaults from participating CreditGo lenders.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase tracking-wider text-slate-500">
              <tr>{["Borrower", "Amount", "Product", "Defaulted", "Origin", "Bureau"].map((head) => <th key={head} className="px-5 py-3 font-black">{head}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {registry.map((item) => (
                <tr key={item.borrower}>
                  <td className="px-5 py-4 font-black">{item.borrower}</td>
                  <td className="px-5 py-4">{item.amount}</td>
                  <td className="px-5 py-4">{item.product}</td>
                  <td className="px-5 py-4">{item.date}</td>
                  <td className="px-5 py-4">{item.origin}</td>
                  <td className="px-5 py-4"><StatusPill status={item.reported} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
