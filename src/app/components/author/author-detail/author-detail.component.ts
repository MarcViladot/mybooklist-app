import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthorService} from '../../../services/author.service';
import {Author} from '../../../interfaces/author';
import {BookService} from '../../../services/book.service';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {

  id: number;
  author: Author;
  isFavourite: boolean;
  favouriteId: number;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authorService: AuthorService,
              private bookService: BookService,
              private authService: AuthenticationService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = +params.get('id');
    });
    this.authService.getLoggedIn.subscribe(logged => this.setFavourite());
    this.bookService.arraySorted.subscribe(array => this.author.books = array);
  }

  ngOnInit() {
    this.authorService.getAuthorById(this.id).subscribe(
      author => this.author = author
    );
    this.setFavourite();
  }
  private setFavourite() {
    if (AuthenticationService.isLogged()) {
      this.authorService.getFavByAuthorAndUser(this.id).subscribe(
        res => {
          this.isFavourite = res !== null;
          if (res !== null) { this.favouriteId = res.id; }
        });
    } else {
      this.isFavourite = false;
    }
  }

  addFavourite() {
    this.authorService.postFavouriteAuthor(AuthenticationService.getCurrentUser().id, this.id).subscribe(
      res => {
        this.isFavourite = true;
        this.favouriteId = res.id;
        this.author.popularity++;
      });
  }

  removeFavourite() {
    this.authorService.deleteFavouriteAuthor(this.favouriteId).subscribe(
      res => {
        this.isFavourite = false;
        this.author.popularity--;
      }
    );
  }

  goToBook(id: number): void {
    this.router.navigate(['/books/' + id]);
  }

  sort(sorting: string) {
    this.bookService.sortArray(this.author.books, sorting);
  }

}
