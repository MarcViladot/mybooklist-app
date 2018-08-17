import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../../interfaces/book';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {EditListDialogComponent} from '../../list/edit-list-dialog/edit-list-dialog.component';
import {MatDialog} from '@angular/material';
import {AddListDialogComponent} from '../../list/add-list-dialog/add-list-dialog.component';
import {SigninComponent} from '../../user/signin/signin.component';
import {ListService} from '../../../services/list.service';
import {Added} from '../../../interfaces/added';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {

  @Input() book: Book;
  logged: boolean;
  changePetition = false;

  constructor(private router: Router,
              private dialog: MatDialog,
              private authService: AuthenticationService,
              private listService: ListService) {
    this.authService.getLoggedIn.subscribe( logged => this.logged = logged );
    this.listService.addedHasChanged.subscribe(added => this.addedChanged(added));
  }

  ngOnInit() {
    this.logged = AuthenticationService.isLogged();
  }

  private addedChanged(added: Added) {
    if (this.changePetition) { this.book.added = added; }
  }

  goToBook(id: number): void {
    this.router.navigate(['/books/' + id]);
  }

  goToGenre(id: number): void  {
    this.router.navigate(['/genre/' + id]);
  }

  editAdded(): void {
    let dialogRef = this.dialog.open(EditListDialogComponent, {
      height: 'auto',
      width: '50%'
    });
    this.changePetition = true;
    dialogRef.componentInstance.book = this.book;
    dialogRef.componentInstance.added = this.book.added;
    dialogRef.afterClosed().subscribe(response => {
      dialogRef = null;
      this.changePetition = false;
    });
  }

  addToList(): void {
    if (!this.logged) {
      this.openDialogSignIn();
    } else {
      this.changePetition = true;
      let dialogRef = this.dialog.open(AddListDialogComponent, {
        height: 'auto',
        width: '50%'
      });
      dialogRef.componentInstance.book = this.book;
      dialogRef.afterClosed().subscribe(response => {
        dialogRef = null;
        this.changePetition = false;
      });
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

}
