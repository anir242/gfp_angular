import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftAboutComponent } from './gift-about.component';

describe('GiftAboutComponent', () => {
  let component: GiftAboutComponent;
  let fixture: ComponentFixture<GiftAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
