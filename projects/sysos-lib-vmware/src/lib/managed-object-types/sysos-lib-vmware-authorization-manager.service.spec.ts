import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareAuthorizationManagerService } from './sysos-lib-vmware-authorization-manager.service';

describe('SysosLibVmwareAuthorizationManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareAuthorizationManagerService = TestBed.get(SysosLibVmwareAuthorizationManagerService);
    expect(service).toBeTruthy();
  });
});
