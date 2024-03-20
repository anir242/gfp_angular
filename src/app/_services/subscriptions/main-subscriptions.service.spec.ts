import { TestBed } from '@angular/core/testing';

import { MainSubscriptionsService } from './main-subscriptions.service';

describe('MainSubscriptionsService', () => {
  let service: MainSubscriptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainSubscriptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
