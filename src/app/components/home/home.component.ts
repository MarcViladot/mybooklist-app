import { Component, OnInit } from '@angular/core';
import {Book} from "../../interfaces/book";
import {BookService} from "../../services/book.service";
import {Review} from '../../interfaces/review';
import {ReviewService} from '../../services/review.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Book[];
  reviews: Review[];

  constructor(private bookService: BookService,
              private reviewService: ReviewService) { }

  ngOnInit() {
    this.bookService.getLatestBooks().subscribe(
      books => this.books = books
    );
    this.reviewService.getLatestReviews().subscribe(
      reviews => this.reviews = reviews
    );
  }

}
