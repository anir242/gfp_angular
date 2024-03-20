import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePaymentBoughtComponent } from './single-payment-bought.component';

describe('SinglePaymentBuyedComponent', () => {
  let component: SinglePaymentBoughtComponent;
  let fixture: ComponentFixture<SinglePaymentBoughtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePaymentBoughtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePaymentBoughtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
