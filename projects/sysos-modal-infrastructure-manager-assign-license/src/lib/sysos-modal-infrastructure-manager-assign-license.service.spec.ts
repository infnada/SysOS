import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerAssignLicenseService } from './sysos-modal-infrastructure-manager-assign-license.service';

describe('SysosModalInfrastructureManagerAssignLicenseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerAssignLicenseService = TestBed.get(SysosModalInfrastructureManagerAssignLicenseService);
    expect(service).toBeTruthy();
  });
});
