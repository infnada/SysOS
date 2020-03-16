import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeVmwareSoapApiService } from './anyopsos-lib-node-vmware-soap-api.service';

describe('AnyOpsOSLibNodeVmwareSoapApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeVmwareSoapApiService = TestBed.get(AnyOpsOSLibNodeVmwareSoapApiService);
    expect(service).toBeTruthy();
  });
});
