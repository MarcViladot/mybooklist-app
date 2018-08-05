import { Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import {HomeComponent} from "./components/home/home.component";
import {BookSearchComponent} from './components/books/book-search/book-search.component';


export const ROUTES: Routes = [
  {path: '', component: AppComponent},
  {path: 'home', component: HomeComponent},
  {path: 'search/:search', component: BookSearchComponent}
];
