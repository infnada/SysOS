import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareSoapApiService } from './anyopsos-lib-vmware-soap-api.service';

describe('AnyOpsOSLibVmwareSoapApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareSoapApiService = TestBed.get(AnyOpsOSLibVmwareSoapApiService);
    expect(service).toBeTruthy();
  });
});
