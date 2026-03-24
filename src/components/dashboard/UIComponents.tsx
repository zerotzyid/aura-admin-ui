import React from "react";
import { cn } from "@/lib/utils";

/* ===== StatusBadge ===== */
type BadgeVariant = "success" | "warning" | "error" | "info" | "default";

interface StatusBadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
}

const badgeStyles: Record<BadgeVariant, string> = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-destructive/10 text-destructive",
  info: "bg-info/10 text-info",
  default: "bg-muted text-muted-foreground",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ variant = "default", children, dot }) => (
  <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", badgeStyles[variant])}>
    {dot && <span className={cn("h-1.5 w-1.5 rounded-full", {
      "bg-success": variant === "success",
      "bg-warning": variant === "warning",
      "bg-destructive": variant === "error",
      "bg-info": variant === "info",
      "bg-muted-foreground": variant === "default",
    })} />}
    {children}
  </span>
);

/* ===== Skeleton ===== */
export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("animate-pulse rounded-lg bg-muted", className)} />
);

/* ===== LoadingSkeleton for cards ===== */
export const CardSkeleton: React.FC = () => (
  <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
    <div className="flex justify-between">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-16" />
      </div>
      <Skeleton className="h-12 w-12 rounded-xl" />
    </div>
    <Skeleton className="h-3 w-20" />
  </div>
);

/* ===== Empty State ===== */
interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    {Icon && <div className="rounded-2xl bg-muted p-4 mb-4"><Icon className="h-8 w-8 text-muted-foreground" /></div>}
    <h3 className="text-base font-semibold text-foreground">{title}</h3>
    {description && <p className="mt-1 text-sm text-muted-foreground max-w-sm">{description}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

/* ===== Error State ===== */
interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ title = "Something went wrong", description = "An error occurred while loading data.", onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="rounded-2xl bg-destructive/10 p-4 mb-4">
      <svg className="h-8 w-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
    </div>
    <h3 className="text-base font-semibold text-foreground">{title}</h3>
    <p className="mt-1 text-sm text-muted-foreground max-w-sm">{description}</p>
    {onRetry && (
      <button onClick={onRetry} className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
        Try Again
      </button>
    )}
  </div>
);

/* ===== Toast ===== */
interface ToastNotificationProps {
  type?: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
}

const toastColors = {
  success: "border-success/30 bg-success/5",
  error: "border-destructive/30 bg-destructive/5",
  warning: "border-warning/30 bg-warning/5",
  info: "border-info/30 bg-info/5",
};

const toastTextColors = {
  success: "text-success",
  error: "text-destructive",
  warning: "text-warning",
  info: "text-info",
};

export const ToastNotification: React.FC<ToastNotificationProps> = ({ type = "info", message, onClose }) => (
  <div className={cn("flex items-center gap-3 rounded-xl border px-4 py-3 shadow-card animate-toast-in", toastColors[type])}>
    <span className={cn("text-sm font-medium", toastTextColors[type])}>{message}</span>
    {onClose && (
      <button onClick={onClose} className="ml-auto text-muted-foreground hover:text-foreground transition-colors">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    )}
  </div>
);

/* ===== Alert Banner ===== */
interface AlertBannerProps {
  type?: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  onClose?: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ type = "info", title, description, onClose }) => (
  <div className={cn("flex items-start gap-3 rounded-xl border px-4 py-3", toastColors[type])}>
    <div className="flex-1">
      <p className={cn("text-sm font-semibold", toastTextColors[type])}>{title}</p>
      {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
    </div>
    {onClose && (
      <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    )}
  </div>
);

/* ===== Activity Timeline ===== */
interface TimelineItem {
  title: string;
  description?: string;
  time: string;
  icon?: React.ElementType;
  color?: string;
}

export const ActivityTimeline: React.FC<{ items: TimelineItem[] }> = ({ items }) => (
  <div className="space-y-0">
    {items.map((item, i) => {
      const Icon = item.icon;
      return (
        <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
          {i < items.length - 1 && <div className="absolute left-[17px] top-10 h-full w-px bg-border" />}
          <div className={cn("z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-border bg-card", item.color)}>
            {Icon ? <Icon className="h-4 w-4" /> : <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
          </div>
          <div className="flex-1 pt-1">
            <p className="text-sm font-medium text-card-foreground">{item.title}</p>
            {item.description && <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>}
            <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
          </div>
        </div>
      );
    })}
  </div>
);

/* ===== User Profile Card ===== */
interface UserProfileCardProps {
  name: string;
  email: string;
  role: string;
  avatar?: string;
  stats?: { label: string; value: string }[];
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ name, email, role, stats }) => (
  <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
    <div className="h-24 bg-gradient-to-br from-primary/80 to-primary" />
    <div className="px-6 pb-6">
      <div className="-mt-10 mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-card bg-primary/10 text-2xl font-bold text-primary">
        {name.split(" ").map(n => n[0]).join("")}
      </div>
      <h3 className="text-lg font-bold text-card-foreground">{name}</h3>
      <p className="text-sm text-muted-foreground">{email}</p>
      <StatusBadge variant="info" dot>{role}</StatusBadge>
      {stats && (
        <div className="mt-4 grid grid-cols-3 gap-4 border-t border-border pt-4">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-lg font-bold text-card-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
