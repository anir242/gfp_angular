import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineFirstStageComponent } from './marine-first-stage.component';

describe('MarineFirstStageComponent', () => {
  let component: MarineFirstStageComponent;
  let fixture: ComponentFixture<MarineFirstStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarineFirstStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarineFirstStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
