import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostVstorageObjectManagerService } from './anyopsos-lib-vmware-host-vstorage-object-manager.service';

describe('AnyOpsOSLibVmwareHostVstorageObjectManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostVstorageObjectManagerService = TestBed.get(AnyOpsOSLibVmwareHostVstorageObjectManagerService);
    expect(service).toBeTruthy();
  });
});
