import React from "react";
import { cn } from "@/lib/utils";

/* ===== Chart Placeholder ===== */
interface ChartPlaceholderProps {
  type: "line" | "bar" | "pie";
  title?: string;
  className?: string;
}

export const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({ type, title, className }) => {
  return (
    <div className={cn("rounded-2xl border border-border bg-card shadow-soft overflow-hidden", className)}>
      {title && (
        <div className="border-b border-border px-6 py-4">
          <h3 className="text-base font-semibold text-card-foreground">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {type === "line" && <LineChartVisual />}
        {type === "bar" && <BarChartVisual />}
        {type === "pie" && <PieChartVisual />}
      </div>
    </div>
  );
};

const LineChartVisual = () => {
  const points = [40, 65, 45, 70, 55, 80, 60, 85, 70, 90, 75, 95];
  const width = 100;
  const height = 40;
  const path = points.map((p, i) => `${(i / (points.length - 1)) * width},${height - (p / 100) * height}`).join(" L ");

  return (
    <div className="relative h-48">
      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map(v => (
        <div key={v} className="absolute left-0 right-0 border-t border-border/50" style={{ top: `${100 - v}%` }}>
          <span className="absolute -left-1 -translate-x-full text-[10px] text-muted-foreground">{v}</span>
        </div>
      ))}
      <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`M 0,${height} L ${path} L ${width},${height} Z`} fill="url(#lineGrad)" />
        <polyline points={path} fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

const BarChartVisual = () => {
  const bars = [65, 80, 45, 90, 55, 75, 60, 85, 50, 70, 95, 40];
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

  return (
    <div className="h-48 flex items-end gap-2">
      {bars.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-md bg-primary/80 hover:bg-primary transition-colors duration-200"
            style={{ height: `${v * 0.9}%` }}
          />
          <span className="text-[10px] text-muted-foreground">{months[i]}</span>
        </div>
      ))}
    </div>
  );
};

const PieChartVisual = () => {
  const segments = [
    { value: 35, color: "hsl(var(--primary))", label: "Direct" },
    { value: 25, color: "hsl(var(--info))", label: "Referral" },
    { value: 20, color: "hsl(var(--success))", label: "Organic" },
    { value: 20, color: "hsl(var(--warning))", label: "Social" },
  ];

  let cumulative = 0;
  const radius = 40;
  const center = 50;

  return (
    <div className="flex items-center justify-center gap-8">
      <svg viewBox="0 0 100 100" className="h-48 w-48">
        {segments.map((seg, i) => {
          const startAngle = (cumulative / 100) * 360;
          cumulative += seg.value;
          const endAngle = (cumulative / 100) * 360;
          const largeArc = seg.value > 50 ? 1 : 0;
          const x1 = center + radius * Math.cos((Math.PI * (startAngle - 90)) / 180);
          const y1 = center + radius * Math.sin((Math.PI * (startAngle - 90)) / 180);
          const x2 = center + radius * Math.cos((Math.PI * (endAngle - 90)) / 180);
          const y2 = center + radius * Math.sin((Math.PI * (endAngle - 90)) / 180);
          return (
            <path
              key={i}
              d={`M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={seg.color}
              className="hover:opacity-80 transition-opacity duration-200"
              stroke="hsl(var(--card))"
              strokeWidth="1"
            />
          );
        })}
        <circle cx={center} cy={center} r="20" fill="hsl(var(--card))" />
      </svg>
      <div className="space-y-2">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: seg.color }} />
            <span className="text-sm text-muted-foreground">{seg.label}</span>
            <span className="text-sm font-medium text-card-foreground">{seg.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
