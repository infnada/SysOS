import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareServiceManagerService } from './sysos-lib-vmware-service-manager.service';

describe('SysosLibVmwareServiceManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareServiceManagerService = TestBed.get(SysosLibVmwareServiceManagerService);
    expect(service).toBeTruthy();
  });
});
