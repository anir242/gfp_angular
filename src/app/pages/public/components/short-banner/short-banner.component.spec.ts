import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortBannerComponent } from './short-banner.component';

describe('ShortBannerComponent', () => {
  let component: ShortBannerComponent;
  let fixture: ComponentFixture<ShortBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
