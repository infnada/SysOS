import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostLocalAccountManagerService } from './sysos-lib-vmware-host-local-account-manager.service';

describe('SysosLibVmwareHostLocalAccountManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostLocalAccountManagerService = TestBed.get(SysosLibVmwareHostLocalAccountManagerService);
    expect(service).toBeTruthy();
  });
});
