import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCardSentComponent } from './gift-card-sent.component';

describe('GiftCardSendedComponent', () => {
  let component: GiftCardSentComponent;
  let fixture: ComponentFixture<GiftCardSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCardSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftCardSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
