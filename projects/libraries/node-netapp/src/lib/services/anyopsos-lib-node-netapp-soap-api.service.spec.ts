import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNodeNetappSoapApiService } from './anyopsos-lib-node-netapp-soap-api.service';

describe('AnyOpsOSLibNodeNetappSoapApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNodeNetappSoapApiService = TestBed.get(AnyOpsOSLibNodeNetappSoapApiService);
    expect(service).toBeTruthy();
  });
});
