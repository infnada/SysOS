import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostAuthenticationStoreService } from './sysos-lib-vmware-host-authentication-store.service';

describe('SysosLibVmwareHostAuthenticationStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostAuthenticationStoreService = TestBed.get(SysosLibVmwareHostAuthenticationStoreService);
    expect(service).toBeTruthy();
  });
});
