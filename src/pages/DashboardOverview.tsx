import React from "react";
import { StatsCard } from "@/components/dashboard/Cards";
import { BasicCard } from "@/components/dashboard/Cards";
import { ChartPlaceholder } from "@/components/dashboard/Charts";
import { StatusBadge, ActivityTimeline, UserProfileCard } from "@/components/dashboard/UIComponents";
import { DollarSign, Users, ShoppingCart, TrendingUp, Package, CreditCard, UserPlus, CheckCircle } from "lucide-react";

const DashboardOverview: React.FC = () => {
  const stats = [
    { title: "Total Revenue", value: "$45,231", change: "+20.1% from last month", changeType: "positive" as const, icon: DollarSign },
    { title: "Customers", value: "2,350", change: "+180 new this week", changeType: "positive" as const, icon: Users },
    { title: "Orders", value: "1,247", change: "+12.5% from last month", changeType: "positive" as const, icon: ShoppingCart },
    { title: "Growth Rate", value: "15.3%", change: "-2.1% from last month", changeType: "negative" as const, icon: TrendingUp },
  ];

  const recentOrders = [
    { id: "#12345", customer: "John Doe", product: "Premium Plan", amount: "$299", status: "completed" },
    { id: "#12346", customer: "Jane Smith", product: "Basic Plan", amount: "$99", status: "pending" },
    { id: "#12347", customer: "Bob Wilson", product: "Enterprise", amount: "$799", status: "processing" },
    { id: "#12348", customer: "Alice Brown", product: "Pro Plan", amount: "$199", status: "completed" },
    { id: "#12349", customer: "Charlie Davis", product: "Basic Plan", amount: "$99", status: "cancelled" },
  ];

  const statusMap: Record<string, "success" | "warning" | "info" | "error"> = {
    completed: "success", pending: "warning", processing: "info", cancelled: "error"
  };

  const timelineItems = [
    { title: "New order received", description: "Order #12345 placed by John Doe", time: "2 minutes ago", icon: Package },
    { title: "Payment confirmed", description: "$2,450.00 via Stripe", time: "1 hour ago", icon: CreditCard },
    { title: "New user registered", description: "jane@example.com signed up", time: "3 hours ago", icon: UserPlus },
    { title: "Order fulfilled", description: "Order #12340 shipped", time: "5 hours ago", icon: CheckCircle },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back, John. Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(s => <StatsCard key={s.title} {...s} />)}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartPlaceholder type="line" title="Revenue Over Time" />
        <ChartPlaceholder type="bar" title="Monthly Sales" />
      </div>

      {/* Bottom row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <BasicCard title="Recent Orders" className="lg:col-span-2">
          <div className="overflow-x-auto -mx-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-2 text-left font-semibold text-muted-foreground">Order</th>
                  <th className="px-6 py-2 text-left font-semibold text-muted-foreground">Customer</th>
                  <th className="px-6 py-2 text-left font-semibold text-muted-foreground hidden sm:table-cell">Product</th>
                  <th className="px-6 py-2 text-left font-semibold text-muted-foreground">Amount</th>
                  <th className="px-6 py-2 text-left font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(o => (
                  <tr key={o.id} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-card-foreground">{o.id}</td>
                    <td className="px-6 py-3 text-card-foreground">{o.customer}</td>
                    <td className="px-6 py-3 text-muted-foreground hidden sm:table-cell">{o.product}</td>
                    <td className="px-6 py-3 font-medium text-card-foreground">{o.amount}</td>
                    <td className="px-6 py-3"><StatusBadge variant={statusMap[o.status]} dot>{o.status}</StatusBadge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BasicCard>

        {/* Activity */}
        <BasicCard title="Recent Activity">
          <ActivityTimeline items={timelineItems} />
        </BasicCard>
      </div>

      {/* Pie + Profile */}
      <div className="grid gap-6 lg:grid-cols-3">
        <ChartPlaceholder type="pie" title="Traffic Sources" className="lg:col-span-2" />
        <UserProfileCard
          name="John Doe"
          email="john@example.com"
          role="Administrator"
          stats={[
            { label: "Projects", value: "12" },
            { label: "Tasks", value: "64" },
            { label: "Reports", value: "8" },
          ]}
        />
      </div>
    </div>
  );
};

export default DashboardOverview;
