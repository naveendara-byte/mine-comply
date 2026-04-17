import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  ClipboardList,
  Droplets,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  Trees,
  Wind,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/compliance", label: "Compliance Tasks", icon: ClipboardList },
  { href: "/monitoring/air", label: "Air Quality", icon: Wind },
  { href: "/monitoring/piezometer", label: "Piezometer", icon: Droplets },
  { href: "/trees", label: "Planted Trees", icon: Trees },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

interface SidebarContentProps {
  onNavClick?: () => void;
}

function SidebarContent({ onNavClick }: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
            <ShieldCheck
              className="h-4.5 w-4.5 text-primary-foreground"
              size={18}
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-display font-bold text-sidebar-foreground leading-tight">
              MineComply
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight tracking-wide uppercase">
              Env. Compliance
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={onNavClick}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-smooth",
              "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
            )}
            activeProps={{
              className:
                "bg-sidebar-accent text-sidebar-foreground !text-sidebar-primary border-l-2 border-sidebar-primary pl-[10px]",
            }}
            activeOptions={{ exact: item.href === "/" }}
            data-ocid={`nav.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
          >
            <item.icon size={16} className="flex-shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-sidebar-border">
        <p className="text-[10px] text-muted-foreground leading-tight">
          © {new Date().getFullYear()} Coal Mine Environmental
        </p>
        <p className="text-[10px] text-muted-foreground/60">
          Built with{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            className="hover:text-muted-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}

/** Desktop sidebar (static, always visible) */
export function DesktopSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 bg-sidebar border-r border-sidebar-border h-screen sticky top-0">
      <SidebarContent />
    </aside>
  );
}

/** Mobile sidebar (slide-in drawer) */
export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        data-ocid="nav.menu_button"
      >
        <Menu size={20} />
      </Button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          role="button"
          tabIndex={-1}
          aria-label="Close navigation overlay"
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-56 bg-sidebar border-r border-sidebar-border shadow-elevated transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3"
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
          data-ocid="nav.close_button"
        >
          <X size={18} />
        </Button>
        <SidebarContent onNavClick={() => setOpen(false)} />
      </div>
    </>
  );
}
