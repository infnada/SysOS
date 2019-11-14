import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareVirtualMachineSnapshotService } from './anyopsos-lib-vmware-virtual-machine-snapshot.service';

describe('AnyOpsOSLibVmwareVirtualMachineSnapshotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareVirtualMachineSnapshotService = TestBed.get(AnyOpsOSLibVmwareVirtualMachineSnapshotService);
    expect(service).toBeTruthy();
  });
});
