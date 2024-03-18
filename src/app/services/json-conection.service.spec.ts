import { TestBed } from '@angular/core/testing';

import { JsonConectionService } from './json-conection.service';

describe('JsonConectionService', () => {
  let service: JsonConectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonConectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
