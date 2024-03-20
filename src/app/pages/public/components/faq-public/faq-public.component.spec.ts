import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqPublicComponent } from './faq-public.component';

describe('FaqPublicComponent', () => {
  let component: FaqPublicComponent;
  let fixture: ComponentFixture<FaqPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqPublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
