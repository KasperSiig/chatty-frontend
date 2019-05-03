import { User } from '../User';

export class FileDTO {
  id?: string;
  type: string;
  size: number;
  user: User;
}
