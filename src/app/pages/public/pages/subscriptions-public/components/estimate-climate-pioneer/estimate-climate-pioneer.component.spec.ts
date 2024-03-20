import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateClimatePioneerComponent } from './estimate-climate-pioneer.component';

describe('EstimateClimatePioneerComponent', () => {
  let component: EstimateClimatePioneerComponent;
  let fixture: ComponentFixture<EstimateClimatePioneerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimateClimatePioneerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateClimatePioneerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
