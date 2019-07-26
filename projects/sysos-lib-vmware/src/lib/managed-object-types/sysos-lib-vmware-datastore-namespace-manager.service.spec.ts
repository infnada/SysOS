import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareDatastoreNamespaceManagerService } from './sysos-lib-vmware-datastore-namespace-manager.service';

describe('SysosLibVmwareDatastoreNamespaceManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareDatastoreNamespaceManagerService = TestBed.get(SysosLibVmwareDatastoreNamespaceManagerService);
    expect(service).toBeTruthy();
  });
});
