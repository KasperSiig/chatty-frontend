import { User } from './User';

export class Message {
  id?: string;
  content: string;
  time: number;
  sender: User;
}
