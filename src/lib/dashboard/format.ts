const usdFullFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const usdDecFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const intFmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function usd(n: number): string {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 10_000) return `${sign}$${(abs / 1_000).toFixed(1)}K`;
  return usdFullFmt.format(n);
}

export function usdFull(n: number): string {
  return usdFullFmt.format(n);
}

export function usdDec(n: number): string {
  return usdDecFmt.format(n);
}

export function num(n: number): string {
  return intFmt.format(Math.round(n));
}

export function pct(n: number, digits = 1): string {
  if (!Number.isFinite(n)) return "—";
  return `${(n * 100).toFixed(digits)}%`;
}

export function signedPct(n: number, digits = 1): string {
  if (!Number.isFinite(n)) return "—";
  const v = n * 100;
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(digits)}%`;
}

export function delta(cur: number, prev: number): number {
  if (!prev) return cur ? 1 : 0;
  return (cur - prev) / Math.abs(prev);
}

export function monthLabel(yyyymm: number, style: "short" | "full" = "short"): string {
  const y = Math.floor(yyyymm / 100);
  const m = yyyymm % 100;
  const date = new Date(y, m - 1, 1);
  if (style === "full") {
    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  }
  return date.toLocaleString("en-US", { month: "short" });
}

export function monthKey(year: number, month: number): number {
  return year * 100 + month;
}

const PERIOD_LABELS: Record<string, string> = {
  ytd: "FY26 YTD",
  l12: "Last 12 months",
  fy25: "FY 2025",
  fy24: "FY 2024",
  all: "All time",
};

export function periodLabel(period: string): string {
  return PERIOD_LABELS[period] ?? period;
}
