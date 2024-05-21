import { TestBed } from '@angular/core/testing';

import { DateManagerService } from './date-manager.service';

describe('DateManagerService', () => {
  let service: DateManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
