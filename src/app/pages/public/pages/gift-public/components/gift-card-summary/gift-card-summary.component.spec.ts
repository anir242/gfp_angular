import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCardSummaryComponent } from './gift-card-summary.component';

describe('GiftCardSummaryComponent', () => {
  let component: GiftCardSummaryComponent;
  let fixture: ComponentFixture<GiftCardSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCardSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftCardSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
