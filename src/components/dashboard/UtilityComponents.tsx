import React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

// NEW COMPONENT — Breadcrumb navigation

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
  <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
    {items.map((item, i) => (
      <React.Fragment key={item.label}>
        {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
        {i === items.length - 1 ? (
          <span className="font-medium text-foreground">{item.label}</span>
        ) : (
          <button
            onClick={item.onClick}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {item.label}
          </button>
        )}
      </React.Fragment>
    ))}
  </nav>
);

// NEW COMPONENT — Progress bar

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "success" | "warning" | "error" | "info";
  showLabel?: boolean;
  className?: string;
}

const progressColors = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-destructive",
  info: "bg-info",
};

const progressSizes = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max = 100, size = "md", variant = "primary", showLabel, className }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>{Math.round(percentage)}%</span>
          <span>{value}/{max}</span>
        </div>
      )}
      <div className={cn("w-full rounded-full bg-muted overflow-hidden", progressSizes[size])}>
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", progressColors[variant])}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};

// NEW COMPONENT — Avatar

interface AvatarProps {
  name: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const avatarSizes = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export const Avatar: React.FC<AvatarProps> = ({ name, src, size = "md", className }) => {
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn("rounded-full object-cover", avatarSizes[size], className)}
      />
    );
  }

  return (
    <div className={cn(
      "inline-flex items-center justify-center rounded-full bg-primary/10 font-semibold text-primary",
      avatarSizes[size],
      className
    )}>
      {initials}
    </div>
  );
};

// NEW COMPONENT — AvatarGroup

interface AvatarGroupProps {
  users: { name: string; src?: string }[];
  max?: number;
  size?: "xs" | "sm" | "md";
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ users, max = 4, size = "sm" }) => {
  const visible = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className="flex -space-x-2">
      {visible.map((user, i) => (
        <div key={i} className="ring-2 ring-card rounded-full">
          <Avatar name={user.name} src={user.src} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div className={cn(
          "inline-flex items-center justify-center rounded-full bg-muted font-medium text-muted-foreground ring-2 ring-card",
          avatarSizes[size]
        )}>
          +{remaining}
        </div>
      )}
    </div>
  );
};

// NEW COMPONENT — Tooltip

interface TooltipSimpleProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export const TooltipSimple: React.FC<TooltipSimpleProps> = ({ content, children, position = "top" }) => {
  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative group inline-flex">
      {children}
      <div className={cn(
        "absolute z-50 hidden group-hover:block animate-fade-in pointer-events-none",
        positions[position]
      )}>
        <div className="rounded-lg bg-foreground px-2.5 py-1.5 text-xs font-medium text-background whitespace-nowrap shadow-elevated">
          {content}
        </div>
      </div>
    </div>
  );
};
