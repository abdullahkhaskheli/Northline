import { Boxes, CircleDollarSign, Percent, RefreshCw, Store, TriangleAlert } from "lucide-react";
import type { DashModel } from "@/lib/dashboard/types";
import { delta, num, pct, usd } from "@/lib/dashboard/format";
import { Card } from "@/components/ui/card";
import { Delta } from "./delta";
import { Sparkline } from "./sparkline";

const items = [
  {
    key: "sales",
    label: "Net sales",
    icon: CircleDollarSign,
    value: (m: DashModel) => usd(m.kpis.sales),
    prior: (m: DashModel) => delta(m.kpis.sales, m.prior.sales),
    spark: (m: DashModel) => m.monthly.map((x) => x.sales),
  },
  {
    key: "profit",
    label: "Gross profit",
    icon: Store,
    value: (m: DashModel) => usd(m.kpis.profit),
    prior: (m: DashModel) => delta(m.kpis.profit, m.prior.profit),
    spark: (m: DashModel) => m.monthly.map((x) => x.profit),
  },
  {
    key: "margin",
    label: "Margin",
    icon: Percent,
    value: (m: DashModel) => pct(m.kpis.margin),
    prior: (m: DashModel) => m.kpis.margin - m.prior.margin,
    spark: (m: DashModel) => m.monthly.map((x) => (x.sales ? x.profit / x.sales : 0)),
  },
  {
    key: "turns",
    label: "Inventory turns",
    icon: RefreshCw,
    value: (m: DashModel) => `${m.kpis.turns.toFixed(1)}×`,
    prior: (m: DashModel) => delta(m.kpis.turns, m.prior.turns),
    note: (m: DashModel) => `${Math.round(m.kpis.daysOnHand)} days on hand`,
  },
  {
    key: "stock",
    label: "Inventory value",
    icon: Boxes,
    value: (m: DashModel) => usd(m.kpis.inventoryValue),
    note: (m: DashModel) => `${num(m.kpis.units)} units sold`,
  },
  {
    key: "risk",
    label: "At-risk positions",
    icon: TriangleAlert,
    value: (m: DashModel) => num(m.kpis.atRisk),
    note: (m: DashModel) =>
      m.kpis.plan ? `${pct(m.kpis.sales / m.kpis.plan, 0)} of plan` : "vs reorder point",
  },
] as const;

export function KpiStrip({ model }: { model: DashModel }) {
  const hasPrior = model.prior.sales > 0;
  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
      {items.map((item) => {
        const Icon = item.icon;
        const d = "prior" in item ? item.prior(model) : NaN;
        const tone = Number.isFinite(d) ? (d >= 0 ? "up" : "down") : "neutral";
        const spark = "spark" in item ? item.spark(model) : [];
        return (
          <Card key={item.key} className="stagger-in px-4 py-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium text-muted">{item.label}</p>
              <Icon className="size-3.5 text-faint" strokeWidth={2} />
            </div>
            <p className="mt-2 font-display text-2xl leading-none font-medium tracking-tight tabular-nums">
              {item.value(model)}
            </p>
            <div className="mt-3 flex items-end justify-between gap-2">
              {hasPrior && Number.isFinite(d) ? (
                <Delta value={d} className="text-xs" />
              ) : "note" in item ? (
                <span className="text-xs text-muted">{item.note(model)}</span>
              ) : (
                <span className="text-xs text-muted">{model.rangeLabel}</span>
              )}
              {spark.length > 1 ? <Sparkline values={spark} tone={tone} /> : null}
            </div>
            {hasPrior && "note" in item ? (
              <p className="mt-1 text-xs text-faint">{item.note(model)}</p>
            ) : null}
          </Card>
        );
      })}
    </section>
  );
}
