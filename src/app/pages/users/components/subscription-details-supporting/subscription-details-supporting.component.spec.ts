import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDetailsSupportingComponent } from './subscription-details-supporting.component';

describe('SubscriptionDetailsSupportingComponent', () => {
  let component: SubscriptionDetailsSupportingComponent;
  let fixture: ComponentFixture<SubscriptionDetailsSupportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionDetailsSupportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionDetailsSupportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
