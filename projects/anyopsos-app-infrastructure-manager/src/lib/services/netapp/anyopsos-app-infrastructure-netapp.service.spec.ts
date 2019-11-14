import { TestBed } from '@angular/core/testing';

import { AnyOpsOSAppInfrastructureNetappService } from './anyopsos-app-infrastructure-netapp.service';

describe('AnyOpsOSAppInfrastructureNetappService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSAppInfrastructureNetappService = TestBed.get(AnyOpsOSAppInfrastructureNetappService);
    expect(service).toBeTruthy();
  });
});
