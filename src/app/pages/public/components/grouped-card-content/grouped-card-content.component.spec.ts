import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedCardContentComponent } from './grouped-card-content.component';

describe('GroupedCardContentComponent', () => {
  let component: GroupedCardContentComponent;
  let fixture: ComponentFixture<GroupedCardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupedCardContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupedCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
