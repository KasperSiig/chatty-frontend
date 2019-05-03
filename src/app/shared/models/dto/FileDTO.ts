import { User } from '../User';

export class FileDTO {
  id?: string;
  type: string;
  size: number;
  base64File: string;
  user: User;
}
