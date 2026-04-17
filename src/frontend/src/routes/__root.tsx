import { DesktopSidebar, MobileSidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <DesktopSidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <header className="flex lg:hidden items-center gap-3 px-4 h-14 border-b border-border bg-card flex-shrink-0">
          <MobileSidebar />
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-display font-bold text-foreground truncate">
              MineComply
            </span>
            <span className="text-xs text-muted-foreground hidden sm:block">
              Environmental Compliance
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <Toaster richColors position="top-right" />
    </div>
  );
}
