import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Book} from '../interfaces/book';
import {catchError} from 'rxjs/operators';
import {Review} from '../interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  url = 'http://localhost:3000/api/v1/reviews/';

  constructor(private http: HttpClient) { }

  handleError = (error: Response) => {
    return throwError(error);
  }

  getLatestReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.url + 'show/latest')
      .pipe(
        catchError(this.handleError)
      );
  }

  getReviewByBookId(id: number): Observable<any> {
    return this.http.get<any>(this.url + 'book/' + id, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }
}
