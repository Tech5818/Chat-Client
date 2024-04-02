export interface IRoom {
  id: number;
  name: string;
  description: string;
  users: {
    id: number;
    userEmail: string;
    roomId: number;
  }[];
  messages?: string[];
}
