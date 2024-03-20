import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeGiftComponent } from './make-gift.component';

describe('MakeGiftComponent', () => {
  let component: MakeGiftComponent;
  let fixture: ComponentFixture<MakeGiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeGiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
