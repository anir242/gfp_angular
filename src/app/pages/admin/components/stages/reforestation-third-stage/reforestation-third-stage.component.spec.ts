import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReforestationThirdStageComponent } from './reforestation-third-stage.component';

describe('ReforestationThirdStageComponent', () => {
  let component: ReforestationThirdStageComponent;
  let fixture: ComponentFixture<ReforestationThirdStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReforestationThirdStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReforestationThirdStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
