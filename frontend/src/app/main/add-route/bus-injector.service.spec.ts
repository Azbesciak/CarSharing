import { TestBed, inject } from '@angular/core/testing';

import { BusInjectorService } from './bus-injector.service';

describe('BusInjectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusInjectorService]
    });
  });

  it('should be created', inject([BusInjectorService], (service: BusInjectorService) => {
    expect(service).toBeTruthy();
  }));
});
