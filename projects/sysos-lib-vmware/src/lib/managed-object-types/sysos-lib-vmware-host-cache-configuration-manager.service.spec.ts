import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostCacheConfigurationManagerService } from './sysos-lib-vmware-host-cache-configuration-manager.service';

describe('SysosLibVmwareHostCacheConfigurationManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostCacheConfigurationManagerService = TestBed.get(SysosLibVmwareHostCacheConfigurationManagerService);
    expect(service).toBeTruthy();
  });
});
