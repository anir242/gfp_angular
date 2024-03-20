import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeFutureComponent } from './shape-future.component';

describe('ShapeFutureComponent', () => {
  let component: ShapeFutureComponent;
  let fixture: ComponentFixture<ShapeFutureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapeFutureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeFutureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
