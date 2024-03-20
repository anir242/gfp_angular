import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardIconTextComponent } from './card-icon-text.component';

describe('CardIconTextComponent', () => {
  let component: CardIconTextComponent;
  let fixture: ComponentFixture<CardIconTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardIconTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardIconTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
