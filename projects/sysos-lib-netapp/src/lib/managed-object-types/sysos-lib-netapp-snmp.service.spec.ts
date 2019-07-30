import { TestBed } from '@angular/core/testing';

import { SysosLibNetappSnmpService } from './sysos-lib-netapp-snmp.service';

describe('SysosLibNetappSnmpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappSnmpService = TestBed.get(SysosLibNetappSnmpService);
    expect(service).toBeTruthy();
  });
});
