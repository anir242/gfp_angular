import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReforestationSecondStageComponent } from './reforestation-second-stage.component';

describe('ReforestationSecondStageComponent', () => {
  let component: ReforestationSecondStageComponent;
  let fixture: ComponentFixture<ReforestationSecondStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReforestationSecondStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReforestationSecondStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
