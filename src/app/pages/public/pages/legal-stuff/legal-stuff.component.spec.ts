import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalStuffComponent } from './legal-stuff.component';

describe('PrivacyPolicyComponent', () => {
  let component: LegalStuffComponent;
  let fixture: ComponentFixture<LegalStuffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalStuffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
