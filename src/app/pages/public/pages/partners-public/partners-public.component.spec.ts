import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersPublicComponent } from './partners-public.component';

describe('PartnersPublicComponent', () => {
  let component: PartnersPublicComponent;
  let fixture: ComponentFixture<PartnersPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnersPublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnersPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
