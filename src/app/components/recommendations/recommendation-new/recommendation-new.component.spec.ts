import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationNewComponent } from './recommendation-new.component';

describe('RecommendationNewComponent', () => {
  let component: RecommendationNewComponent;
  let fixture: ComponentFixture<RecommendationNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendationNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
