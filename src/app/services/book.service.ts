import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {User} from "../interfaces/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Book} from "../interfaces/book";


@Injectable({
  providedIn: 'root'
})
export class BookService {

  url = 'http://localhost:3000/api/v1/books/';

  @Output() arraySorted: EventEmitter<Book[]> = new EventEmitter();

  constructor(private http: HttpClient) { }

  handleError = (error: Response) => {
    return throwError(error);
  };

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url)
      .pipe(
      catchError(this.handleError)
    );
  }

  getLatestBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url + 'show/latest')
      .pipe(
        catchError(this.handleError)
      );
  }

    sortArray(array: Book[], sorting: string) {
        //RATING, NEWEST, ABC
        const sortedArray: Book[] = array.sort((n1, n2) => {
            switch (sorting) {
                case 'rating': {
                    return n2.score - n1.score;
                }
                case 'date': {
                    return n1.year - n2.year
                }
                case 'abc': {
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
            }
        });
        this.arraySorted.emit(sortedArray);
    }



}
