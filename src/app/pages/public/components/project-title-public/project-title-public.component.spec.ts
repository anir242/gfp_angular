import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTitlePublicComponent } from './project-title-public.component';

describe('ProjectTitlePublicComponent', () => {
  let component: ProjectTitlePublicComponent;
  let fixture: ComponentFixture<ProjectTitlePublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTitlePublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTitlePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
