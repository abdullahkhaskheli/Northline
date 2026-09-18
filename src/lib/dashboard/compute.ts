import { INVENTORY, SALES } from "./dataset";
import { delta, monthLabel, monthKey, num, periodLabel, signedPct, usd } from "./format";
import type {
  Alert,
  BranchPoint,
  Category,
  CategoryPoint,
  DashModel,
  Filters,
  InventoryPoint,
  Kpis,
  MonthPoint,
  Period,
  ProductPoint,
  Region,
  RegionPoint,
  SaleRow,
  SegmentPoint,
  SubcatPoint,
} from "./types";
import { AS_OF, CATEGORIES, REGIONS } from "./types";

const AS_PARTS = AS_OF.split("-").map(Number);
const AS_Y = AS_PARTS[0]!;
const AS_M = AS_PARTS[1]!;
const AS_D = AS_PARTS[2]!;
const AS_MONTH = monthKey(AS_Y, AS_M);

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function daysBetween(start: number, end: number): number {
  const sy = Math.floor(start / 100);
  const sm = start % 100;
  const ey = Math.floor(end / 100);
  const em = end % 100;
  let days = 0;
  let y = sy;
  let m = sm;
  while (y < ey || (y === ey && m <= em)) {
    const dim = daysInMonth(y, m);
    const yyyymm = monthKey(y, m);
    if (yyyymm === AS_MONTH && end >= AS_MONTH) days += Math.min(AS_D, dim);
    else days += dim;
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  return Math.max(1, days);
}

export function periodRange(period: Period): {
  start: number;
  end: number;
  priorStart: number | null;
  priorEnd: number | null;
  label: string;
  priorLabel: string;
} {
  switch (period) {
    case "ytd":
      return {
        start: monthKey(AS_Y, 1),
        end: AS_MONTH,
        priorStart: monthKey(AS_Y - 1, 1),
        priorEnd: monthKey(AS_Y - 1, AS_M),
        label: `Jan–${monthLabel(AS_MONTH)} ${AS_Y}`,
        priorLabel: `Jan–${monthLabel(AS_MONTH)} ${AS_Y - 1}`,
      };
    case "l12": {
      let m = AS_M - 11;
      let y = AS_Y;
      if (m <= 0) {
        m += 12;
        y -= 1;
      }
      const start = monthKey(y, m);
      return {
        start,
        end: AS_MONTH,
        priorStart: monthKey(y - 1, m),
        priorEnd: monthKey(AS_Y - 1, AS_M),
        label: "Last 12 months",
        priorLabel: "Prior 12 months",
      };
    }
    case "fy25":
      return {
        start: 202501,
        end: 202512,
        priorStart: 202401,
        priorEnd: 202412,
        label: "FY 2025",
        priorLabel: "FY 2024",
      };
    case "fy24":
      return {
        start: 202401,
        end: 202412,
        priorStart: null,
        priorEnd: null,
        label: "FY 2024",
        priorLabel: "—",
      };
    default:
      return {
        start: 202401,
        end: AS_MONTH,
        priorStart: null,
        priorEnd: null,
        label: "Jan 2024 – Sep 2026",
        priorLabel: "—",
      };
  }
}

function inRange(month: number, start: number, end: number) {
  return month >= start && month <= end;
}

function matchesDim(row: SaleRow, filters: Filters): boolean {
  if (filters.regions.length && !filters.regions.includes(row.region)) return false;
  if (filters.categories.length && !filters.categories.includes(row.category)) return false;
  if (filters.branch && row.branch !== filters.branch) return false;
  return true;
}

function emptyKpis(): Kpis {
  return {
    sales: 0,
    profit: 0,
    cogs: 0,
    units: 0,
    orders: 0,
    discount: 0,
    margin: 0,
    inventoryValue: 0,
    turns: 0,
    daysOnHand: 0,
    atRisk: 0,
    plan: 0,
  };
}

function finishKpis(k: Kpis, days: number, inventoryValue: number, atRisk: number, plan: number): Kpis {
  k.margin = k.sales ? k.profit / k.sales : 0;
  k.discount = k.orders ? k.discount : 0;
  k.inventoryValue = inventoryValue;
  k.atRisk = atRisk;
  k.plan = plan;
  const annualCogs = days ? (k.cogs / days) * 365 : 0;
  k.turns = inventoryValue ? annualCogs / inventoryValue : 0;
  k.daysOnHand = k.turns ? 365 / k.turns : 0;
  return k;
}

function sumSales(rows: SaleRow[], start: number, end: number): number {
  let s = 0;
  for (const r of rows) if (inRange(r.month, start, end)) s += r.sales;
  return s;
}

export function buildModel(filters: Filters): DashModel {
  const range = periodRange(filters.period);
  const days = daysBetween(range.start, range.end);
  const regions = filters.regions.length ? filters.regions : [...REGIONS];
  const categories = filters.categories.length ? filters.categories : [...CATEGORIES];

  const scoped = SALES.filter((r) => matchesDim(r, filters));
  const current = scoped.filter((r) => inRange(r.month, range.start, range.end));
  const prior =
    range.priorStart && range.priorEnd
      ? scoped.filter((r) => inRange(r.month, range.priorStart!, range.priorEnd!))
      : [];

  const stock = INVENTORY.filter((s) => {
    if (!regions.includes(s.region)) return false;
    if (!categories.includes(s.category)) return false;
    if (filters.branch && s.branch !== filters.branch) return false;
    return true;
  });

  const dailyByKey = new Map<string, number>();
  const lookbackStart = (() => {
    let m = AS_M - 2;
    let y = AS_Y;
    if (m <= 0) {
      m += 12;
      y -= 1;
    }
    return monthKey(y, m);
  })();
  for (const r of scoped) {
    if (r.month < lookbackStart) continue;
    const key = `${r.sku}|${r.branch}`;
    dailyByKey.set(key, (dailyByKey.get(key) ?? 0) + r.units);
  }
  const lookbackDays = daysBetween(lookbackStart, AS_MONTH);

  const inventory: InventoryPoint[] = stock.map((s) => {
    const avgDaily = (dailyByKey.get(`${s.sku}|${s.branch}`) ?? 0) / lookbackDays;
    const daysOnHand = avgDaily > 0.01 ? s.onHand / avgDaily : s.onHand > 0 ? 180 : 0;
    const value = s.onHand * s.unitCost;
    let status: InventoryPoint["status"] = "ok";
    if (s.onHand <= s.reorderPoint) status = "low";
    else if (daysOnHand > 70) status = "over";
    return { ...s, value, avgDaily, daysOnHand, status };
  });

  const inventoryValue = inventory.reduce((s, i) => s + i.value, 0);
  const atRisk = inventory.filter((i) => i.status === "low").length;

  const kpis = emptyKpis();
  let discWeighted = 0;
  for (const r of current) {
    kpis.sales += r.sales;
    kpis.profit += r.profit;
    kpis.cogs += r.cogs;
    kpis.units += r.units;
    kpis.orders += r.orders;
    discWeighted += r.discount * r.sales;
  }
  kpis.discount = kpis.sales ? discWeighted / kpis.sales : 0;

  const priorKpis = emptyKpis();
  let priorDisc = 0;
  for (const r of prior) {
    priorKpis.sales += r.sales;
    priorKpis.profit += r.profit;
    priorKpis.cogs += r.cogs;
    priorKpis.units += r.units;
    priorKpis.orders += r.orders;
    priorDisc += r.discount * r.sales;
  }
  priorKpis.discount = priorKpis.sales ? priorDisc / priorKpis.sales : 0;

  const planRate = 1.06;
  const plan = priorKpis.sales ? priorKpis.sales * planRate : kpis.sales * 0.95;
  finishKpis(kpis, days, inventoryValue, atRisk, plan);
  const priorDays =
    range.priorStart && range.priorEnd ? daysBetween(range.priorStart, range.priorEnd) : days;
  finishKpis(priorKpis, priorDays, inventoryValue, atRisk, plan);

  const monthSet = new Set<number>();
  for (const r of current) monthSet.add(r.month);
  const months = [...monthSet].sort((a, b) => a - b);

  const monthly: MonthPoint[] = months.map((m) => {
    let sales = 0;
    let profit = 0;
    let units = 0;
    for (const r of current) {
      if (r.month === m) {
        sales += r.sales;
        profit += r.profit;
        units += r.units;
      }
    }
    const py = m - 100;
    const priorSales = prior.length ? sumSales(prior, py, py) : 0;
    return {
      month: m,
      label: monthLabel(m, months.length > 8 ? "short" : "full"),
      sales,
      profit,
      units,
      priorSales,
      plan: priorSales ? priorSales * planRate : sales * 0.95,
    };
  });

  const regionMap = new Map<Region, RegionPoint>();
  for (const region of REGIONS) {
    regionMap.set(region, {
      region,
      sales: 0,
      profit: 0,
      margin: 0,
      share: 0,
      vsPrior: 0,
    });
  }
  for (const r of current) {
    const p = regionMap.get(r.region)!;
    p.sales += r.sales;
    p.profit += r.profit;
  }
  const priorRegion = new Map<Region, number>();
  for (const r of prior) priorRegion.set(r.region, (priorRegion.get(r.region) ?? 0) + r.sales);
  const regionPoints: RegionPoint[] = [...regionMap.values()].map((p) => ({
    ...p,
    margin: p.sales ? p.profit / p.sales : 0,
    share: kpis.sales ? p.sales / kpis.sales : 0,
    vsPrior: delta(p.sales, priorRegion.get(p.region) ?? 0),
  }));

  const branchNames = [...new Set(scoped.map((r) => r.branch))];
  const branchMap = new Map<string, BranchPoint>();
  for (const name of branchNames) {
    const region = current.find((r) => r.branch === name)?.region
      ?? scoped.find((r) => r.branch === name)?.region
      ?? "East";
    branchMap.set(name, {
      branch: name,
      region,
      sales: 0,
      profit: 0,
      margin: 0,
      units: 0,
      vsPrior: 0,
      vsPlan: 0,
      plan: 0,
      turns: 0,
      atRisk: 0,
      inventoryValue: 0,
    });
  }
  for (const r of current) {
    const p = branchMap.get(r.branch);
    if (!p) continue;
    p.sales += r.sales;
    p.profit += r.profit;
    p.units += r.units;
  }
  const branchCogs = new Map<string, number>();
  for (const r of current) branchCogs.set(r.branch, (branchCogs.get(r.branch) ?? 0) + r.cogs);
  const priorBranch = new Map<string, number>();
  for (const r of prior) priorBranch.set(r.branch, (priorBranch.get(r.branch) ?? 0) + r.sales);
  for (const inv of inventory) {
    const p = branchMap.get(inv.branch);
    if (!p) continue;
    p.inventoryValue += inv.value;
    if (inv.status === "low") p.atRisk += 1;
  }
  const branches: BranchPoint[] = [...branchMap.values()]
    .map((p) => {
      const priorSales = priorBranch.get(p.branch) ?? 0;
      const bPlan = priorSales ? priorSales * planRate : p.sales * 0.95;
      const cogs = branchCogs.get(p.branch) ?? 0;
      const annual = days ? (cogs / days) * 365 : 0;
      return {
        ...p,
        margin: p.sales ? p.profit / p.sales : 0,
        plan: bPlan,
        vsPrior: delta(p.sales, priorSales),
        vsPlan: delta(p.sales, bPlan),
        turns: p.inventoryValue ? annual / p.inventoryValue : 0,
      };
    })
    .sort((a, b) => b.sales - a.sales);

  const catMap = new Map<Category, CategoryPoint>();
  for (const c of CATEGORIES) {
    catMap.set(c, {
      category: c,
      sales: 0,
      profit: 0,
      margin: 0,
      units: 0,
      share: 0,
      vsPrior: 0,
    });
  }
  for (const r of current) {
    const p = catMap.get(r.category)!;
    p.sales += r.sales;
    p.profit += r.profit;
    p.units += r.units;
  }
  const priorCat = new Map<Category, number>();
  for (const r of prior) priorCat.set(r.category, (priorCat.get(r.category) ?? 0) + r.sales);
  const categoryPoints: CategoryPoint[] = [...catMap.values()].map((p) => ({
    ...p,
    margin: p.sales ? p.profit / p.sales : 0,
    share: kpis.sales ? p.sales / kpis.sales : 0,
    vsPrior: delta(p.sales, priorCat.get(p.category) ?? 0),
  }));

  const subMap = new Map<string, SubcatPoint>();
  for (const r of current) {
    const cur = subMap.get(r.subcategory) ?? {
      subcategory: r.subcategory,
      category: r.category,
      sales: 0,
      profit: 0,
      margin: 0,
      units: 0,
    };
    cur.sales += r.sales;
    cur.profit += r.profit;
    cur.units += r.units;
    subMap.set(r.subcategory, cur);
  }
  const subcategories = [...subMap.values()]
    .map((p) => ({ ...p, margin: p.sales ? p.profit / p.sales : 0 }))
    .sort((a, b) => b.sales - a.sales);

  const prodMap = new Map<string, ProductPoint & { disc: number }>();
  for (const r of current) {
    const cur = prodMap.get(r.sku) ?? {
      sku: r.sku,
      product: r.product,
      category: r.category,
      subcategory: r.subcategory,
      sales: 0,
      profit: 0,
      margin: 0,
      units: 0,
      discount: 0,
      cogs: 0,
      disc: 0,
    };
    cur.sales += r.sales;
    cur.profit += r.profit;
    cur.units += r.units;
    cur.cogs += r.cogs;
    cur.disc += r.discount * r.sales;
    prodMap.set(r.sku, cur);
  }
  const products: ProductPoint[] = [...prodMap.values()]
    .map((p) => ({
      sku: p.sku,
      product: p.product,
      category: p.category,
      subcategory: p.subcategory,
      sales: p.sales,
      profit: p.profit,
      margin: p.sales ? p.profit / p.sales : 0,
      units: p.units,
      discount: p.sales ? p.disc / p.sales : 0,
      cogs: p.cogs,
    }))
    .sort((a, b) => b.sales - a.sales);

  const segMap = new Map<string, number>();
  for (const r of current) segMap.set(r.segment, (segMap.get(r.segment) ?? 0) + r.sales);
  const segments: SegmentPoint[] = [...segMap.entries()].map(([segment, sales]) => ({
    segment: segment as SegmentPoint["segment"],
    sales,
    share: kpis.sales ? sales / kpis.sales : 0,
  }));

  const alerts = buildAlerts({
    kpis,
    prior: priorKpis,
    branches,
    inventory,
    products,
    categoryPoints,
  });

  const narrative = buildNarrative({
    kpis,
    prior: priorKpis,
    rangeLabel: range.label,
    regionPoints,
    categoryPoints,
    branches,
    inventory,
    hasPrior: prior.length > 0,
  });

  return {
    filters,
    kpis,
    prior: priorKpis,
    monthly,
    regions: regionPoints,
    branches,
    categories: categoryPoints,
    subcategories,
    products,
    segments,
    inventory: inventory.sort((a, b) => {
      const rank = { low: 0, over: 1, ok: 2 };
      const d = rank[a.status] - rank[b.status];
      if (d !== 0) return d;
      return b.value - a.value;
    }),
    alerts,
    narrative,
    rangeLabel: range.label,
    priorLabel: range.priorLabel,
    days,
  };
}

function buildAlerts(input: {
  kpis: Kpis;
  prior: Kpis;
  branches: BranchPoint[];
  inventory: InventoryPoint[];
  products: ProductPoint[];
  categoryPoints: CategoryPoint[];
}): Alert[] {
  const alerts: Alert[] = [];
  const lows = input.inventory.filter((i) => i.status === "low").slice(0, 4);
  for (const i of lows) {
    alerts.push({
      id: `low-${i.sku}-${i.branch}`,
      severity: i.onHand === 0 ? "high" : "medium",
      title: `${i.branch} · ${i.product}`,
      detail:
        i.onHand === 0
          ? "Stocked out — reorder immediately"
          : `${num(i.onHand)} on hand vs reorder of ${num(i.reorderPoint)}`,
      branch: i.branch,
      region: i.region,
    });
  }
  const misses = input.branches.filter((b) => b.vsPlan < -0.04).slice(0, 2);
  for (const b of misses) {
    alerts.push({
      id: `plan-${b.branch}`,
      severity: b.vsPlan < -0.08 ? "high" : "medium",
      title: `${b.branch} behind plan`,
      detail: `${signedPct(b.vsPlan)} vs plan · ${usd(b.sales)} sales`,
      branch: b.branch,
      region: b.region,
    });
  }
  const losers = input.products.filter((p) => p.profit < 0).slice(0, 2);
  for (const p of losers) {
    alerts.push({
      id: `margin-${p.sku}`,
      severity: "low",
      title: `${p.product} is unprofitable`,
      detail: `${usd(p.profit)} profit on ${usd(p.sales)} · ${pctSafe(p.discount)} avg discount`,
    });
  }
  const over = input.inventory.filter((i) => i.status === "over").slice(0, 2);
  for (const i of over) {
    alerts.push({
      id: `over-${i.sku}-${i.branch}`,
      severity: "low",
      title: `${i.branch} overstock · ${i.product}`,
      detail: `${Math.round(i.daysOnHand)} days on hand (target ~45)`,
      branch: i.branch,
      region: i.region,
    });
  }
  if (input.kpis.margin + 0.015 < input.prior.margin && input.prior.margin) {
    alerts.unshift({
      id: "margin-company",
      severity: "medium",
      title: "Company margin compressed",
      detail: `${pctSafe(input.kpis.margin)} vs ${pctSafe(input.prior.margin)} in the prior period`,
    });
  }
  return alerts.slice(0, 8);
}

function pctSafe(n: number) {
  return `${(n * 100).toFixed(1)}%`;
}

function buildNarrative(input: {
  kpis: Kpis;
  prior: Kpis;
  rangeLabel: string;
  regionPoints: RegionPoint[];
  categoryPoints: CategoryPoint[];
  branches: BranchPoint[];
  inventory: InventoryPoint[];
  hasPrior: boolean;
}): string[] {
  const { kpis, prior } = input;
  const lines: string[] = [];
  if (input.hasPrior) {
    const d = delta(kpis.sales, prior.sales);
    lines.push(
      `Sales ${usd(kpis.sales)} in ${input.rangeLabel}, ${signedPct(d)} vs the same window last year.`,
    );
  } else {
    lines.push(`Sales ${usd(kpis.sales)} across ${input.rangeLabel}.`);
  }
  const topR = [...input.regionPoints].sort((a, b) => b.sales - a.sales)[0];
  if (topR) {
    lines.push(
      `${topR.region} leads with ${pctSafe(topR.share)} of revenue${
        Number.isFinite(topR.vsPrior) && input.hasPrior ? ` (${signedPct(topR.vsPrior)} vs prior)` : ""
      }.`,
    );
  }
  const topC = [...input.categoryPoints].sort((a, b) => b.sales - a.sales)[0];
  if (topC) {
    lines.push(
      `${topC.category} is the mix leader at ${pctSafe(topC.share)} · ${pctSafe(topC.margin)} margin.`,
    );
  }
  const low = input.inventory.filter((i) => i.status === "low").length;
  const over = input.inventory.filter((i) => i.status === "over").length;
  lines.push(
    `Inventory is turning ${kpis.turns.toFixed(1)}× (≈${Math.round(kpis.daysOnHand)} days on hand). ${low} position${low === 1 ? "" : "s"} below reorder, ${over} overstocked.`,
  );
  const miss = input.branches.filter((b) => b.vsPlan < 0).length;
  if (input.hasPrior) {
    lines.push(
      `Gross margin ${pctSafe(kpis.margin)} · ${miss} of ${input.branches.length} branches are behind plan.`,
    );
  }
  return lines;
}

export { periodLabel };
