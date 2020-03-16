import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibDiagramService } from './anyopsos-lib-diagram.service';

describe('AnyOpsOSLibDiagramService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibDiagramService = TestBed.get(AnyOpsOSLibDiagramService);
    expect(service).toBeTruthy();
  });
});
