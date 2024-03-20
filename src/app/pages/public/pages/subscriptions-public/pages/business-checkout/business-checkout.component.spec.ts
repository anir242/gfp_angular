import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCheckoutComponent } from './business-checkout.component';

describe('BusinessCheckoutComponent', () => {
  let component: BusinessCheckoutComponent;
  let fixture: ComponentFixture<BusinessCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
