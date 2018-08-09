import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../../interfaces/book';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-small-item',
  templateUrl: './book-small-item.component.html',
  styleUrls: ['./book-small-item.component.css']
})
export class BookSmallItemComponent implements OnInit {

  @Input() book: Book;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToBook(id: number): void {
    this.router.navigate(['/books/' + id]);
  }

}
