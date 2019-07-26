import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareOptionManagerService } from './sysos-lib-vmware-option-manager.service';

describe('SysosLibVmwareOptionManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareOptionManagerService = TestBed.get(SysosLibVmwareOptionManagerService);
    expect(service).toBeTruthy();
  });
});
