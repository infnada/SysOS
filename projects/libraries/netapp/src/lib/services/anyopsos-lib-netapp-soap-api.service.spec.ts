import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSoapApiService } from './anyopsos-lib-netapp-soap-api.service';

describe('AnyOpsOSLibNetappSoapApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSoapApiService = TestBed.get(AnyOpsOSLibNetappSoapApiService);
    expect(service).toBeTruthy();
  });
});
