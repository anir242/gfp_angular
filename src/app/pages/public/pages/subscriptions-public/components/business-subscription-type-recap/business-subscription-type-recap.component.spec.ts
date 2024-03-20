import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSubscriptionTypeRecapComponent } from './business-subscription-type-recap.component';

describe('BusinessSubscriptionTypeRecapComponent', () => {
  let component: BusinessSubscriptionTypeRecapComponent;
  let fixture: ComponentFixture<BusinessSubscriptionTypeRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessSubscriptionTypeRecapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSubscriptionTypeRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
