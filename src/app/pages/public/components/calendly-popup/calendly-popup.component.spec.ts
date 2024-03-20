import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendlyPopupComponent } from './calendly-popup.component';

describe('CalendlyPopupComponent', () => {
  let component: CalendlyPopupComponent;
  let fixture: ComponentFixture<CalendlyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendlyPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendlyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
