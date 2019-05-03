import { User } from '../User';

export class FileDTO {
  id?: string;
  type: string;
  name: string;
  size: number;
  base64Image?: string;
  user: User;
}
