import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftPersonalizedTextComponent } from './gift-personalized-text.component';

describe('GiftPersonalizedTextComponent', () => {
  let component: GiftPersonalizedTextComponent;
  let fixture: ComponentFixture<GiftPersonalizedTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftPersonalizedTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftPersonalizedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
