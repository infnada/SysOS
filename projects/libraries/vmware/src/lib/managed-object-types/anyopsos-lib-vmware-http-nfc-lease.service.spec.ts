import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHttpNfcLeaseService } from './anyopsos-lib-vmware-http-nfc-lease.service';

describe('AnyOpsOSLibVmwareHttpNfcLeaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHttpNfcLeaseService = TestBed.get(AnyOpsOSLibVmwareHttpNfcLeaseService);
    expect(service).toBeTruthy();
  });
});
