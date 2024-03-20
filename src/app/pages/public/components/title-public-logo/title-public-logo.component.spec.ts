import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlePublicLogoComponent } from './title-public-logo.component';

describe('TitlePublicLogoComponent', () => {
  let component: TitlePublicLogoComponent;
  let fixture: ComponentFixture<TitlePublicLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitlePublicLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitlePublicLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
