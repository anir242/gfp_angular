import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftPaymentMethodComponent } from './gift-payment-method.component';

describe('GiftPaymentMethodComponent', () => {
  let component: GiftPaymentMethodComponent;
  let fixture: ComponentFixture<GiftPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftPaymentMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
