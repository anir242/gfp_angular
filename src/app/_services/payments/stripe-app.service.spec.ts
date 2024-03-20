import { TestBed } from '@angular/core/testing';

import { StripeAppService } from './stripe-app.service';

describe('StripeAppService', () => {
  let service: StripeAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StripeAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
