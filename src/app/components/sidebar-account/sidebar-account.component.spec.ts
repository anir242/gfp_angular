import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAccountComponent } from './sidebar-account.component';

describe('SidebarComponent', () => {
  let component: SidebarAccountComponent;
  let fixture: ComponentFixture<SidebarAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
