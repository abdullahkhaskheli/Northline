import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CATEGORY_COLOR, REGION_COLOR, chartMargin, tickStyle } from "@/lib/dashboard/chart-theme";
import type { Category, DashModel, Region } from "@/lib/dashboard/types";
import { CATEGORIES, REGIONS } from "@/lib/dashboard/types";
import { num, pct, usd } from "@/lib/dashboard/format";
import { useDashStore } from "@/lib/dashboard/store";
import { Panel } from "./panel";
import { Delta } from "./delta";

function formatTip(name: string, value: number) {
  if (name === "Turns") return `${value}×`;
  if (["Healthy", "Below reorder", "Overstock", "Days on hand"].includes(name)) return num(value);
  return usd(value);
}

function Tip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color?: string; payload?: Record<string, unknown> }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md bg-elevated px-3 py-2 text-xs shadow-[var(--shadow-border)]">
      {label ? <p className="mb-1 font-medium">{label}</p> : null}
      {payload.map((p) => (
        <p key={p.name} className="flex items-center justify-between gap-6 tabular-nums text-muted">
          <span>{p.name}</span>
          <span className="text-fg">{formatTip(p.name, p.value)}</span>
        </p>
      ))}
    </div>
  );
}

export function SalesTrend({ model }: { model: DashModel }) {
  const data = model.monthly.map((m) => ({
    label: m.label,
    Sales: Math.round(m.sales),
    "Prior year": Math.round(m.priorSales),
    Plan: Math.round(m.plan),
  }));
  const hasPrior = data.some((d) => d["Prior year"] > 0);
  return (
    <Panel
      title="Sales trend"
      hint={hasPrior ? `${model.rangeLabel} vs prior year` : model.rangeLabel}
    >
      <div className="h-56 w-full">
        <ResponsiveContainer>
          <AreaChart data={data} margin={chartMargin}>
            <defs>
              <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.28} />
                <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="label" tick={tickStyle} axisLine={false} tickLine={false} />
            <YAxis
              tick={tickStyle}
              axisLine={false}
              tickLine={false}
              width={48}
              tickFormatter={(v: number) => usd(v)}
            />
            <Tooltip content={<Tip />} />
            {hasPrior ? (
              <Area
                type="monotone"
                dataKey="Prior year"
                stroke="var(--color-chart-5)"
                fill="none"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                dot={false}
              />
            ) : null}
            <Area
              type="monotone"
              dataKey="Sales"
              stroke="var(--color-chart-1)"
              fill="url(#salesFill)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 3, fill: "var(--color-chart-1)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}

export function RegionBars({ model }: { model: DashModel }) {
  const setRegions = useDashStore((s) => s.setRegions);
  const selected = useDashStore((s) => s.regions);
  const data = model.regions.map((r) => ({
    name: r.region,
    Sales: Math.round(r.sales),
    vsPrior: r.vsPrior,
    share: r.share,
  }));
  return (
    <Panel title="Sales by region" hint="Click a bar to slice the report">
      <div className="h-56 w-full">
        <ResponsiveContainer>
          <BarChart data={data} margin={chartMargin} barCategoryGap="28%">
            <CartesianGrid vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="name" tick={tickStyle} axisLine={false} tickLine={false} />
            <YAxis
              tick={tickStyle}
              axisLine={false}
              tickLine={false}
              width={48}
              tickFormatter={(v: number) => usd(v)}
            />
            <Tooltip content={<Tip />} />
            <Bar
              dataKey="Sales"
              radius={[6, 6, 0, 0]}
              cursor="pointer"
              onClick={(d) => {
                const region = (d as { name?: Region }).name;
                if (!region) return;
                if (selected.length === 1 && selected[0] === region) setRegions([...REGIONS]);
                else setRegions([region]);
              }}
            >
              {data.map((d) => (
                <Cell
                  key={d.name}
                  fill={REGION_COLOR[d.name as Region]}
                  opacity={selected.includes(d.name as Region) ? 1 : 0.35}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        {model.regions.map((r) => (
          <li key={r.region} className="flex items-center justify-between tabular-nums">
            <span className="text-muted">{r.region}</span>
            <Delta value={r.vsPrior} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function CategoryMix({ model }: { model: DashModel }) {
  const setCategories = useDashStore((s) => s.setCategories);
  const selected = useDashStore((s) => s.categories);
  const data = model.categories.map((c) => ({
    name: c.category,
    value: Math.round(c.sales),
    share: c.share,
    margin: c.margin,
  }));
  return (
    <Panel title="Category mix" hint="Click a slice to filter">
      <div className="flex h-56 items-center gap-2">
        <div className="h-full min-w-0 flex-1">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="58%"
                outerRadius="82%"
                paddingAngle={2}
                cursor="pointer"
                onClick={(_, i) => {
                  const cat = data[i]?.name as Category | undefined;
                  if (!cat) return;
                  if (selected.length === 1 && selected[0] === cat) setCategories([...CATEGORIES]);
                  else setCategories([cat]);
                }}
              >
                {data.map((d) => (
                  <Cell
                    key={d.name}
                    fill={CATEGORY_COLOR[d.name as Category]}
                    opacity={selected.includes(d.name as Category) ? 1 : 0.35}
                    stroke="var(--color-surface)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<Tip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="w-36 shrink-0 space-y-2 text-xs">
          {model.categories.map((c) => (
            <li key={c.category}>
              <p className="flex items-center gap-1.5 font-medium">
                <span
                  className="size-2 rounded-full"
                  style={{ background: CATEGORY_COLOR[c.category] }}
                />
                {c.category === "Office Supplies" ? "Supplies" : c.category}
              </p>
              <p className="pl-3.5 tabular-nums text-muted">
                {usd(c.sales)} · {pct(c.margin)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}

export function SubcategoryBars({ model }: { model: DashModel }) {
  const data = model.subcategories.map((s) => ({
    name: s.subcategory,
    Sales: Math.round(s.sales),
    Profit: Math.round(s.profit),
    category: s.category,
  }));
  return (
    <Panel title="Sub-category performance" hint="Sales and profit">
      <div className="h-72 w-full">
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ ...chartMargin, left: 8 }}>
            <CartesianGrid horizontal={false} stroke="var(--color-border)" />
            <XAxis type="number" tick={tickStyle} axisLine={false} tickLine={false} tickFormatter={(v: number) => usd(v)} />
            <YAxis type="category" dataKey="name" tick={tickStyle} axisLine={false} tickLine={false} width={92} />
            <Tooltip content={<Tip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "var(--color-muted)" }} />
            <Bar dataKey="Sales" fill="var(--color-chart-1)" radius={[0, 4, 4, 0]} barSize={8} />
            <Bar dataKey="Profit" fill="var(--color-chart-2)" radius={[0, 4, 4, 0]} barSize={8} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}

export function InventoryHealth({ model }: { model: DashModel }) {
  const data = model.branches.map((b) => {
    const rows = model.inventory.filter((i) => i.branch === b.branch);
    return {
      name: b.branch,
      Healthy: rows.filter((r) => r.status === "ok").length,
      "Below reorder": rows.filter((r) => r.status === "low").length,
      Overstock: rows.filter((r) => r.status === "over").length,
    };
  });
  return (
    <Panel title="Stock health by branch" hint="SKU positions vs reorder">
      <div className="h-72 w-full">
        <ResponsiveContainer>
          <BarChart data={data} margin={chartMargin} barCategoryGap="24%">
            <CartesianGrid vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="name" tick={tickStyle} axisLine={false} tickLine={false} interval={0} angle={-28} textAnchor="end" height={56} />
            <YAxis tick={tickStyle} axisLine={false} tickLine={false} width={28} allowDecimals={false} />
            <Tooltip content={<Tip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "var(--color-muted)" }} />
            <Bar dataKey="Healthy" stackId="a" fill="var(--color-up)" />
            <Bar dataKey="Below reorder" stackId="a" fill="var(--color-down)" />
            <Bar dataKey="Overstock" stackId="a" fill="var(--color-warn)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}

export function TurnoverBars({ model }: { model: DashModel }) {
  const data = model.categories.map((c) => {
    const inv = model.inventory.filter((i) => i.category === c.category);
    const value = inv.reduce((s, i) => s + i.value, 0);
    const days = model.days || 1;
    const annualCogs = (c.sales - c.profit) * (365 / days);
    const turns = value ? annualCogs / value : 0;
    return {
      name: c.category === "Office Supplies" ? "Supplies" : c.category,
      Turns: Number(turns.toFixed(1)),
      "Days on hand": turns ? Math.round(365 / turns) : 0,
    };
  });
  return (
    <Panel title="Inventory turnover" hint="Annualized COGS / on-hand value">
      <div className="h-56 w-full">
        <ResponsiveContainer>
          <BarChart data={data} margin={chartMargin} barCategoryGap="32%">
            <CartesianGrid vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="name" tick={tickStyle} axisLine={false} tickLine={false} />
            <YAxis tick={tickStyle} axisLine={false} tickLine={false} width={28} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div className="rounded-md bg-elevated px-3 py-2 text-xs shadow-[var(--shadow-border)]">
                    <p className="mb-1 font-medium">{label}</p>
                    {payload.map((p) => (
                      <p key={String(p.name)} className="tabular-nums text-muted">
                        {p.name}: <span className="text-fg">{p.name === "Turns" ? `${p.value}×` : num(Number(p.value))}</span>
                      </p>
                    ))}
                  </div>
                );
              }}
            />
            <Bar dataKey="Turns" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}

export function SegmentMix({ model }: { model: DashModel }) {
  const data = model.segments.map((s) => ({ name: s.segment, value: Math.round(s.sales) }));
  const colors = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)"];
  return (
    <Panel title="Customer segment" hint="Share of net sales">
      <div className="h-56 w-full">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius="56%" outerRadius="80%" paddingAngle={2}>
              {data.map((d, i) => (
                <Cell key={d.name} fill={colors[i % colors.length]} stroke="var(--color-surface)" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<Tip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "var(--color-muted)" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
