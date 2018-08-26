import {Book} from './book';

export interface Added {
  id: number;
  progress: number;
  status: string;
  score: number;
  book?: Book;
  percentage: number;
  update: Date;
}
