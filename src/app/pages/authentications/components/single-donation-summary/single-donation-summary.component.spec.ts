import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDonationSummaryComponent } from './single-donation-summary.component';

describe('SingleDonationSummaryComponent', () => {
  let component: SingleDonationSummaryComponent;
  let fixture: ComponentFixture<SingleDonationSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleDonationSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDonationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
