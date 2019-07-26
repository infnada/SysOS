import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareVcenterVstorageObjectManagerService } from './sysos-lib-vmware-vcenter-vstorage-object-manager.service';

describe('SysosLibVmwareVcenterVstorageObjectManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareVcenterVstorageObjectManagerService = TestBed.get(SysosLibVmwareVcenterVstorageObjectManagerService);
    expect(service).toBeTruthy();
  });
});
