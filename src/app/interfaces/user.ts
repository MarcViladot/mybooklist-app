import {Author} from "./author";
import {Book} from "./book";

export interface User {
  id: number;
  username: string;
  avatar: string;
  email: string;
  authors: Array<Author>;
  books: Array<Book>
}
