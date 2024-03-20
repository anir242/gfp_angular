import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimatePositiveSubscriptionComponent } from './climate-positive-subscription.component';

describe('ClimatePositiveSubscriptionComponent', () => {
  let component: ClimatePositiveSubscriptionComponent;
  let fixture: ComponentFixture<ClimatePositiveSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimatePositiveSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClimatePositiveSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
