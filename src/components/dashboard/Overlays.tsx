import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

/* ===== Modal ===== */
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const modalSizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children, footer, size = "md" }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className={cn("relative w-full rounded-2xl border border-border bg-card shadow-elevated animate-scale-in", modalSizes[size])}>
        {title && (
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h3 className="text-base font-semibold text-card-foreground">{title}</h3>
            <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
        {footer && <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
};

/* ===== Tabs ===== */
interface TabsProps {
  tabs: { label: string; content: React.ReactNode }[];
  defaultIndex?: number;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultIndex = 0 }) => {
  const [active, setActive] = useState(defaultIndex);
  return (
    <div>
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-all duration-200 border-b-2 -mb-px",
              active === i ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4">{tabs[active]?.content}</div>
    </div>
  );
};

/* ===== Accordion ===== */
interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

export const Accordion: React.FC<{ items: AccordionItem[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="divide-y divide-border rounded-2xl border border-border overflow-hidden">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-4 text-sm font-medium text-card-foreground hover:bg-accent/30 transition-colors"
          >
            {item.title}
            <svg className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", openIndex === i && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === i && (
            <div className="px-6 pb-4 text-sm text-muted-foreground animate-fade-in">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

/* ===== Dropdown ===== */
interface DropdownProps {
  trigger: React.ReactNode;
  items: { label: string; onClick?: () => void; danger?: boolean; divider?: boolean }[];
}

export const Dropdown: React.FC<DropdownProps> = ({ trigger, items }) => {
  const [open, setOpen] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(p => !p)}>{trigger}</div>
      {open && (
        <div className="absolute right-0 z-50 mt-1 min-w-[160px] rounded-xl border border-border bg-card shadow-elevated animate-scale-in py-1">
          {items.map((item, i) =>
            item.divider ? (
              <div key={i} className="my-1 border-t border-border" />
            ) : (
              <button
                key={i}
                onClick={() => { item.onClick?.(); setOpen(false); }}
                className={cn(
                  "flex w-full px-4 py-2 text-sm transition-colors",
                  item.danger ? "text-destructive hover:bg-destructive/10" : "text-card-foreground hover:bg-accent"
                )}
              >
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};
