import { TestBed } from '@angular/core/testing';

import { AdminSubscriptionsService } from './admin-subscriptions.service';

describe('AdminSubscriptionsService', () => {
  let service: AdminSubscriptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSubscriptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
