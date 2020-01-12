import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareHostMemorySystemService } from './anyopsos-lib-vmware-host-memory-system.service';

describe('AnyOpsOSLibVmwareHostMemorySystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareHostMemorySystemService = TestBed.get(AnyOpsOSLibVmwareHostMemorySystemService);
    expect(service).toBeTruthy();
  });
});
