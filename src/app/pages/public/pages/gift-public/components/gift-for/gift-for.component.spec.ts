import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftForComponent } from './gift-for.component';

describe('GiftForComponent', () => {
  let component: GiftForComponent;
  let fixture: ComponentFixture<GiftForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftForComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
