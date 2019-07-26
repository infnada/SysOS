import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHttpNfcLeaseService } from './sysos-lib-vmware-http-nfc-lease.service';

describe('SysosLibVmwareHttpNfcLeaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHttpNfcLeaseService = TestBed.get(SysosLibVmwareHttpNfcLeaseService);
    expect(service).toBeTruthy();
  });
});
