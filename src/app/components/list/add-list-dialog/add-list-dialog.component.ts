import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../../interfaces/book';
import {AuthenticationService} from '../../../services/authentication.service';
import {ListService} from '../../../services/list.service';

@Component({
  selector: 'app-add-list-dialog',
  templateUrl: './add-list-dialog.component.html',
  styleUrls: ['./add-list-dialog.component.css']
})
export class AddListDialogComponent implements OnInit {

  addForm: FormGroup;
  book: Book;

  status = [
    {value: 'Reading', viewValue: 'Reading'},
    {value: 'Completed', viewValue: 'Completed'},
    {value: 'Dropped', viewValue: 'Dropped'},
    {value: 'Plan to Read', viewValue: 'Plan to Read'},
    {value: 'On-hold', viewValue: 'On-hold'}
  ];

  scores = [
    {value: 0, viewValue: '-'}, {value: 1, viewValue: '(1) Appalling'},
    {value: 2, viewValue: '(2) Horrible'}, {value: 3, viewValue: '(3) Very Bad'},
    {value: 4, viewValue: '(4) Bad'}, {value: 5, viewValue: '(5) Average'},
    {value: 6, viewValue: '(6) Fine'}, {value: 7, viewValue: '(7) Good'},
    {value: 8, viewValue: '(8) Very Good'}, {value: 9, viewValue: '(9) Great'},
    {value: 10, viewValue: '(10) Masterpiece'}
  ];

  constructor(public dialogRef: MatDialogRef<AddListDialogComponent>,
              private fb: FormBuilder,
              private listService: ListService) {
    this.addForm = this.fb.group({
      progress: [0, Validators.required],
      score: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  postAdded(): void {
    const status = this.addForm.get('status').value;
    let progress = this.addForm.get('progress').value;
    if (status === 'Completed') {
      progress = this.book.pages;
    }
    const score = this.addForm.get('score').value;
    const data = {
      'progress': progress,
      'status': status,
      'score': score,
      'user_id': AuthenticationService.getCurrentUser().id,
      'book_id': this.book.id
    };
    this.listService.postAdded(data).subscribe(
      res => this.listService.addedHasChanged.emit(res)
    );
    this.dialogRef.close();
  }

}
