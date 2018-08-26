import {Component, Input, OnInit} from '@angular/core';
import {Author} from '../../../interfaces/author';
import {Router} from '@angular/router';

@Component({
  selector: 'app-author-small-item',
  templateUrl: './author-small-item.component.html',
  styleUrls: ['./author-small-item.component.css']
})
export class AuthorSmallItemComponent implements OnInit {

  @Input() author: Author;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToAuthor(): void {
    this.router.navigate(['/author/' + this.author.id]);
  }

}
