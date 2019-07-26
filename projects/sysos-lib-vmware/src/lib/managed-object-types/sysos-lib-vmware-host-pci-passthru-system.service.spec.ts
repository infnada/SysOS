import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostPciPassthruSystemService } from './sysos-lib-vmware-host-pci-passthru-system.service';

describe('SysosLibVmwareHostPciPassthruSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostPciPassthruSystemService = TestBed.get(SysosLibVmwareHostPciPassthruSystemService);
    expect(service).toBeTruthy();
  });
});
