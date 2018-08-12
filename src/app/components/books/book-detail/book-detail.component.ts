import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../../services/book.service';
import {Book} from '../../../interfaces/book';
import {AuthenticationService} from '../../../services/authentication.service';
import {SigninComponent} from '../../user/signin/signin.component';
import {MatDialog} from '@angular/material';
import {ListService} from '../../../services/list.service';
import {Added} from '../../../interfaces/added';
import {AddListDialogComponent} from '../../list/add-list-dialog/add-list-dialog.component';
import {EditListDialogComponent} from '../../list/edit-list-dialog/edit-list-dialog.component';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  id: number;
  book: Book;
  logged: boolean;
  isInUserList = false;
  isFavourite: boolean;
  favouriteId: number;
  added: Added;

  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BookService,
              private authService: AuthenticationService,
              private listService: ListService,
              public dialog: MatDialog,
              private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = +params.get('id');
    });
    this.listService.addedHasChanged.subscribe(added => this.addedChanged(added));
    this.authService.getLoggedIn.subscribe(logged => this.changeLogged(logged));
  }

  private addedChanged(added: Added) {
    this.isInUserList = true;
    this.added = added;
  }

  ngOnInit() {
    this.bookService.getBookById(this.id).subscribe(
      book => this.book = book
    );
    this.changeLogged(AuthenticationService.isLogged());
    this.getFavourite();
    this.getAdded();
  }

  private getFavourite(): void {
    if (this.logged) {
      this.bookService.getFavByBoookAndUser(AuthenticationService.getCurrentUser().id, this.id).subscribe(
        response => {
          if (response !== null) {
            this.isFavourite = true;
            this.favouriteId = response.id;
          }
        });
    } else {
      this.isFavourite = false;
    }
  }

  private getAdded(): void {
    if (this.logged) {
      this.listService.getAddedByBoookAndUser(AuthenticationService.getCurrentUser().id, this.id).subscribe(
        response => {
          if (response !== null) {
            this.isInUserList = true;
            this.added = response;
          }
        });
    } else {
      this.isInUserList = false;
    }
  }

  private removeAdded(): void {
    this.listService.removeAdded(this.added.id).subscribe(
      res => this.isInUserList = false
    );
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
      let dialogRef = this.dialog.open(AddListDialogComponent, {
        height: 'auto',
        width: '50%'
      });
      dialogRef.componentInstance.book = this.book;
      dialogRef.afterClosed().subscribe(response => {
        dialogRef = null;
      });
    }
  }

  editAdded(): void {
    let dialogRef = this.dialog.open(EditListDialogComponent, {
      height: 'auto',
      width: '50%'
    });
    dialogRef.componentInstance.book = this.book;
    dialogRef.componentInstance.added = this.added;
    dialogRef.afterClosed().subscribe(response => {
      dialogRef = null;
    });
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

  goToGenre(id: number): void  {
    this.router.navigate(['/genre/' + id]);
  }

  goToAuthor(id: number): void  {
    this.router.navigate(['/author/' + id]);
  }

  private changeLogged(logged: boolean) {
    this.logged = logged;
    this.getAdded();
    this.getFavourite();
  }
}
