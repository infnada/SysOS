import { TestBed } from '@angular/core/testing';

import { SysosLibNetappSecurityKeyManagerService } from './sysos-lib-netapp-security-key-manager.service';

describe('SysosLibNetappSecurityKeyManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappSecurityKeyManagerService = TestBed.get(SysosLibNetappSecurityKeyManagerService);
    expect(service).toBeTruthy();
  });
});
