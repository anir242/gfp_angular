import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactEmployeesComponent } from './impact-employees.component';

describe('ImpactEmployeesComponent', () => {
  let component: ImpactEmployeesComponent;
  let fixture: ComponentFixture<ImpactEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpactEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
