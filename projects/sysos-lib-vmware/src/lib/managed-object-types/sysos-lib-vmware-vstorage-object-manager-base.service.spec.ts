import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareVstorageObjectManagerBaseService } from './sysos-lib-vmware-vstorage-object-manager-base.service';

describe('SysosLibVmwareVstorageObjectManagerBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareVstorageObjectManagerBaseService = TestBed.get(SysosLibVmwareVstorageObjectManagerBaseService);
    expect(service).toBeTruthy();
  });
});
