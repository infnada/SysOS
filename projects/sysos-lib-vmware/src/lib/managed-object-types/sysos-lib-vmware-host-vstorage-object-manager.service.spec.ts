import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostVstorageObjectManagerService } from './sysos-lib-vmware-host-vstorage-object-manager.service';

describe('SysosLibVmwareHostVstorageObjectManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostVstorageObjectManagerService = TestBed.get(SysosLibVmwareHostVstorageObjectManagerService);
    expect(service).toBeTruthy();
  });
});
