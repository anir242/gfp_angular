import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCartSummaryDataComponent } from './gift-cart-summary-data.component';

describe('GiftCartSummaryDataComponent', () => {
  let component: GiftCartSummaryDataComponent;
  let fixture: ComponentFixture<GiftCartSummaryDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCartSummaryDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftCartSummaryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
