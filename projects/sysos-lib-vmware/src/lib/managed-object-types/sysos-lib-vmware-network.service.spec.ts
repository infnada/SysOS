import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareNetworkService } from './sysos-lib-vmware-network.service';

describe('SysosLibVmwareNetworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareNetworkService = TestBed.get(SysosLibVmwareNetworkService);
    expect(service).toBeTruthy();
  });
});
