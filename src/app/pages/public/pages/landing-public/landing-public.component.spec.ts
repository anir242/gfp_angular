import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPublicComponent } from './landing-public.component';

describe('LandingPublicComponent', () => {
  let component: LandingPublicComponent;
  let fixture: ComponentFixture<LandingPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
