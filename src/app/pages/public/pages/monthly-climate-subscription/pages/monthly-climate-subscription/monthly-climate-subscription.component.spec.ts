import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyClimateSubscriptionComponent } from './monthly-climate-subscription.component';

describe('MonthlyClimateSubscriptionComponent', () => {
  let component: MonthlyClimateSubscriptionComponent;
  let fixture: ComponentFixture<MonthlyClimateSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyClimateSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyClimateSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
