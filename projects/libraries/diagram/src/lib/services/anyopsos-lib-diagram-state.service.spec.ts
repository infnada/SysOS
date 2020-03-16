import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibDiagramStateService } from './anyopsos-lib-diagram-state.service';

describe('AnyOpsOSLibDiagramStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibDiagramStateService = TestBed.get(AnyOpsOSLibDiagramStateService);
    expect(service).toBeTruthy();
  });
});
