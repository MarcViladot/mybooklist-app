import {Book} from './book';

export interface Serie {
  id: number;
  name: string;
  books?: Book[];
}
