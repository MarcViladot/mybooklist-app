import {User} from './user';

export interface Review {
  text: string;
  id: number;
  score: number;
  user: User;
  created_at: Date;
}
