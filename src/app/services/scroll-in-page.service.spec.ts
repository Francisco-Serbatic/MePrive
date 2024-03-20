import { TestBed } from '@angular/core/testing';

import { ScrollInPageService } from './scroll-in-page.service';

describe('ScrollInPageService', () => {
  let service: ScrollInPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollInPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
