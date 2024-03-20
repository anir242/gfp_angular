import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonDioxideOffsetComponent } from './carbon-dioxide-offset.component';

describe('CarbonDioxideOffsetComponent', () => {
  let component: CarbonDioxideOffsetComponent;
  let fixture: ComponentFixture<CarbonDioxideOffsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbonDioxideOffsetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbonDioxideOffsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
