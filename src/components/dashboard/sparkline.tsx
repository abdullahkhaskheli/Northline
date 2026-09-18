import { cn } from "@/lib/utils";

export function Sparkline({
  values,
  className,
  tone = "neutral",
}: {
  values: number[];
  className?: string;
  tone?: "up" | "down" | "neutral";
}) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const w = 88;
  const h = 28;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / span) * (h - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const toneClass = tone === "up" ? "text-up" : tone === "down" ? "text-down" : "text-primary";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-7 w-20", toneClass, className)} aria-hidden>
      <polyline fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" points={pts} />
    </svg>
  );
}
