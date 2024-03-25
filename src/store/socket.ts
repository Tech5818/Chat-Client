import { Socket } from "socket.io-client";
import { create } from "zustand";

export interface ISocket {
  socket: Socket | null;
  setSocket?: (newSocket: Socket) => void;
}

export const useSocket = create<ISocket>((set) => ({
  socket: null,
  setSocket: (newSocket) => set({ socket: newSocket }),
}));
