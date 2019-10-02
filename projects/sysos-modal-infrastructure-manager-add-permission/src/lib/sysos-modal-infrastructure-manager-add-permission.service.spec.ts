import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerAddPermissionService } from './sysos-modal-infrastructure-manager-add-permission.service';

describe('SysosModalInfrastructureManagerAddPermissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerAddPermissionService = TestBed.get(SysosModalInfrastructureManagerAddPermissionService);
    expect(service).toBeTruthy();
  });
});
