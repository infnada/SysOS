import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareViewService } from './sysos-lib-vmware-view.service';

describe('SysosLibVmwareViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareViewService = TestBed.get(SysosLibVmwareViewService);
    expect(service).toBeTruthy();
  });
});
