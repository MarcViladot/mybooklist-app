import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../../interfaces/book';
import {ListService} from '../../../services/list.service';
import {Added} from '../../../interfaces/added';

@Component({
  selector: 'app-edit-list-dialog',
  templateUrl: './edit-list-dialog.component.html',
  styleUrls: ['./edit-list-dialog.component.css']
})
export class EditListDialogComponent implements OnInit {

  editForm: FormGroup;
  book: Book;
  added: Added;

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

  constructor(public dialogRef: MatDialogRef<EditListDialogComponent>,
              private fb: FormBuilder,
              private listService: ListService) {
    this.editForm = this.fb.group({
      progress: ['', Validators.required],
      score: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.editForm.controls['progress'].setValue(this.added.progress);
    this.editForm.controls['score'].setValue(this.added.score);
    this.editForm.controls['status'].setValue(this.added.status);
  }

  editAdded(): void {
    const status = this.editForm.get('status').value;
    let progress = this.editForm.get('progress').value;
    if (status === 'Completed') {
      progress = this.book.pages;
    }
    const score = this.editForm.get('score').value;
    const data = {
      'progress': progress,
      'status': status,
      'score': score
    };
    this.listService.updateAdded(this.added.id, data).subscribe(
      res => this.listService.addedHasChanged.emit(res)
    );
    this.dialogRef.close();
  }

}
