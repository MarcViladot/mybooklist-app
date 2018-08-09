import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSmallItemComponent } from './book-small-item.component';

describe('BookSmallItemComponent', () => {
  let component: BookSmallItemComponent;
  let fixture: ComponentFixture<BookSmallItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSmallItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSmallItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
