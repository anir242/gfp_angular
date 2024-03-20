import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimatePositiveCardsComponent } from './climate-positive-cards.component';

describe('ClimatePositiveCardsComponent', () => {
  let component: ClimatePositiveCardsComponent;
  let fixture: ComponentFixture<ClimatePositiveCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimatePositiveCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClimatePositiveCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
