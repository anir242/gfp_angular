import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportingCardsComponent } from './supporting-cards.component';

describe('SupportingComponent', () => {
  let component: SupportingCardsComponent;
  let fixture: ComponentFixture<SupportingCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportingCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportingCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
