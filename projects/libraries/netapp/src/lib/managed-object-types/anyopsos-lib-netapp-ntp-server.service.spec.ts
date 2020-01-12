import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappNtpServerService } from './anyopsos-lib-netapp-ntp-server.service';

describe('AnyOpsOSLibNetappNtpServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappNtpServerService = TestBed.get(AnyOpsOSLibNetappNtpServerService);
    expect(service).toBeTruthy();
  });
});
