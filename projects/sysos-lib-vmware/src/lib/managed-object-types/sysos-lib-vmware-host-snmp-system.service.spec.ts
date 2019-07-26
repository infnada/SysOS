import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostSnmpSystemService } from './sysos-lib-vmware-host-snmp-system.service';

describe('SysosLibVmwareHostSnmpSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostSnmpSystemService = TestBed.get(SysosLibVmwareHostSnmpSystemService);
    expect(service).toBeTruthy();
  });
});
