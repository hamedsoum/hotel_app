import { TestBed } from '@angular/core/testing';

import { HotleListGuard } from './hotle-list.guard';

describe('HotleListGuard', () => {
  let guard: HotleListGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HotleListGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
