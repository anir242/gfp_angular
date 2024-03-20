import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPublicDetailsComponent } from './project-public-details.component';

describe('ProjectPublicDetailsComponent', () => {
  let component: ProjectPublicDetailsComponent;
  let fixture: ComponentFixture<ProjectPublicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPublicDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPublicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
