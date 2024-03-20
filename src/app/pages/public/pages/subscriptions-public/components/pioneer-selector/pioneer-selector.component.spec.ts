import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PioneerSelectorComponent } from './pioneer-selector.component';

describe('PioneerSelectorComponent', () => {
  let component: PioneerSelectorComponent;
  let fixture: ComponentFixture<PioneerSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PioneerSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PioneerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
