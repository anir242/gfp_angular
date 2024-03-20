import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAboutDataComponent } from './project-about-data.component';

describe('ProjectAboutDataComponent', () => {
  let component: ProjectAboutDataComponent;
  let fixture: ComponentFixture<ProjectAboutDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectAboutDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAboutDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
