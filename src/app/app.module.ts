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
import {
  MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatCardModule,
  MatChipsModule, MatTabsModule, MatAutocompleteModule, MatSelectModule, MatSortModule, MatTableModule, MatSnackBarModule
} from '@angular/material';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { BooksDisplayComponent} from './components/books/books-display/books-display.component';

import { DragScrollModule } from 'ngx-drag-scroll';

// Services
import {BookService} from './services/book.service';
import { SigninComponent } from './components/user/signin/signin.component';
import { SignupComponent } from './components/user/signup/signup.component';
import {AuthenticationService} from './services/authentication.service';
import {ReviewService} from './services/review.service';
import { BookItemComponent } from './components/books/book-item/book-item.component';
import { BookSearchComponent } from './components/books/book-search/book-search.component';
import { BookDetailComponent } from './components/books/book-detail/book-detail.component';
import {ListService} from './services/list.service';
import { ReviewItemComponent } from './components/reviews/review-item/review-item.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { GenreSearchComponent } from './components/books/genre-search/genre-search.component';
import { BookSmallItemComponent } from './components/books/book-small-item/book-small-item.component';
import { AddListDialogComponent } from './components/list/add-list-dialog/add-list-dialog.component';
import { EditListDialogComponent } from './components/list/edit-list-dialog/edit-list-dialog.component';
import { BookListItemComponent } from './components/list/book-list-item/book-list-item.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AuthorDetailComponent } from './components/author/author-detail/author-detail.component';
import {AuthorService} from './services/author.service';
import {EditorModule} from 'primeng/primeng';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { AddedItemComponent } from './components/list/added-item/added-item.component';
import { AddedHistoryComponent } from './components/list/added-history/added-history.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    BooksDisplayComponent,
    BookItemComponent,
    BookSearchComponent,
    BookDetailComponent,
    ReviewItemComponent,
    GenreSearchComponent,
    BookSmallItemComponent,
    AddListDialogComponent,
    EditListDialogComponent,
    BookListItemComponent,
    UserListComponent,
    AuthorDetailComponent,
    UserDetailComponent,
    AddedItemComponent,
    AddedHistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    DragScrollModule,
    NgxPaginationModule,
    EditorModule,
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
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  entryComponents: [
    SigninComponent,
    SignupComponent,
    AddListDialogComponent,
    EditListDialogComponent,
    AddedHistoryComponent
  ],
  providers: [BookService, AuthenticationService, ReviewService, ListService, AuthorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
