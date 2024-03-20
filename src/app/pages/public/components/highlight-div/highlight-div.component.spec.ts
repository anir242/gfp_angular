import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightDivComponent } from './highlight-div.component';

describe('HighlightDivComponent', () => {
  let component: HighlightDivComponent;
  let fixture: ComponentFixture<HighlightDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighlightDivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
