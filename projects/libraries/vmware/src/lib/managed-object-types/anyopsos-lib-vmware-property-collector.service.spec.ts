import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwarePropertyCollectorService } from './anyopsos-lib-vmware-property-collector.service';

describe('AnyOpsOSLibVmwarePropertyCollectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwarePropertyCollectorService = TestBed.get(AnyOpsOSLibVmwarePropertyCollectorService);
    expect(service).toBeTruthy();
  });
});
