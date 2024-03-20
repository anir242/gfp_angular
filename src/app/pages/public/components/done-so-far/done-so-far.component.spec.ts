import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneSoFarComponent } from './done-so-far.component';

describe('DoneSoFarComponent', () => {
  let component: DoneSoFarComponent;
  let fixture: ComponentFixture<DoneSoFarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoneSoFarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneSoFarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
