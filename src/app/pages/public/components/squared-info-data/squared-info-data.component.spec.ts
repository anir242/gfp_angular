import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquaredInfoDataComponent } from './squared-info-data.component';

describe('SquaredInfoDataComponent', () => {
  let component: SquaredInfoDataComponent;
  let fixture: ComponentFixture<SquaredInfoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquaredInfoDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquaredInfoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
