import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../interfaces/book';
import {Added} from '../interfaces/added';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  url = 'http://localhost:3000/api/v1/addeds/';
  urlA = 'http://localhost:3000/api/v1/addeds-user-book/';

  constructor(private http: HttpClient) { }

  getAddedByBoookAndUser(user_id: number, book_id: number): Observable<Added> {
    return this.http.get<Added>(this.urlA + user_id + '/' + book_id, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }


}
