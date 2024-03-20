import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTitlePublicComponent } from './about-title-public.component';

describe('AboutTitlePublicComponent', () => {
  let component: AboutTitlePublicComponent;
  let fixture: ComponentFixture<AboutTitlePublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutTitlePublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutTitlePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
