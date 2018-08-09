import { Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import {HomeComponent} from "./components/home/home.component";
import {BookSearchComponent} from './components/books/book-search/book-search.component';
import {BookDetailComponent} from './components/books/book-detail/book-detail.component';
import {GenreSearchComponent} from './components/genre-search/genre-search.component';


export const ROUTES: Routes = [
  {path: '', component: AppComponent},
  {path: 'home', component: HomeComponent},
  {path: 'search/:search', component: BookSearchComponent},
  {path: 'books/:id', component: BookDetailComponent},
  {path: 'genre/:id', component: GenreSearchComponent},
];
