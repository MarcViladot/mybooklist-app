import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Book} from '../interfaces/book';
import {Added} from '../interfaces/added';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  url = 'http://localhost:3000/api/v1/addeds/';
  urlList  = 'http://localhost:3000/api/v1/list/';
  urlA = 'http://localhost:3000/api/v1/addeds-user-book/';

  @Output() addedHasChanged: EventEmitter<Added> = new EventEmitter();
  @Output() arraySorted: EventEmitter<Added[]> = new EventEmitter();

  constructor(private http: HttpClient) { }

  handleError = (error: Response) => {
    return throwError(error);
  }

  getAddedByBoookAndUser(book_id: number): Observable<Added> {
    return this.http.get<Added>(this.urlA + book_id, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': AuthenticationService.getAuthToken()
      })
    });
  }

  getListByUser(id: number): Observable<any> {
    return this.http.get<Added>(this.urlList + id, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }

  postAdded(data: any): Observable<Added> {
    return this.http.post<Added>(this.url, data, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': AuthenticationService.getAuthToken()
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateAdded(id: number, data: any): Observable<Added> {
    return this.http.put<Added>(this.url + id, data, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': AuthenticationService.getAuthToken()
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  removeAdded(id: number): Observable<any> {
    return this.http.delete<any>(this.url + id, )
      .pipe(
        catchError(this.handleError)
      );
  }

  sortArray(array: Added[], sorting: string) {
    const sortedArray: Added[] = array.sort((n1, n2) => {
      switch (sorting) {
        case 'score': {
          return n2.score - n1.score;
        }
        case 'progress': {
          return n2.progress - n1.progress;
        }
        case 'name': {
          if (n1.book.name > n2.book.name) {
            return 1;
          }
          if (n1.book.name < n2.book.name) {
            return -1;
          }
          return 0;
        }
      }
    });
    this.arraySorted.emit(sortedArray);
  }


}
