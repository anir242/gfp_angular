import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReforestationFirstStageComponent } from './reforestation-first-stage.component';

describe('ReforestationFirstStageComponent', () => {
  let component: ReforestationFirstStageComponent;
  let fixture: ComponentFixture<ReforestationFirstStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReforestationFirstStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReforestationFirstStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
