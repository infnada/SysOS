import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerNewClusterService } from './sysos-modal-infrastructure-manager-new-cluster.service';

describe('SysosModalInfrastructureManagerNewClusterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerNewClusterService = TestBed.get(SysosModalInfrastructureManagerNewClusterService);
    expect(service).toBeTruthy();
  });
});
