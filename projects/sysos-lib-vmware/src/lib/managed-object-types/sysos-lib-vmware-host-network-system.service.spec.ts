import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostNetworkSystemService } from './sysos-lib-vmware-host-network-system.service';

describe('SysosLibVmwareHostNetworkSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostNetworkSystemService = TestBed.get(SysosLibVmwareHostNetworkSystemService);
    expect(service).toBeTruthy();
  });
});
