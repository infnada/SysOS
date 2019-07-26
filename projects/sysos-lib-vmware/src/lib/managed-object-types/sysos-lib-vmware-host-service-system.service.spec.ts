import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostServiceSystemService } from './sysos-lib-vmware-host-service-system.service';

describe('SysosLibVmwareHostServiceSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostServiceSystemService = TestBed.get(SysosLibVmwareHostServiceSystemService);
    expect(service).toBeTruthy();
  });
});
