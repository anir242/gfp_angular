import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDetailsProjectsComponent } from './subscription-details-projects.component';

describe('SubscriptionDetailsProjectsComponent', () => {
  let component: SubscriptionDetailsProjectsComponent;
  let fixture: ComponentFixture<SubscriptionDetailsProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionDetailsProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionDetailsProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
