import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappLicenseV2Service } from './anyopsos-lib-netapp-license-v2.service';

describe('AnyOpsOSLibNetappLicenseV2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappLicenseV2Service = TestBed.get(AnyOpsOSLibNetappLicenseV2Service);
    expect(service).toBeTruthy();
  });
});
