import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mybooklist-app';

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    if(AuthenticationService.isLogged()) {
      this.authService.setCurrentUser();
    }
  }

}
