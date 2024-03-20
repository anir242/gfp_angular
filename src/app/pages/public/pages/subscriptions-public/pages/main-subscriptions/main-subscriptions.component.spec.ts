import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSubscriptionsComponent } from './main-subscriptions.component';

describe('MainSubscriptionsComponent', () => {
  let component: MainSubscriptionsComponent;
  let fixture: ComponentFixture<MainSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSubscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
