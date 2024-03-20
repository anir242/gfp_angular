import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsPublicComponent } from './projects-public.component';

describe('ProjectsPublicComponent', () => {
  let component: ProjectsPublicComponent;
  let fixture: ComponentFixture<ProjectsPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
