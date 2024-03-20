import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReforestationFourthStageComponent } from './reforestation-fourth-stage.component';

describe('ReforestationFourthStageComponent', () => {
  let component: ReforestationFourthStageComponent;
  let fixture: ComponentFixture<ReforestationFourthStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReforestationFourthStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReforestationFourthStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
