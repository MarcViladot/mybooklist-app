import { Component, OnInit } from '@angular/core';
import {User} from '../../../interfaces/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {SigninComponent} from '../signin/signin.component';
import {MatDialog} from '@angular/material';


export interface Status {
  percentage: number;
  entries: number;
}
export interface Stat {
  reading: Status;
  completed: Status;
  hold: Status;
  dropped: Status;
  plan: Status;
  entries: number;
  pages: number;
  score: number;
  days: number;
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id: number;
  user: User;
  isCurrentUser: boolean;
  stats = {} as Stat;

  status: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private dialog: MatDialog,
              private authService: AuthenticationService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = +params.get('id');
    });
    this.authService.getLoggedIn.subscribe(res => this.setUser());
  }

  ngOnInit() {
    this.setUser();
    this.getStatus();
    this.isCurrentUser = this.id === AuthenticationService.getCurrentUser().id;
  }

  setUser(): void {
    this.userService.getUserById(this.id).subscribe(
      user => this.user = user
    );
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

  follow(): void {
    if (!AuthenticationService.isLogged()) {
      this.openDialogSignIn();
    } else {
      this.userService.followUser(this.id).subscribe(
        res => this.user.following = true
      );
    }
  }

  unfollow(): void {
    this.userService.unfollowUser(this.id).subscribe(
      res => this.user.following = false
    );
  }

  private getStatus() {
    this.userService.getStatsByUserId(this.id).subscribe(
      res => {
        this.stats.reading = res['Reading'];
        this.stats.completed = res['Completed'];
        this.stats.hold = res['On-hold'];
        this.stats.dropped = res['Dropped'];
        this.stats.plan = res['Plan to Read'];
        this.stats.entries = res.total_entries;
        this.stats.pages = res.total_pages;
        this.stats.score = res.mean_score;
        this.stats.days = res.days;
        this.status = [
          {status: 'Reading', color: '#2DB039', entries: this.stats.reading.entries },
          {status: 'Completed', color: '#26448F', entries: this.stats.completed.entries },
          {status: 'On-hold', color: '#F9D456', entries: this.stats.hold.entries },
          {status: 'Dropped', color: '#A12F31', entries: this.stats.dropped.entries },
          {status: 'Plan to Read', color: '#C3C3C3', entries: this.stats.plan.entries }
        ];
      }
    );
  }
}
