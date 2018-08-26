import {Author} from './author';
import {Book} from './book';
import {Added} from './added';

export interface User {
  id: number;
  username: string;
  avatar: string;
  created_at: Date;
  born: Date;
  gender: string;
  email?: string;
  following?: boolean;
  // follows?: boolean;
  addeds?: Added[];
  authors?: Author[];
  books?: Book[];
  followings?: User[];
  followers?: User[];
}
