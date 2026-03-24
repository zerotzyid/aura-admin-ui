import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/contexts/DashboardContext";
import {
  LayoutDashboard, BarChart3, Table2, FileText, Settings, Users,
  ChevronDown, ChevronLeft, ChevronRight, Package, Bell, Calendar,
  HelpCircle, LogOut, X
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href?: string;
  active?: boolean;
  children?: { label: string; href: string; active?: boolean }[];
}

const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "#dashboard", active: true },
      { label: "Analytics", icon: BarChart3, href: "#analytics" },
      { label: "Customers", icon: Users, children: [
        { label: "All Customers", href: "#customers" },
        { label: "Segments", href: "#segments" },
      ]},
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Products", icon: Package, href: "#products" },
      { label: "Orders", icon: Table2, href: "#orders" },
      { label: "Calendar", icon: Calendar, href: "#calendar" },
    ],
  },
  {
    title: "Other",
    items: [
      { label: "Forms", icon: FileText, href: "#forms" },
      { label: "Notifications", icon: Bell, href: "#notifications" },
      { label: "Settings", icon: Settings, href: "#settings" },
    ],
  },
];

const SidebarNavItem: React.FC<{ item: NavItem; collapsed: boolean; onNavigate: (page: string) => void; activePage: string }> = ({ item, collapsed, onNavigate, activePage }) => {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;
  const isActive = item.href === `#${activePage}` || item.children?.some(c => c.href === `#${activePage}`);

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen(p => !p)}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
            isActive ? "bg-primary/10 text-primary" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            collapsed && "justify-center px-2"
          )}
        >
          <Icon className="h-5 w-5 shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")} />
            </>
          )}
        </button>
        {!collapsed && open && (
          <div className="ml-5 mt-1 space-y-1 border-l-2 border-border pl-4">
            {item.children.map(child => (
              <button
                key={child.label}
                onClick={() => onNavigate(child.href.replace('#', ''))}
                className={cn(
                  "block w-full rounded-md px-3 py-2 text-left text-sm transition-all duration-200",
                  child.href === `#${activePage}` ? "text-primary font-medium" : "text-sidebar-foreground hover:text-sidebar-accent-foreground"
                )}
              >
                {child.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => item.href && onNavigate(item.href.replace('#', ''))}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
        isActive ? "bg-primary/10 text-primary" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        collapsed && "justify-center px-2"
      )}
      title={collapsed ? item.label : undefined}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span>{item.label}</span>}
    </button>
  );
};

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const { sidebarOpen, sidebarCollapsed, toggleCollapse, closeSidebar } = useDashboard();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={closeSidebar} />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
          sidebarCollapsed ? "w-[72px]" : "w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:z-auto"
        )}
      >
        {/* Header */}
        <div className={cn("flex h-16 items-center border-b border-sidebar-border px-4", sidebarCollapsed && "justify-center px-2")}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
            A
          </div>
          {!sidebarCollapsed && <span className="ml-3 text-lg font-bold text-card-foreground">AdminKit</span>}
          <button onClick={closeSidebar} className="ml-auto lg:hidden text-sidebar-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-6">
          {navGroups.map(group => (
            <div key={group.title}>
              {!sidebarCollapsed && (
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{group.title}</p>
              )}
              <div className="space-y-1">
                {group.items.map(item => (
                  <SidebarNavItem key={item.label} item={item} collapsed={sidebarCollapsed} onNavigate={(p) => { onNavigate(p); closeSidebar(); }} activePage={activePage} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className={cn("border-t border-sidebar-border p-3", sidebarCollapsed && "flex flex-col items-center")}>
          <button className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200",
            sidebarCollapsed && "justify-center px-2"
          )}>
            <HelpCircle className="h-5 w-5 shrink-0" />
            {!sidebarCollapsed && <span>Help & Support</span>}
          </button>
          <button className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-all duration-200",
            sidebarCollapsed && "justify-center px-2"
          )}>
            <LogOut className="h-5 w-5 shrink-0" />
            {!sidebarCollapsed && <span>Log Out</span>}
          </button>
          {/* Collapse toggle - desktop only */}
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-sidebar-accent transition-all duration-200 mt-1"
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <><ChevronLeft className="h-4 w-4" /><span>Collapse</span></>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
