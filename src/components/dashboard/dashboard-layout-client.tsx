"use client";

import { usePathname } from "next/navigation";

import { DashboardSidebar } from "@/components/dashboard/sidebar";

export function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard/lender")) {
    return children;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="hidden md:block">
        <DashboardSidebar />
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6 md:hidden">
          <div className="font-bold">CreditGo</div>
        </header>
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
