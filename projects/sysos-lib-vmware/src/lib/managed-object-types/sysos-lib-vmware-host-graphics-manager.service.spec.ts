import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostGraphicsManagerService } from './sysos-lib-vmware-host-graphics-manager.service';

describe('SysosLibVmwareHostGraphicsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostGraphicsManagerService = TestBed.get(SysosLibVmwareHostGraphicsManagerService);
    expect(service).toBeTruthy();
  });
});
