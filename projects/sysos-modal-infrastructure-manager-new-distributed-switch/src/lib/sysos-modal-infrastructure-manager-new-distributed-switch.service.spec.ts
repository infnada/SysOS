import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerNewDistributedSwitchService } from './sysos-modal-infrastructure-manager-new-distributed-switch.service';

describe('SysosModalInfrastructureManagerNewDistributedSwitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerNewDistributedSwitchService = TestBed.get(SysosModalInfrastructureManagerNewDistributedSwitchService);
    expect(service).toBeTruthy();
  });
});
