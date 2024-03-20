import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineFourthStageComponent } from './marine-fourth-stage.component';

describe('MarineFourthStageComponent', () => {
  let component: MarineFourthStageComponent;
  let fixture: ComponentFixture<MarineFourthStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineFourthStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineFourthStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
