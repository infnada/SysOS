import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeNetappSoapApiHelpersService } from './anyopsos-lib-node-netapp-soap-api-helpers.service';

describe('AnyOpsOSLibNodeNetappSoapApiHelpersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeNetappSoapApiHelpersService = TestBed.get(AnyOpsOSLibNodeNetappSoapApiHelpersService);
    expect(service).toBeTruthy();
  });
});
