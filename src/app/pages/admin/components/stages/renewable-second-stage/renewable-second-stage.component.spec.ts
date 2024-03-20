import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewableSecondStageComponent } from './renewable-second-stage.component';

describe('RenewableSecondStageComponent', () => {
  let component: RenewableSecondStageComponent;
  let fixture: ComponentFixture<RenewableSecondStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewableSecondStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewableSecondStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
