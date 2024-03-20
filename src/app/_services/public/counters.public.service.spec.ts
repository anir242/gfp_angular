import { TestBed } from '@angular/core/testing';

import { CountersPublicService } from './counters.public.service';

describe('CountersService', () => {
  let service: CountersPublicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountersPublicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
