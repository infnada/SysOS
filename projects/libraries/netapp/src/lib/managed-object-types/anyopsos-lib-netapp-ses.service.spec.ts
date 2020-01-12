import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSesService } from './anyopsos-lib-netapp-ses.service';

describe('AnyOpsOSLibNetappSesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSesService = TestBed.get(AnyOpsOSLibNetappSesService);
    expect(service).toBeTruthy();
  });
});
