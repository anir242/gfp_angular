import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftContactInfoComponent } from './gift-contact-info.component';

describe('GiftContactInfoComponent', () => {
  let component: GiftContactInfoComponent;
  let fixture: ComponentFixture<GiftContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftContactInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
