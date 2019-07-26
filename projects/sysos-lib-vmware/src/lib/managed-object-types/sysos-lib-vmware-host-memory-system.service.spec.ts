import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareHostMemorySystemService } from './sysos-lib-vmware-host-memory-system.service';

describe('SysosLibVmwareHostMemorySystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareHostMemorySystemService = TestBed.get(SysosLibVmwareHostMemorySystemService);
    expect(service).toBeTruthy();
  });
});
