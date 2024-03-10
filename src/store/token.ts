import { create } from "zustand";

interface Token {
  token: string;
  setToken: (newToken: string) => void;
}

export const useToken = create<Token>((set) => ({
  token: "",
  setToken: (newToken) => set({ token: newToken }),
}));
