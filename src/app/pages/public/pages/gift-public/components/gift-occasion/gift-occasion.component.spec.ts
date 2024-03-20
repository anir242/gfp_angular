import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftOccasionComponent } from './gift-occasion.component';

describe('GiftOccasionComponent', () => {
  let component: GiftOccasionComponent;
  let fixture: ComponentFixture<GiftOccasionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftOccasionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftOccasionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
