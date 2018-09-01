import {Component, Input, OnInit} from '@angular/core';
import {Recommendation} from '../../../interfaces/recommendation';

@Component({
  selector: 'app-recommendation-item',
  templateUrl: './recommendation-item.component.html',
  styleUrls: ['./recommendation-item.component.css']
})
export class RecommendationItemComponent implements OnInit {

  @Input() recommendation: Recommendation;
  @Input() inUserComponent: boolean;

  constructor() { }

  ngOnInit() {
  }

}
