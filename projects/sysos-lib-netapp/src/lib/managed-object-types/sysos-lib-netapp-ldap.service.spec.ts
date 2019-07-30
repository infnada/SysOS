import { TestBed } from '@angular/core/testing';

import { SysosLibNetappLdapService } from './sysos-lib-netapp-ldap.service';

describe('SysosLibNetappLdapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappLdapService = TestBed.get(SysosLibNetappLdapService);
    expect(service).toBeTruthy();
  });
});
