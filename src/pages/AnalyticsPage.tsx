import React from "react";
import { StatsCard, BasicCard } from "@/components/dashboard/Cards";
import { ChartPlaceholder } from "@/components/dashboard/Charts";
import { StatusBadge } from "@/components/dashboard/UIComponents";
import { Eye, MousePointer, Clock, ArrowUpRight, Globe, Smartphone, Monitor, Tablet } from "lucide-react";

const AnalyticsPage: React.FC = () => {
  const stats = [
    { title: "Page Views", value: "124,592", change: "+14.2% vs last period", changeType: "positive" as const, icon: Eye },
    { title: "Click Rate", value: "3.24%", change: "+0.8% vs last period", changeType: "positive" as const, icon: MousePointer },
    { title: "Avg. Session", value: "4m 32s", change: "-12s vs last period", changeType: "negative" as const, icon: Clock },
    { title: "Bounce Rate", value: "32.1%", change: "-2.3% vs last period", changeType: "positive" as const, icon: ArrowUpRight },
  ];

  const topPages = [
    { page: "/dashboard", views: "12,450", unique: "8,230", bounce: "24%" },
    { page: "/products", views: "8,920", unique: "6,100", bounce: "31%" },
    { page: "/pricing", views: "6,340", unique: "4,880", bounce: "28%" },
    { page: "/blog/top-10", views: "5,120", unique: "4,200", bounce: "45%" },
    { page: "/about", views: "3,890", unique: "3,100", bounce: "38%" },
  ];

  const devices = [
    { icon: Monitor, label: "Desktop", value: "58%", color: "bg-primary" },
    { icon: Smartphone, label: "Mobile", value: "32%", color: "bg-info" },
    { icon: Tablet, label: "Tablet", value: "10%", color: "bg-success" },
  ];

  const countries = [
    { country: "United States", visitors: "45,230", percentage: 38 },
    { country: "United Kingdom", visitors: "18,450", percentage: 15 },
    { country: "Germany", visitors: "12,890", percentage: 11 },
    { country: "France", visitors: "9,340", percentage: 8 },
    { country: "Canada", visitors: "7,120", percentage: 6 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Track your website performance and user behavior</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(s => <StatsCard key={s.title} {...s} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartPlaceholder type="line" title="Visitors Over Time" />
        <ChartPlaceholder type="bar" title="Page Views by Month" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Pages */}
        <BasicCard title="Top Pages" className="lg:col-span-2">
          <div className="overflow-x-auto -mx-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-2 text-left font-semibold text-muted-foreground">Page</th>
                  <th className="px-6 py-2 text-left font-semibold text-muted-foreground">Views</th>
                  <th className="px-6 py-2 text-left font-semibold text-muted-foreground hidden sm:table-cell">Unique</th>
                  <th className="px-6 py-2 text-left font-semibold text-muted-foreground">Bounce</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map(p => (
                  <tr key={p.page} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-card-foreground flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      {p.page}
                    </td>
                    <td className="px-6 py-3 text-card-foreground">{p.views}</td>
                    <td className="px-6 py-3 text-muted-foreground hidden sm:table-cell">{p.unique}</td>
                    <td className="px-6 py-3"><StatusBadge variant={parseInt(p.bounce) > 35 ? "warning" : "success"}>{p.bounce}</StatusBadge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BasicCard>

        {/* Devices + Countries */}
        <div className="space-y-6">
          <BasicCard title="Devices">
            <div className="space-y-4">
              {devices.map(d => (
                <div key={d.label} className="flex items-center gap-3">
                  <d.icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-card-foreground font-medium">{d.label}</span>
                      <span className="text-muted-foreground">{d.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${d.color} transition-all duration-500`} style={{ width: d.value }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BasicCard>

          <BasicCard title="Top Countries">
            <div className="space-y-3">
              {countries.map(c => (
                <div key={c.country} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{c.country}</p>
                    <p className="text-xs text-muted-foreground">{c.visitors} visitors</p>
                  </div>
                  <StatusBadge variant="default">{c.percentage}%</StatusBadge>
                </div>
              ))}
            </div>
          </BasicCard>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
