import { Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import {HomeComponent} from "./components/home/home.component";


export const ROUTES: Routes = [
  {path: '', component: AppComponent},
  {path: 'home', component: HomeComponent}
];
