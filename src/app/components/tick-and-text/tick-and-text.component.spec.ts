import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickAndTextComponent } from './tick-and-text.component';

describe('TickAndTextComponent', () => {
  let component: TickAndTextComponent;
  let fixture: ComponentFixture<TickAndTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickAndTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TickAndTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
