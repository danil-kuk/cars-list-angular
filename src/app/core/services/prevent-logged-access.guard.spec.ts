import { TestBed } from '@angular/core/testing';

import { PreventLoggedAccessGuard } from './prevent-logged-access.guard';

describe('PreventLoggedAccessGuard', () => {
  let guard: PreventLoggedAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventLoggedAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
