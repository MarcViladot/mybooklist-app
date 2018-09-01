import {Author} from './author';
import {Book} from './book';
import {Added} from './added';
import {Recommendation} from './recommendation';
import {Review} from './review';

export interface User {
  id: number;
  username: string;
  avatar: string;
  created_at: Date;
  born: Date;
  gender: string;
  email?: string;
  following?: boolean;
  addeds?: Added[];
  authors?: Author[];
  books?: Book[];
  followings?: User[];
  followers?: User[];
  recommendations?: Recommendation[];
  reviews: Review[];
}
