import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourImpactComponent } from './your-impact.component';

describe('YourImpactComponent', () => {
  let component: YourImpactComponent;
  let fixture: ComponentFixture<YourImpactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourImpactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourImpactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
