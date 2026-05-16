import { PageHeader, Panel, StatusPill } from "@/components/lender/lender-shell";
import { borrowers, kpis } from "@/lib/lender/demo-data";

export default function PortfolioPage() {
  return (
    <div>
      <PageHeader eyebrow="Analytics" title="Portfolio" description="Analytics for the entire loan book: disbursements, default trend, score distribution, and at-risk exposure." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[...kpis, { label: "Recovery Rate", value: "71%", detail: "Of defaulted amount", trend: "+4.8%" }].map((item) => (
          <Panel key={item.label} className="p-5">
            <p className="text-sm font-bold text-slate-500">{item.label}</p>
            <p className="mt-3 text-2xl font-black">{item.value}</p>
            <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
          </Panel>
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Chart title="Disbursements Over Time" bars={[38, 52, 44, 61, 72, 88, 79, 92]} />
        <Chart title="Default Rate Trend" bars={[44, 40, 35, 30, 24, 18, 15, 13]} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel className="p-5">
          <h2 className="text-lg font-black">Score Distribution</h2>
          <div className="mt-5 space-y-4">
            {[
              ["Bronze", "12 borrowers", "w-[5%]"],
              ["Silver", "245 borrowers", "w-[36%]"],
              ["Gold", "680 borrowers", "w-[78%]"],
              ["Platinum", "310 borrowers", "w-[48%]"],
            ].map(([label, count, width]) => (
              <div key={label}>
                <div className="mb-1 flex justify-between text-sm font-bold"><span>{label}</span><span className="text-slate-500">{count}</span></div>
                <div className="h-3 rounded-full bg-slate-100"><div className={`${width} h-full rounded-full bg-blue-800`} /></div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="p-5">
          <h2 className="text-lg font-black">At-Risk Breakdown</h2>
          <div className="mt-4 divide-y divide-slate-100">
            {borrowers.filter((b) => b.health !== "Good").map((b) => (
              <div key={b.id} className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="font-bold">{b.name}</p>
                  <p className="text-sm text-slate-500">{b.product} • {b.remaining} remaining • last paid {b.lastPayment}</p>
                </div>
                <StatusPill status={b.health} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Chart({ title, bars }: { title: string; bars: number[] }) {
  return (
    <Panel className="p-5">
      <h2 className="text-lg font-black">{title}</h2>
      <div className="mt-5 flex h-56 items-end gap-3 rounded-lg bg-slate-50 p-4">
        {bars.map((height, index) => <div key={index} className="flex-1 rounded-t bg-blue-800" style={{ height: `${height}%` }} />)}
      </div>
    </Panel>
  );
}
