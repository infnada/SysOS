import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappLdapService } from './anyopsos-lib-netapp-ldap.service';

describe('AnyOpsOSLibNetappLdapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappLdapService = TestBed.get(AnyOpsOSLibNetappLdapService);
    expect(service).toBeTruthy();
  });
});
