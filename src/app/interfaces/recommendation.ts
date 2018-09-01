import {Book} from './book';
import {User} from './user';

export interface Recommendation {
  id: number;
  reasons: string;
  created_at: Date;
  recommending: Book;
  recommended: Book;
  user: User;
}
