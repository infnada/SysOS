import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostDatastoreSystemService } from './sysos-lib-vmware-host-datastore-system.service';

describe('SysosLibVmwareHostDatastoreSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostDatastoreSystemService = TestBed.get(SysosLibVmwareHostDatastoreSystemService);
    expect(service).toBeTruthy();
  });
});
