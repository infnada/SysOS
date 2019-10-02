import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerNewVirtualMachineService } from './sysos-modal-infrastructure-manager-new-virtual-machine.service';

describe('SysosModalInfrastructureManagerNewVirtualMachineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerNewVirtualMachineService = TestBed.get(SysosModalInfrastructureManagerNewVirtualMachineService);
    expect(service).toBeTruthy();
  });
});
