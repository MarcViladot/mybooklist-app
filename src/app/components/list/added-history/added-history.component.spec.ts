import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedHistoryComponent } from './added-history.component';

describe('AddedHistoryComponent', () => {
  let component: AddedHistoryComponent;
  let fixture: ComponentFixture<AddedHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
