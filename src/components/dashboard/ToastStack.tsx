import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from "lucide-react";

// NEW COMPONENT — Stackable toast system with auto-dismiss

interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToastStack = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToastStack must be used within ToastStackProvider");
  return ctx;
};

export const ToastStackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const toastStyles = {
  success: "border-success/30 bg-card",
  error: "border-destructive/30 bg-card",
  warning: "border-warning/30 bg-card",
  info: "border-info/30 bg-card",
};

const toastIconColors = {
  success: "text-success",
  error: "text-destructive",
  warning: "text-warning",
  info: "text-info",
};

const ToastItem: React.FC<{ toast: Toast; onRemove: () => void }> = ({ toast, onRemove }) => {
  const Icon = toastIcons[toast.type];

  useEffect(() => {
    const timer = setTimeout(onRemove, toast.duration || 5000);
    return () => clearTimeout(timer);
  }, [onRemove, toast.duration]);

  return (
    <div className={cn(
      "flex items-start gap-3 rounded-xl border px-4 py-3 shadow-elevated animate-toast-in w-80 bg-card",
      toastStyles[toast.type]
    )}>
      <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", toastIconColors[toast.type])} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-card-foreground">{toast.title}</p>
        {toast.description && <p className="text-xs text-muted-foreground mt-0.5">{toast.description}</p>}
      </div>
      <button onClick={onRemove} className="shrink-0 rounded-lg p-1 text-muted-foreground hover:text-foreground transition-colors">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

const ToastContainer: React.FC<{ toasts: Toast[]; removeToast: (id: string) => void }> = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed top-20 right-6 z-[80] flex flex-col gap-2">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};
