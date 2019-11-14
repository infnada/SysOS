import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappCifsService } from './anyopsos-lib-netapp-cifs.service';

describe('AnyOpsOSLibNetappCifsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappCifsService = TestBed.get(AnyOpsOSLibNetappCifsService);
    expect(service).toBeTruthy();
  });
});
