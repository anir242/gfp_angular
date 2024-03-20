import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonFootprintManagementComponent } from './carbon-footprint-management.component';

describe('CarbonFootprintManagementComponent', () => {
  let component: CarbonFootprintManagementComponent;
  let fixture: ComponentFixture<CarbonFootprintManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbonFootprintManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbonFootprintManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
