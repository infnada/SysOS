import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSectraceService } from './anyopsos-lib-netapp-sectrace.service';

describe('AnyOpsOSLibNetappSectraceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSectraceService = TestBed.get(AnyOpsOSLibNetappSectraceService);
    expect(service).toBeTruthy();
  });
});
