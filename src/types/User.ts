export interface IUsers {
  id: number;
  username: string;
  email: string;
  roomId: number;
  createAt?: Date;
}

export interface IRoomUser {
  id: number;
  userEmail: string;
  roomId: number;
}
