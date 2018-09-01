import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../../../interfaces/review';
import {ReviewService} from '../../../services/review.service';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css']
})
export class ReviewItemComponent implements OnInit {

  @Input() review: Review;
  @Input() inUserComponent: boolean;
  textSplit: string;
  showMore = false;

  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
    this.textSplit = this.review.text.substring(0, 1000); // match(/.{1,1000}/g)[0];
  }

  changeText(b: boolean) {
    this.showMore = b;
  }

  upvote() {
    this.reviewService.upvote(this.review.id).subscribe(
      res => {
        this.review.upvotes += 1;
        this.review.upvoted = true;
      }
    );
  }

  downvote() {
    this.reviewService.downvote(this.review.id).subscribe(
      res => {
        this.review.upvotes -= 1;
        this.review.upvoted = false;
      }
    );
  }
}
