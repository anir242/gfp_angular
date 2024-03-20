import { TestBed } from '@angular/core/testing';

import { EcommerceTypesService } from './ecommerce-types.service';

describe('EcommerceTypesService', () => {
  let service: EcommerceTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcommerceTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
