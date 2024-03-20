import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutOffsetComponent } from './checkout-offset.component';

describe('CheckoutOffsetComponent', () => {
  let component: CheckoutOffsetComponent;
  let fixture: ComponentFixture<CheckoutOffsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutOffsetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutOffsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
