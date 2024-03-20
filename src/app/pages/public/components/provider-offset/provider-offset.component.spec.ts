import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderOffsetComponent } from './provider-offset.component';

describe('ProviderOffsetComponent', () => {
  let component: ProviderOffsetComponent;
  let fixture: ComponentFixture<ProviderOffsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderOffsetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderOffsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
