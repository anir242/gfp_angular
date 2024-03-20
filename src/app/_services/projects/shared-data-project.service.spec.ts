import { TestBed } from '@angular/core/testing';

import { SharedDataProjectService } from './shared-data-project.service';

describe('SharedDataProjectService', () => {
  let service: SharedDataProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDataProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
