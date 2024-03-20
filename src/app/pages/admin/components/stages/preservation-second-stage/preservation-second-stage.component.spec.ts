import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreservationSecondStageComponent } from './preservation-second-stage.component';

describe('PreservationSecondStageComponent', () => {
  let component: PreservationSecondStageComponent;
  let fixture: ComponentFixture<PreservationSecondStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreservationSecondStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreservationSecondStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
