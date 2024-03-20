import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsTitleComponent } from './project-details-title.component';

describe('ProjectDetailsTitleComponent', () => {
  let component: ProjectDetailsTitleComponent;
  let fixture: ComponentFixture<ProjectDetailsTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDetailsTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
