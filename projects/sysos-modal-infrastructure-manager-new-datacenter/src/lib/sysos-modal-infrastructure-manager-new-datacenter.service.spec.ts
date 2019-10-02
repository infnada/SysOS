import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerNewDatacenterService } from './sysos-modal-infrastructure-manager-new-datacenter.service';

describe('SysosModalInfrastructureManagerNewDatacenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerNewDatacenterService = TestBed.get(SysosModalInfrastructureManagerNewDatacenterService);
    expect(service).toBeTruthy();
  });
});
