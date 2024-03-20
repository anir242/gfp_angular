import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerHeaderCardComponent } from './layer-header-card.component';

describe('LayerHeaderCardComponent', () => {
  let component: LayerHeaderCardComponent;
  let fixture: ComponentFixture<LayerHeaderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayerHeaderCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayerHeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
