import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostSpecificationManagerService } from './sysos-lib-vmware-host-specification-manager.service';

describe('SysosLibVmwareHostSpecificationManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostSpecificationManagerService = TestBed.get(SysosLibVmwareHostSpecificationManagerService);
    expect(service).toBeTruthy();
  });
});
