import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportValueComponent } from './support-value.component';

describe('SupportValueComponent', () => {
  let component: SupportValueComponent;
  let fixture: ComponentFixture<SupportValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
