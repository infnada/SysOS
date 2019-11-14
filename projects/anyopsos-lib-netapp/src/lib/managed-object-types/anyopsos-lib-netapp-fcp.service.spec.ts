import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappFcpService } from './anyopsos-lib-netapp-fcp.service';

describe('AnyOpsOSLibNetappFcpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappFcpService = TestBed.get(AnyOpsOSLibNetappFcpService);
    expect(service).toBeTruthy();
  });
});
