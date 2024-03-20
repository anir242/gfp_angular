import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineThirdStageComponent } from './marine-third-stage.component';

describe('MarineThirdStageComponent', () => {
  let component: MarineThirdStageComponent;
  let fixture: ComponentFixture<MarineThirdStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineThirdStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineThirdStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
