import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareVsanUpgradeSystemService } from './anyopsos-lib-vmware-vsan-upgrade-system.service';

describe('AnyOpsOSLibVmwareVsanUpgradeSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareVsanUpgradeSystemService = TestBed.get(AnyOpsOSLibVmwareVsanUpgradeSystemService);
    expect(service).toBeTruthy();
  });
});
