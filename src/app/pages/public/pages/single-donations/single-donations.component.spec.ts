import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDonationsComponent } from './single-donations.component';

describe('SingleDonationsComponent', () => {
  let component: SingleDonationsComponent;
  let fixture: ComponentFixture<SingleDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleDonationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
