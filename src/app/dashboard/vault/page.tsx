import Link from "next/link";
import { Settings, Share, ArrowRight, Play, Pause } from "lucide-react";

export default function VaultPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Savings Vault</h1>
          <p className="text-muted-foreground">Manage your auto-sweep and repayment funds.</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 py-2 px-4">
          <Settings className="mr-2 h-4 w-4" /> Settings
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6 flex flex-col gap-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Balance</p>
            <div className="text-4xl font-bold mt-1">₦245,000</div>
            <div className="mt-4 h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[40%]"></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">40% toward ₦600K active loan</p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold">🔥</span>
              <span className="font-semibold">12-day streak</span>
            </div>
            <button className="text-sm font-medium text-primary flex items-center gap-1 hover:underline">
              <Share className="h-4 w-4" /> Share
            </button>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow p-6 flex flex-col gap-4">
          <h3 className="font-semibold text-lg border-b pb-2">Next Sweep</h3>
          <div>
            <p className="text-sm text-muted-foreground">Today at 6:00 PM</p>
            <p className="text-2xl font-bold mt-1">₦5,000</p>
          </div>
          <div className="flex gap-3 mt-auto">
            <button className="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium border bg-background hover:bg-muted h-10 px-4">
              Adjust Amount
            </button>
            <button className="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium border bg-background hover:bg-muted h-10 px-4">
              <Pause className="mr-2 h-4 w-4" /> Pause Sweep
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden">
        <div className="p-6 pb-4 border-b">
          <h3 className="font-semibold text-lg">Recent Vault Activity</h3>
        </div>
        <div className="divide-y">
          {[
            { date: 'May 15', amount: '+₦5,000', type: 'Auto-sweep', status: 'success' },
            { date: 'May 14', amount: '+₦5,000', type: 'Auto-sweep', status: 'success' },
            { date: 'May 13', amount: '+₦10,000', type: 'Manual top-up', status: 'success' },
            { date: 'May 12', amount: '+₦5,000', type: 'Auto-sweep', status: 'success' },
            { date: 'May 11', amount: 'MISSED', type: 'Auto-sweep', status: 'failed' },
          ].map((tx, i) => (
            <div key={i} className="p-4 px-6 flex justify-between items-center hover:bg-muted/50 transition-colors">
              <div>
                <p className="font-medium">{tx.date}</p>
                <p className="text-sm text-muted-foreground">{tx.type}</p>
              </div>
              <div className={`font-semibold ${tx.status === 'failed' ? 'text-destructive' : 'text-green-600'}`}>
                {tx.amount}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-muted/20 flex justify-center">
          <button className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            View All Transactions <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
