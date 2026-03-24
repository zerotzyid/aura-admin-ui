import React, { useState } from "react";
import { BasicCard, InteractiveCard, StatsCard } from "@/components/dashboard/Cards";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge, CardSkeleton, EmptyState, ErrorState } from "@/components/dashboard/UIComponents";
import { MultiLevelDropdown } from "@/components/dashboard/MultiLevelDropdown";
import { Breadcrumb, ProgressBar, Avatar, AvatarGroup, TooltipSimple } from "@/components/dashboard/UtilityComponents";
import { Button } from "@/components/ui/button";
import { useToastStack } from "@/components/dashboard/ToastStack";
import { Package, Tag, ArrowUpRight, MoreHorizontal, Plus, Download, Filter, Edit, Eye, Trash2, Copy, Archive, Star } from "lucide-react";

// NEW COMPONENT — Products page (showcases all new components)

const sampleProducts = Array.from({ length: 24 }, (_, i) => ({
  id: `PRD-${1000 + i}`,
  name: ["Premium Widget", "Basic Gadget", "Pro Tool", "Ultra Device", "Starter Kit", "Enterprise Suite"][i % 6],
  category: ["Electronics", "Software", "Hardware", "Services", "Accessories", "Bundles"][i % 6],
  price: `$${(Math.floor(Math.random() * 500) + 29).toFixed(2)}`,
  stock: Math.floor(Math.random() * 200),
  status: ["active", "active", "draft", "active", "archived", "active"][i % 6],
  sales: Math.floor(Math.random() * 1000),
}));

const statusMap: Record<string, "success" | "warning" | "error" | "default"> = {
  active: "success", draft: "warning", archived: "default"
};

const ProductsPage: React.FC = () => {
  const { addToast } = useToastStack();
  const [loading, setLoading] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSkeletons, setShowSkeletons] = useState(false);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: "Dashboard" }, { label: "Products" }]} />
          <h1 className="text-2xl font-bold text-foreground mt-2">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your product catalog</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => addToast({ type: "info", title: "Export started", description: "Your CSV will be ready shortly" })}>
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button size="sm" onClick={() => addToast({ type: "success", title: "Product created", description: "New product added to catalog" })}>
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Total Products" value="156" change="+12 this month" changeType="positive" icon={Package} />
        <StatsCard title="Categories" value="24" change="2 new added" changeType="positive" icon={Tag} />
        <StatsCard title="Avg. Price" value="$147.50" change="+$12.30" changeType="positive" icon={ArrowUpRight} />
        <StatsCard title="Low Stock" value="8" change="3 critical" changeType="negative" icon={Package} />
      </div>

      {/* Demo state toggles */}
      <BasicCard title="Component States Demo" description="Toggle to preview loading, empty, and error states">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" loading={loading} onClick={simulateLoading}>
            {loading ? "Loading..." : "Loading Button"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowSkeletons(p => !p)}>
            {showSkeletons ? "Hide" : "Show"} Skeletons
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowEmpty(p => !p)}>
            {showEmpty ? "Hide" : "Show"} Empty State
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowError(p => !p)}>
            {showError ? "Hide" : "Show"} Error State
          </Button>
          <Button variant="success" size="sm" onClick={() => addToast({ type: "success", title: "Success toast!" })}>Success Toast</Button>
          <Button variant="warning" size="sm" onClick={() => addToast({ type: "warning", title: "Warning toast!", description: "Something needs attention" })}>Warning Toast</Button>
          <Button variant="destructive" size="sm" onClick={() => addToast({ type: "error", title: "Error toast!", description: "Something went wrong" })}>Error Toast</Button>
        </div>
      </BasicCard>

      {/* State demos */}
      {showSkeletons && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      )}

      {showEmpty && (
        <BasicCard>
          <EmptyState
            icon={Package}
            title="No products found"
            description="Get started by adding your first product to the catalog."
            action={<Button size="sm"><Plus className="h-4 w-4" /> Add Product</Button>}
          />
        </BasicCard>
      )}

      {showError && (
        <BasicCard>
          <ErrorState
            title="Failed to load products"
            description="There was a network error while fetching the product list."
            onRetry={() => { setShowError(false); addToast({ type: "info", title: "Retrying..." }); }}
          />
        </BasicCard>
      )}

      {/* Progress bars demo */}
      <BasicCard title="Stock Levels" description="Inventory progress indicators">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-card-foreground font-medium">Premium Widget</span>
              <span className="text-muted-foreground">182/200</span>
            </div>
            <ProgressBar value={182} max={200} variant="success" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-card-foreground font-medium">Basic Gadget</span>
              <span className="text-muted-foreground">45/200</span>
            </div>
            <ProgressBar value={45} max={200} variant="warning" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-card-foreground font-medium">Pro Tool</span>
              <span className="text-muted-foreground">8/200</span>
            </div>
            <ProgressBar value={8} max={200} variant="error" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-card-foreground font-medium">Ultra Device</span>
              <span className="text-muted-foreground">120/200</span>
            </div>
            <ProgressBar value={120} max={200} variant="primary" />
          </div>
        </div>
      </BasicCard>

      {/* Data table with multi-level dropdown */}
      <DataTable
        columns={[
          { key: "id", label: "ID", sortable: true },
          { key: "name", label: "Product", sortable: true, render: (r) => (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center">
                <Package className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-card-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.category}</p>
              </div>
            </div>
          )},
          { key: "price", label: "Price", sortable: true },
          { key: "stock", label: "Stock", sortable: true, render: (r) => (
            <TooltipSimple content={`${r.stock} units in stock`}>
              <span className={r.stock < 20 ? "text-destructive font-medium" : "text-card-foreground"}>{r.stock}</span>
            </TooltipSimple>
          )},
          { key: "sales", label: "Sales", sortable: true },
          { key: "status", label: "Status", render: (r) => <StatusBadge variant={statusMap[r.status] || "default"} dot>{r.status}</StatusBadge> },
          { key: "actions", label: "", render: () => (
            <MultiLevelDropdown
              trigger={<button className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent transition-colors"><MoreHorizontal className="h-4 w-4" /></button>}
              items={[
                { label: "View", icon: Eye },
                { label: "Edit", icon: Edit },
                { label: "Duplicate", icon: Copy },
                { label: "More actions", icon: Star, children: [
                  { label: "Archive", icon: Archive },
                  { label: "Export as CSV", icon: Download },
                  { divider: true, label: "" },
                  { label: "Delete", icon: Trash2, danger: true },
                ]},
                { divider: true, label: "" },
                { label: "Delete", icon: Trash2, danger: true },
              ]}
            />
          )},
        ]}
        data={loading ? [] : sampleProducts}
        loading={loading}
        searchPlaceholder="Search products..."
        actions={
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        }
      />
    </div>
  );
};

export default ProductsPage;
