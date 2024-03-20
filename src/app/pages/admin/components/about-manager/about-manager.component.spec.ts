import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutManagerComponent } from './about-manager.component';

describe('AboutManagerComponent', () => {
  let component: AboutManagerComponent;
  let fixture: ComponentFixture<AboutManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
