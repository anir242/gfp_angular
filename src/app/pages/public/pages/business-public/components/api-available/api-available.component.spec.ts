import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiAvailableComponent } from './api-available.component';

describe('ApiAvailableComponent', () => {
  let component: ApiAvailableComponent;
  let fixture: ComponentFixture<ApiAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiAvailableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
