import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareVsanUpgradeSystemService } from './sysos-lib-vmware-vsan-upgrade-system.service';

describe('SysosLibVmwareVsanUpgradeSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareVsanUpgradeSystemService = TestBed.get(SysosLibVmwareVsanUpgradeSystemService);
    expect(service).toBeTruthy();
  });
});
