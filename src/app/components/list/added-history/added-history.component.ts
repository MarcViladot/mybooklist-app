import { Component, OnInit } from '@angular/core';
import {Added} from '../../../interfaces/added';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-added-history',
  templateUrl: './added-history.component.html',
  styleUrls: ['./added-history.component.css']
})
export class AddedHistoryComponent implements OnInit {

  addeds: Added[];
  username: string;

  constructor(public dialogRef: MatDialogRef<AddedHistoryComponent>) { }

  ngOnInit() {
  }

}
