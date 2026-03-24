import React, { createContext, useContext, useState, useCallback } from "react";

interface DashboardContextType {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  darkMode: boolean;
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  toggleDarkMode: () => void;
  closeSidebar: () => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = useCallback(() => setSidebarOpen(p => !p), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleCollapse = useCallback(() => setSidebarCollapsed(p => !p), []);
  const toggleDarkMode = useCallback(() => {
    setDarkMode(p => {
      const next = !p;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }, []);

  return (
    <DashboardContext.Provider value={{ sidebarOpen, sidebarCollapsed, darkMode, toggleSidebar, toggleCollapse, toggleDarkMode, closeSidebar }}>
      {children}
    </DashboardContext.Provider>
  );
};
