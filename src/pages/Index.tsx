import React, { useState } from "react";
import { DashboardProvider } from "@/contexts/DashboardContext";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import DashboardOverview from "@/pages/DashboardOverview";
import AnalyticsPage from "@/pages/AnalyticsPage";
import DataTablePage from "@/pages/DataTablePage";
import FormsPage from "@/pages/FormsPage";
import SettingsPage from "@/pages/SettingsPage";

const pageComponents: Record<string, React.FC> = {
  dashboard: DashboardOverview,
  analytics: AnalyticsPage,
  orders: DataTablePage,
  customers: DataTablePage,
  segments: DataTablePage,
  products: DataTablePage,
  forms: FormsPage,
  settings: SettingsPage,
};

const Index: React.FC = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const PageComponent = pageComponents[activePage] || DashboardOverview;

  return (
    <DashboardProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto scrollbar-thin p-4 lg:p-6">
            <PageComponent />
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Index;
