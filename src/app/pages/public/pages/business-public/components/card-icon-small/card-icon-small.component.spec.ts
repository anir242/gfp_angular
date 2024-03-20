import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardIconSmallComponent } from './card-icon-small.component';

describe('CardIconSmallComponent', () => {
  let component: CardIconSmallComponent;
  let fixture: ComponentFixture<CardIconSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardIconSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardIconSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
