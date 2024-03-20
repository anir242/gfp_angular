import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyJoinComponent } from './why-join.component';

describe('WhyJoinComponent', () => {
  let component: WhyJoinComponent;
  let fixture: ComponentFixture<WhyJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyJoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
