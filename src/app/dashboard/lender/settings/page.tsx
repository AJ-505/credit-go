import { Copy, KeyRound, RotateCw, Send } from "lucide-react";

import { PageHeader, Panel } from "@/components/lender/lender-shell";
import { lenderProfile } from "@/lib/lender/demo-data";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader eyebrow="Configuration" title="Settings" description="Lender configuration for lending parameters, settlement, webhooks, and API access." />
      <div className="grid gap-6 xl:grid-cols-2">
        <Panel className="p-5">
          <h2 className="text-lg font-black">Lending Parameters</h2>
          <div className="mt-5 space-y-5">
            <Field label="Minimum Trust Score"><input type="range" min="0" max="100" defaultValue="56" className="w-full accent-blue-900" /><p className="mt-1 text-sm font-bold text-blue-900">56 minimum</p></Field>
            <Field label="Target Niches"><div className="flex flex-wrap gap-2">{["Rent", "Laptops", "Solar", "Devices"].map((item) => <span key={item} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-900">{item}</span>)}</div></Field>
            <Field label="Max Per Borrower"><input defaultValue="₦4,000,000" className="w-full rounded-lg border border-slate-200 px-3 py-2 font-bold outline-none focus:border-blue-800" /></Field>
            <Field label="Auto-approve Threshold"><input defaultValue="₦750,000" className="w-full rounded-lg border border-slate-200 px-3 py-2 font-bold outline-none focus:border-blue-800" /></Field>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="text-lg font-black">Settlement Account</h2>
            <p className="mt-3 rounded-lg bg-slate-50 p-4 font-bold">{lenderProfile.settlement}</p>
            <button className="mt-4 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold">Edit and re-verify</button>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-lg font-black">Webhook URL</h2>
            <input defaultValue={lenderProfile.webhook} className="mt-4 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold outline-none focus:border-blue-800" />
            <div className="mt-3 flex flex-wrap gap-2">
              {["new_lead", "pending_approval", "approval_result", "borrower_alert", "default_notification"].map((event) => <span key={event} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">{event}</span>)}
            </div>
            <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-900 px-3 py-2 text-sm font-bold text-white"><Send className="size-4" /> Test Webhook</button>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-lg font-black">API Key</h2>
            <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-slate-50 p-4">
              <span className="font-mono text-sm font-bold">{lenderProfile.apiKey}</span>
              <button className="rounded-lg border border-slate-200 bg-white p-2"><Copy className="size-4" /></button>
            </div>
            <button className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold"><RotateCw className="size-4" /> Regenerate</button>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">{label}</span>
      {children}
    </label>
  );
}
