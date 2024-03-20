import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsPublicComponent } from './tools-public.component';

describe('ToolsPublicComponent', () => {
  let component: ToolsPublicComponent;
  let fixture: ComponentFixture<ToolsPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsPublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolsPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
