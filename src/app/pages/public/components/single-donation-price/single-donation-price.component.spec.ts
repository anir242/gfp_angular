import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDonationPriceComponent } from './single-donation-price.component';

describe('SingleDonationPriceComponent', () => {
  let component: SingleDonationPriceComponent;
  let fixture: ComponentFixture<SingleDonationPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleDonationPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDonationPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
