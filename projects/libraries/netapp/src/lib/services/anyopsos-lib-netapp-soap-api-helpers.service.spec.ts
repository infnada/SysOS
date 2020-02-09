import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSoapApiHelpersService } from './anyopsos-lib-netapp-soap-api-helpers.service';

describe('AnyOpsOSLibNetappSoapApiHelpersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSoapApiHelpersService = TestBed.get(AnyOpsOSLibNetappSoapApiHelpersService);
    expect(service).toBeTruthy();
  });
});
