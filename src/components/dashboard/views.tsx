import type { DashModel } from "@/lib/dashboard/types";
import { usd } from "@/lib/dashboard/format";
import { KpiStrip } from "./kpis";
import {
  CategoryMix,
  InventoryHealth,
  RegionBars,
  SalesTrend,
  SegmentMix,
  SubcategoryBars,
  TurnoverBars,
} from "./charts";
import { AlertList, InsightList } from "./alerts";
import { BranchTable, InventoryTable, ProductTable } from "./tables";

export function OverviewView({ model }: { model: DashModel }) {
  return (
    <div className="flex flex-col gap-4">
      <KpiStrip model={model} />
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <SalesTrend model={model} />
        </div>
        <div className="lg:col-span-2">
          <RegionBars model={model} />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <CategoryMix model={model} />
        <InsightList model={model} />
        <AlertList model={model} />
      </div>
      <BranchTable model={model} compact />
    </div>
  );
}

export function SalesView({ model }: { model: DashModel }) {
  return (
    <div className="flex flex-col gap-4">
      <KpiStrip model={model} />
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <SalesTrend model={model} />
        </div>
        <div className="lg:col-span-2">
          <SegmentMix model={model} />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <SubcategoryBars model={model} />
        <CategoryMix model={model} />
      </div>
      <ProductTable model={model} />
    </div>
  );
}

export function InventoryView({ model }: { model: DashModel }) {
  const low = model.inventory.filter((i) => i.status === "low").length;
  const over = model.inventory.filter((i) => i.status === "over").length;
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted">
        On-hand value {usd(model.kpis.inventoryValue)} · {model.kpis.turns.toFixed(1)}× annualized turnover ·{" "}
        {low} below reorder · {over} overstocked
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        <TurnoverBars model={model} />
        <InventoryHealth model={model} />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <InventoryTable model={model} />
        </div>
        <AlertList model={model} />
      </div>
    </div>
  );
}

export function BranchesView({ model }: { model: DashModel }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RegionBars model={model} />
        </div>
        <div className="lg:col-span-2">
          <InsightList model={model} />
        </div>
      </div>
      <BranchTable model={model} />
    </div>
  );
}
