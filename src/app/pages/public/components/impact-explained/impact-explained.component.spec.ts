import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactExplainedComponent } from './impact-explained.component';

describe('ImpactExplainedComponent', () => {
  let component: ImpactExplainedComponent;
  let fixture: ComponentFixture<ImpactExplainedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpactExplainedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactExplainedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
