import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../../../services/book.service';
import {Book} from '../../../interfaces/book';
import {AuthenticationService} from '../../../services/authentication.service';
import {SigninComponent} from '../../user/signin/signin.component';
import {MatDialog} from '@angular/material';
import {ListService} from '../../../services/list.service';
import {Added} from '../../../interfaces/added';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  id: number;
  book: Book;
  logged: boolean;
  isInUserList: boolean;
  isFavourite: boolean;
  favouriteId: number;
  added: Added;

  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BookService,
              private authService: AuthenticationService,
              private listService: ListService,
              public dialog: MatDialog) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = +params.get('id');
    });
    this.authService.getLoggedIn.subscribe(logged => this.changeLogged(logged));
  }

  ngOnInit() {
    this.bookService.getBookById(this.id).subscribe(
      book => this.book = book
    );
    this.changeLogged(AuthenticationService.isLogged());
    this.getFavourite();
  }

  private getFavourite(): void {
    if (this.logged) {
      this.bookService.getFavByBoookAndUser(AuthenticationService.getCurrentUser().id, this.id).subscribe(
        response => {
          if (response !== null) {
            this.isFavourite = response !== null;
            this.favouriteId = response.id;
          }
        });
    }
  }

  private getAdded(): boolean {
    if (this.logged) {
      this.listService.getAddedByBoookAndUser(AuthenticationService.getCurrentUser().id, this.id).subscribe(
        response => {
          if (response === null) {
            this.isInUserList = false;
          } else {
            this.isInUserList = true;
            this.added = response;
          }
        });
    } else {
      return false;
    }
  }

  addToFavourites(): void {
    if (!this.logged) {
      this.openDialogSignIn();
    } else {
      this.bookService.postFavouriteBook(AuthenticationService.getCurrentUser().id, this.id).subscribe(
        response => {
         this.getFavourite();
        }
      );
    }
  }

  removeFromFavourites(): void {
    this.bookService.deleteFavouriteBook(this.favouriteId).subscribe(
      res => this.isFavourite = false
    );
  }

  addToList(): void {
    if (!this.logged) {
      this.openDialogSignIn();
    } else {
      // Add to List
    }
  }

  openDialogSignIn(): void {
    let dialogRef = this.dialog.open(SigninComponent, {
      height: 'auto',
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(response => {
      dialogRef = null;
    });
  }

  private changeLogged(logged: boolean) {
    this.logged = logged;
    this.isInUserList = this.getAdded();
  }
}
