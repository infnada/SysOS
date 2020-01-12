import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSslService } from './anyopsos-lib-netapp-ssl.service';

describe('AnyOpsOSLibNetappSslService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSslService = TestBed.get(AnyOpsOSLibNetappSslService);
    expect(service).toBeTruthy();
  });
});
