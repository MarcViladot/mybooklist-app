import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Author} from '../interfaces/author';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  url = 'http://localhost:3000/api/v1/authors/';
  urlF = 'http://localhost:3000/api/v1/favourite-user-author/';
  urlFavourites = 'http://localhost:3000/api/v1/favauthors/';

  constructor(private http: HttpClient) { }

  handleError = (error: Response) => {
    return throwError(error);
  }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.url, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }

  getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(this.url +  id, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }

  getFavByAuthorAndUser(user_id: number, author_id: number): Observable<any> {
    return this.http.get<any>(this.urlF + user_id + '/' + author_id, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }

  postFavouriteAuthor(user_id: number, author_id: number): Observable<any> {
    return this.http.post<any>(this.urlFavourites, {'user_id': user_id, 'author_id': author_id})
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteFavouriteAuthor(id: number): Observable<any> {
    return this.http.delete<any>(this.urlFavourites + id, )
      .pipe(
        catchError(this.handleError)
      );
  }

}
