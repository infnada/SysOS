import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareStoragePodService } from './sysos-lib-vmware-storage-pod.service';

describe('SysosLibVmwareStoragePodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareStoragePodService = TestBed.get(SysosLibVmwareStoragePodService);
    expect(service).toBeTruthy();
  });
});
