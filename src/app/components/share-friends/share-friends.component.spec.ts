import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareFriendsComponent } from './share-friends.component';

describe('ShareFriendsComponent', () => {
  let component: ShareFriendsComponent;
  let fixture: ComponentFixture<ShareFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareFriendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
