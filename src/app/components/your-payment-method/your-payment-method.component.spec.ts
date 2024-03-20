import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourPaymentMethodComponent } from './your-payment-method.component';

describe('YourPaymentMethodComponent', () => {
  let component: YourPaymentMethodComponent;
  let fixture: ComponentFixture<YourPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourPaymentMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
