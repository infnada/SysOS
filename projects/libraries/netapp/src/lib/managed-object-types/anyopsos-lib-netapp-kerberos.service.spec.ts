import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappKerberosService } from './anyopsos-lib-netapp-kerberos.service';

describe('AnyOpsOSLibNetappKerberosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappKerberosService = TestBed.get(AnyOpsOSLibNetappKerberosService);
    expect(service).toBeTruthy();
  });
});
