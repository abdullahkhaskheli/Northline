import { AlertTriangle, Info, OctagonAlert } from "lucide-react";
import type { DashModel } from "@/lib/dashboard/types";
import { useDashStore } from "@/lib/dashboard/store";
import { cn } from "@/lib/utils";
import { Panel } from "./panel";

export function InsightList({ model }: { model: DashModel }) {
  return (
    <Panel title="Smart narrative" hint="Auto-generated from the current slice">
      <ol className="space-y-3">
        {model.narrative.map((line, i) => (
          <li key={i} className="flex gap-3 text-sm leading-snug">
            <span className="mt-0.5 font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
            <span>{line}</span>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

export function AlertList({ model }: { model: DashModel }) {
  const setBranch = useDashStore((s) => s.setBranch);
  return (
    <Panel title="Exceptions" hint={`${model.alerts.length} items need attention`}>
      {model.alerts.length === 0 ? (
        <p className="text-sm text-muted">No material exceptions in this slice.</p>
      ) : (
        <ul className="space-y-2">
          {model.alerts.map((a) => {
            const Icon = a.severity === "high" ? OctagonAlert : a.severity === "medium" ? AlertTriangle : Info;
            const tone =
              a.severity === "high" ? "text-down" : a.severity === "medium" ? "text-warn" : "text-muted";
            return (
              <li key={a.id}>
                <button
                  type="button"
                  disabled={!a.branch}
                  onClick={() => a.branch && setBranch(a.branch)}
                  className={cn(
                    "flex w-full gap-3 rounded-md px-2 py-2 text-left transition-[background-color] duration-150",
                    a.branch && "hover:bg-subtle",
                  )}
                >
                  <Icon className={cn("mt-0.5 size-4 shrink-0", tone)} strokeWidth={2} />
                  <span>
                    <span className="block text-sm font-medium">{a.title}</span>
                    <span className="block text-xs text-muted">{a.detail}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Panel>
  );
}
