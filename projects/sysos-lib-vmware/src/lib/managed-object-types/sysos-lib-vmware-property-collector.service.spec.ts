import { TestBed } from '@angular/core/testing';

import { SysosLibVmwarePropertyCollectorService } from './sysos-lib-vmware-property-collector.service';

describe('SysosLibVmwarePropertyCollectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwarePropertyCollectorService = TestBed.get(SysosLibVmwarePropertyCollectorService);
    expect(service).toBeTruthy();
  });
});
