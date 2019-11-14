import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppInfrastructureVmwareService } from './anyopsos-app-infrastructure-vmware.service';

describe('AnyOpsOSAppInfrastructureVmwareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppInfrastructureVmwareService = TestBed.get(AnyOpsOSAppInfrastructureVmwareService);
    expect(service).toBeTruthy();
  });
});
