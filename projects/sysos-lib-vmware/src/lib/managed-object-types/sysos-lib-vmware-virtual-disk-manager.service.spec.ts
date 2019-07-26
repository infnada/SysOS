import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareVirtualDiskManagerService } from './sysos-lib-vmware-virtual-disk-manager.service';

describe('SysosLibVmwareVirtualDiskManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareVirtualDiskManagerService = TestBed.get(SysosLibVmwareVirtualDiskManagerService);
    expect(service).toBeTruthy();
  });
});
