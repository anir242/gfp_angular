import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressScrollerComponent } from './progress-scroller.component';

describe('ProgressScrollerComponent', () => {
  let component: ProgressScrollerComponent;
  let fixture: ComponentFixture<ProgressScrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressScrollerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
