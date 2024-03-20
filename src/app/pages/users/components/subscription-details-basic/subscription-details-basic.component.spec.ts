import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDetailsBasicComponent } from './subscription-details-basic.component';

describe('SubscriptionDetailsBasicComponent', () => {
  let component: SubscriptionDetailsBasicComponent;
  let fixture: ComponentFixture<SubscriptionDetailsBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionDetailsBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionDetailsBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
