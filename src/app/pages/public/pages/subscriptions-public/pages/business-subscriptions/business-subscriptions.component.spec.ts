import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSubscriptionsComponent } from './business-subscriptions.component';

describe('BusinessSubscriptionsComponent', () => {
  let component: BusinessSubscriptionsComponent;
  let fixture: ComponentFixture<BusinessSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessSubscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
