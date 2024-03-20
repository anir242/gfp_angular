import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonNeutralSolutionsComponent } from './carbon-neutral-solutions.component';

describe('CarbonNeutralSolutionsComponent', () => {
  let component: CarbonNeutralSolutionsComponent;
  let fixture: ComponentFixture<CarbonNeutralSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbonNeutralSolutionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbonNeutralSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
