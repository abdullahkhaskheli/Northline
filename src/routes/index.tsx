import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppHeader } from "@/components/dashboard/shell";
import { BranchesView, InventoryView, OverviewView, SalesView } from "@/components/dashboard/views";
import { buildModel } from "@/lib/dashboard/compute";
import { useDashStore } from "@/lib/dashboard/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <TooltipProvider delayDuration={250}>
      <Dashboard />
    </TooltipProvider>
  );
}

function Dashboard() {
  const view = useDashStore((s) => s.view);
  const period = useDashStore((s) => s.period);
  const regions = useDashStore((s) => s.regions);
  const categories = useDashStore((s) => s.categories);
  const branch = useDashStore((s) => s.branch);

  const model = useMemo(
    () => buildModel({ view, period, regions, categories, branch }),
    [view, period, regions, categories, branch],
  );

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <AppHeader />
      <main className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 sm:py-6">
        {model.kpis.sales === 0 && model.inventory.length === 0 ? (
          <p className="rounded-xl bg-surface px-5 py-10 text-center text-sm text-muted shadow-[var(--shadow-border)]">
            No rows in this slice. Reset slicers or pick another period.
          </p>
        ) : view === "sales" ? (
          <SalesView model={model} />
        ) : view === "inventory" ? (
          <InventoryView model={model} />
        ) : view === "branches" ? (
          <BranchesView model={model} />
        ) : (
          <OverviewView model={model} />
        )}
      </main>
    </div>
  );
}
