import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteEmployeeComponent } from './invite-employee.component';

describe('InviteEmployeeComponent', () => {
  let component: InviteEmployeeComponent;
  let fixture: ComponentFixture<InviteEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
