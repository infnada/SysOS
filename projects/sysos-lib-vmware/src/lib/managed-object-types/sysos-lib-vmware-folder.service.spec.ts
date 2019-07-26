import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareFolderService } from './sysos-lib-vmware-folder.service';

describe('SysosLibVmwareFolderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareFolderService = TestBed.get(SysosLibVmwareFolderService);
    expect(service).toBeTruthy();
  });
});
