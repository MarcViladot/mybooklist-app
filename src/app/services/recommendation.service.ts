import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {AuthenticationService} from './authentication.service';
import {Recommendation} from '../interfaces/recommendation';

import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  url = 'http://localhost:3000/api/v1/recommendations/';

  constructor(private http: HttpClient) {
  }

  handleError = (error: Response) => {
    return throwError(error);
  }

  /*get(): Observable<Recommendation> {
    return this.http.get<Recommendation>(this.url, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      })
    });
  }*/

  getByBookUser(book_id: number): Observable<Recommendation> {
    return this.http.get<Recommendation>(this.url + 'user-book/' + book_id, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': AuthenticationService.getAuthToken()
      })
    });
  }

  postRecommendation(data: any): Observable<Recommendation> {
    return this.http.post<Recommendation>(this.url, data, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': AuthenticationService.getAuthToken()
      })
    }).pipe(
      catchError(this.handleError)
    );
  }
}
