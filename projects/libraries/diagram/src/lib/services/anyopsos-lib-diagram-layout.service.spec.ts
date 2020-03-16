import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibDiagramLayoutService } from './anyopsos-lib-diagram-layout.service';

describe('AnyOpsOSLibDiagramLayoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibDiagramLayoutService = TestBed.get(AnyOpsOSLibDiagramLayoutService);
    expect(service).toBeTruthy();
  });
});
