import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlePublicComponent } from './title-public.component';

describe('TitlePublicComponent', () => {
  let component: TitlePublicComponent;
  let fixture: ComponentFixture<TitlePublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitlePublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitlePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
