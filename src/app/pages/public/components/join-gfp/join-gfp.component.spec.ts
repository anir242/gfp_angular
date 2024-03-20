import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinGfpComponent } from './join-gfp.component';

describe('JoinGfpComponent', () => {
  let component: JoinGfpComponent;
  let fixture: ComponentFixture<JoinGfpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinGfpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinGfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
