import {User} from './user';
import { Book } from './book';

export interface Review {
  text: string;
  id: number;
  score: number;
  user: User;
  created_at: Date;
  upvotes: number;
  upvoted: boolean;
  book?: Book;
}
