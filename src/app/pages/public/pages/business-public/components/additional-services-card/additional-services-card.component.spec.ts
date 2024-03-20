import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalServicesCardComponent } from './additional-services-card.component';

describe('AdditionalServicesCardComponent', () => {
  let component: AdditionalServicesCardComponent;
  let fixture: ComponentFixture<AdditionalServicesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalServicesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalServicesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
