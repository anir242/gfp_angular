import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterAuthenticationComponent } from './footer-authentication.component';

describe('FooterAuthenticationComponent', () => {
  let component: FooterAuthenticationComponent;
  let fixture: ComponentFixture<FooterAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterAuthenticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
