export interface IRoom {
  id: number;
  name: string;
  users: {
    id: number;
    userEmail: string;
    roomId: number;
  }[];
}
