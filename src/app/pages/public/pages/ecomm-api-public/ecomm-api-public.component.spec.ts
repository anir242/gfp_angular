import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommApiPublicComponent } from './ecomm-api-public.component';

describe('EcommApiPublicComponent', () => {
  let component: EcommApiPublicComponent;
  let fixture: ComponentFixture<EcommApiPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcommApiPublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommApiPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
