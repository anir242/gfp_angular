import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Co2OffsettedComponent } from './co2-offsetted.component';

describe('Co2OffsettedComponent', () => {
  let component: Co2OffsettedComponent;
  let fixture: ComponentFixture<Co2OffsettedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Co2OffsettedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Co2OffsettedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
