import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareViewManagerService } from './sysos-lib-vmware-view-manager.service';

describe('SysosLibVmwareViewManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareViewManagerService = TestBed.get(SysosLibVmwareViewManagerService);
    expect(service).toBeTruthy();
  });
});
