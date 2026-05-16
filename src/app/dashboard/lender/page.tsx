import Link from "next/link";
import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";

import { PageHeader, Panel, StatusPill } from "@/components/lender/lender-shell";
import { activities, approvals, kpis, leads, upsells } from "@/lib/lender/demo-data";

export default function LenderDashboardPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Portfolio command center"
        title="Lender Dashboard"
        description="Real-time overview of disbursements, borrower health, pending reviews, and exclusive upsell windows."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {kpis.map((kpi) => (
          <Panel key={kpi.label} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-bold text-slate-500">{kpi.label}</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">
                {kpi.trend.startsWith("-") ? <TrendingDown className="size-3" /> : <TrendingUp className="size-3" />}
                {kpi.trend}
              </span>
            </div>
            <p className="mt-4 text-3xl font-black tracking-tight">{kpi.value}</p>
            <p className="mt-1 text-sm text-slate-500">{kpi.detail}</p>
          </Panel>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel>
          <div className="border-b border-slate-100 p-5">
            <h2 className="text-lg font-black">Pending Reviews</h2>
            <p className="text-sm text-slate-500">12 applications awaiting decision</p>
          </div>
          <div className="divide-y divide-slate-100">
            {approvals.map((item) => (
              <Link key={item.id} href={`/dashboard/lender/approvals/${item.id}`} className="flex items-center justify-between gap-4 p-5 hover:bg-slate-50">
                <div>
                  <p className="font-bold">{item.product} • {item.amount} • {item.applicant}</p>
                  <p className="text-sm text-slate-500">Trust {item.score} • Vault {item.vault}</p>
                </div>
                <StatusPill status={item.status} />
              </Link>
            ))}
          </div>
          <Link href="/dashboard/lender/approvals" className="flex items-center gap-2 border-t border-slate-100 p-5 text-sm font-bold text-blue-800">
            View all approvals <ArrowRight className="size-4" />
          </Link>
        </Panel>

        <Panel>
          <div className="border-b border-slate-100 p-5">
            <h2 className="text-lg font-black">Qualified Leads</h2>
            <p className="text-sm text-slate-500">43 new this week matching your filters</p>
          </div>
          <div className="divide-y divide-slate-100">
            {leads.slice(0, 3).map((lead) => (
              <Link key={lead.id} href={`/dashboard/lender/leads/${lead.id}`} className="flex items-center justify-between gap-4 p-5 hover:bg-slate-50">
                <div>
                  <p className="font-bold">{lead.persona} • Trust {lead.score} • {lead.state}</p>
                  <p className="text-sm text-slate-500">{lead.niche} request • {lead.seeking}</p>
                </div>
                <ArrowRight className="size-4 text-slate-400" />
              </Link>
            ))}
          </div>
          <Link href="/dashboard/lender/leads" className="flex items-center gap-2 border-t border-slate-100 p-5 text-sm font-bold text-blue-800">
            View all leads <ArrowRight className="size-4" />
          </Link>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
        <Panel className="p-5">
          <h2 className="text-lg font-black">Portfolio Health</h2>
          <div className="mt-5 space-y-4">
            {[
              ["Performing", "₦428M", "94.7%", "bg-emerald-500", "w-[94.7%]"],
              ["At Risk", "₦18M", "4.0%", "bg-amber-500", "w-[24%]"],
              ["Defaulted", "₦6M", "1.3%", "bg-rose-500", "w-[12%]"],
            ].map(([label, amount, percent, color, width]) => (
              <div key={label} className="grid gap-2 md:grid-cols-[160px_1fr] md:items-center">
                <p className="text-sm font-bold">{label}: <span className="text-slate-500">{amount} ({percent})</span></p>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className={`${color} ${width} h-full rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <div className="border-b border-slate-100 p-5">
            <h2 className="text-lg font-black">Upsell Opportunities</h2>
            <p className="text-sm text-slate-500">First Right of Refusal windows</p>
          </div>
          <div className="divide-y divide-slate-100">
            {upsells.map((item) => (
              <div key={item.borrower} className="flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="font-bold">{item.borrower} • {item.tier}</p>
                  <p className="text-sm text-slate-500">{item.product} • {item.amount}</p>
                </div>
                <span className="text-sm font-black text-blue-800">{item.window}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel className="mt-6">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-black">Recent Activity</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {activities.map((activity, index) => (
            <div key={activity} className="grid gap-2 p-5 text-sm md:grid-cols-[140px_1fr]">
              <span className="font-bold text-slate-500">May {15 - Math.floor(index / 3)} • {index + 10}:00</span>
              <span>{activity}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
