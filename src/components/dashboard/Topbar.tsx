import React, { useState, useRef, useEffect } from "react";
import { useDashboard } from "@/contexts/DashboardContext";
import { Menu, Search, Bell, Sun, Moon, ChevronDown, User, Settings, LogOut } from "lucide-react";

const Topbar: React.FC = () => {
  const { toggleSidebar, darkMode, toggleDarkMode } = useDashboard();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const notifications = [
    { id: 1, title: "New order received", desc: "Order #12345 from John Doe", time: "2 min ago", unread: true },
    { id: 2, title: "Payment confirmed", desc: "$2,450.00 received", time: "1 hour ago", unread: true },
    { id: 3, title: "New user registered", desc: "jane@example.com", time: "3 hours ago", unread: false },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
      <button onClick={toggleSidebar} className="lg:hidden rounded-lg p-2 text-muted-foreground hover:bg-accent transition-colors">
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search anything..."
          className="h-10 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
        />
      </div>

      <div className="flex items-center gap-2">
        {/* Dark mode toggle */}
        <button onClick={toggleDarkMode} className="rounded-lg p-2.5 text-muted-foreground hover:bg-accent transition-colors">
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button onClick={() => setNotifOpen(p => !p)} className="relative rounded-lg p-2.5 text-muted-foreground hover:bg-accent transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-destructive ring-2 ring-card" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-border bg-card shadow-elevated animate-scale-in">
              <div className="border-b border-border px-4 py-3">
                <p className="text-sm font-semibold text-card-foreground">Notifications</p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="flex gap-3 px-4 py-3 hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${n.unread ? 'bg-primary' : 'bg-transparent'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-card-foreground">{n.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{n.desc}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border px-4 py-2.5">
                <button className="w-full text-center text-sm font-medium text-primary hover:underline">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button onClick={() => setProfileOpen(p => !p)} className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-accent transition-colors">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">JD</span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-card-foreground leading-none">John Doe</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
            <ChevronDown className="hidden md:block h-4 w-4 text-muted-foreground" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card shadow-elevated animate-scale-in">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-medium text-card-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
              <div className="py-1">
                {[
                  { icon: User, label: "Profile" },
                  { icon: Settings, label: "Settings" },
                ].map(item => (
                  <button key={item.label} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-card-foreground hover:bg-accent transition-colors">
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="border-t border-border py-1">
                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
