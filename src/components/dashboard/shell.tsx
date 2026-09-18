import type { ReactNode } from "react";
import { Filter, RotateCcw, X } from "lucide-react";
import { AS_OF_LABEL, CATEGORIES, PERIODS, REGIONS, VIEWS } from "@/lib/dashboard/types";
import type { Category, Period, View } from "@/lib/dashboard/types";
import { isFiltered, useDashStore } from "@/lib/dashboard/store";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const VIEW_LABEL: Record<View, string> = {
  overview: "Overview",
  sales: "Sales",
  inventory: "Inventory",
  branches: "Branches",
};

const PERIOD_SHORT: Record<Period, string> = {
  ytd: "FY26 YTD",
  l12: "L12M",
  fy25: "FY25",
  fy24: "FY24",
  all: "All",
};

const CAT_SHORT: Record<Category, string> = {
  Furniture: "Furniture",
  "Office Supplies": "Supplies",
  Technology: "Technology",
};

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 rounded-full px-3 text-xs font-medium transition-[background-color,color,box-shadow] duration-150",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-surface text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
      )}
    >
      {children}
    </button>
  );
}

function Slicers({ compact = false }: { compact?: boolean }) {
  const period = useDashStore((s) => s.period);
  const setPeriod = useDashStore((s) => s.setPeriod);
  const regions = useDashStore((s) => s.regions);
  const toggleRegion = useDashStore((s) => s.toggleRegion);
  const categories = useDashStore((s) => s.categories);
  const toggleCategory = useDashStore((s) => s.toggleCategory);
  const branch = useDashStore((s) => s.branch);
  const setBranch = useDashStore((s) => s.setBranch);
  const reset = useDashStore((s) => s.reset);
  const filtered = useDashStore((s) => isFiltered(s));

  return (
    <div className={cn("flex flex-col gap-3", compact && "gap-4")}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-16 text-xs font-medium text-muted">Period</span>
        {PERIODS.map((p) => (
          <Chip key={p} active={period === p} onClick={() => setPeriod(p)}>
            {PERIOD_SHORT[p]}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-16 text-xs font-medium text-muted">Region</span>
        {REGIONS.map((r) => (
          <Chip key={r} active={regions.includes(r)} onClick={() => toggleRegion(r)}>
            {r}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-16 text-xs font-medium text-muted">Category</span>
        {CATEGORIES.map((c) => (
          <Chip key={c} active={categories.includes(c)} onClick={() => toggleCategory(c)}>
            {CAT_SHORT[c]}
          </Chip>
        ))}
      </div>
      {(branch || filtered) && (
        <div className="flex flex-wrap items-center gap-2">
          {branch ? (
            <button
              type="button"
              onClick={() => setBranch(null)}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-subtle px-3 text-xs font-medium"
            >
              {branch}
              <X className="size-3.5" />
            </button>
          ) : null}
          {filtered ? (
            <Button type="button" variant="ghost" size="sm" onClick={reset} className="h-9">
              <RotateCcw className="size-3.5" />
              Reset slicers
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
}

export function AppHeader() {
  const view = useDashStore((s) => s.view);
  const setView = useDashStore((s) => s.setView);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-lg leading-none font-medium tracking-tight sm:text-xl">
              Northline
            </p>
            <p className="mt-1 truncate text-xs text-muted">
              Sales & inventory · Superstore sample · As of {AS_OF_LABEL}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden h-9 items-center gap-1.5 rounded-full bg-up/12 px-3 text-xs font-medium text-up sm:inline-flex">
              <span className="size-1.5 rounded-full bg-up" />
              Live
            </span>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Filter className="size-4" />
                  Slicers
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Report slicers</SheetTitle>
                </SheetHeader>
                <Slicers compact />
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <nav className="-mx-1 flex gap-1 overflow-x-auto pb-1" aria-label="Report pages">
          {VIEWS.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={cn(
                "h-10 shrink-0 rounded-md px-3 text-sm font-medium transition-[background-color,color] duration-150",
                view === v ? "bg-subtle text-fg" : "text-muted hover:bg-subtle/70 hover:text-fg",
              )}
            >
              {VIEW_LABEL[v]}
            </button>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Slicers />
        </div>
      </div>
    </header>
  );
}
