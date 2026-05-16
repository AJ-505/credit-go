import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";

export default function LoansPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Loans</h1>
        <p className="text-muted-foreground">Track your active financing and payment history.</p>
      </div>

      <h2 className="text-xl font-semibold mt-4">Active Loans</h2>
      <div className="grid gap-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">Dell XPS 14 (2026)</h3>
              <p className="text-sm text-muted-foreground">₦598,000 Total • 12 Months</p>
            </div>
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 border-transparent">
              Active
            </span>
          </div>
          
          <div className="mb-2 flex justify-between text-sm">
            <span>4 of 12 payments made</span>
            <span className="font-medium">₦49,833 / month</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-4">
            <div className="h-full bg-primary w-[33%]"></div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" /> Next payment due June 1
            </div>
            <button className="text-sm font-medium text-primary hover:underline">
              View Details →
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8">Past Loans</h2>
      <div className="grid gap-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6 opacity-80">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">Tecno Camon 40 Pro</h3>
              <p className="text-sm text-muted-foreground">₦350,000 Total • 6 Months</p>
            </div>
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 border-transparent">
              <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground">Completed on Dec 15, 2025 • 6 of 6 on-time payments</p>
        </div>
      </div>
    </div>
  );
}
