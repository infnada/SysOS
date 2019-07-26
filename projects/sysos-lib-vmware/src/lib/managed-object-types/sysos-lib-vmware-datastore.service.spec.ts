import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareDatastoreService } from './sysos-lib-vmware-datastore.service';

describe('SysosLibVmwareDatastoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareDatastoreService = TestBed.get(SysosLibVmwareDatastoreService);
    expect(service).toBeTruthy();
  });
});
