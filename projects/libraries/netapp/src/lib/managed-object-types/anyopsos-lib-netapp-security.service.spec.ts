import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSecurityService } from './anyopsos-lib-netapp-security.service';

describe('AnyOpsOSLibNetappSecurityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSecurityService = TestBed.get(AnyOpsOSLibNetappSecurityService);
    expect(service).toBeTruthy();
  });
});
