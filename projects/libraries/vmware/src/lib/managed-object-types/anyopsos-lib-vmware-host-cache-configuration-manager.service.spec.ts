import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostCacheConfigurationManagerService } from './anyopsos-lib-vmware-host-cache-configuration-manager.service';

describe('AnyOpsOSLibVmwareHostCacheConfigurationManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostCacheConfigurationManagerService = TestBed.get(AnyOpsOSLibVmwareHostCacheConfigurationManagerService);
    expect(service).toBeTruthy();
  });
});
