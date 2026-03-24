import React from "react";
import { cn } from "@/lib/utils";

/* ===== Form Input ===== */
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, success, hint, className, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <input
        ref={ref}
        className={cn(
          "h-10 w-full rounded-xl border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:outline-none focus:ring-2",
          error ? "border-destructive focus:ring-destructive/30" : success ? "border-success focus:ring-success/30" : "border-input focus:ring-ring/30",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
      {success && <p className="text-xs text-success">{success}</p>}
      {hint && !error && !success && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
);
FormInput.displayName = "FormInput";

// IMPROVED COMPONENT — Added success/hint to Textarea
/* ===== Textarea ===== */
interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, success, hint, className, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:outline-none focus:ring-2 min-h-[100px] resize-y",
          error ? "border-destructive focus:ring-destructive/30" : success ? "border-success focus:ring-success/30" : "border-input focus:ring-ring/30",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
      {success && <p className="text-xs text-success">{success}</p>}
      {hint && !error && !success && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
);
FormTextarea.displayName = "FormTextarea";

// IMPROVED COMPONENT — Added success/hint to Select, added chevron icon
/* ===== Select ===== */
interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  options: { label: string; value: string }[];
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, success, hint, options, className, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "h-10 w-full rounded-xl border bg-background px-4 pr-10 text-sm text-foreground transition-all duration-200 focus:outline-none focus:ring-2 appearance-none cursor-pointer",
            error ? "border-destructive focus:ring-destructive/30" : success ? "border-success focus:ring-success/30" : "border-input focus:ring-ring/30",
            className
          )}
          {...props}
        >
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      {success && <p className="text-xs text-success">{success}</p>}
      {hint && !error && !success && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
);
FormSelect.displayName = "FormSelect";

/* ===== Checkbox ===== */
interface FormCheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({ label, checked, onChange, disabled }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div className={cn(
      "flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all duration-200",
      checked ? "border-primary bg-primary" : "border-input group-hover:border-primary/50",
      disabled && "opacity-50 cursor-not-allowed"
    )}>
      {checked && <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
    </div>
    <input type="checkbox" checked={checked} onChange={e => onChange?.(e.target.checked)} disabled={disabled} className="sr-only" />
    <span className="text-sm text-foreground">{label}</span>
  </label>
);

/* ===== Radio ===== */
interface FormRadioGroupProps {
  label?: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({ label, options, value, onChange }) => (
  <div className="space-y-2">
    {label && <p className="text-sm font-medium text-foreground">{label}</p>}
    <div className="space-y-2">
      {options.map(o => (
        <label key={o.value} className="flex items-center gap-3 cursor-pointer group">
          <div className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-200",
            value === o.value ? "border-primary" : "border-input group-hover:border-primary/50"
          )}>
            {value === o.value && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
          </div>
          <input type="radio" name={label} value={o.value} checked={value === o.value} onChange={() => onChange?.(o.value)} className="sr-only" />
          <span className="text-sm text-foreground">{o.label}</span>
        </label>
      ))}
    </div>
  </div>
);

/* ===== Toggle Switch ===== */
interface ToggleSwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  description?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange, description }) => (
  <div className="flex items-start gap-3 cursor-pointer" onClick={() => onChange?.(!checked)}>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200",
        checked ? "bg-primary" : "bg-input"
      )}
    >
      <span className={cn(
        "inline-block h-4 w-4 transform rounded-full bg-card shadow-sm transition-transform duration-200",
        checked ? "translate-x-6" : "translate-x-1"
      )} />
    </button>
    {(label || description) && (
      <div>
        {label && <p className="text-sm font-medium text-foreground">{label}</p>}
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
    )}
  </div>
);
