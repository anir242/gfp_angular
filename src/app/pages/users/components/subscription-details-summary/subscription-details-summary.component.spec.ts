import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDetailsSummaryComponent } from './subscription-details-summary.component';

describe('SubscriptionDetailsSummaryComponent', () => {
  let component: SubscriptionDetailsSummaryComponent;
  let fixture: ComponentFixture<SubscriptionDetailsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionDetailsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionDetailsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
