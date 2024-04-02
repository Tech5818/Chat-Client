import { create } from "zustand";

export interface IReload {
  reload: boolean;
  setReload: (newReload: boolean) => void;
}

export const useReload = create<IReload>((set) => ({
  reload: false,
  setReload: (newReload: boolean) => set({ reload: newReload }),
}));
