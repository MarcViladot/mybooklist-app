import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutModule} from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatCardModule,
  MatChipsModule} from '@angular/material';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { BooksDisplayComponent} from './components/books/books-display/books-display.component';

import { DragScrollModule } from 'ngx-drag-scroll';

// Services
import {BookService} from './services/book.service';
import { SigninComponent } from './components/user/signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {AuthenticationService} from './services/authentication.service';
import {ReviewService} from './services/review.service';
import { BookItemComponent } from './components/books/book-item/book-item.component';
import { BookSearchComponent } from './components/books/book-search/book-search.component';



@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    BooksDisplayComponent,
    BookItemComponent,
    BookSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    DragScrollModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    NgbModule.forRoot(),
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatChipsModule
  ],
  entryComponents: [
    SigninComponent,
    SignupComponent
  ],
  providers: [BookService, AuthenticationService, ReviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
