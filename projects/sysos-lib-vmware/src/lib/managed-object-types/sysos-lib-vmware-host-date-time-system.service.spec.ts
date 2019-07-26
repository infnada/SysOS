import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostDateTimeSystemService } from './sysos-lib-vmware-host-date-time-system.service';

describe('SysosLibVmwareHostDateTimeSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostDateTimeSystemService = TestBed.get(SysosLibVmwareHostDateTimeSystemService);
    expect(service).toBeTruthy();
  });
});
