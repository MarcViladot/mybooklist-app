import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {User} from '../interfaces/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Book} from '../interfaces/book';
import {Added} from '../interfaces/added';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  url = 'http://localhost:3000/api/v1/books/';
  urlFavourites = 'http://localhost:3000/api/v1/favbooks/';
  urlF = 'http://localhost:3000/api/v1/favourite-user-book/';

  @Output() arraySorted: EventEmitter<Book[]> = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  handleError = (error: Response) => {
    return throwError(error);
  }

  getAllBooks(): Observable<any> {
    return this.http.get<any>(this.url, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }

  getBooksByAuthor(id: number): Observable<any> {
    return this.http.get<any>(this.url + 'author/' + id, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }


  getBooksSearch(search: string): Observable<any> {
    return this.http.get<any>(this.url + 'show/search/' + search, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': AuthenticationService.getAuthToken()
      })
    });
  }

  getBooksByGenre(id: number): Observable<any> {
    return this.http.get<any>(this.url + 'genre/' + id, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': AuthenticationService.getAuthToken()
      })
    });
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(this.url + id, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }

  getLatestBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url + 'show/latest')
      .pipe(
        catchError(this.handleError)
      );
  }

  getFavByBoookAndUser(book_id: number): Observable<any> {
    return this.http.get<any>(this.urlF + book_id, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': AuthenticationService.getAuthToken()
      })
    });
  }

  postFavouriteBook(book_id: number): Observable<any> {
    return this.http.post<any>(this.urlFavourites, {'book_id': book_id}, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': AuthenticationService.getAuthToken()
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteFavouriteBook(id: number): Observable<any> {
    return this.http.delete<any>(this.urlFavourites + id, )
      .pipe(
        catchError(this.handleError)
      );
  }

  sortArray(array: Book[], sorting: string) {
    const sortedArray: Book[] = array.sort((n1, n2) => {
      switch (sorting) {
        case 'rating': {
          return n2.score - n1.score;
        }
        case 'date': {
          return n2.year - n1.year;
        }
        case 'name': {
          if (n1.name > n2.name) {
            return 1;
          }
          if (n1.name < n2.name) {
            return -1;
          }
          return 0;
        }
        case 'popularity': {
          return n2.popularity - n1.popularity;
        }
        case 'pages': {
          return n2.pages - n1.pages;
        }
      }
    });
    this.arraySorted.emit(sortedArray);
  }


}
