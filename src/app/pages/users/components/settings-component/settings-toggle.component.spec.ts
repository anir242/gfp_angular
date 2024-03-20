import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsToggleComponent } from './settings-toggle.component';

describe('SettingsComponentComponent', () => {
  let component: SettingsToggleComponent;
  let fixture: ComponentFixture<SettingsToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
