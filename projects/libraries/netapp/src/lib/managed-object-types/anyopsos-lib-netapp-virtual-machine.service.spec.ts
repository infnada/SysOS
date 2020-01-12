import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappVirtualMachineService } from './anyopsos-lib-netapp-virtual-machine.service';

describe('AnyOpsOSLibNetappVirtualMachineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappVirtualMachineService = TestBed.get(AnyOpsOSLibNetappVirtualMachineService);
    expect(service).toBeTruthy();
  });
});
