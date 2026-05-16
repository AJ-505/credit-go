import Link from "next/link";
import { Download, Filter, SlidersHorizontal } from "lucide-react";

import { PageHeader, Panel, StatusPill } from "@/components/lender/lender-shell";
import { leads } from "@/lib/lender/demo-data";

export default function LeadsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Lead management"
        title="Leads"
        description="Pre-qualified borrowers matching your lending filters. Identity stays masked until you act or exclusivity expires."
        action={
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold shadow-sm"><Filter className="size-4" /> Filters</button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-3 py-2 text-sm font-bold text-white"><Download className="size-4" /> Export CSV</button>
          </div>
        }
      />

      <Panel className="mb-6 p-5">
        <div className="grid gap-4 md:grid-cols-4">
          {["Min score 56+", "Persona: All", "Assets: Laptop, Solar, Rent", "Max amount ₦4M"].map((filter) => (
            <div key={filter} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
              <SlidersHorizontal className="size-4 text-blue-800" />
              {filter}
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                {["Name", "Persona", "Score", "Tier", "Niche", "Seeking", "Risk", ""].map((head) => <th key={head} className="px-5 py-3 font-black">{head}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-black">{lead.name}</td>
                  <td className="px-5 py-4">{lead.persona}</td>
                  <td className="px-5 py-4 font-bold">{lead.score}</td>
                  <td className="px-5 py-4">{lead.tier}</td>
                  <td className="px-5 py-4">{lead.niche}</td>
                  <td className="px-5 py-4 font-bold">{lead.seeking}</td>
                  <td className="px-5 py-4"><StatusPill status={lead.risk} /></td>
                  <td className="px-5 py-4 text-right"><Link className="font-black text-blue-800" href={`/dashboard/lender/leads/${lead.id}`}>View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
