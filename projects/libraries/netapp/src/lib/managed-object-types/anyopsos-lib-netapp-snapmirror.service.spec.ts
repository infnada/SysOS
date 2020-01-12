import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSnapmirrorService } from './anyopsos-lib-netapp-snapmirror.service';

describe('AnyOpsOSLibNetappSnapmirrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSnapmirrorService = TestBed.get(AnyOpsOSLibNetappSnapmirrorService);
    expect(service).toBeTruthy();
  });
});
