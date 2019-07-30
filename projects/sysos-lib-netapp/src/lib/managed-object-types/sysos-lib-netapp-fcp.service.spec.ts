import { TestBed } from '@angular/core/testing';

import { SysosLibNetappFcpService } from './sysos-lib-netapp-fcp.service';

describe('SysosLibNetappFcpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappFcpService = TestBed.get(SysosLibNetappFcpService);
    expect(service).toBeTruthy();
  });
});
