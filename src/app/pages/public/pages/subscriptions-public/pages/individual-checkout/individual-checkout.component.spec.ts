import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualCheckoutComponent } from './individual-checkout.component';

describe('IndividualCheckoutComponent', () => {
  let component: IndividualCheckoutComponent;
  let fixture: ComponentFixture<IndividualCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
