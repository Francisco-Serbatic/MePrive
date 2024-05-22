import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ordersGuard } from './orders.guard';

describe('ordersGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ordersGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
