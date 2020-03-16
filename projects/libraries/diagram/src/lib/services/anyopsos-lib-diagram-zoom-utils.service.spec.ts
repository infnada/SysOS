import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibDiagramZoomUtilsService } from './anyopsos-lib-diagram-zoom-utils.service';

describe('AnyOpsOSLibDiagramZoomUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibDiagramZoomUtilsService = TestBed.get(AnyOpsOSLibDiagramZoomUtilsService);
    expect(service).toBeTruthy();
  });
});
