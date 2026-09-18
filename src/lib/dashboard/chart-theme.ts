import type { Category, Region } from "./types";

export const tickStyle = {
  fill: "var(--color-muted)",
  fontSize: 11,
  fontFamily: "var(--font-sans)",
};

export const chartMargin = { top: 6, right: 8, left: 4, bottom: 0 };

export const REGION_COLOR: Record<Region, string> = {
  East: "var(--color-chart-1)",
  West: "var(--color-chart-2)",
  Central: "var(--color-chart-3)",
  South: "var(--color-chart-4)",
};

export const CATEGORY_COLOR: Record<Category, string> = {
  Furniture: "var(--color-chart-3)",
  "Office Supplies": "var(--color-chart-2)",
  Technology: "var(--color-chart-1)",
};

export const STATUS_COLOR = {
  low: "var(--color-down)",
  ok: "var(--color-up)",
  over: "var(--color-warn)",
};
