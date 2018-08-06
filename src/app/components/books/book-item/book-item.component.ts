import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../../interfaces/book';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {

  @Input() book: Book;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToBook(id: number): void {
    this.router.navigate(['/books/' + id]);
  }

}
