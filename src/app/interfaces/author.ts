import {Book} from './book';

export interface Author {
  id: number;
  name: string;
  born: Date;
  popularity: number;
  photo: string;
  biography: string;
  books: Book[];
}
