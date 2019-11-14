import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareVcenterVstorageObjectManagerService } from './anyopsos-lib-vmware-vcenter-vstorage-object-manager.service';

describe('AnyOpsOSLibVmwareVcenterVstorageObjectManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareVcenterVstorageObjectManagerService = TestBed.get(AnyOpsOSLibVmwareVcenterVstorageObjectManagerService);
    expect(service).toBeTruthy();
  });
});
