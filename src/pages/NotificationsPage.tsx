import React, { useState } from "react";
import { BasicCard } from "@/components/dashboard/Cards";
import { StatusBadge } from "@/components/dashboard/UIComponents";
import { useToastStack } from "@/components/dashboard/ToastStack";
import { Breadcrumb } from "@/components/dashboard/UtilityComponents";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, ShoppingCart, UserPlus, Settings, Check, Trash2 } from "lucide-react";

// NEW COMPONENT — Notifications page

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "order" | "message" | "user" | "system";
  read: boolean;
}

const iconMap = {
  order: ShoppingCart,
  message: MessageSquare,
  user: UserPlus,
  system: Settings,
};

const colorMap = {
  order: "bg-info/10 text-info",
  message: "bg-primary/10 text-primary",
  user: "bg-success/10 text-success",
  system: "bg-warning/10 text-warning",
};

const NotificationsPage: React.FC = () => {
  const { addToast } = useToastStack();
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", title: "New order received", description: "Order #12345 from John Doe — $299.00", time: "2 min ago", type: "order", read: false },
    { id: "2", title: "New message from Jane", description: "Hey, can you review the latest mockups?", time: "15 min ago", type: "message", read: false },
    { id: "3", title: "Payment confirmed", description: "Payment of $1,250.00 received via Stripe", time: "1 hour ago", type: "order", read: false },
    { id: "4", title: "New user registered", description: "sarah@company.com joined as Editor", time: "2 hours ago", type: "user", read: true },
    { id: "5", title: "System update", description: "Dashboard v2.4 deployed successfully", time: "3 hours ago", type: "system", read: true },
    { id: "6", title: "Subscription renewed", description: "Pro plan renewed for another year", time: "5 hours ago", type: "order", read: true },
    { id: "7", title: "Team invitation accepted", description: "mike@agency.com accepted your invite", time: "1 day ago", type: "user", read: true },
    { id: "8", title: "Weekly report ready", description: "Your weekly analytics report is available", time: "1 day ago", type: "system", read: true },
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast({ type: "success", title: "All notifications marked as read" });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    addToast({ type: "info", title: "Notification removed" });
  };

  const toggleRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const unread = notifications.filter(n => !n.read);
  const read = notifications.filter(n => n.read);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: "Dashboard" }, { label: "Notifications" }]} />
          <h1 className="text-2xl font-bold text-foreground mt-2">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">{unread.length} unread notification{unread.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <Check className="h-4 w-4" /> Mark all read
          </Button>
          <Button variant="outline" size="sm" onClick={() => addToast({ type: "warning", title: "Demo only", description: "This is a stackable toast demo!" })}>
            <Bell className="h-4 w-4" /> Test Toast
          </Button>
        </div>
      </div>

      {unread.length > 0 && (
        <BasicCard title={`Unread (${unread.length})`}>
          <div className="divide-y divide-border -mx-6">
            {unread.map(n => {
              const Icon = iconMap[n.type];
              return (
                <div key={n.id} className="flex items-start gap-4 px-6 py-4 hover:bg-accent/30 transition-colors">
                  <div className={`rounded-xl p-2.5 ${colorMap[n.type]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-card-foreground">{n.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 truncate">{n.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <StatusBadge variant="info" dot>New</StatusBadge>
                    <button onClick={() => toggleRead(n.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent transition-colors" title="Mark as read">
                      <Check className="h-4 w-4" />
                    </button>
                    <button onClick={() => deleteNotification(n.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </BasicCard>
      )}

      <BasicCard title={`Earlier (${read.length})`}>
        <div className="divide-y divide-border -mx-6">
          {read.map(n => {
            const Icon = iconMap[n.type];
            return (
              <div key={n.id} className="flex items-start gap-4 px-6 py-4 hover:bg-accent/30 transition-colors opacity-70">
                <div className={`rounded-xl p-2.5 ${colorMap[n.type]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground">{n.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5 truncate">{n.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
                <button onClick={() => deleteNotification(n.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0" title="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      </BasicCard>
    </div>
  );
};

export default NotificationsPage;
