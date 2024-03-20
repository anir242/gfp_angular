import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPilioComponent } from './business-pilio.component';

describe('BusinessPilioComponent', () => {
  let component: BusinessPilioComponent;
  let fixture: ComponentFixture<BusinessPilioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessPilioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessPilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
