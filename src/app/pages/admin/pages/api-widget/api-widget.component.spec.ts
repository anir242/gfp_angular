import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiWidgetComponent } from './api-widget.component';

describe('ApiWidgetComponent', () => {
  let component: ApiWidgetComponent;
  let fixture: ComponentFixture<ApiWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
