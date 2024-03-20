import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCartComponent } from './gift-cart.component';

describe('GiftListComponent', () => {
  let component: GiftCartComponent;
  let fixture: ComponentFixture<GiftCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
