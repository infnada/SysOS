import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerNewDistributedPortGroupService } from './sysos-modal-infrastructure-manager-new-distributed-port-group.service';

describe('SysosModalInfrastructureManagerNewDistributedPortGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerNewDistributedPortGroupService = TestBed.get(SysosModalInfrastructureManagerNewDistributedPortGroupService);
    expect(service).toBeTruthy();
  });
});
