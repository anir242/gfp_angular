import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCheckOutComponent } from './gift-check-out.component';

describe('GiftCheckOutComponent', () => {
  let component: GiftCheckOutComponent;
  let fixture: ComponentFixture<GiftCheckOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCheckOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftCheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
