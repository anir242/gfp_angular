import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftPickInfoComponent } from './gift-pick-info.component';

describe('GiftPickInfoComponent', () => {
  let component: GiftPickInfoComponent;
  let fixture: ComponentFixture<GiftPickInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftPickInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftPickInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
