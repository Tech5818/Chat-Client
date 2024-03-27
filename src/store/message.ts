import { create } from "zustand";

export interface IMessage {
  id: number;
  content: string;
  senderEmail: string;
  roomId: number;
  createAt: Date;
}

export interface IMessages {
  messages: IMessage[];
  setMessages: (newMessages: IMessage[]) => void;
}

export const useMessages = create<IMessages>((set) => ({
  messages: [],
  setMessages: (newMessage: IMessage[]) => set({ messages: newMessage }),
}));
