import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareVirtualAppService } from './sysos-lib-vmware-virtual-app.service';

describe('SysosLibVmwareVirtualAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareVirtualAppService = TestBed.get(SysosLibVmwareVirtualAppService);
    expect(service).toBeTruthy();
  });
});
