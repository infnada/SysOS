import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareFileManagerService } from './sysos-lib-vmware-file-manager.service';

describe('SysosLibVmwareFileManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareFileManagerService = TestBed.get(SysosLibVmwareFileManagerService);
    expect(service).toBeTruthy();
  });
});
