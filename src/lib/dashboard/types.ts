export const REGIONS = ["East", "West", "Central", "South"] as const;
export type Region = (typeof REGIONS)[number];

export const CATEGORIES = ["Furniture", "Office Supplies", "Technology"] as const;
export type Category = (typeof CATEGORIES)[number];

export const SEGMENTS = ["Consumer", "Corporate", "Home Office"] as const;
export type Segment = (typeof SEGMENTS)[number];

export const PERIODS = ["ytd", "l12", "fy25", "fy24", "all"] as const;
export type Period = (typeof PERIODS)[number];

export const VIEWS = ["overview", "sales", "inventory", "branches"] as const;
export type View = (typeof VIEWS)[number];

export const AS_OF = "2026-09-17";
export const AS_OF_LABEL = "17 Sep 2026";

export type ProductDef = {
  sku: string;
  product: string;
  category: Category;
  subcategory: string;
  unitCost: number;
  listPrice: number;
};

export type SaleRow = {
  month: number;
  region: Region;
  branch: string;
  category: Category;
  subcategory: string;
  product: string;
  sku: string;
  segment: Segment;
  units: number;
  sales: number;
  cogs: number;
  profit: number;
  discount: number;
  orders: number;
};

export type StockRow = {
  sku: string;
  product: string;
  category: Category;
  subcategory: string;
  branch: string;
  region: Region;
  onHand: number;
  reorderPoint: number;
  unitCost: number;
};

export type Kpis = {
  sales: number;
  profit: number;
  cogs: number;
  units: number;
  orders: number;
  discount: number;
  margin: number;
  inventoryValue: number;
  turns: number;
  daysOnHand: number;
  atRisk: number;
  plan: number;
};

export type MonthPoint = {
  month: number;
  label: string;
  sales: number;
  profit: number;
  units: number;
  priorSales: number;
  plan: number;
};

export type RegionPoint = {
  region: Region;
  sales: number;
  profit: number;
  margin: number;
  share: number;
  vsPrior: number;
};

export type BranchPoint = {
  branch: string;
  region: Region;
  sales: number;
  profit: number;
  margin: number;
  units: number;
  vsPrior: number;
  vsPlan: number;
  plan: number;
  turns: number;
  atRisk: number;
  inventoryValue: number;
};

export type CategoryPoint = {
  category: Category;
  sales: number;
  profit: number;
  margin: number;
  units: number;
  share: number;
  vsPrior: number;
};

export type SubcatPoint = {
  subcategory: string;
  category: Category;
  sales: number;
  profit: number;
  margin: number;
  units: number;
};

export type ProductPoint = {
  sku: string;
  product: string;
  category: Category;
  subcategory: string;
  sales: number;
  profit: number;
  margin: number;
  units: number;
  discount: number;
  cogs: number;
};

export type SegmentPoint = {
  segment: Segment;
  sales: number;
  share: number;
};

export type InventoryPoint = {
  sku: string;
  product: string;
  category: Category;
  subcategory: string;
  branch: string;
  region: Region;
  onHand: number;
  reorderPoint: number;
  unitCost: number;
  value: number;
  avgDaily: number;
  daysOnHand: number;
  status: "low" | "ok" | "over";
};

export type Alert = {
  id: string;
  severity: "high" | "medium" | "low";
  title: string;
  detail: string;
  branch?: string;
  region?: Region;
};

export type Filters = {
  view: View;
  period: Period;
  regions: Region[];
  categories: Category[];
  branch: string | null;
};

export type DashModel = {
  filters: Filters;
  kpis: Kpis;
  prior: Kpis;
  monthly: MonthPoint[];
  regions: RegionPoint[];
  branches: BranchPoint[];
  categories: CategoryPoint[];
  subcategories: SubcatPoint[];
  products: ProductPoint[];
  segments: SegmentPoint[];
  inventory: InventoryPoint[];
  alerts: Alert[];
  narrative: string[];
  rangeLabel: string;
  priorLabel: string;
  days: number;
};
