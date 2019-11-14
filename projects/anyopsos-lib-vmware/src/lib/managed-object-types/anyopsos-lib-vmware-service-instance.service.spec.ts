import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareServiceInstanceService } from './anyopsos-lib-vmware-service-instance.service';

describe('AnyOpsOSLibVmwareServiceInstanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareServiceInstanceService = TestBed.get(AnyOpsOSLibVmwareServiceInstanceService);
    expect(service).toBeTruthy();
  });
});
