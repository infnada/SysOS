import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareVirtualizationManagerService } from './sysos-lib-vmware-virtualization-manager.service';

describe('SysosLibVmwareVirtualizationManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareVirtualizationManagerService = TestBed.get(SysosLibVmwareVirtualizationManagerService);
    expect(service).toBeTruthy();
  });
});
