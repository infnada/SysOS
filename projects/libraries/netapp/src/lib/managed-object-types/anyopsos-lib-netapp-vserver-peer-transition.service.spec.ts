import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappVserverPeerTransitionService } from './anyopsos-lib-netapp-vserver-peer-transition.service';

describe('AnyOpsOSLibNetappVserverPeerTransitionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappVserverPeerTransitionService = TestBed.get(AnyOpsOSLibNetappVserverPeerTransitionService);
    expect(service).toBeTruthy();
  });
});
