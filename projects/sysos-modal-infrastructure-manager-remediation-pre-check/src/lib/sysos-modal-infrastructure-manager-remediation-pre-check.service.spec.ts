import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerRemediationPreCheckService } from './sysos-modal-infrastructure-manager-remediation-pre-check.service';

describe('SysosModalInfrastructureManagerRemediationPreCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerRemediationPreCheckService = TestBed.get(SysosModalInfrastructureManagerRemediationPreCheckService);
    expect(service).toBeTruthy();
  });
});
