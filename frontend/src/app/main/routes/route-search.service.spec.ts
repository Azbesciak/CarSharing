import { TestBed, inject } from '@angular/core/testing';

import { RouteSearchService } from './route-search.service';

describe('RouteSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteSearchService]
    });
  });

  it('should be created', inject([RouteSearchService], (service: RouteSearchService) => {
    expect(service).toBeTruthy();
  }));
});
