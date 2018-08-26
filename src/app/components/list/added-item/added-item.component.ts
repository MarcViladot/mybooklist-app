import {Component, Input, OnInit} from '@angular/core';
import {Added} from '../../../interfaces/added';

@Component({
  selector: 'app-added-item',
  templateUrl: './added-item.component.html',
  styleUrls: ['./added-item.component.css']
})
export class AddedItemComponent implements OnInit {

  @Input() added: Added;

  constructor() { }

  ngOnInit() {
  }

  getColor(): string {
    switch (this.added.status) {
      case 'Reading': {
        return '#2DB039';
      }
      case 'Completed': {
        return '#26448F';
      }
      case 'On-hold': {
        return '#F9D456';
      }
      case 'Dropped': {
        return '#A12F31';
      }
      case 'Plan to Read': {
        return '#C3C3C3';
      }
    }
  }

}
