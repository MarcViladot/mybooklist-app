///<reference path="../interfaces/user.ts"/>
import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {catchError, map} from "rxjs/operators";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url = 'http://localhost:3000/api/v1/authenticate';
  urlCurrentUser = 'http://localhost:3000/api/v1/users?me=true';

  @Output() getLoggedIn: EventEmitter<any> = new EventEmitter();

  handleError = (error: Response) => {
    return throwError(error);
  };

  constructor(private http: HttpClient) { }

  static getAuthToken(): string {
    const token = localStorage.getItem('access_token');
    return token ? token : '';
  }

  static isLogged(): boolean {
    return localStorage.getItem('access_token') != null;
  }

  static getCurrentUser(): User {
    return JSON.parse(sessionStorage.getItem('userChanges'));
  }

  signIn(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.url, {'email': email, 'password': password})
      .pipe(
        catchError(this.handleError)
      );
  }

  signOut(){
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('userChanges');
    this.getLoggedIn.emit(false);
  }

  getCurrentUser() {
    return this.http.get<User>(this.urlCurrentUser, {
      headers: new HttpHeaders({
        'Authorization': AuthenticationService.getAuthToken()
      })
    });
  }

  setCurrentUser(){
    this.getCurrentUser().subscribe(
      user => {
        sessionStorage.setItem('userChanges', JSON.stringify(user))
      }
    );
    this.getLoggedIn.emit(true);
  }


}
