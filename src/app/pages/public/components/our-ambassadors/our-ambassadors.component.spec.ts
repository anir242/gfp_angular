import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurAmbassadorsComponent } from './our-ambassadors.component';

describe('OurAmbassadorsComponent', () => {
  let component: OurAmbassadorsComponent;
  let fixture: ComponentFixture<OurAmbassadorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurAmbassadorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurAmbassadorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
