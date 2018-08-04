import { Component, OnInit } from '@angular/core';
import {Book} from "../../interfaces/book";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Array<Book>;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getLatestBooks().subscribe(
      books => this.books = books
    )
  }

}
