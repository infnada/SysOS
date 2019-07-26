import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareOpaqueNetworkService } from './sysos-lib-vmware-opaque-network.service';

describe('SysosLibVmwareOpaqueNetworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareOpaqueNetworkService = TestBed.get(SysosLibVmwareOpaqueNetworkService);
    expect(service).toBeTruthy();
  });
});
