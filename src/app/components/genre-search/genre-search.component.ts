import { Component, OnInit } from '@angular/core';
import {Book} from '../../interfaces/book';
import {BookService} from '../../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-genre-search',
  templateUrl: './genre-search.component.html',
  styleUrls: ['./genre-search.component.css']
})
export class GenreSearchComponent implements OnInit {

  id: number;
  books: Book[];

  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BookService,
              private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.activatedRoute.paramMap.subscribe(params => {
      this.id = +params.get('id');
    });
  }

  ngOnInit() {
    this.bookService.getBooksByGenre(this.id).subscribe(
      response => {
        this.books = response.books;
      });
  }

}
