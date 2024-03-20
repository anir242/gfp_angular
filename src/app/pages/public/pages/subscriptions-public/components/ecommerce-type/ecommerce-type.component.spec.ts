import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceTypeComponent } from './ecommerce-type.component';

describe('EcommerceTypeComponent', () => {
  let component: EcommerceTypeComponent;
  let fixture: ComponentFixture<EcommerceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcommerceTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommerceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
