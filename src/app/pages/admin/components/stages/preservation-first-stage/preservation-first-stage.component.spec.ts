import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreservationFirstStageComponent } from './preservation-first-stage.component';

describe('PreservationFirstStageComponent', () => {
  let component: PreservationFirstStageComponent;
  let fixture: ComponentFixture<PreservationFirstStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreservationFirstStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreservationFirstStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
