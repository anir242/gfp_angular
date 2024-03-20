import { TestBed } from '@angular/core/testing';

import { ProjectTypologyService } from './project-typology.service';

describe('ProjectTypologyService', () => {
  let service: ProjectTypologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectTypologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
