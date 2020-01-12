import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostSnmpSystemService } from './anyopsos-lib-vmware-host-snmp-system.service';

describe('AnyOpsOSLibVmwareHostSnmpSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostSnmpSystemService = TestBed.get(AnyOpsOSLibVmwareHostSnmpSystemService);
    expect(service).toBeTruthy();
  });
});
