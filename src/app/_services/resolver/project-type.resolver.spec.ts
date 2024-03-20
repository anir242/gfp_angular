import { TestBed } from '@angular/core/testing';

import { ProjectTypeResolver } from './project-type.resolver';

describe('ProjectTypeResolver', () => {
  let resolver: ProjectTypeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProjectTypeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
