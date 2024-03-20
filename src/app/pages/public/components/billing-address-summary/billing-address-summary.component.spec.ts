import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAddressSummaryComponent } from './billing-address-summary.component';

describe('BillingAddressSummaryComponent', () => {
  let component: BillingAddressSummaryComponent;
  let fixture: ComponentFixture<BillingAddressSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingAddressSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingAddressSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
