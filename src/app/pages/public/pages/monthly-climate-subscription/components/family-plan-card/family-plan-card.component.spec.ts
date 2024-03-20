import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyPlanCardComponent } from './family-plan-card.component';

describe('FamilyPlanCardComponent', () => {
  let component: FamilyPlanCardComponent;
  let fixture: ComponentFixture<FamilyPlanCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyPlanCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyPlanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
