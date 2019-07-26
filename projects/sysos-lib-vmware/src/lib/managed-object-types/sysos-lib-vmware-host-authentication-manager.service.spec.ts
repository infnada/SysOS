import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostAuthenticationManagerService } from './sysos-lib-vmware-host-authentication-manager.service';

describe('SysosLibVmwareHostAuthenticationManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostAuthenticationManagerService = TestBed.get(SysosLibVmwareHostAuthenticationManagerService);
    expect(service).toBeTruthy();
  });
});
