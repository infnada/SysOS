import { TestBed } from '@angular/core/testing';

import { SysosLibNetappVserverPeerService } from './sysos-lib-netapp-vserver-peer.service';

describe('SysosLibNetappVserverPeerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappVserverPeerService = TestBed.get(SysosLibNetappVserverPeerService);
    expect(service).toBeTruthy();
  });
});
