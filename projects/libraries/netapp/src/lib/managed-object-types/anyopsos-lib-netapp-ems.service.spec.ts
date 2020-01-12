import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappEmsService } from './anyopsos-lib-netapp-ems.service';

describe('AnyOpsOSLibNetappEmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappEmsService = TestBed.get(AnyOpsOSLibNetappEmsService);
    expect(service).toBeTruthy();
  });
});
