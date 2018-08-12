import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Author} from '../interfaces/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  url = 'http://localhost:3000/api/v1/authors/';

  constructor(private http: HttpClient) { }

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

}
