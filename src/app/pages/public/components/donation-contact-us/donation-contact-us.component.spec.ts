import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationContactUsComponent } from './donation-contact-us.component';

describe('DonationContactUsComponent', () => {
  let component: DonationContactUsComponent;
  let fixture: ComponentFixture<DonationContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationContactUsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
