import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

// NEW COMPONENT — Multi-level dropdown with keyboard navigation

interface DropdownMenuItem {
  label: string;
  icon?: React.ElementType;
  onClick?: () => void;
  danger?: boolean;
  divider?: boolean;
  children?: DropdownMenuItem[];
}

interface MultiLevelDropdownProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  align?: "left" | "right";
}

export const MultiLevelDropdown: React.FC<MultiLevelDropdownProps> = ({ trigger, items, align = "right" }) => {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const nonDividerItems = items.filter(i => !i.divider);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex(prev => (prev + 1) % nonDividerItems.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex(prev => (prev - 1 + nonDividerItems.length) % nonDividerItems.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedIndex >= 0) {
          nonDividerItems[focusedIndex]?.onClick?.();
          if (!nonDividerItems[focusedIndex]?.children) {
            setOpen(false);
            setFocusedIndex(-1);
          }
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        setFocusedIndex(-1);
        break;
    }
  }, [open, focusedIndex, nonDividerItems]);

  let nonDividerCounter = -1;

  return (
    <div ref={containerRef} className="relative inline-block" onKeyDown={handleKeyDown}>
      <div
        ref={triggerRef}
        onClick={() => { setOpen(p => !p); setFocusedIndex(-1); }}
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {trigger}
      </div>
      {open && (
        <div
          className={cn(
            "absolute z-50 mt-1 min-w-[200px] rounded-xl border border-border bg-card shadow-elevated animate-scale-in py-1",
            align === "right" ? "right-0" : "left-0"
          )}
          role="menu"
        >
          {items.map((item, i) => {
            if (item.divider) {
              return <div key={i} className="my-1 border-t border-border" />;
            }
            nonDividerCounter++;
            const idx = nonDividerCounter;
            return <DropdownMenuItemComponent key={i} item={item} focused={focusedIndex === idx} onClose={() => { setOpen(false); setFocusedIndex(-1); }} />;
          })}
        </div>
      )}
    </div>
  );
};

const DropdownMenuItemComponent: React.FC<{ item: DropdownMenuItem; focused: boolean; onClose: () => void }> = ({ item, focused, onClose }) => {
  const [subOpen, setSubOpen] = useState(false);
  const Icon = item.icon;

  if (item.children) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setSubOpen(true)}
        onMouseLeave={() => setSubOpen(false)}
      >
        <button
          className={cn(
            "flex w-full items-center justify-between gap-2 px-4 py-2 text-sm transition-colors",
            focused ? "bg-accent" : "",
            item.danger ? "text-destructive hover:bg-destructive/10" : "text-card-foreground hover:bg-accent"
          )}
          role="menuitem"
        >
          <span className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            {item.label}
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
        {subOpen && (
          <div className="absolute left-full top-0 ml-1 min-w-[180px] rounded-xl border border-border bg-card shadow-elevated animate-scale-in py-1">
            {item.children.map((child, ci) =>
              child.divider ? (
                <div key={ci} className="my-1 border-t border-border" />
              ) : (
                <button
                  key={ci}
                  onClick={() => { child.onClick?.(); onClose(); }}
                  className={cn(
                    "flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors",
                    child.danger ? "text-destructive hover:bg-destructive/10" : "text-card-foreground hover:bg-accent"
                  )}
                  role="menuitem"
                >
                  {child.icon && <child.icon className="h-4 w-4 text-muted-foreground" />}
                  {child.label}
                </button>
              )
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => { item.onClick?.(); onClose(); }}
      className={cn(
        "flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors",
        focused ? "bg-accent" : "",
        item.danger ? "text-destructive hover:bg-destructive/10" : "text-card-foreground hover:bg-accent"
      )}
      role="menuitem"
    >
      {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      {item.label}
    </button>
  );
};
