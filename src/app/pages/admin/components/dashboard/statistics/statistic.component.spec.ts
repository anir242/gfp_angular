import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStatisticComponent } from './statistic.component';

describe('DashboardStatisticComponent', () => {
  let component: DashboardStatisticComponent;
  let fixture: ComponentFixture<DashboardStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
