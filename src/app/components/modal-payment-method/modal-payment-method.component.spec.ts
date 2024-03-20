import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPaymentMethodComponent } from './modal-payment-method.component';

describe('ModalEditComponent', () => {
  let component: ModalPaymentMethodComponent;
  let fixture: ComponentFixture<ModalPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPaymentMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
