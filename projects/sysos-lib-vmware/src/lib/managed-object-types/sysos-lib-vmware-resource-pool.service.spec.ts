import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareResourcePoolService } from './sysos-lib-vmware-resource-pool.service';

describe('SysosLibVmwareResourcePoolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareResourcePoolService = TestBed.get(SysosLibVmwareResourcePoolService);
    expect(service).toBeTruthy();
  });
});
