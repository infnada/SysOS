import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareExtensibleManagedObjectService } from './sysos-lib-vmware-extensible-managed-object.service';

describe('SysosLibVmwareExtensibleManagedObjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareExtensibleManagedObjectService = TestBed.get(SysosLibVmwareExtensibleManagedObjectService);
    expect(service).toBeTruthy();
  });
});
