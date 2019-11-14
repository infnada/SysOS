import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappDiskService } from './anyopsos-lib-netapp-disk.service';

describe('AnyOpsOSLibNetappDiskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappDiskService = TestBed.get(AnyOpsOSLibNetappDiskService);
    expect(service).toBeTruthy();
  });
});
