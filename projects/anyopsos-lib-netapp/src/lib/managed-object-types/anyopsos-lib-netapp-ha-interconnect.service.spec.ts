import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappHaInterconnectService } from './anyopsos-lib-netapp-ha-interconnect.service';

describe('AnyOpsOSLibNetappHaInterconnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappHaInterconnectService = TestBed.get(AnyOpsOSLibNetappHaInterconnectService);
    expect(service).toBeTruthy();
  });
});
