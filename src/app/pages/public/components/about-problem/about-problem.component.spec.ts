import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutProblemComponent } from './about-problem.component';

describe('AboutProblemComponent', () => {
  let component: AboutProblemComponent;
  let fixture: ComponentFixture<AboutProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
