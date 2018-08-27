import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ObservableMedia} from '@angular/flex-layout';
import {User} from '../interfaces/user';
import {Observable, throwError} from 'rxjs';
import {Review} from '../interfaces/review';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000/api/v1/users/';

  constructor(private http: HttpClient) { }

  handleError = (error: Response) => {
    return throwError(error);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.url + id, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': AuthenticationService.getAuthToken()
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  followUser(id: number): Observable<any> {
    return this.http.post<any>(this.url + 'follow/' + id, null, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': AuthenticationService.getAuthToken()
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  unfollowUser(id: number): Observable<any> {
    return this.http.delete<any>(this.url + 'unfollow/' + id, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': AuthenticationService.getAuthToken()
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  getStatsByUserId(id: number): Observable<any> {
    return this.http.get<any>(this.url + 'stats/' + id, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    );
  }
}
