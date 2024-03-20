import { TestBed } from '@angular/core/testing';

import { InviteCodeService } from './invite-code.service';

describe('InviteCodeService', () => {
  let service: InviteCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InviteCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
