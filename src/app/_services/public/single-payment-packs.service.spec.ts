import { TestBed } from '@angular/core/testing';

import { SinglePaymentPacksService } from './single-payment-packs.service';

describe('SinglePaymentPacksService', () => {
  let service: SinglePaymentPacksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinglePaymentPacksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
