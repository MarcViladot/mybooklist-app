import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {HomeComponent} from './components/home/home.component';
import {BookSearchComponent} from './components/books/book-search/book-search.component';
import {BookDetailComponent} from './components/books/book-detail/book-detail.component';
import {GenreSearchComponent} from './components/books/genre-search/genre-search.component';
import {UserListComponent} from './components/user/user-list/user-list.component';
import {AuthorDetailComponent} from './components/author/author-detail/author-detail.component';
import {UserDetailComponent} from './components/user/user-detail/user-detail.component';


export const ROUTES: Routes = [
  {path: '', component: AppComponent},
  {path: 'home', component: HomeComponent},
  {path: 'search/:search', component: BookSearchComponent},
  {path: 'books/:id', component: BookDetailComponent},
  {path: 'genre/:id', component: GenreSearchComponent},
  {path: 'user/:id/booklist', component: UserListComponent},
  {path: 'user/:id', component: UserDetailComponent},
  {path: 'author/:id', component: AuthorDetailComponent},
];
