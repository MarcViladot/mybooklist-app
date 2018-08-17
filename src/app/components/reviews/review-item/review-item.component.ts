import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../../../interfaces/review';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css']
})
export class ReviewItemComponent implements OnInit {

  @Input() review: Review;
  textSplit: string;
  showMore = false;

  constructor() { }

  ngOnInit() {
    this.textSplit = this.review.text.substring(0, 1000); // match(/.{1,1000}/g)[0];
  }

  changeText(b: boolean) {
    this.showMore = b;
  }
}
