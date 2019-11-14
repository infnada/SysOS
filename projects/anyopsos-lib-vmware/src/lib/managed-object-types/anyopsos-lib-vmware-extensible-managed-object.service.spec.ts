import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareExtensibleManagedObjectService } from './anyopsos-lib-vmware-extensible-managed-object.service';

describe('AnyOpsOSLibVmwareExtensibleManagedObjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareExtensibleManagedObjectService = TestBed.get(AnyOpsOSLibVmwareExtensibleManagedObjectService);
    expect(service).toBeTruthy();
  });
});
