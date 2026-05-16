"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Building2, Search } from "lucide-react";

import { BrandSideProvider } from "@/components/ui/brand-side-provider";
import { cn } from "@/lib/utils";
import { lenderNavItems, lenderProfile } from "@/lib/lender/demo-data";

export function LenderShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <BrandSideProvider side="lender">
      <div className="min-h-screen bg-slate-50 text-slate-950">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <Link href="/dashboard/lender" className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-blue-900 text-sm font-black text-white">
                CG
              </span>
              <span>
                <span className="block text-sm font-black">CreditGo</span>
                <span className="block text-xs font-semibold text-blue-700">Lender Console</span>
              </span>
            </Link>
            <div className="hidden min-w-[280px] items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 lg:flex">
              <Search className="size-4" />
              Search borrowers, leads, transactions
            </div>
            <div className="flex items-center gap-3">
              <button className="flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm">
                <Bell className="size-4" />
              </button>
              <div className="hidden items-center gap-3 md:flex">
                <div className="text-right">
                  <p className="text-sm font-bold">{lenderProfile.businessName}</p>
                  <p className="text-xs text-slate-500">Tier 1 lender • Verified</p>
                </div>
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-100 text-blue-900">
                  <Building2 className="size-4" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid min-h-[calc(100vh-4rem)] md:grid-cols-[248px_1fr]">
          <aside className="hidden border-r border-slate-200 bg-white p-4 md:block">
            <nav className="space-y-1">
              {lenderNavItems.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/dashboard/lender" && pathname.startsWith(`${item.href}/`));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950",
                      active && "bg-blue-50 text-blue-900",
                    )}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
          <main className="min-w-0 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </BrandSideProvider>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div>
        {eyebrow ? <p className="mb-2 text-xs font-black uppercase tracking-widest text-blue-700">{eyebrow}</p> : null}
        <h1 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn("rounded-lg border border-slate-200 bg-white shadow-sm", className)}>{children}</section>;
}

export function StatusPill({ status }: { status: string }) {
  const tone =
    status === "Good" || status === "Pending" || status === "Ready"
      ? "bg-blue-50 text-blue-800 border-blue-100"
      : status === "Watch" || status === "Flagged"
        ? "bg-amber-50 text-amber-800 border-amber-100"
        : status === "Alert"
          ? "bg-rose-50 text-rose-800 border-rose-100"
          : "bg-emerald-50 text-emerald-800 border-emerald-100";
  return <span className={cn("inline-flex rounded-full border px-2 py-1 text-xs font-bold", tone)}>{status}</span>;
}
