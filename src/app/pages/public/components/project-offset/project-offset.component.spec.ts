import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOffsetComponent } from './project-offset.component';

describe('ProjectOffsetComponent', () => {
  let component: ProjectOffsetComponent;
  let fixture: ComponentFixture<ProjectOffsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectOffsetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectOffsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
