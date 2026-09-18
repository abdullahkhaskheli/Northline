import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { signedPct } from "@/lib/dashboard/format";

export function Delta({ value, className }: { value: number; className?: string }) {
  if (!Number.isFinite(value)) {
    return <span className={cn("text-muted", className)}>—</span>;
  }
  const up = value > 0.001;
  const down = value < -0.001;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 tabular-nums",
        up && "text-up",
        down && "text-down",
        !up && !down && "text-muted",
        className,
      )}
    >
      {up ? <TrendingUp className="size-3.5" strokeWidth={2} /> : null}
      {down ? <TrendingDown className="size-3.5" strokeWidth={2} /> : null}
      {signedPct(value)}
    </span>
  );
}

export function StatusPill({ status }: { status: "low" | "ok" | "over" }) {
  const label = status === "low" ? "Below reorder" : status === "over" ? "Overstock" : "Healthy";
  const cls =
    status === "low" ? "bg-down/12 text-down" : status === "over" ? "bg-warn/12 text-warn" : "bg-up/12 text-up";
  return <span className={cn("inline-flex rounded-full px-2 py-0.5 text-xs font-medium", cls)}>{label}</span>;
}
