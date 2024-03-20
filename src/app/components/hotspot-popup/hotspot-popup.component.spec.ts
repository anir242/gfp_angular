import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotspotPopupComponent } from './hotspot-popup.component';

describe('HotspotPopupComponent', () => {
  let component: HotspotPopupComponent;
  let fixture: ComponentFixture<HotspotPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotspotPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotspotPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
