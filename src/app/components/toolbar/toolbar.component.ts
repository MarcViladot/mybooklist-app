import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {SigninComponent} from "../user/signin/signin.component";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../interfaces/user";
import {Router} from '@angular/router';
import {Book} from '../../interfaces/book';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  logged: boolean;
  currentUser: User;
  options: Book[] = [];
  filteredOptions: Observable<Book[]>;
  myControl = new FormControl();

  constructor(public dialog: MatDialog,
              private authService: AuthenticationService,
              private router: Router,
              private bookService: BookService) {
    this.currentUser = AuthenticationService.getCurrentUser();
    this.authService.getLoggedIn.subscribe(bool => {this.logged = bool; });
  }

  ngOnInit() {
    this.logged = AuthenticationService.isLogged();
    this.bookService.getAllBooks().subscribe(
      response => this.options = response.books
    );
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): Book[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  goToBook(id: number): void {
    this.router.navigate(['/books/' + id]);
  }

  signOut(): void {
    this.authService.signOut();
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

  search(search: string): void {
    this.router.navigate(['/search/' + search]);
  }
}
