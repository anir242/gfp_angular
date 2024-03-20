import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportProjectComponent } from './support-project.component';

describe('SupportProjectComponent', () => {
  let component: SupportProjectComponent;
  let fixture: ComponentFixture<SupportProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
