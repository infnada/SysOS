import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareVstorageObjectManagerBaseService } from './anyopsos-lib-vmware-vstorage-object-manager-base.service';

describe('AnyOpsOSLibVmwareVstorageObjectManagerBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareVstorageObjectManagerBaseService = TestBed.get(AnyOpsOSLibVmwareVstorageObjectManagerBaseService);
    expect(service).toBeTruthy();
  });
});
