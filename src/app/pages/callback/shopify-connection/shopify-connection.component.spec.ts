import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopifyConnectionComponent } from './shopify-connection.component';

describe('ShopifyConnectionComponent', () => {
  let component: ShopifyConnectionComponent;
  let fixture: ComponentFixture<ShopifyConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopifyConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopifyConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
