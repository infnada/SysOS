import { TestBed } from '@angular/core/testing';

import { SysosLibNetappNtpServerService } from './sysos-lib-netapp-ntp-server.service';

describe('SysosLibNetappNtpServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappNtpServerService = TestBed.get(SysosLibNetappNtpServerService);
    expect(service).toBeTruthy();
  });
});
