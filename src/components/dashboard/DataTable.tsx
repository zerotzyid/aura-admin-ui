import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Search, Inbox } from "lucide-react";
import { Skeleton } from "@/components/dashboard/UIComponents";

interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  actions?: React.ReactNode;
  loading?: boolean;
}

// IMPROVED COMPONENT — Added loading skeleton state
export function DataTable<T extends Record<string, any>>({
  columns, data, pageSize = 10, searchable = true, searchPlaceholder = "Search...", emptyMessage = "No data found", actions, loading = false
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);

  const filtered = data.filter(row =>
    !search || Object.values(row).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  );

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
        return sortDir === "asc" ? cmp : -cmp;
      })
    : filtered;

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
      {(searchable || actions) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border px-6 py-4">
          {searchable && (
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(0); }}
                placeholder={searchPlaceholder}
                className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
          )}
          {actions}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && !loading && handleSort(col.key)}
                  className={cn(
                    "px-6 py-3 text-left font-semibold text-muted-foreground",
                    col.sortable && !loading && "cursor-pointer select-none hover:text-foreground transition-colors"
                  )}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      sortDir === "asc" ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Loading skeleton rows
              Array.from({ length: 5 }).map((_, rowIdx) => (
                <tr key={`skeleton-${rowIdx}`} className="border-b border-border last:border-0">
                  {columns.map(col => (
                    <td key={col.key} className="px-6 py-4">
                      <Skeleton className={cn("h-4", col.key === "name" ? "w-32" : col.key === "actions" ? "w-8" : "w-20")} />
                    </td>
                  ))}
                </tr>
              ))
            ) : paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-16 text-center">
                  <Inbox className="mx-auto h-10 w-10 text-muted-foreground/40" />
                  <p className="mt-3 text-sm font-medium text-muted-foreground">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              paged.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                  {columns.map(col => (
                    <td key={col.key} className="px-6 py-4 text-card-foreground">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border px-6 py-3">
          <p className="text-sm text-muted-foreground">
            Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}
          </p>
          <div className="flex items-center gap-1">
            <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className="rounded-lg p-2 text-muted-foreground hover:bg-accent disabled:opacity-40 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={cn(
                  "h-8 w-8 rounded-lg text-sm font-medium transition-colors",
                  page === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
                )}
              >
                {i + 1}
              </button>
            ))}
            <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} className="rounded-lg p-2 text-muted-foreground hover:bg-accent disabled:opacity-40 transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
