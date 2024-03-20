import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourDataSummaryComponent } from './your-data-summary.component';

describe('YourDataSummaryComponent', () => {
  let component: YourDataSummaryComponent;
  let fixture: ComponentFixture<YourDataSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourDataSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourDataSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
