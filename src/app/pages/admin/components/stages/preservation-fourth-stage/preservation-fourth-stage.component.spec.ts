import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreservationFourthStageComponent } from './preservation-fourth-stage.component';

describe('PreservationFourthStageComponent', () => {
  let component: PreservationFourthStageComponent;
  let fixture: ComponentFixture<PreservationFourthStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreservationFourthStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreservationFourthStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
