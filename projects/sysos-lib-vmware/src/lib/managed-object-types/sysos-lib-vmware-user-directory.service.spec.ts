import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareUserDirectoryService } from './sysos-lib-vmware-user-directory.service';

describe('SysosLibVmwareUserDirectoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareUserDirectoryService = TestBed.get(SysosLibVmwareUserDirectoryService);
    expect(service).toBeTruthy();
  });
});
