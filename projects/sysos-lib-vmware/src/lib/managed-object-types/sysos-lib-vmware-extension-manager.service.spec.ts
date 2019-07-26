import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareExtensionManagerService } from './sysos-lib-vmware-extension-manager.service';

describe('SysosLibVmwareExtensionManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareExtensionManagerService = TestBed.get(SysosLibVmwareExtensionManagerService);
    expect(service).toBeTruthy();
  });
});
