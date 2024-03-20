import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleImagesComponent } from './title-images.component';

describe('VerifiedStandardsComponent', () => {
  let component: TitleImagesComponent;
  let fixture: ComponentFixture<TitleImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
