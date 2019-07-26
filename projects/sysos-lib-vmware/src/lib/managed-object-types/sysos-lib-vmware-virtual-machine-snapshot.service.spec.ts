import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareVirtualMachineSnapshotService } from './sysos-lib-vmware-virtual-machine-snapshot.service';

describe('SysosLibVmwareVirtualMachineSnapshotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareVirtualMachineSnapshotService = TestBed.get(SysosLibVmwareVirtualMachineSnapshotService);
    expect(service).toBeTruthy();
  });
});
