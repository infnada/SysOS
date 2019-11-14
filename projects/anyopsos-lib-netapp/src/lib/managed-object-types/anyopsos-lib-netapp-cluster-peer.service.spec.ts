import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappClusterPeerService } from './anyopsos-lib-netapp-cluster-peer.service';

describe('AnyOpsOSLibNetappClusterPeerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappClusterPeerService = TestBed.get(AnyOpsOSLibNetappClusterPeerService);
    expect(service).toBeTruthy();
  });
});
