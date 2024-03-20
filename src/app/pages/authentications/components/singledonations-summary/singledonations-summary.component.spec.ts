import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingledonationsSummaryComponent } from './singledonations-summary.component';

describe('SingledonationsSummaryComponent', () => {
  let component: SingledonationsSummaryComponent;
  let fixture: ComponentFixture<SingledonationsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingledonationsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingledonationsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
