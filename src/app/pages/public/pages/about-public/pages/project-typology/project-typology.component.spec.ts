import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypologyComponent } from './project-typology.component';

describe('ProjectTypologyComponent', () => {
  let component: ProjectTypologyComponent;
  let fixture: ComponentFixture<ProjectTypologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTypologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTypologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
