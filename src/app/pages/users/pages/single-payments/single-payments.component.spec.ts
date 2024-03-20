import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePaymentsComponent } from './single-payments.component';

describe('SinglePaymentsComponent', () => {
  let component: SinglePaymentsComponent;
  let fixture: ComponentFixture<SinglePaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
