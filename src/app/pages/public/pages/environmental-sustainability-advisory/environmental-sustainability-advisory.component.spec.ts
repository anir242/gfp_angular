import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentalSustainabilityAdvisoryComponent } from './environmental-sustainability-advisory.component';

describe('EnvironmentalSustainabilityAdvisoryComponent', () => {
  let component: EnvironmentalSustainabilityAdvisoryComponent;
  let fixture: ComponentFixture<EnvironmentalSustainabilityAdvisoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironmentalSustainabilityAdvisoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentalSustainabilityAdvisoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
