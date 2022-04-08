import { TestBed } from '@angular/core/testing';

import { UnSecurePageGuard } from './un-secure-page.guard';

describe('UnSecurePageGuard', () => {
  let guard: UnSecurePageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnSecurePageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
