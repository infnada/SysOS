import { TestBed } from '@angular/core/testing';

import { SysosLibNetappClusterPeerService } from './sysos-lib-netapp-cluster-peer.service';

describe('SysosLibNetappClusterPeerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappClusterPeerService = TestBed.get(SysosLibNetappClusterPeerService);
    expect(service).toBeTruthy();
  });
});
