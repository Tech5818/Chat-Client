import { create } from "zustand";

export interface IModal {
  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;
}

export const useModal = create<IModal>((set) => ({
  isOpen: false,
  setIsOpen: (newIsOpen: boolean) => set({ isOpen: newIsOpen }),
}));
