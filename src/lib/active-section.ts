import { create } from "zustand";

export interface ActiveSectionState {
  activeId: string;
  setActiveId: (id: string) => void;
}

export const useActiveSection = create<ActiveSectionState>((set) => ({
  activeId: "home",
  setActiveId: (id) => set({ activeId: id }),
}));
