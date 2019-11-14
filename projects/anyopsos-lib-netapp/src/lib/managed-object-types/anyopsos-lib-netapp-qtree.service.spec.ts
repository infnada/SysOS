import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappQtreeService } from './anyopsos-lib-netapp-qtree.service';

describe('AnyOpsOSLibNetappQtreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappQtreeService = TestBed.get(AnyOpsOSLibNetappQtreeService);
    expect(service).toBeTruthy();
  });
});
