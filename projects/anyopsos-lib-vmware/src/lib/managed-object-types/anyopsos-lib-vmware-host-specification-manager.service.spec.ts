import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostSpecificationManagerService } from './anyopsos-lib-vmware-host-specification-manager.service';

describe('AnyOpsOSLibVmwareHostSpecificationManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostSpecificationManagerService = TestBed.get(AnyOpsOSLibVmwareHostSpecificationManagerService);
    expect(service).toBeTruthy();
  });
});
