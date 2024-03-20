import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDetailsIncludedComponent } from './subscription-details-included.component';

describe('SubscriptionDetailsIncludedComponent', () => {
  let component: SubscriptionDetailsIncludedComponent;
  let fixture: ComponentFixture<SubscriptionDetailsIncludedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionDetailsIncludedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionDetailsIncludedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
