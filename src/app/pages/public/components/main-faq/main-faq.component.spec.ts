import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFaqComponent } from './main-faq.component';

describe('MainFaqComponent', () => {
  let component: MainFaqComponent;
  let fixture: ComponentFixture<MainFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainFaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
