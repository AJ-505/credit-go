import Link from "next/link";

export function DashboardSidebar() {
  return (
    <div className="w-64 h-full border-r bg-muted/20 flex flex-col p-4">
      <div className="font-bold text-xl mb-8">CreditGo</div>
      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className="px-4 py-2 hover:bg-muted rounded-md text-sm">Dashboard</Link>
        <Link href="/dashboard/marketplace" className="px-4 py-2 hover:bg-muted rounded-md text-sm">Marketplace</Link>
      </nav>
    </div>
  );
}
