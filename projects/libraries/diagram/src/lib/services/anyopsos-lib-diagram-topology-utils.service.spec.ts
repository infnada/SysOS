import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibDiagramTopologyUtilsService } from './anyopsos-lib-diagram-topology-utils.service';

describe('AnyOpsOSLibDiagramTopologyUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibDiagramTopologyUtilsService = TestBed.get(AnyOpsOSLibDiagramTopologyUtilsService);
    expect(service).toBeTruthy();
  });
});
