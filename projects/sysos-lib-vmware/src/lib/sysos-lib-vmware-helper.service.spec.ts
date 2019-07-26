import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHelperService } from './sysos-lib-vmware-helper.service';

describe('SysosLibVmwareHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHelperService = TestBed.get(SysosLibVmwareHelperService);
    expect(service).toBeTruthy();
  });
});
