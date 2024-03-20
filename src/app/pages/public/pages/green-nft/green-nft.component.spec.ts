import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenNftComponent } from './green-nft.component';

describe('GreenNftComponent', () => {
  let component: GreenNftComponent;
  let fixture: ComponentFixture<GreenNftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenNftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
