import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

/* ===== Stats Card ===== */
interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, changeType = "neutral", icon: Icon }) => (
  <div className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-200 hover:shadow-card">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="mt-2 text-3xl font-bold text-card-foreground">{value}</p>
        {change && (
          <p className={cn("mt-1 text-sm font-medium", {
            "text-success": changeType === "positive",
            "text-destructive": changeType === "negative",
            "text-muted-foreground": changeType === "neutral",
          })}>
            {change}
          </p>
        )}
      </div>
      <div className="rounded-xl bg-primary/10 p-3">
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </div>
  </div>
);

/* ===== Basic Card ===== */
interface BasicCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export const BasicCard: React.FC<BasicCardProps> = ({ title, description, children, className, actions }) => (
  <div className={cn("rounded-2xl border border-border bg-card shadow-soft", className)}>
    {(title || actions) && (
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          {title && <h3 className="text-base font-semibold text-card-foreground">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
        </div>
        {actions}
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

/* ===== Interactive Card ===== */
interface InteractiveCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({ children, onClick, className }) => (
  <div
    onClick={onClick}
    className={cn(
      "rounded-2xl border border-border bg-card p-6 shadow-soft cursor-pointer transition-all duration-200 hover:shadow-card hover:-translate-y-0.5 hover:border-primary/20",
      className
    )}
  >
    {children}
  </div>
);
