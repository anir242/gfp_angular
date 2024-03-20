import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutYourCompanyComponent } from './about-your-company.component';

describe('AboutYourCompanyComponent', () => {
  let component: AboutYourCompanyComponent;
  let fixture: ComponentFixture<AboutYourCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutYourCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutYourCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
