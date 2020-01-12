import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSnaplockService } from './anyopsos-lib-netapp-snaplock.service';

describe('AnyOpsOSLibNetappSnaplockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSnaplockService = TestBed.get(AnyOpsOSLibNetappSnaplockService);
    expect(service).toBeTruthy();
  });
});
