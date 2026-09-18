import { create } from "zustand";
import type { Category, Period, Region, View } from "./types";
import { CATEGORIES, REGIONS } from "./types";

type DashState = {
  view: View;
  period: Period;
  regions: Region[];
  categories: Category[];
  branch: string | null;
  setView: (view: View) => void;
  setPeriod: (period: Period) => void;
  toggleRegion: (region: Region) => void;
  setRegions: (regions: Region[]) => void;
  toggleCategory: (category: Category) => void;
  setCategories: (categories: Category[]) => void;
  setBranch: (branch: string | null) => void;
  reset: () => void;
};

const defaults = {
  view: "overview" as View,
  period: "ytd" as Period,
  regions: [...REGIONS] as Region[],
  categories: [...CATEGORIES] as Category[],
  branch: null as string | null,
};

export const useDashStore = create<DashState>((set, get) => ({
  ...defaults,
  setView: (view) => set({ view }),
  setPeriod: (period) => set({ period }),
  toggleRegion: (region) => {
    const cur = get().regions;
    if (cur.includes(region)) {
      if (cur.length === 1) return;
      set({ regions: cur.filter((r) => r !== region), branch: null });
    } else {
      set({ regions: [...cur, region], branch: null });
    }
  },
  setRegions: (regions) => set({ regions, branch: null }),
  toggleCategory: (category) => {
    const cur = get().categories;
    if (cur.includes(category)) {
      if (cur.length === 1) return;
      set({ categories: cur.filter((c) => c !== category) });
    } else {
      set({ categories: [...cur, category] });
    }
  },
  setCategories: (categories) => set({ categories }),
  setBranch: (branch) =>
    set((s) => ({
      branch: s.branch === branch ? null : branch,
    })),
  reset: () => set({ ...defaults, view: get().view }),
}));

export function isFiltered(state: Pick<DashState, "regions" | "categories" | "branch" | "period">) {
  return (
    state.period !== "ytd" ||
    state.branch !== null ||
    state.regions.length !== REGIONS.length ||
    state.categories.length !== CATEGORIES.length
  );
}
