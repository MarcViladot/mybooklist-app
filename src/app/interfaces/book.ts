import {Author} from './author';
import {Genre} from './genre';
import {Serie} from './serie';
import {Review} from './review';

export interface Book {
  id: number;
  name: string;
  year: number;
  plot: string;
  lang: string;
  pages: number;
  score: number;
  members: number;
  popularity: number;
  form: string;
  cover: string;
  authors: Author[];
  genres: Genre[];
  serie?: Serie;
  reviews: Review[];

}
