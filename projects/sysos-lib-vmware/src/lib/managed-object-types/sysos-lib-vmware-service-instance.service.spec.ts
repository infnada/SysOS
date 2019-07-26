import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareServiceInstanceService } from './sysos-lib-vmware-service-instance.service';

describe('SysosLibVmwareServiceInstanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareServiceInstanceService = TestBed.get(SysosLibVmwareServiceInstanceService);
    expect(service).toBeTruthy();
  });
});
