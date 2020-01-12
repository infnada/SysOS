import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappVserverPeerService } from './anyopsos-lib-netapp-vserver-peer.service';

describe('AnyOpsOSLibNetappVserverPeerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappVserverPeerService = TestBed.get(AnyOpsOSLibNetappVserverPeerService);
    expect(service).toBeTruthy();
  });
});
