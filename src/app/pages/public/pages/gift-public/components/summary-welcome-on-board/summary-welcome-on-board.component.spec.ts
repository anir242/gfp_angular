import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryWelcomeOnBoardComponent } from './summary-welcome-on-board.component';

describe('SummaryWelcomeOnBoardComponent', () => {
  let component: SummaryWelcomeOnBoardComponent;
  let fixture: ComponentFixture<SummaryWelcomeOnBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryWelcomeOnBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryWelcomeOnBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
