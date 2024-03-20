import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsDataComponent } from './achievements-data.component';

describe('AchievementsComponent', () => {
  let component: AchievementsDataComponent;
  let fixture: ComponentFixture<AchievementsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchievementsDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
