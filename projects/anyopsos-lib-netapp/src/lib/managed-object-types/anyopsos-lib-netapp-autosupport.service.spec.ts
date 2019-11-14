import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappAutosupportService } from './anyopsos-lib-netapp-autosupport.service';

describe('AnyOpsOSLibNetappAutosupportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappAutosupportService = TestBed.get(AnyOpsOSLibNetappAutosupportService);
    expect(service).toBeTruthy();
  });
});
