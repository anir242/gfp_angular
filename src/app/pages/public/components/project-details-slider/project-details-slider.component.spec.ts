import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsSliderComponent } from './project-details-slider.component';

describe('ProjectDetailsSliderComponent', () => {
  let component: ProjectDetailsSliderComponent;
  let fixture: ComponentFixture<ProjectDetailsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDetailsSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
