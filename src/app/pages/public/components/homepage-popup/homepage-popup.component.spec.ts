import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagePopupComponent } from './homepage-popup.component';

describe('HomepagePopupComponent', () => {
  let component: HomepagePopupComponent;
  let fixture: ComponentFixture<HomepagePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepagePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
