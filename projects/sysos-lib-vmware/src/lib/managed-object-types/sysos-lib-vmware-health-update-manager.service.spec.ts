import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHealthUpdateManagerService } from './sysos-lib-vmware-health-update-manager.service';

describe('SysosLibVmwareHealthUpdateManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHealthUpdateManagerService = TestBed.get(SysosLibVmwareHealthUpdateManagerService);
    expect(service).toBeTruthy();
  });
});
