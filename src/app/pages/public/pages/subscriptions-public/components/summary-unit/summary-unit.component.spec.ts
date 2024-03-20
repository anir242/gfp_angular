import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryUnitComponent } from './summary-unit.component';

describe('SummaryUnitComponent', () => {
  let component: SummaryUnitComponent;
  let fixture: ComponentFixture<SummaryUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
