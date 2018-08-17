import { Component, OnInit } from '@angular/core';
import {ListService} from '../../../services/list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Added} from '../../../interfaces/added';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  id: number;
  reading: Added[];
  completed: Added[];
  hold: Added[];
  dropped: Added[];
  plan: Added[];
  listOwner = false;

  constructor(private listService: ListService,
              private authService: AuthenticationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.authService.getLoggedIn.subscribe(bool => this.setOwner());
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = +params.get('id');
    });
    this.listService.addedHasChanged.subscribe(added => this.setList());
    // TODO subscribe logged edit and remove
  }

  ngOnInit() {
    this.setOwner();
    this.setList();
  }

  setOwner(): void {
    this.listOwner = AuthenticationService.isLogged() && AuthenticationService.getCurrentUser().id === this.id;
  }

  setList(): void {
    this.listService.getListByUser().subscribe(
      res => {
        this.reading = res['Reading'];
        this.completed = res['Completed'];
        this.hold = res['On-hold'];
        this.dropped = res['Dropped'];
        this.plan = res['Plan to Read'];
      });
  }
}
