import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappFcportService } from './anyopsos-lib-netapp-fcport.service';

describe('AnyOpsOSLibNetappFcportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappFcportService = TestBed.get(AnyOpsOSLibNetappFcportService);
    expect(service).toBeTruthy();
  });
});
