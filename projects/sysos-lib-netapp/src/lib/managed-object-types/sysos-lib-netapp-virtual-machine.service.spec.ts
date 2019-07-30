import { TestBed } from '@angular/core/testing';

import { SysosLibNetappVirtualMachineService } from './sysos-lib-netapp-virtual-machine.service';

describe('SysosLibNetappVirtualMachineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappVirtualMachineService = TestBed.get(SysosLibNetappVirtualMachineService);
    expect(service).toBeTruthy();
  });
});
