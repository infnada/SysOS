import { TestBed } from '@angular/core/testing';

import { SysosLibNetappKerberosService } from './sysos-lib-netapp-kerberos.service';

describe('SysosLibNetappKerberosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappKerberosService = TestBed.get(SysosLibNetappKerberosService);
    expect(service).toBeTruthy();
  });
});
