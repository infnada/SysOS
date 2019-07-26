import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostImageConfigManagerService } from './sysos-lib-vmware-host-image-config-manager.service';

describe('SysosLibVmwareHostImageConfigManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostImageConfigManagerService = TestBed.get(SysosLibVmwareHostImageConfigManagerService);
    expect(service).toBeTruthy();
  });
});
