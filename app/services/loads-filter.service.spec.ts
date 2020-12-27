import { TestBed } from '@angular/core/testing';

import { LoadsFilterService } from './loads-filter.service';

describe('LoadsFilterService', () => {
  let service: LoadsFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadsFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
