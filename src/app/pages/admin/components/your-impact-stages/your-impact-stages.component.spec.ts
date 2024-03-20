import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourImpactStagesComponent } from './your-impact-stages.component';

describe('YourImpactStagesComponent', () => {
  let component: YourImpactStagesComponent;
  let fixture: ComponentFixture<YourImpactStagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourImpactStagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourImpactStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
