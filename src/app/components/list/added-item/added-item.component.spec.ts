import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedItemComponent } from './added-item.component';

describe('AddedItemComponent', () => {
  let component: AddedItemComponent;
  let fixture: ComponentFixture<AddedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
