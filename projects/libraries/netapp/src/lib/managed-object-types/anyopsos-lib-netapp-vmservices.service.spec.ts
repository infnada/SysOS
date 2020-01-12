import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappVmservicesService } from './anyopsos-lib-netapp-vmservices.service';

describe('AnyOpsOSLibNetappVmservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappVmservicesService = TestBed.get(AnyOpsOSLibNetappVmservicesService);
    expect(service).toBeTruthy();
  });
});
