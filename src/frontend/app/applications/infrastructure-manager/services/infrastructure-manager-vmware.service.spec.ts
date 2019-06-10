import { TestBed } from '@angular/core/testing';

import { InfrastructureManagerVmwareService } from './infrastructure-manager-vmware.service';

describe('InfrastructureManagerVmwareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfrastructureManagerVmwareService = TestBed.get(InfrastructureManagerVmwareService);
    expect(service).toBeTruthy();
  });
});
