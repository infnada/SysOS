import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareLicenseManagerService } from './sysos-lib-vmware-license-manager.service';

describe('SysosLibVmwareLicenseManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareLicenseManagerService = TestBed.get(SysosLibVmwareLicenseManagerService);
    expect(service).toBeTruthy();
  });
});
