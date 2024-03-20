import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPlanCardComponent } from './personal-plan-card.component';

describe('PersonalPlanCardComponent', () => {
  let component: PersonalPlanCardComponent;
  let fixture: ComponentFixture<PersonalPlanCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalPlanCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalPlanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
