import { TestBed } from '@angular/core/testing';

import { DishAPIService } from './dish-api.service';

describe('DishAPIService', () => {
  let service: DishAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
