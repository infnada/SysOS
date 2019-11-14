import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostDateTimeSystemService } from './anyopsos-lib-vmware-host-date-time-system.service';

describe('AnyOpsOSLibVmwareHostDateTimeSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostDateTimeSystemService = TestBed.get(AnyOpsOSLibVmwareHostDateTimeSystemService);
    expect(service).toBeTruthy();
  });
});
