import type { ProductDef, Region, SaleRow, Segment, StockRow } from "./types";
import { AS_OF } from "./types";
import { monthKey } from "./format";

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const BRANCHES: { branch: string; region: Region; weight: number }[] = [
  { branch: "New York", region: "East", weight: 1.34 },
  { branch: "Boston", region: "East", weight: 0.96 },
  { branch: "Philadelphia", region: "East", weight: 0.84 },
  { branch: "Los Angeles", region: "West", weight: 1.28 },
  { branch: "Seattle", region: "West", weight: 1.04 },
  { branch: "Denver", region: "West", weight: 0.8 },
  { branch: "Chicago", region: "Central", weight: 1.1 },
  { branch: "Dallas", region: "Central", weight: 0.94 },
  { branch: "Atlanta", region: "South", weight: 0.88 },
  { branch: "Miami", region: "South", weight: 0.76 },
];

export const PRODUCTS: ProductDef[] = [
  { sku: "FUR-CH-1001", product: "Hon Executive Chair", category: "Furniture", subcategory: "Chairs", unitCost: 210, listPrice: 389 },
  { sku: "FUR-CH-1002", product: "Global Task Chair", category: "Furniture", subcategory: "Chairs", unitCost: 92, listPrice: 169 },
  { sku: "FUR-TA-1003", product: "Bush Conference Table", category: "Furniture", subcategory: "Tables", unitCost: 430, listPrice: 499 },
  { sku: "FUR-TA-1004", product: "Bevis Round Table", category: "Furniture", subcategory: "Tables", unitCost: 248, listPrice: 279 },
  { sku: "FUR-BO-1005", product: "Safco Steel Bookcase", category: "Furniture", subcategory: "Bookcases", unitCost: 118, listPrice: 210 },
  { sku: "FUR-FU-1006", product: "DMI Reception Desk", category: "Furniture", subcategory: "Furnishings", unitCost: 340, listPrice: 560 },
  { sku: "OFF-BI-2001", product: "Acco Economy Binders", category: "Office Supplies", subcategory: "Binders", unitCost: 4.2, listPrice: 9.5 },
  { sku: "OFF-BI-2002", product: "Wilson Jones Binder", category: "Office Supplies", subcategory: "Binders", unitCost: 7.8, listPrice: 16.4 },
  { sku: "OFF-PA-2003", product: "Xerox Copy Paper", category: "Office Supplies", subcategory: "Paper", unitCost: 8.5, listPrice: 19.9 },
  { sku: "OFF-LA-2004", product: "Avery Shipping Labels", category: "Office Supplies", subcategory: "Labels", unitCost: 3.1, listPrice: 8.4 },
  { sku: "OFF-ST-2005", product: "Fellowes Binding Machine", category: "Office Supplies", subcategory: "Appliances", unitCost: 142, listPrice: 249 },
  { sku: "OFF-AR-2006", product: "Sanford Highlighters", category: "Office Supplies", subcategory: "Art", unitCost: 1.8, listPrice: 5.6 },
  { sku: "TEC-PH-3001", product: "Cisco IP Phone", category: "Technology", subcategory: "Phones", unitCost: 168, listPrice: 189 },
  { sku: "TEC-PH-3002", product: "Apple Smart Watch", category: "Technology", subcategory: "Phones", unitCost: 242, listPrice: 399 },
  { sku: "TEC-CO-3003", product: "Canon ImageRunner Copier", category: "Technology", subcategory: "Copiers", unitCost: 890, listPrice: 1640 },
  { sku: "TEC-PR-3004", product: "HP LaserJet Printer", category: "Technology", subcategory: "Machines", unitCost: 186, listPrice: 329 },
  { sku: "TEC-AC-3005", product: "Logitech Webcam", category: "Technology", subcategory: "Accessories", unitCost: 28, listPrice: 69 },
  { sku: "TEC-AC-3006", product: "Samsung 27in Monitor", category: "Technology", subcategory: "Accessories", unitCost: 142, listPrice: 259 },
];

const PRODUCT_SHARE: Record<string, number> = {
  "FUR-CH-1001": 0.22,
  "FUR-CH-1002": 0.2,
  "FUR-TA-1003": 0.16,
  "FUR-TA-1004": 0.12,
  "FUR-BO-1005": 0.14,
  "FUR-FU-1006": 0.16,
  "OFF-BI-2001": 0.22,
  "OFF-BI-2002": 0.14,
  "OFF-PA-2003": 0.24,
  "OFF-LA-2004": 0.1,
  "OFF-ST-2005": 0.18,
  "OFF-AR-2006": 0.12,
  "TEC-PH-3001": 0.16,
  "TEC-PH-3002": 0.18,
  "TEC-CO-3003": 0.2,
  "TEC-PR-3004": 0.16,
  "TEC-AC-3005": 0.12,
  "TEC-AC-3006": 0.18,
};

const CAT_SHARE: Record<string, number> = {
  Furniture: 0.32,
  "Office Supplies": 0.27,
  Technology: 0.41,
};

const SEASON = [0.82, 0.78, 0.94, 0.96, 0.99, 1.03, 0.95, 1.06, 1.12, 1.08, 1.3, 1.38];

const YEAR_GROWTH: Record<number, number> = { 2024: 1, 2025: 1.09, 2026: 1.17 };

const SEGMENT_SHARE: { segment: Segment; share: number }[] = [
  { segment: "Consumer", share: 0.51 },
  { segment: "Corporate", share: 0.31 },
  { segment: "Home Office", share: 0.18 },
];

const BRANCH_WEIGHT_SUM = BRANCHES.reduce((s, b) => s + b.weight, 0);

const BRANCH_FY26: Record<string, number> = {
  "New York": 0.96,
  Boston: 1.0,
  Philadelphia: 1.03,
  "Los Angeles": 0.98,
  Seattle: 0.94,
  Denver: 0.97,
  Chicago: 0.96,
  Dallas: 1.07,
  Atlanta: 1.05,
  Miami: 1.09,
};

function extraDiscount(sku: string, region: Region, rng: () => number): number {
  let d = 0.04 + rng() * 0.06;
  if (sku.startsWith("FUR-TA")) d += 0.14;
  if (sku === "TEC-PH-3001") d += 0.12;
  if (sku.startsWith("OFF-BI")) d += 0.08;
  if (region === "Central") d += 0.05;
  if (region === "South") d += 0.02;
  return Math.min(0.42, d);
}

function generateSales(): SaleRow[] {
  const rng = mulberry32(20260917);
  const rows: SaleRow[] = [];
  const [asY, asM, asD] = AS_OF.split("-").map(Number);
  const baseMonthly = 395_000;

  for (let year = 2024; year <= 2026; year++) {
    const lastMonth = year === 2026 ? asM : 12;
    for (let month = 1; month <= lastMonth; month++) {
      let monthScale = SEASON[month - 1]! * (YEAR_GROWTH[year] ?? 1);
      if (year === asY && month === asM) monthScale *= asD / 30;
      const monthTotal = baseMonthly * monthScale;
      const yyyymm = monthKey(year, month);

      for (const b of BRANCHES) {
        const fy = year === 2026 ? (BRANCH_FY26[b.branch] ?? 1) : 1;
        const branchTotal = monthTotal * (b.weight / BRANCH_WEIGHT_SUM) * fy;
        for (const p of PRODUCTS) {
          const share = (CAT_SHARE[p.category] ?? 0.3) * (PRODUCT_SHARE[p.sku] ?? 0.1);
          const noise = 0.82 + rng() * 0.36;
          const demand = branchTotal * share * noise;
          const units = Math.max(1, Math.round(demand / p.listPrice));
          const discount = extraDiscount(p.sku, b.region, rng);
          const sales = units * p.listPrice * (1 - discount);
          const cogs = units * p.unitCost;
          const profit = sales - cogs;
          const orders = Math.max(1, Math.round(units / (2.2 + rng() * 2.4)));
          const segRoll = rng();
          let acc = 0;
          let segment: Segment = "Consumer";
          for (const s of SEGMENT_SHARE) {
            acc += s.share;
            if (segRoll <= acc) {
              segment = s.segment;
              break;
            }
          }
          rows.push({
            month: yyyymm,
            region: b.region,
            branch: b.branch,
            category: p.category,
            subcategory: p.subcategory,
            product: p.product,
            sku: p.sku,
            segment,
            units,
            sales,
            cogs,
            profit,
            discount,
            orders,
          });
        }
      }
    }
  }
  return rows;
}

function trailingDaily(sales: SaleRow[], sku: string, branch: string): number {
  const cutoff = 202607;
  let units = 0;
  for (const r of sales) {
    if (r.sku === sku && r.branch === branch && r.month >= cutoff) units += r.units;
  }
  return units / 78;
}

function generateInventory(sales: SaleRow[]): StockRow[] {
  const rng = mulberry32(9172026);
  const rows: StockRow[] = [];
  const targetDays: Record<string, number> = {
    Furniture: 52,
    "Office Supplies": 28,
    Technology: 34,
  };

  for (const b of BRANCHES) {
    for (const p of PRODUCTS) {
      const daily = Math.max(0.05, trailingDaily(sales, p.sku, b.branch));
      const target = targetDays[p.category] ?? 40;
      let factor = 0.7 + rng() * 0.7;
      if (b.branch === "Miami" && p.sku === "TEC-CO-3003") factor = 0.18;
      if (b.branch === "Miami" && p.sku === "TEC-PH-3002") factor = 0.22;
      if (b.branch === "Dallas" && p.sku === "FUR-CH-1001") factor = 0.2;
      if (b.branch === "Dallas" && p.sku === "OFF-ST-2005") factor = 0.15;
      if (b.branch === "Chicago" && p.sku === "TEC-PR-3004") factor = 0;
      if (b.branch === "Denver" && p.category === "Furniture") factor = 1.85;
      if (b.branch === "Boston" && p.sku === "OFF-PA-2003") factor = 0.25;
      if (b.branch === "Atlanta" && p.sku === "FUR-TA-1003") factor = 2.1;
      const onHand = Math.max(0, Math.round(daily * target * factor));
      const reorderPoint = Math.max(2, Math.round(daily * 18));
      rows.push({
        sku: p.sku,
        product: p.product,
        category: p.category,
        subcategory: p.subcategory,
        branch: b.branch,
        region: b.region,
        onHand,
        reorderPoint,
        unitCost: p.unitCost,
      });
    }
  }
  return rows;
}

export const SALES: SaleRow[] = generateSales();
export const INVENTORY: StockRow[] = generateInventory(SALES);
