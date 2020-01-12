import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostAuthenticationManagerService } from './anyopsos-lib-vmware-host-authentication-manager.service';

describe('AnyOpsOSLibVmwareHostAuthenticationManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostAuthenticationManagerService = TestBed.get(AnyOpsOSLibVmwareHostAuthenticationManagerService);
    expect(service).toBeTruthy();
  });
});
