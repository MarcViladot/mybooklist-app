import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthorService} from '../../../services/author.service';
import {Author} from '../../../interfaces/author';
import {BookService} from '../../../services/book.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {

  id: number;
  author: Author;
  isFavourite = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authorService: AuthorService,
              private bookService: BookService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = +params.get('id');
    });
    this.bookService.arraySorted.subscribe(array => this.author.books = array);
  }

  ngOnInit() {
    this.authorService.getAuthorById(this.id).subscribe(
      author => this.author = author
    );
  }

  goToBook(id: number): void {
    this.router.navigate(['/books/' + id]);
  }

  sort(sorting: string) {
    this.bookService.sortArray(this.author.books, sorting);
  }

}
