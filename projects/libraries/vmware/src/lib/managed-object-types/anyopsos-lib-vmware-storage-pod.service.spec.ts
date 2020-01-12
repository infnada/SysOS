import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareStoragePodService } from './anyopsos-lib-vmware-storage-pod.service';

describe('AnyOpsOSLibVmwareStoragePodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareStoragePodService = TestBed.get(AnyOpsOSLibVmwareStoragePodService);
    expect(service).toBeTruthy();
  });
});
