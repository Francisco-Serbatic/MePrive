import { TestBed } from '@angular/core/testing';

import { GetImageService } from './get-image.service';

describe('GetImageService', () => {
  let service: GetImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
