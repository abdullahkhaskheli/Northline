import { useDashStore } from "@/lib/dashboard/store";
import type { DashModel } from "@/lib/dashboard/types";
import { num, pct, usd } from "@/lib/dashboard/format";
import { cn } from "@/lib/utils";
import { Panel } from "./panel";
import { Delta, StatusPill } from "./delta";

export function BranchTable({ model, compact = false }: { model: DashModel; compact?: boolean }) {
  const setBranch = useDashStore((s) => s.setBranch);
  const active = useDashStore((s) => s.branch);
  const rows = compact ? model.branches.slice(0, 8) : model.branches;
  return (
    <Panel
      title="Branch scorecard"
      hint="Click a row to isolate that branch"
      bodyClassName="overflow-x-auto px-0 pb-3"
    >
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="text-xs text-muted">
          <tr className="border-b border-border">
            <th className="px-5 py-2 font-medium">Branch</th>
            <th className="px-3 py-2 font-medium">Region</th>
            <th className="px-3 py-2 text-right font-medium">Sales</th>
            <th className="px-3 py-2 text-right font-medium">vs LY</th>
            <th className="px-3 py-2 text-right font-medium">vs Plan</th>
            <th className="px-3 py-2 text-right font-medium">Margin</th>
            <th className="px-3 py-2 text-right font-medium">Turns</th>
            <th className="px-5 py-2 text-right font-medium">At risk</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((b) => (
            <tr
              key={b.branch}
              className={cn(
                "cursor-pointer border-b border-border/70 last:border-0 hover:bg-subtle/70",
                active === b.branch && "bg-subtle",
              )}
              onClick={() => setBranch(b.branch)}
            >
              <td className="px-5 py-2.5 font-medium">{b.branch}</td>
              <td className="px-3 py-2.5 text-muted">{b.region}</td>
              <td className="px-3 py-2.5 text-right tabular-nums">{usd(b.sales)}</td>
              <td className="px-3 py-2.5 text-right">
                <Delta value={b.vsPrior} className="justify-end text-sm" />
              </td>
              <td className="px-3 py-2.5 text-right">
                <Delta value={b.vsPlan} className="justify-end text-sm" />
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums">{pct(b.margin)}</td>
              <td className="px-3 py-2.5 text-right tabular-nums">{b.turns.toFixed(1)}×</td>
              <td className="px-5 py-2.5 text-right tabular-nums">
                <span className={b.atRisk ? "text-down" : "text-muted"}>{b.atRisk}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

export function ProductTable({ model }: { model: DashModel }) {
  return (
    <Panel title="Top products" hint="Ranked by net sales" bodyClassName="overflow-x-auto px-0 pb-3">
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead className="text-xs text-muted">
          <tr className="border-b border-border">
            <th className="px-5 py-2 font-medium">Product</th>
            <th className="px-3 py-2 font-medium">Category</th>
            <th className="px-3 py-2 text-right font-medium">Sales</th>
            <th className="px-3 py-2 text-right font-medium">Units</th>
            <th className="px-3 py-2 text-right font-medium">Profit</th>
            <th className="px-3 py-2 text-right font-medium">Margin</th>
            <th className="px-5 py-2 text-right font-medium">Discount</th>
          </tr>
        </thead>
        <tbody>
          {model.products.map((p) => (
            <tr key={p.sku} className="border-b border-border/70 last:border-0">
              <td className="px-5 py-2.5">
                <p className="font-medium">{p.product}</p>
                <p className="text-xs text-faint">{p.sku}</p>
              </td>
              <td className="px-3 py-2.5 text-muted">{p.category}</td>
              <td className="px-3 py-2.5 text-right tabular-nums">{usd(p.sales)}</td>
              <td className="px-3 py-2.5 text-right tabular-nums">{num(p.units)}</td>
              <td className={cn("px-3 py-2.5 text-right tabular-nums", p.profit < 0 && "text-down")}>
                {usd(p.profit)}
              </td>
              <td className={cn("px-3 py-2.5 text-right tabular-nums", p.margin < 0 && "text-down")}>
                {pct(p.margin)}
              </td>
              <td className="px-5 py-2.5 text-right tabular-nums">{pct(p.discount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

export function InventoryTable({ model }: { model: DashModel }) {
  const rows = model.inventory.filter((i) => i.status !== "ok").concat(
    model.inventory.filter((i) => i.status === "ok").slice(0, 8),
  );
  return (
    <Panel
      title="Inventory positions"
      hint="Exceptions first, then largest remaining balances"
      bodyClassName="overflow-x-auto px-0 pb-3"
    >
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="text-xs text-muted">
          <tr className="border-b border-border">
            <th className="px-5 py-2 font-medium">SKU</th>
            <th className="px-3 py-2 font-medium">Branch</th>
            <th className="px-3 py-2 text-right font-medium">On hand</th>
            <th className="px-3 py-2 text-right font-medium">Reorder</th>
            <th className="px-3 py-2 text-right font-medium">Days</th>
            <th className="px-3 py-2 text-right font-medium">Value</th>
            <th className="px-5 py-2 text-right font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, 18).map((i) => (
            <tr key={`${i.sku}-${i.branch}`} className="border-b border-border/70 last:border-0">
              <td className="px-5 py-2.5">
                <p className="font-medium">{i.product}</p>
                <p className="text-xs text-faint">{i.sku}</p>
              </td>
              <td className="px-3 py-2.5 text-muted">{i.branch}</td>
              <td className="px-3 py-2.5 text-right tabular-nums">{num(i.onHand)}</td>
              <td className="px-3 py-2.5 text-right tabular-nums text-muted">{num(i.reorderPoint)}</td>
              <td className="px-3 py-2.5 text-right tabular-nums">{Math.round(i.daysOnHand)}</td>
              <td className="px-3 py-2.5 text-right tabular-nums">{usd(i.value)}</td>
              <td className="px-5 py-2.5 text-right">
                <StatusPill status={i.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}
