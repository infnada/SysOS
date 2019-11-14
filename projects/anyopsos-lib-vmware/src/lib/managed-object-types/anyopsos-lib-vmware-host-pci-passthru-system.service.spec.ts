import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostPciPassthruSystemService } from './anyopsos-lib-vmware-host-pci-passthru-system.service';

describe('AnyOpsOSLibVmwareHostPciPassthruSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostPciPassthruSystemService = TestBed.get(AnyOpsOSLibVmwareHostPciPassthruSystemService);
    expect(service).toBeTruthy();
  });
});
