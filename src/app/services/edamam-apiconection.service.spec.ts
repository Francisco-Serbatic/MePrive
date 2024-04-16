import { TestBed } from '@angular/core/testing';

import { EdamamAPIConectionService } from './edamam-apiconection.service';

describe('EdamamAPIConectionService', () => {
  let service: EdamamAPIConectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdamamAPIConectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
