import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookService} from '../../../services/book.service';
import {Book} from '../../../interfaces/book';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecommendationService} from '../../../services/recommendation.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-recommendation-new',
  templateUrl: './recommendation-new.component.html',
  styleUrls: ['./recommendation-new.component.css']
})
export class RecommendationNewComponent implements OnInit {

  @Input() recommendedId: number;
  @Output() recommendationWrited = new EventEmitter();
  books: Book[];
  recForm: FormGroup;

  constructor(private bookService: BookService,
              private fb: FormBuilder,
              private recService: RecommendationService,
              public snackBar: MatSnackBar) {
    this.recForm = this.fb.group({
      similar: ['', Validators.required],
      reasons: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.bookService.getBooksInList().subscribe(
      books =>  {
        this.books = books;
      }
    );

  }

  postRecommendation(): void {
    const reasons = this.recForm.get('reasons').value;
    const recommending = this.recForm.get('similar').value;
    const data = {
      'reasons': reasons,
      'recommending_id': recommending,
      'recommended_id': this.recommendedId
    };
    this.recService.postRecommendation(data).subscribe(
      res => {
        this.recommendationWrited.emit(true);
        this.snackBar.open('Recommendation posted', null, {
          duration: 5000,
        });
      }
    );
  }

}
