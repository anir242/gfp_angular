import { TestBed } from '@angular/core/testing';

import { MoosendService } from './moosend.service';

describe('MoosendService', () => {
  let service: MoosendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoosendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
