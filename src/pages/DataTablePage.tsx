import React from "react";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/UIComponents";
import { Dropdown } from "@/components/dashboard/Overlays";
import { MoreHorizontal, Plus } from "lucide-react";

const sampleData = Array.from({ length: 35 }, (_, i) => ({
  id: `#${10000 + i}`,
  name: ["Alice Johnson", "Bob Smith", "Charlie Brown", "Diana Prince", "Eve Wilson", "Frank Miller"][i % 6],
  email: ["alice@co.com", "bob@co.com", "charlie@co.com", "diana@co.com", "eve@co.com", "frank@co.com"][i % 6],
  role: ["Admin", "Editor", "Viewer", "Admin", "Editor", "Viewer"][i % 6],
  status: ["active", "active", "inactive", "active", "pending", "active"][i % 6],
  joined: `2024-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, "0")}`,
}));

const statusMap: Record<string, "success" | "warning" | "error"> = {
  active: "success", pending: "warning", inactive: "error"
};

const DataTablePage: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Users</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage all user accounts</p>
      </div>
      <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
        <Plus className="h-4 w-4" /> Add User
      </button>
    </div>

    <DataTable
      columns={[
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Name", sortable: true, render: (r) => (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
              {r.name.split(" ").map((n: string) => n[0]).join("")}
            </div>
            <div>
              <p className="font-medium text-card-foreground">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.email}</p>
            </div>
          </div>
        )},
        { key: "role", label: "Role", sortable: true },
        { key: "status", label: "Status", render: (r) => <StatusBadge variant={statusMap[r.status]} dot>{r.status}</StatusBadge> },
        { key: "joined", label: "Joined", sortable: true },
        { key: "actions", label: "", render: () => (
          <Dropdown
            trigger={<button className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent transition-colors"><MoreHorizontal className="h-4 w-4" /></button>}
            items={[
              { label: "Edit" },
              { label: "View Profile" },
              { divider: true, label: "" },
              { label: "Delete", danger: true },
            ]}
          />
        )},
      ]}
      data={sampleData}
      searchPlaceholder="Search users..."
    />
  </div>
);

export default DataTablePage;
