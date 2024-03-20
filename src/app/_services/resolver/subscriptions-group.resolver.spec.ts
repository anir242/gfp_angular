import { TestBed } from '@angular/core/testing';

import { SubscriptionsGroupResolver } from './subscriptions-group.resolver';

describe('SubscriptionsGroupResolver', () => {
  let resolver: SubscriptionsGroupResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SubscriptionsGroupResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
