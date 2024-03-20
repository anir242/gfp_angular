import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiStepItemComponent } from './api-step-item.component';

describe('DataIntegrationComponent', () => {
  let component: ApiStepItemComponent;
  let fixture: ComponentFixture<ApiStepItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiStepItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiStepItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
