import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilioModalComponent } from './pilio-modal.component';

describe('PilioModalComponent', () => {
  let component: PilioModalComponent;
  let fixture: ComponentFixture<PilioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PilioModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PilioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
