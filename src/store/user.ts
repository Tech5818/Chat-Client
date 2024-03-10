import { create } from "zustand";

export interface IUser {
  user: {
    name: string;
    email: string;
  };
  setUser?: (newUser: { name: string; email: string }) => void;
}

export const useUser = create<IUser>((set) => ({
  user: {
    name: "",
    email: "",
  },
  setUser: (newUser) => set({ user: newUser }),
}));
