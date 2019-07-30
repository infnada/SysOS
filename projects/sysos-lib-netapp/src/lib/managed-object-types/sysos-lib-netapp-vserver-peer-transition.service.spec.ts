import { TestBed } from '@angular/core/testing';

import { SysosLibNetappVserverPeerTransitionService } from './sysos-lib-netapp-vserver-peer-transition.service';

describe('SysosLibNetappVserverPeerTransitionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappVserverPeerTransitionService = TestBed.get(SysosLibNetappVserverPeerTransitionService);
    expect(service).toBeTruthy();
  });
});
