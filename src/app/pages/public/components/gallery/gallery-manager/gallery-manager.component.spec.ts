import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryManagerPublicComponent } from './gallery-manager.component';

describe('GalleryManagerPublicComponent', () => {
  let component: GalleryManagerPublicComponent;
  let fixture: ComponentFixture<GalleryManagerPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryManagerPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryManagerPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
