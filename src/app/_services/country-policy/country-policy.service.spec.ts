import { TestBed } from '@angular/core/testing';

import { CountryPolicyService } from './country-policy.service';

describe('CountryPolicyService', () => {
  let service: CountryPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
