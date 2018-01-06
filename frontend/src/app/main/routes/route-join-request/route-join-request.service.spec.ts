import { TestBed, inject } from '@angular/core/testing';

import { RouteJoinRequestService } from './route-join-request.service';

describe('RouteJoinRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteJoinRequestService]
    });
  });

  it('should be created', inject([RouteJoinRequestService], (service: RouteJoinRequestService) => {
    expect(service).toBeTruthy();
  }));
});
