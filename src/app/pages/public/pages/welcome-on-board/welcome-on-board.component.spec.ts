import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeOnBoardComponent } from './welcome-on-board.component';

describe('WelcomeOnBoardComponent', () => {
  let component: WelcomeOnBoardComponent;
  let fixture: ComponentFixture<WelcomeOnBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeOnBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeOnBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
