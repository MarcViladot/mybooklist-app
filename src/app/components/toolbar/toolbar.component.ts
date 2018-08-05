import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {SigninComponent} from "../user/signin/signin.component";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../interfaces/user";
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  logged: boolean;
  currentUser: User;

  constructor(public dialog: MatDialog,
              private authService: AuthenticationService,
              private router: Router) {
    this.currentUser = AuthenticationService.getCurrentUser();
    this.authService.getLoggedIn.subscribe(bool => {this.logged = bool});
  }

  ngOnInit() {
    this.logged = AuthenticationService.isLogged();
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
