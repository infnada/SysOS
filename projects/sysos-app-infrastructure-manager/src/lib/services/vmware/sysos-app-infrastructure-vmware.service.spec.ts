import { TestBed } from '@angular/core/testing';

import { SysosAppInfrastructureVmwareService } from './sysos-app-infrastructure-vmware.service';

describe('SysosAppInfrastructureVmwareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosAppInfrastructureVmwareService = TestBed.get(SysosAppInfrastructureVmwareService);
    expect(service).toBeTruthy();
  });
});
