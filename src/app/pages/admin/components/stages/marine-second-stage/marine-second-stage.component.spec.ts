import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineSecondStageComponent } from './marine-second-stage.component';

describe('MarineSecondStageComponent', () => {
  let component: MarineSecondStageComponent;
  let fixture: ComponentFixture<MarineSecondStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineSecondStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineSecondStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
