import { Component, OnInit } from '@angular/core';
import {BookService} from '../../../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '../../../interfaces/book';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {

  search: string;
  books: Book[];

  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BookService,
              private router: Router) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.activatedRoute.paramMap.subscribe(params => {
      this.search = params.get('search');
    });
  }

  ngOnInit() {
    this.bookService.getBooksSearch(this.search).subscribe(
      response => {
        this.books = response.books;
      });
  }

}
