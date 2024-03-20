import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsCharacteristicsComponent } from './project-details-characteristics.component';

describe('ProjectDetailsCharacteristicsComponent', () => {
  let component: ProjectDetailsCharacteristicsComponent;
  let fixture: ComponentFixture<ProjectDetailsCharacteristicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDetailsCharacteristicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsCharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
