import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorSmallItemComponent } from './author-small-item.component';

describe('AuthorSmallItemComponent', () => {
  let component: AuthorSmallItemComponent;
  let fixture: ComponentFixture<AuthorSmallItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorSmallItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorSmallItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
