import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibServiceInjectorService } from './anyopsos-lib-service-injector.service';

describe('AnyOpsOSLibServiceInjectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibServiceInjectorService = TestBed.get(AnyOpsOSLibServiceInjectorService);
    expect(service).toBeTruthy();
  });
});
