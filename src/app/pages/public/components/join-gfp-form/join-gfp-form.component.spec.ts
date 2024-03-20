import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinGfpFormComponent } from './join-gfp-form.component';

describe('JoinGfpFormComponent', () => {
  let component: JoinGfpFormComponent;
  let fixture: ComponentFixture<JoinGfpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinGfpFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinGfpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
