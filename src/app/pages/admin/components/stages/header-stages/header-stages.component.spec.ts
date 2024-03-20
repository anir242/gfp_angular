import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderStagesComponent } from './header-stages.component';

describe('HeaderStagesComponent', () => {
  let component: HeaderStagesComponent;
  let fixture: ComponentFixture<HeaderStagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderStagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
