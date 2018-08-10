import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../../interfaces/book';
import {BookService} from '../../../services/book.service';

@Component({
    selector: 'app-books-display',
    templateUrl: './books-display.component.html',
    styleUrls: ['./books-display.component.css']
})
export class BooksDisplayComponent implements OnInit {

    @Input() books: Book[];
    @Input() title: string;

    selectedSorting = '';

    sortings = [
        {value: 'abc', viewValue: 'Title'},
        {value: 'rating', viewValue: 'Top rated'},
        {value: 'date', viewValue: 'Newest'},
        {value: 'popularity', viewValue: 'Most Popular'}
    ];

    constructor(private bookService: BookService) {
        bookService.arraySorted.subscribe(books => this.sort(books));
    }

    ngOnInit() {
    }

    private sort(books: Book[]): void {
        this.books = books;
    }

    sortBooks(value: string, view: string) {
        this.selectedSorting = view;
        this.bookService.sortArray(this.books, value);
    }

}
