import { TestBed } from '@angular/core/testing';

import { SysosLibNetappSecurityKeyManagerKeyService } from './sysos-lib-netapp-security-key-manager-key.service';

describe('SysosLibNetappSecurityKeyManagerKeyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappSecurityKeyManagerKeyService = TestBed.get(SysosLibNetappSecurityKeyManagerKeyService);
    expect(service).toBeTruthy();
  });
});
