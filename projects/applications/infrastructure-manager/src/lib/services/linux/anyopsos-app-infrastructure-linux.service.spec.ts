import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppInfrastructureLinuxService } from './anyopsos-app-infrastructure-linux.service';

describe('AnyOpsOSAppInfrastructureLinuxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppInfrastructureLinuxService = TestBed.get(AnyOpsOSAppInfrastructureLinuxService);
    expect(service).toBeTruthy();
  });
});
