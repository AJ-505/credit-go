import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block">
        <DashboardSidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6 md:hidden">
          <div className="font-bold">CreditGo</div>
        </header>
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav (stubbed, would use identical items to sidebar) */}
      {/* TODO: Implement bottom nav for mobile matching the spec */}
    </div>
  );
}
