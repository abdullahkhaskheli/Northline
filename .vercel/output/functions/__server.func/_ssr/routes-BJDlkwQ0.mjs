import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Store, c as Percent, d as Funnel, f as CircleDollarSign, i as TrendingDown, l as OctagonAlert, n as TriangleAlert, o as RotateCcw, p as Boxes, r as TrendingUp, s as RefreshCw, t as X, u as Info } from "../_libs/lucide-react.mjs";
import { a as DialogPortal, c as Slot, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, s as DialogTrigger, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as Provider } from "../_libs/radix-ui__react-tooltip.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as Pie, n as PieChart, o as Area, p as Legend, r as BarChart, s as CartesianGrid, t as AreaChart, u as Cell } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BJDlkwQ0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var TooltipProvider = Provider;
var REGIONS = [
	"East",
	"West",
	"Central",
	"South"
];
var CATEGORIES = [
	"Furniture",
	"Office Supplies",
	"Technology"
];
var PERIODS = [
	"ytd",
	"l12",
	"fy25",
	"fy24",
	"all"
];
var VIEWS = [
	"overview",
	"sales",
	"inventory",
	"branches"
];
var AS_OF = "2026-09-17";
var AS_OF_LABEL = "17 Sep 2026";
var defaults = {
	view: "overview",
	period: "ytd",
	regions: [...REGIONS],
	categories: [...CATEGORIES],
	branch: null
};
var useDashStore = create((set, get) => ({
	...defaults,
	setView: (view) => set({ view }),
	setPeriod: (period) => set({ period }),
	toggleRegion: (region) => {
		const cur = get().regions;
		if (cur.includes(region)) {
			if (cur.length === 1) return;
			set({
				regions: cur.filter((r) => r !== region),
				branch: null
			});
		} else set({
			regions: [...cur, region],
			branch: null
		});
	},
	setRegions: (regions) => set({
		regions,
		branch: null
	}),
	toggleCategory: (category) => {
		const cur = get().categories;
		if (cur.includes(category)) {
			if (cur.length === 1) return;
			set({ categories: cur.filter((c) => c !== category) });
		} else set({ categories: [...cur, category] });
	},
	setCategories: (categories) => set({ categories }),
	setBranch: (branch) => set((s) => ({ branch: s.branch === branch ? null : branch })),
	reset: () => set({
		...defaults,
		view: get().view
	})
}));
function isFiltered(state) {
	return state.period !== "ytd" || state.branch !== null || state.regions.length !== REGIONS.length || state.categories.length !== CATEGORIES.length;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			secondary: "bg-subtle text-fg hover:bg-border",
			outline: "bg-surface text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "text-fg hover:bg-subtle",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 rounded-sm px-3 text-xs",
			lg: "h-11 px-5",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
		className: cn("fixed inset-0 z-50 bg-fg/30", className),
		...props
	});
}
function SheetContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-sm flex-col bg-bg p-6 shadow-[var(--shadow-border)]", "data-[state=open]:animate-none", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-4 right-4 rounded-sm p-2 text-muted hover:bg-subtle hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mb-4 flex flex-col gap-1 pr-8", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-display text-lg font-medium", className),
		...props
	});
}
var VIEW_LABEL = {
	overview: "Overview",
	sales: "Sales",
	inventory: "Inventory",
	branches: "Branches"
};
var PERIOD_SHORT = {
	ytd: "FY26 YTD",
	l12: "L12M",
	fy25: "FY25",
	fy24: "FY24",
	all: "All"
};
var CAT_SHORT = {
	Furniture: "Furniture",
	"Office Supplies": "Supplies",
	Technology: "Technology"
};
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-9 rounded-full px-3 text-xs font-medium transition-[background-color,color,box-shadow] duration-150", active ? "bg-primary text-primary-foreground" : "bg-surface text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"),
		children
	});
}
function Slicers({ compact = false }) {
	const period = useDashStore((s) => s.period);
	const setPeriod = useDashStore((s) => s.setPeriod);
	const regions = useDashStore((s) => s.regions);
	const toggleRegion = useDashStore((s) => s.toggleRegion);
	const categories = useDashStore((s) => s.categories);
	const toggleCategory = useDashStore((s) => s.toggleCategory);
	const branch = useDashStore((s) => s.branch);
	const setBranch = useDashStore((s) => s.setBranch);
	const reset = useDashStore((s) => s.reset);
	const filtered = useDashStore((s) => isFiltered(s));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col gap-3", compact && "gap-4"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-16 text-xs font-medium text-muted",
					children: "Period"
				}), PERIODS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: period === p,
					onClick: () => setPeriod(p),
					children: PERIOD_SHORT[p]
				}, p))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-16 text-xs font-medium text-muted",
					children: "Region"
				}), REGIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: regions.includes(r),
					onClick: () => toggleRegion(r),
					children: r
				}, r))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-16 text-xs font-medium text-muted",
					children: "Category"
				}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: categories.includes(c),
					onClick: () => toggleCategory(c),
					children: CAT_SHORT[c]
				}, c))]
			}),
			(branch || filtered) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [branch ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setBranch(null),
					className: "inline-flex h-9 items-center gap-1.5 rounded-full bg-subtle px-3 text-xs font-medium",
					children: [branch, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })]
				}) : null, filtered ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: reset,
					className: "h-9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Reset slicers"]
				}) : null]
			})
		]
	});
}
function AppHeader() {
	const view = useDashStore((s) => s.view);
	const setView = useDashStore((s) => s.setView);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-3 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg leading-none font-medium tracking-tight sm:text-xl",
							children: "Northline"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 truncate text-xs text-muted",
							children: ["Sales & inventory · Superstore sample · As of ", AS_OF_LABEL]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden h-9 items-center gap-1.5 rounded-full bg-up/12 px-3 text-xs font-medium text-up sm:inline-flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-up" }), "Live"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								className: "lg:hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "size-4" }), "Slicers"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Report slicers" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slicers, { compact: true })] })] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "-mx-1 flex gap-1 overflow-x-auto pb-1",
					"aria-label": "Report pages",
					children: VIEWS.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setView(v),
						className: cn("h-10 shrink-0 rounded-md px-3 text-sm font-medium transition-[background-color,color] duration-150", view === v ? "bg-subtle text-fg" : "text-muted hover:bg-subtle/70 hover:text-fg"),
						children: VIEW_LABEL[v]
					}, v))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slicers, {})
				})
			]
		})
	});
}
var usdFullFmt = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0
});
new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});
var intFmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
function usd(n) {
	const abs = Math.abs(n);
	const sign = n < 0 ? "-" : "";
	if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(2)}M`;
	if (abs >= 1e4) return `${sign}$${(abs / 1e3).toFixed(1)}K`;
	return usdFullFmt.format(n);
}
function num(n) {
	return intFmt.format(Math.round(n));
}
function pct(n, digits = 1) {
	if (!Number.isFinite(n)) return "—";
	return `${(n * 100).toFixed(digits)}%`;
}
function signedPct(n, digits = 1) {
	if (!Number.isFinite(n)) return "—";
	const v = n * 100;
	return `${v > 0 ? "+" : ""}${v.toFixed(digits)}%`;
}
function delta(cur, prev) {
	if (!prev) return cur ? 1 : 0;
	return (cur - prev) / Math.abs(prev);
}
function monthLabel(yyyymm, style = "short") {
	const y = Math.floor(yyyymm / 100);
	const m = yyyymm % 100;
	const date = new Date(y, m - 1, 1);
	if (style === "full") return date.toLocaleString("en-US", {
		month: "short",
		year: "numeric"
	});
	return date.toLocaleString("en-US", { month: "short" });
}
function monthKey(year, month) {
	return year * 100 + month;
}
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl bg-surface text-fg shadow-[var(--shadow-border)]", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1 px-5 pt-5", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: cn("text-sm font-medium tracking-tight text-fg", className),
		...props
	});
}
function CardDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("text-xs text-muted", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("px-5 pb-5", className),
		...props
	});
}
function Delta({ value, className }) {
	if (!Number.isFinite(value)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("text-muted", className),
		children: "—"
	});
	const up = value > .001;
	const down = value < -.001;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-0.5 tabular-nums", up && "text-up", down && "text-down", !up && !down && "text-muted", className),
		children: [
			up ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, {
				className: "size-3.5",
				strokeWidth: 2
			}) : null,
			down ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, {
				className: "size-3.5",
				strokeWidth: 2
			}) : null,
			signedPct(value)
		]
	});
}
function StatusPill({ status }) {
	const label = status === "low" ? "Below reorder" : status === "over" ? "Overstock" : "Healthy";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex rounded-full px-2 py-0.5 text-xs font-medium", status === "low" ? "bg-down/12 text-down" : status === "over" ? "bg-warn/12 text-warn" : "bg-up/12 text-up"),
		children: label
	});
}
function Sparkline({ values, className, tone = "neutral" }) {
	if (values.length < 2) return null;
	const min = Math.min(...values);
	const span = Math.max(...values) - min || 1;
	const w = 88;
	const h = 28;
	const pts = values.map((v, i) => {
		const x = i / (values.length - 1) * w;
		const y = h - (v - min) / span * 24 - 2;
		return `${x.toFixed(1)},${y.toFixed(1)}`;
	}).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: cn("h-7 w-20", tone === "up" ? "text-up" : tone === "down" ? "text-down" : "text-primary", className),
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinejoin: "round",
			strokeLinecap: "round",
			points: pts
		})
	});
}
var items = [
	{
		key: "sales",
		label: "Net sales",
		icon: CircleDollarSign,
		value: (m) => usd(m.kpis.sales),
		prior: (m) => delta(m.kpis.sales, m.prior.sales),
		spark: (m) => m.monthly.map((x) => x.sales)
	},
	{
		key: "profit",
		label: "Gross profit",
		icon: Store,
		value: (m) => usd(m.kpis.profit),
		prior: (m) => delta(m.kpis.profit, m.prior.profit),
		spark: (m) => m.monthly.map((x) => x.profit)
	},
	{
		key: "margin",
		label: "Margin",
		icon: Percent,
		value: (m) => pct(m.kpis.margin),
		prior: (m) => m.kpis.margin - m.prior.margin,
		spark: (m) => m.monthly.map((x) => x.sales ? x.profit / x.sales : 0)
	},
	{
		key: "turns",
		label: "Inventory turns",
		icon: RefreshCw,
		value: (m) => `${m.kpis.turns.toFixed(1)}×`,
		prior: (m) => delta(m.kpis.turns, m.prior.turns),
		note: (m) => `${Math.round(m.kpis.daysOnHand)} days on hand`
	},
	{
		key: "stock",
		label: "Inventory value",
		icon: Boxes,
		value: (m) => usd(m.kpis.inventoryValue),
		note: (m) => `${num(m.kpis.units)} units sold`
	},
	{
		key: "risk",
		label: "At-risk positions",
		icon: TriangleAlert,
		value: (m) => num(m.kpis.atRisk),
		note: (m) => m.kpis.plan ? `${pct(m.kpis.sales / m.kpis.plan, 0)} of plan` : "vs reorder point"
	}
];
function KpiStrip({ model }) {
	const hasPrior = model.prior.sales > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6",
		children: items.map((item) => {
			const Icon = item.icon;
			const d = "prior" in item ? item.prior(model) : NaN;
			const tone = Number.isFinite(d) ? d >= 0 ? "up" : "down" : "neutral";
			const spark = "spark" in item ? item.spark(model) : [];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "stagger-in px-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted",
							children: item.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-3.5 text-faint",
							strokeWidth: 2
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-2xl leading-none font-medium tracking-tight tabular-nums",
						children: item.value(model)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-end justify-between gap-2",
						children: [hasPrior && Number.isFinite(d) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delta, {
							value: d,
							className: "text-xs"
						}) : "note" in item ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: item.note(model)
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: model.rangeLabel
						}), spark.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, {
							values: spark,
							tone
						}) : null]
					}),
					hasPrior && "note" in item ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-faint",
						children: item.note(model)
					}) : null
				]
			}, item.key);
		})
	});
}
var tickStyle = {
	fill: "var(--color-muted)",
	fontSize: 11,
	fontFamily: "var(--font-sans)"
};
var chartMargin = {
	top: 6,
	right: 8,
	left: 4,
	bottom: 0
};
var REGION_COLOR = {
	East: "var(--color-chart-1)",
	West: "var(--color-chart-2)",
	Central: "var(--color-chart-3)",
	South: "var(--color-chart-4)"
};
var CATEGORY_COLOR = {
	Furniture: "var(--color-chart-3)",
	"Office Supplies": "var(--color-chart-2)",
	Technology: "var(--color-chart-1)"
};
function Panel({ title, hint, action, children, className, bodyClassName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: cn("flex min-h-0 flex-col", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "flex-row items-start justify-between gap-3 space-y-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: title }), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
					className: "mt-0.5",
					children: hint
				}) : null]
			}), action]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: cn("pt-3", bodyClassName),
			children
		})]
	});
}
function formatTip(name, value) {
	if (name === "Turns") return `${value}×`;
	if ([
		"Healthy",
		"Below reorder",
		"Overstock",
		"Days on hand"
	].includes(name)) return num(value);
	return usd(value);
}
function Tip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-elevated px-3 py-2 text-xs shadow-[var(--shadow-border)]",
		children: [label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1 font-medium",
			children: label
		}) : null, payload.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex items-center justify-between gap-6 tabular-nums text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-fg",
				children: formatTip(p.name, p.value)
			})]
		}, p.name))]
	});
}
function SalesTrend({ model }) {
	const data = model.monthly.map((m) => ({
		label: m.label,
		Sales: Math.round(m.sales),
		"Prior year": Math.round(m.priorSales),
		Plan: Math.round(m.plan)
	}));
	const hasPrior = data.some((d) => d["Prior year"] > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Sales trend",
		hint: hasPrior ? `${model.rangeLabel} vs prior year` : model.rangeLabel,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-56 w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data,
				margin: chartMargin,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "salesFill",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "var(--color-chart-1)",
							stopOpacity: .28
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "var(--color-chart-1)",
							stopOpacity: .02
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						vertical: false,
						stroke: "var(--color-border)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: tickStyle,
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: tickStyle,
						axisLine: false,
						tickLine: false,
						width: 48,
						tickFormatter: (v) => usd(v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {}) }),
					hasPrior ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "Prior year",
						stroke: "var(--color-chart-5)",
						fill: "none",
						strokeDasharray: "4 4",
						strokeWidth: 1.5,
						dot: false
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "Sales",
						stroke: "var(--color-chart-1)",
						fill: "url(#salesFill)",
						strokeWidth: 2,
						dot: false,
						activeDot: {
							r: 3,
							fill: "var(--color-chart-1)"
						}
					})
				]
			}) })
		})
	});
}
function RegionBars({ model }) {
	const setRegions = useDashStore((s) => s.setRegions);
	const selected = useDashStore((s) => s.regions);
	const data = model.regions.map((r) => ({
		name: r.region,
		Sales: Math.round(r.sales),
		vsPrior: r.vsPrior,
		share: r.share
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Sales by region",
		hint: "Click a bar to slice the report",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-56 w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				margin: chartMargin,
				barCategoryGap: "28%",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						vertical: false,
						stroke: "var(--color-border)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "name",
						tick: tickStyle,
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: tickStyle,
						axisLine: false,
						tickLine: false,
						width: 48,
						tickFormatter: (v) => usd(v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "Sales",
						radius: [
							6,
							6,
							0,
							0
						],
						cursor: "pointer",
						onClick: (d) => {
							const region = d.name;
							if (!region) return;
							if (selected.length === 1 && selected[0] === region) setRegions([...REGIONS]);
							else setRegions([region]);
						},
						children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
							fill: REGION_COLOR[d.name],
							opacity: selected.includes(d.name) ? 1 : .35
						}, d.name))
					})
				]
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs",
			children: model.regions.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between tabular-nums",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: r.region
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delta, { value: r.vsPrior })]
			}, r.region))
		})]
	});
}
function CategoryMix({ model }) {
	const setCategories = useDashStore((s) => s.setCategories);
	const selected = useDashStore((s) => s.categories);
	const data = model.categories.map((c) => ({
		name: c.category,
		value: Math.round(c.sales),
		share: c.share,
		margin: c.margin
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Category mix",
		hint: "Click a slice to filter",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-56 items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full min-w-0 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
					data,
					dataKey: "value",
					nameKey: "name",
					innerRadius: "58%",
					outerRadius: "82%",
					paddingAngle: 2,
					cursor: "pointer",
					onClick: (_, i) => {
						const cat = data[i]?.name;
						if (!cat) return;
						if (selected.length === 1 && selected[0] === cat) setCategories([...CATEGORIES]);
						else setCategories([cat]);
					},
					children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
						fill: CATEGORY_COLOR[d.name],
						opacity: selected.includes(d.name) ? 1 : .35,
						stroke: "var(--color-surface)",
						strokeWidth: 2
					}, d.name))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {}) })] }) })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "w-36 shrink-0 space-y-2 text-xs",
				children: model.categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-1.5 font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-2 rounded-full",
						style: { background: CATEGORY_COLOR[c.category] }
					}), c.category === "Office Supplies" ? "Supplies" : c.category]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "pl-3.5 tabular-nums text-muted",
					children: [
						usd(c.sales),
						" · ",
						pct(c.margin)
					]
				})] }, c.category))
			})]
		})
	});
}
function SubcategoryBars({ model }) {
	const data = model.subcategories.map((s) => ({
		name: s.subcategory,
		Sales: Math.round(s.sales),
		Profit: Math.round(s.profit),
		category: s.category
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Sub-category performance",
		hint: "Sales and profit",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-72 w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				layout: "vertical",
				margin: {
					...chartMargin,
					left: 8
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						horizontal: false,
						stroke: "var(--color-border)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						type: "number",
						tick: tickStyle,
						axisLine: false,
						tickLine: false,
						tickFormatter: (v) => usd(v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						type: "category",
						dataKey: "name",
						tick: tickStyle,
						axisLine: false,
						tickLine: false,
						width: 92
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
						fontSize: 12,
						color: "var(--color-muted)"
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "Sales",
						fill: "var(--color-chart-1)",
						radius: [
							0,
							4,
							4,
							0
						],
						barSize: 8
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "Profit",
						fill: "var(--color-chart-2)",
						radius: [
							0,
							4,
							4,
							0
						],
						barSize: 8
					})
				]
			}) })
		})
	});
}
function InventoryHealth({ model }) {
	const data = model.branches.map((b) => {
		const rows = model.inventory.filter((i) => i.branch === b.branch);
		return {
			name: b.branch,
			Healthy: rows.filter((r) => r.status === "ok").length,
			"Below reorder": rows.filter((r) => r.status === "low").length,
			Overstock: rows.filter((r) => r.status === "over").length
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Stock health by branch",
		hint: "SKU positions vs reorder",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-72 w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				margin: chartMargin,
				barCategoryGap: "24%",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						vertical: false,
						stroke: "var(--color-border)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "name",
						tick: tickStyle,
						axisLine: false,
						tickLine: false,
						interval: 0,
						angle: -28,
						textAnchor: "end",
						height: 56
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: tickStyle,
						axisLine: false,
						tickLine: false,
						width: 28,
						allowDecimals: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
						fontSize: 12,
						color: "var(--color-muted)"
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "Healthy",
						stackId: "a",
						fill: "var(--color-up)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "Below reorder",
						stackId: "a",
						fill: "var(--color-down)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "Overstock",
						stackId: "a",
						fill: "var(--color-warn)",
						radius: [
							4,
							4,
							0,
							0
						]
					})
				]
			}) })
		})
	});
}
function TurnoverBars({ model }) {
	const data = model.categories.map((c) => {
		const value = model.inventory.filter((i) => i.category === c.category).reduce((s, i) => s + i.value, 0);
		const days = model.days || 1;
		const annualCogs = (c.sales - c.profit) * (365 / days);
		const turns = value ? annualCogs / value : 0;
		return {
			name: c.category === "Office Supplies" ? "Supplies" : c.category,
			Turns: Number(turns.toFixed(1)),
			"Days on hand": turns ? Math.round(365 / turns) : 0
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Inventory turnover",
		hint: "Annualized COGS / on-hand value",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-56 w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				margin: chartMargin,
				barCategoryGap: "32%",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						vertical: false,
						stroke: "var(--color-border)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "name",
						tick: tickStyle,
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: tickStyle,
						axisLine: false,
						tickLine: false,
						width: 28
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload, label }) => {
						if (!active || !payload?.length) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md bg-elevated px-3 py-2 text-xs shadow-[var(--shadow-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-1 font-medium",
								children: label
							}), payload.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "tabular-nums text-muted",
								children: [
									p.name,
									": ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-fg",
										children: p.name === "Turns" ? `${p.value}×` : num(Number(p.value))
									})
								]
							}, String(p.name)))]
						});
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "Turns",
						fill: "var(--color-chart-1)",
						radius: [
							6,
							6,
							0,
							0
						]
					})
				]
			}) })
		})
	});
}
function SegmentMix({ model }) {
	const data = model.segments.map((s) => ({
		name: s.segment,
		value: Math.round(s.sales)
	}));
	const colors = [
		"var(--color-chart-1)",
		"var(--color-chart-2)",
		"var(--color-chart-3)"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Customer segment",
		hint: "Share of net sales",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-56 w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
					data,
					dataKey: "value",
					nameKey: "name",
					innerRadius: "56%",
					outerRadius: "80%",
					paddingAngle: 2,
					children: data.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
						fill: colors[i % colors.length],
						stroke: "var(--color-surface)",
						strokeWidth: 2
					}, d.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
					fontSize: 12,
					color: "var(--color-muted)"
				} })
			] }) })
		})
	});
}
function InsightList({ model }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Smart narrative",
		hint: "Auto-generated from the current slice",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-3",
			children: model.narrative.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-3 text-sm leading-snug",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-0.5 font-mono text-xs text-faint",
					children: String(i + 1).padStart(2, "0")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: line })]
			}, i))
		})
	});
}
function AlertList({ model }) {
	const setBranch = useDashStore((s) => s.setBranch);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Exceptions",
		hint: `${model.alerts.length} items need attention`,
		children: model.alerts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "No material exceptions in this slice."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-2",
			children: model.alerts.map((a) => {
				const Icon = a.severity === "high" ? OctagonAlert : a.severity === "medium" ? TriangleAlert : Info;
				const tone = a.severity === "high" ? "text-down" : a.severity === "medium" ? "text-warn" : "text-muted";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: !a.branch,
					onClick: () => a.branch && setBranch(a.branch),
					className: cn("flex w-full gap-3 rounded-md px-2 py-2 text-left transition-[background-color] duration-150", a.branch && "hover:bg-subtle"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: cn("mt-0.5 size-4 shrink-0", tone),
						strokeWidth: 2
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm font-medium",
						children: a.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs text-muted",
						children: a.detail
					})] })]
				}) }, a.id);
			})
		})
	});
}
function BranchTable({ model, compact = false }) {
	const setBranch = useDashStore((s) => s.setBranch);
	const active = useDashStore((s) => s.branch);
	const rows = compact ? model.branches.slice(0, 8) : model.branches;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Branch scorecard",
		hint: "Click a row to isolate that branch",
		bodyClassName: "overflow-x-auto px-0 pb-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[720px] text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "text-xs text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-2 font-medium",
							children: "Branch"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 font-medium",
							children: "Region"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "Sales"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "vs LY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "vs Plan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "Margin"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "Turns"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-2 text-right font-medium",
							children: "At risk"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: cn("cursor-pointer border-b border-border/70 last:border-0 hover:bg-subtle/70", active === b.branch && "bg-subtle"),
				onClick: () => setBranch(b.branch),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-5 py-2.5 font-medium",
						children: b.branch
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2.5 text-muted",
						children: b.region
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2.5 text-right tabular-nums",
						children: usd(b.sales)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2.5 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delta, {
							value: b.vsPrior,
							className: "justify-end text-sm"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2.5 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delta, {
							value: b.vsPlan,
							className: "justify-end text-sm"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2.5 text-right tabular-nums",
						children: pct(b.margin)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "px-3 py-2.5 text-right tabular-nums",
						children: [b.turns.toFixed(1), "×"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-5 py-2.5 text-right tabular-nums",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: b.atRisk ? "text-down" : "text-muted",
							children: b.atRisk
						})
					})
				]
			}, b.branch)) })]
		})
	});
}
function ProductTable({ model }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Top products",
		hint: "Ranked by net sales",
		bodyClassName: "overflow-x-auto px-0 pb-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[680px] text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "text-xs text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-2 font-medium",
							children: "Product"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 font-medium",
							children: "Category"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "Sales"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "Units"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "Profit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "Margin"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-2 text-right font-medium",
							children: "Discount"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: model.products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border/70 last:border-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "px-5 py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: p.product
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-faint",
							children: p.sku
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2.5 text-muted",
						children: p.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2.5 text-right tabular-nums",
						children: usd(p.sales)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2.5 text-right tabular-nums",
						children: num(p.units)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cn("px-3 py-2.5 text-right tabular-nums", p.profit < 0 && "text-down"),
						children: usd(p.profit)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cn("px-3 py-2.5 text-right tabular-nums", p.margin < 0 && "text-down"),
						children: pct(p.margin)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-5 py-2.5 text-right tabular-nums",
						children: pct(p.discount)
					})
				]
			}, p.sku)) })]
		})
	});
}
function InventoryTable({ model }) {
	const rows = model.inventory.filter((i) => i.status !== "ok").concat(model.inventory.filter((i) => i.status === "ok").slice(0, 8));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Inventory positions",
		hint: "Exceptions first, then largest remaining balances",
		bodyClassName: "overflow-x-auto px-0 pb-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[760px] text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "text-xs text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-2 font-medium",
							children: "SKU"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 font-medium",
							children: "Branch"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "On hand"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "Reorder"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "Days"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "Value"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-2 text-right font-medium",
							children: "Status"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.slice(0, 18).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border/70 last:border-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "px-5 py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: i.product
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-faint",
							children: i.sku
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2.5 text-muted",
						children: i.branch
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2.5 text-right tabular-nums",
						children: num(i.onHand)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2.5 text-right tabular-nums text-muted",
						children: num(i.reorderPoint)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2.5 text-right tabular-nums",
						children: Math.round(i.daysOnHand)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2.5 text-right tabular-nums",
						children: usd(i.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-5 py-2.5 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: i.status })
					})
				]
			}, `${i.sku}-${i.branch}`)) })]
		})
	});
}
function OverviewView({ model }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiStrip, { model }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalesTrend, { model })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegionBars, { model })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryMix, { model }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightList, { model }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertList, { model })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BranchTable, {
				model,
				compact: true
			})
		]
	});
}
function SalesView({ model }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiStrip, { model }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalesTrend, { model })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentMix, { model })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubcategoryBars, { model }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryMix, { model })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductTable, { model })
		]
	});
}
function InventoryView({ model }) {
	const low = model.inventory.filter((i) => i.status === "low").length;
	const over = model.inventory.filter((i) => i.status === "over").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"On-hand value ",
					usd(model.kpis.inventoryValue),
					" · ",
					model.kpis.turns.toFixed(1),
					"× annualized turnover ·",
					" ",
					low,
					" below reorder · ",
					over,
					" overstocked"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TurnoverBars, { model }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InventoryHealth, { model })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InventoryTable, { model })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertList, { model })]
			})
		]
	});
}
function BranchesView({ model }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegionBars, { model })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightList, { model })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BranchTable, { model })]
	});
}
function mulberry32(seed) {
	return () => {
		let t = seed += 1831565813;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
var BRANCHES = [
	{
		branch: "New York",
		region: "East",
		weight: 1.34
	},
	{
		branch: "Boston",
		region: "East",
		weight: .96
	},
	{
		branch: "Philadelphia",
		region: "East",
		weight: .84
	},
	{
		branch: "Los Angeles",
		region: "West",
		weight: 1.28
	},
	{
		branch: "Seattle",
		region: "West",
		weight: 1.04
	},
	{
		branch: "Denver",
		region: "West",
		weight: .8
	},
	{
		branch: "Chicago",
		region: "Central",
		weight: 1.1
	},
	{
		branch: "Dallas",
		region: "Central",
		weight: .94
	},
	{
		branch: "Atlanta",
		region: "South",
		weight: .88
	},
	{
		branch: "Miami",
		region: "South",
		weight: .76
	}
];
var PRODUCTS = [
	{
		sku: "FUR-CH-1001",
		product: "Hon Executive Chair",
		category: "Furniture",
		subcategory: "Chairs",
		unitCost: 210,
		listPrice: 389
	},
	{
		sku: "FUR-CH-1002",
		product: "Global Task Chair",
		category: "Furniture",
		subcategory: "Chairs",
		unitCost: 92,
		listPrice: 169
	},
	{
		sku: "FUR-TA-1003",
		product: "Bush Conference Table",
		category: "Furniture",
		subcategory: "Tables",
		unitCost: 430,
		listPrice: 499
	},
	{
		sku: "FUR-TA-1004",
		product: "Bevis Round Table",
		category: "Furniture",
		subcategory: "Tables",
		unitCost: 248,
		listPrice: 279
	},
	{
		sku: "FUR-BO-1005",
		product: "Safco Steel Bookcase",
		category: "Furniture",
		subcategory: "Bookcases",
		unitCost: 118,
		listPrice: 210
	},
	{
		sku: "FUR-FU-1006",
		product: "DMI Reception Desk",
		category: "Furniture",
		subcategory: "Furnishings",
		unitCost: 340,
		listPrice: 560
	},
	{
		sku: "OFF-BI-2001",
		product: "Acco Economy Binders",
		category: "Office Supplies",
		subcategory: "Binders",
		unitCost: 4.2,
		listPrice: 9.5
	},
	{
		sku: "OFF-BI-2002",
		product: "Wilson Jones Binder",
		category: "Office Supplies",
		subcategory: "Binders",
		unitCost: 7.8,
		listPrice: 16.4
	},
	{
		sku: "OFF-PA-2003",
		product: "Xerox Copy Paper",
		category: "Office Supplies",
		subcategory: "Paper",
		unitCost: 8.5,
		listPrice: 19.9
	},
	{
		sku: "OFF-LA-2004",
		product: "Avery Shipping Labels",
		category: "Office Supplies",
		subcategory: "Labels",
		unitCost: 3.1,
		listPrice: 8.4
	},
	{
		sku: "OFF-ST-2005",
		product: "Fellowes Binding Machine",
		category: "Office Supplies",
		subcategory: "Appliances",
		unitCost: 142,
		listPrice: 249
	},
	{
		sku: "OFF-AR-2006",
		product: "Sanford Highlighters",
		category: "Office Supplies",
		subcategory: "Art",
		unitCost: 1.8,
		listPrice: 5.6
	},
	{
		sku: "TEC-PH-3001",
		product: "Cisco IP Phone",
		category: "Technology",
		subcategory: "Phones",
		unitCost: 168,
		listPrice: 189
	},
	{
		sku: "TEC-PH-3002",
		product: "Apple Smart Watch",
		category: "Technology",
		subcategory: "Phones",
		unitCost: 242,
		listPrice: 399
	},
	{
		sku: "TEC-CO-3003",
		product: "Canon ImageRunner Copier",
		category: "Technology",
		subcategory: "Copiers",
		unitCost: 890,
		listPrice: 1640
	},
	{
		sku: "TEC-PR-3004",
		product: "HP LaserJet Printer",
		category: "Technology",
		subcategory: "Machines",
		unitCost: 186,
		listPrice: 329
	},
	{
		sku: "TEC-AC-3005",
		product: "Logitech Webcam",
		category: "Technology",
		subcategory: "Accessories",
		unitCost: 28,
		listPrice: 69
	},
	{
		sku: "TEC-AC-3006",
		product: "Samsung 27in Monitor",
		category: "Technology",
		subcategory: "Accessories",
		unitCost: 142,
		listPrice: 259
	}
];
var PRODUCT_SHARE = {
	"FUR-CH-1001": .22,
	"FUR-CH-1002": .2,
	"FUR-TA-1003": .16,
	"FUR-TA-1004": .12,
	"FUR-BO-1005": .14,
	"FUR-FU-1006": .16,
	"OFF-BI-2001": .22,
	"OFF-BI-2002": .14,
	"OFF-PA-2003": .24,
	"OFF-LA-2004": .1,
	"OFF-ST-2005": .18,
	"OFF-AR-2006": .12,
	"TEC-PH-3001": .16,
	"TEC-PH-3002": .18,
	"TEC-CO-3003": .2,
	"TEC-PR-3004": .16,
	"TEC-AC-3005": .12,
	"TEC-AC-3006": .18
};
var CAT_SHARE = {
	Furniture: .32,
	"Office Supplies": .27,
	Technology: .41
};
var SEASON = [
	.82,
	.78,
	.94,
	.96,
	.99,
	1.03,
	.95,
	1.06,
	1.12,
	1.08,
	1.3,
	1.38
];
var YEAR_GROWTH = {
	2024: 1,
	2025: 1.09,
	2026: 1.17
};
var SEGMENT_SHARE = [
	{
		segment: "Consumer",
		share: .51
	},
	{
		segment: "Corporate",
		share: .31
	},
	{
		segment: "Home Office",
		share: .18
	}
];
var BRANCH_WEIGHT_SUM = BRANCHES.reduce((s, b) => s + b.weight, 0);
function extraDiscount(sku, region, rng) {
	let d = .04 + rng() * .06;
	if (sku.startsWith("FUR-TA")) d += .14;
	if (sku === "TEC-PH-3001") d += .12;
	if (sku.startsWith("OFF-BI")) d += .08;
	if (region === "Central") d += .05;
	if (region === "South") d += .02;
	return Math.min(.42, d);
}
function generateSales() {
	const rng = mulberry32(20260917);
	const rows = [];
	const [asY, asM, asD] = AS_OF.split("-").map(Number);
	const baseMonthly = 395e3;
	for (let year = 2024; year <= 2026; year++) {
		const lastMonth = year === 2026 ? asM : 12;
		for (let month = 1; month <= lastMonth; month++) {
			let monthScale = SEASON[month - 1] * (YEAR_GROWTH[year] ?? 1);
			if (year === asY && month === asM) monthScale *= asD / 30;
			const monthTotal = baseMonthly * monthScale;
			const yyyymm = monthKey(year, month);
			for (const b of BRANCHES) {
				const branchTotal = monthTotal * (b.weight / BRANCH_WEIGHT_SUM);
				for (const p of PRODUCTS) {
					const share = (CAT_SHARE[p.category] ?? .3) * (PRODUCT_SHARE[p.sku] ?? .1);
					const noise = .82 + rng() * .36;
					const demand = branchTotal * share * noise;
					const units = Math.max(1, Math.round(demand / p.listPrice));
					const discount = extraDiscount(p.sku, b.region, rng);
					const sales = units * p.listPrice * (1 - discount);
					const cogs = units * p.unitCost;
					const profit = sales - cogs;
					const orders = Math.max(1, Math.round(units / (2.2 + rng() * 2.4)));
					const segRoll = rng();
					let acc = 0;
					let segment = "Consumer";
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
						orders
					});
				}
			}
		}
	}
	return rows;
}
function trailingDaily(sales, sku, branch) {
	const cutoff = 202607;
	let units = 0;
	for (const r of sales) if (r.sku === sku && r.branch === branch && r.month >= cutoff) units += r.units;
	return units / 78;
}
function generateInventory(sales) {
	const rng = mulberry32(9172026);
	const rows = [];
	const targetDays = {
		Furniture: 52,
		"Office Supplies": 28,
		Technology: 34
	};
	for (const b of BRANCHES) for (const p of PRODUCTS) {
		const daily = Math.max(.05, trailingDaily(sales, p.sku, b.branch));
		const target = targetDays[p.category] ?? 40;
		let factor = .7 + rng() * .7;
		if (b.branch === "Miami" && p.sku === "TEC-CO-3003") factor = .18;
		if (b.branch === "Miami" && p.sku === "TEC-PH-3002") factor = .22;
		if (b.branch === "Dallas" && p.sku === "FUR-CH-1001") factor = .2;
		if (b.branch === "Dallas" && p.sku === "OFF-ST-2005") factor = .15;
		if (b.branch === "Chicago" && p.sku === "TEC-PR-3004") factor = 0;
		if (b.branch === "Denver" && p.category === "Furniture") factor = 1.85;
		if (b.branch === "Boston" && p.sku === "OFF-PA-2003") factor = .25;
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
			unitCost: p.unitCost
		});
	}
	return rows;
}
var SALES = generateSales();
var INVENTORY = generateInventory(SALES);
var AS_PARTS = AS_OF.split("-").map(Number);
var AS_Y = AS_PARTS[0];
var AS_M = AS_PARTS[1];
var AS_D = AS_PARTS[2];
var AS_MONTH = monthKey(AS_Y, AS_M);
function daysInMonth(year, month) {
	return new Date(year, month, 0).getDate();
}
function daysBetween(start, end) {
	const sy = Math.floor(start / 100);
	const sm = start % 100;
	const ey = Math.floor(end / 100);
	const em = end % 100;
	let days = 0;
	let y = sy;
	let m = sm;
	while (y < ey || y === ey && m <= em) {
		const dim = daysInMonth(y, m);
		if (monthKey(y, m) === AS_MONTH && end >= AS_MONTH) days += Math.min(AS_D, dim);
		else days += dim;
		m += 1;
		if (m > 12) {
			m = 1;
			y += 1;
		}
	}
	return Math.max(1, days);
}
function periodRange(period) {
	switch (period) {
		case "ytd": return {
			start: monthKey(AS_Y, 1),
			end: AS_MONTH,
			priorStart: monthKey(AS_Y - 1, 1),
			priorEnd: monthKey(AS_Y - 1, AS_M),
			label: `Jan–${monthLabel(AS_MONTH)} ${AS_Y}`,
			priorLabel: `Jan–${monthLabel(AS_MONTH)} ${AS_Y - 1}`
		};
		case "l12": {
			let m = AS_M - 11;
			let y = AS_Y;
			if (m <= 0) {
				m += 12;
				y -= 1;
			}
			return {
				start: monthKey(y, m),
				end: AS_MONTH,
				priorStart: monthKey(y - 1, m),
				priorEnd: monthKey(AS_Y - 1, AS_M),
				label: "Last 12 months",
				priorLabel: "Prior 12 months"
			};
		}
		case "fy25": return {
			start: 202501,
			end: 202512,
			priorStart: 202401,
			priorEnd: 202412,
			label: "FY 2025",
			priorLabel: "FY 2024"
		};
		case "fy24": return {
			start: 202401,
			end: 202412,
			priorStart: null,
			priorEnd: null,
			label: "FY 2024",
			priorLabel: "—"
		};
		default: return {
			start: 202401,
			end: AS_MONTH,
			priorStart: null,
			priorEnd: null,
			label: "Jan 2024 – Sep 2026",
			priorLabel: "—"
		};
	}
}
function inRange(month, start, end) {
	return month >= start && month <= end;
}
function matchesDim(row, filters) {
	if (filters.regions.length && !filters.regions.includes(row.region)) return false;
	if (filters.categories.length && !filters.categories.includes(row.category)) return false;
	if (filters.branch && row.branch !== filters.branch) return false;
	return true;
}
function emptyKpis() {
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
		plan: 0
	};
}
function finishKpis(k, days, inventoryValue, atRisk, plan) {
	k.margin = k.sales ? k.profit / k.sales : 0;
	k.discount = k.orders ? k.discount : 0;
	k.inventoryValue = inventoryValue;
	k.atRisk = atRisk;
	k.plan = plan;
	const annualCogs = days ? k.cogs / days * 365 : 0;
	k.turns = inventoryValue ? annualCogs / inventoryValue : 0;
	k.daysOnHand = k.turns ? 365 / k.turns : 0;
	return k;
}
function sumSales(rows, start, end) {
	let s = 0;
	for (const r of rows) if (inRange(r.month, start, end)) s += r.sales;
	return s;
}
function buildModel(filters) {
	const range = periodRange(filters.period);
	const days = daysBetween(range.start, range.end);
	const regions = filters.regions.length ? filters.regions : [...REGIONS];
	const categories = filters.categories.length ? filters.categories : [...CATEGORIES];
	const scoped = SALES.filter((r) => matchesDim(r, filters));
	const current = scoped.filter((r) => inRange(r.month, range.start, range.end));
	const prior = range.priorStart && range.priorEnd ? scoped.filter((r) => inRange(r.month, range.priorStart, range.priorEnd)) : [];
	const stock = INVENTORY.filter((s) => {
		if (!regions.includes(s.region)) return false;
		if (!categories.includes(s.category)) return false;
		if (filters.branch && s.branch !== filters.branch) return false;
		return true;
	});
	const dailyByKey = /* @__PURE__ */ new Map();
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
	const inventory = stock.map((s) => {
		const avgDaily = (dailyByKey.get(`${s.sku}|${s.branch}`) ?? 0) / lookbackDays;
		const daysOnHand = avgDaily > .01 ? s.onHand / avgDaily : s.onHand > 0 ? 180 : 0;
		const value = s.onHand * s.unitCost;
		let status = "ok";
		if (s.onHand <= s.reorderPoint) status = "low";
		else if (daysOnHand > 70) status = "over";
		return {
			...s,
			value,
			avgDaily,
			daysOnHand,
			status
		};
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
	const plan = priorKpis.sales ? priorKpis.sales * planRate : kpis.sales * .95;
	finishKpis(kpis, days, inventoryValue, atRisk, plan);
	finishKpis(priorKpis, range.priorStart && range.priorEnd ? daysBetween(range.priorStart, range.priorEnd) : days, inventoryValue, atRisk, plan);
	const monthSet = /* @__PURE__ */ new Set();
	for (const r of current) monthSet.add(r.month);
	const months = [...monthSet].sort((a, b) => a - b);
	const monthly = months.map((m) => {
		let sales = 0;
		let profit = 0;
		let units = 0;
		for (const r of current) if (r.month === m) {
			sales += r.sales;
			profit += r.profit;
			units += r.units;
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
			plan: priorSales ? priorSales * planRate : sales * .95
		};
	});
	const regionMap = /* @__PURE__ */ new Map();
	for (const region of REGIONS) regionMap.set(region, {
		region,
		sales: 0,
		profit: 0,
		margin: 0,
		share: 0,
		vsPrior: 0
	});
	for (const r of current) {
		const p = regionMap.get(r.region);
		p.sales += r.sales;
		p.profit += r.profit;
	}
	const priorRegion = /* @__PURE__ */ new Map();
	for (const r of prior) priorRegion.set(r.region, (priorRegion.get(r.region) ?? 0) + r.sales);
	const regionPoints = [...regionMap.values()].map((p) => ({
		...p,
		margin: p.sales ? p.profit / p.sales : 0,
		share: kpis.sales ? p.sales / kpis.sales : 0,
		vsPrior: delta(p.sales, priorRegion.get(p.region) ?? 0)
	}));
	const branchNames = [...new Set(scoped.map((r) => r.branch))];
	const branchMap = /* @__PURE__ */ new Map();
	for (const name of branchNames) {
		const region = current.find((r) => r.branch === name)?.region ?? scoped.find((r) => r.branch === name)?.region ?? "East";
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
			inventoryValue: 0
		});
	}
	for (const r of current) {
		const p = branchMap.get(r.branch);
		if (!p) continue;
		p.sales += r.sales;
		p.profit += r.profit;
		p.units += r.units;
	}
	const branchCogs = /* @__PURE__ */ new Map();
	for (const r of current) branchCogs.set(r.branch, (branchCogs.get(r.branch) ?? 0) + r.cogs);
	const priorBranch = /* @__PURE__ */ new Map();
	for (const r of prior) priorBranch.set(r.branch, (priorBranch.get(r.branch) ?? 0) + r.sales);
	for (const inv of inventory) {
		const p = branchMap.get(inv.branch);
		if (!p) continue;
		p.inventoryValue += inv.value;
		if (inv.status === "low") p.atRisk += 1;
	}
	const branches = [...branchMap.values()].map((p) => {
		const priorSales = priorBranch.get(p.branch) ?? 0;
		const bPlan = priorSales ? priorSales * planRate : p.sales * .95;
		const cogs = branchCogs.get(p.branch) ?? 0;
		const annual = days ? cogs / days * 365 : 0;
		return {
			...p,
			margin: p.sales ? p.profit / p.sales : 0,
			plan: bPlan,
			vsPrior: delta(p.sales, priorSales),
			vsPlan: delta(p.sales, bPlan),
			turns: p.inventoryValue ? annual / p.inventoryValue : 0
		};
	}).sort((a, b) => b.sales - a.sales);
	const catMap = /* @__PURE__ */ new Map();
	for (const c of CATEGORIES) catMap.set(c, {
		category: c,
		sales: 0,
		profit: 0,
		margin: 0,
		units: 0,
		share: 0,
		vsPrior: 0
	});
	for (const r of current) {
		const p = catMap.get(r.category);
		p.sales += r.sales;
		p.profit += r.profit;
		p.units += r.units;
	}
	const priorCat = /* @__PURE__ */ new Map();
	for (const r of prior) priorCat.set(r.category, (priorCat.get(r.category) ?? 0) + r.sales);
	const categoryPoints = [...catMap.values()].map((p) => ({
		...p,
		margin: p.sales ? p.profit / p.sales : 0,
		share: kpis.sales ? p.sales / kpis.sales : 0,
		vsPrior: delta(p.sales, priorCat.get(p.category) ?? 0)
	}));
	const subMap = /* @__PURE__ */ new Map();
	for (const r of current) {
		const cur = subMap.get(r.subcategory) ?? {
			subcategory: r.subcategory,
			category: r.category,
			sales: 0,
			profit: 0,
			margin: 0,
			units: 0
		};
		cur.sales += r.sales;
		cur.profit += r.profit;
		cur.units += r.units;
		subMap.set(r.subcategory, cur);
	}
	const subcategories = [...subMap.values()].map((p) => ({
		...p,
		margin: p.sales ? p.profit / p.sales : 0
	})).sort((a, b) => b.sales - a.sales);
	const prodMap = /* @__PURE__ */ new Map();
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
			disc: 0
		};
		cur.sales += r.sales;
		cur.profit += r.profit;
		cur.units += r.units;
		cur.cogs += r.cogs;
		cur.disc += r.discount * r.sales;
		prodMap.set(r.sku, cur);
	}
	const products = [...prodMap.values()].map((p) => ({
		sku: p.sku,
		product: p.product,
		category: p.category,
		subcategory: p.subcategory,
		sales: p.sales,
		profit: p.profit,
		margin: p.sales ? p.profit / p.sales : 0,
		units: p.units,
		discount: p.sales ? p.disc / p.sales : 0,
		cogs: p.cogs
	})).sort((a, b) => b.sales - a.sales);
	const segMap = /* @__PURE__ */ new Map();
	for (const r of current) segMap.set(r.segment, (segMap.get(r.segment) ?? 0) + r.sales);
	const segments = [...segMap.entries()].map(([segment, sales]) => ({
		segment,
		sales,
		share: kpis.sales ? sales / kpis.sales : 0
	}));
	const alerts = buildAlerts({
		kpis,
		prior: priorKpis,
		branches,
		inventory,
		products,
		categoryPoints
	});
	const narrative = buildNarrative({
		kpis,
		prior: priorKpis,
		rangeLabel: range.label,
		regionPoints,
		categoryPoints,
		branches,
		inventory,
		hasPrior: prior.length > 0
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
			const rank = {
				low: 0,
				over: 1,
				ok: 2
			};
			const d = rank[a.status] - rank[b.status];
			if (d !== 0) return d;
			return b.value - a.value;
		}),
		alerts,
		narrative,
		rangeLabel: range.label,
		priorLabel: range.priorLabel,
		days
	};
}
function buildAlerts(input) {
	const alerts = [];
	const lows = input.inventory.filter((i) => i.status === "low").slice(0, 4);
	for (const i of lows) alerts.push({
		id: `low-${i.sku}-${i.branch}`,
		severity: i.onHand === 0 ? "high" : "medium",
		title: `${i.branch} · ${i.product}`,
		detail: i.onHand === 0 ? "Stocked out — reorder immediately" : `${num(i.onHand)} on hand vs reorder of ${num(i.reorderPoint)}`,
		branch: i.branch,
		region: i.region
	});
	const misses = input.branches.filter((b) => b.vsPlan < -.04).slice(0, 2);
	for (const b of misses) alerts.push({
		id: `plan-${b.branch}`,
		severity: b.vsPlan < -.08 ? "high" : "medium",
		title: `${b.branch} behind plan`,
		detail: `${signedPct(b.vsPlan)} vs plan · ${usd(b.sales)} sales`,
		branch: b.branch,
		region: b.region
	});
	const losers = input.products.filter((p) => p.profit < 0).slice(0, 2);
	for (const p of losers) alerts.push({
		id: `margin-${p.sku}`,
		severity: "low",
		title: `${p.product} is unprofitable`,
		detail: `${usd(p.profit)} profit on ${usd(p.sales)} · ${pctSafe(p.discount)} avg discount`
	});
	const over = input.inventory.filter((i) => i.status === "over").slice(0, 2);
	for (const i of over) alerts.push({
		id: `over-${i.sku}-${i.branch}`,
		severity: "low",
		title: `${i.branch} overstock · ${i.product}`,
		detail: `${Math.round(i.daysOnHand)} days on hand (target ~45)`,
		branch: i.branch,
		region: i.region
	});
	if (input.kpis.margin + .015 < input.prior.margin && input.prior.margin) alerts.unshift({
		id: "margin-company",
		severity: "medium",
		title: "Company margin compressed",
		detail: `${pctSafe(input.kpis.margin)} vs ${pctSafe(input.prior.margin)} in the prior period`
	});
	return alerts.slice(0, 8);
}
function pctSafe(n) {
	return `${(n * 100).toFixed(1)}%`;
}
function buildNarrative(input) {
	const { kpis, prior } = input;
	const lines = [];
	if (input.hasPrior) {
		const d = delta(kpis.sales, prior.sales);
		lines.push(`Sales ${usd(kpis.sales)} in ${input.rangeLabel}, ${signedPct(d)} vs the same window last year.`);
	} else lines.push(`Sales ${usd(kpis.sales)} across ${input.rangeLabel}.`);
	const topR = [...input.regionPoints].sort((a, b) => b.sales - a.sales)[0];
	if (topR) lines.push(`${topR.region} leads with ${pctSafe(topR.share)} of revenue${Number.isFinite(topR.vsPrior) && input.hasPrior ? ` (${signedPct(topR.vsPrior)} vs prior)` : ""}.`);
	const topC = [...input.categoryPoints].sort((a, b) => b.sales - a.sales)[0];
	if (topC) lines.push(`${topC.category} is the mix leader at ${pctSafe(topC.share)} · ${pctSafe(topC.margin)} margin.`);
	const low = input.inventory.filter((i) => i.status === "low").length;
	const over = input.inventory.filter((i) => i.status === "over").length;
	lines.push(`Inventory is turning ${kpis.turns.toFixed(1)}× (≈${Math.round(kpis.daysOnHand)} days on hand). ${low} position${low === 1 ? "" : "s"} below reorder, ${over} overstocked.`);
	const miss = input.branches.filter((b) => b.vsPlan < 0).length;
	if (input.hasPrior) lines.push(`Gross margin ${pctSafe(kpis.margin)} · ${miss} of ${input.branches.length} branches are behind plan.`);
	return lines;
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
		delayDuration: 250,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {})
	});
}
function Dashboard() {
	const view = useDashStore((s) => s.view);
	const period = useDashStore((s) => s.period);
	const regions = useDashStore((s) => s.regions);
	const categories = useDashStore((s) => s.categories);
	const branch = useDashStore((s) => s.branch);
	const model = (0, import_react.useMemo)(() => buildModel({
		view,
		period,
		regions,
		categories,
		branch
	}), [
		view,
		period,
		regions,
		categories,
		branch
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-[1400px] px-4 py-5 sm:px-6 sm:py-6",
			children: model.kpis.sales === 0 && model.inventory.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-surface px-5 py-10 text-center text-sm text-muted shadow-[var(--shadow-border)]",
				children: "No rows in this slice. Reset slicers or pick another period."
			}) : view === "sales" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalesView, { model }) : view === "inventory" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InventoryView, { model }) : view === "branches" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BranchesView, { model }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewView, { model })
		})]
	});
}
//#endregion
export { Home as component };
