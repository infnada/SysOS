import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappNisService } from './anyopsos-lib-netapp-nis.service';

describe('AnyOpsOSLibNetappNisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappNisService = TestBed.get(AnyOpsOSLibNetappNisService);
    expect(service).toBeTruthy();
  });
});
