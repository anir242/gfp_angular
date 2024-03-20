import { TestBed } from '@angular/core/testing';

import { PartnersPublicService } from './partners.public.service';

describe('Partners.PublicService', () => {
  let service: PartnersPublicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnersPublicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
