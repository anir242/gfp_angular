import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftSummaryComponent } from './gift-summary.component';

describe('GiftSummaryComponent', () => {
  let component: GiftSummaryComponent;
  let fixture: ComponentFixture<GiftSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
