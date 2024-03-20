import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewableFirstStageComponent } from './renewable-first-stage.component';

describe('RenewableFirstStageComponent', () => {
  let component: RenewableFirstStageComponent;
  let fixture: ComponentFixture<RenewableFirstStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewableFirstStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewableFirstStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
