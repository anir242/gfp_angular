import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCartPopupComponent } from './gift-cart-popup.component';

describe('GiftCartPopupComponent', () => {
  let component: GiftCartPopupComponent;
  let fixture: ComponentFixture<GiftCartPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCartPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftCartPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
