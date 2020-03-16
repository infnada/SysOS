import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibDiagramDomUtilsService } from './anyopsos-lib-diagram-dom-utils.service';

describe('AnyOpsOSLibDiagramDomUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibDiagramDomUtilsService = TestBed.get(AnyOpsOSLibDiagramDomUtilsService);
    expect(service).toBeTruthy();
  });
});
