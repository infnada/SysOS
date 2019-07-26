import { TestBed } from '@angular/core/testing';

import { SysosLibVmwarePropertyFilterService } from './sysos-lib-vmware-property-filter.service';

describe('SysosLibVmwarePropertyFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwarePropertyFilterService = TestBed.get(SysosLibVmwarePropertyFilterService);
    expect(service).toBeTruthy();
  });
});
