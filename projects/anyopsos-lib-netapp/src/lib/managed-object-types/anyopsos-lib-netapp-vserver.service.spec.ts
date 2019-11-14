import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappVserverService } from './anyopsos-lib-netapp-vserver.service';

describe('AnyOpsOSLibNetappVserverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappVserverService = TestBed.get(AnyOpsOSLibNetappVserverService);
    expect(service).toBeTruthy();
  });
});
