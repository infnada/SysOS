import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappPlatformCapService } from './anyopsos-lib-netapp-platform-cap.service';

describe('AnyOpsOSLibNetappPlatformCapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappPlatformCapService = TestBed.get(AnyOpsOSLibNetappPlatformCapService);
    expect(service).toBeTruthy();
  });
});
