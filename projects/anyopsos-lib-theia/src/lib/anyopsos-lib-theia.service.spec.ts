import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibTheiaService } from './anyopsos-lib-theia.service';

describe('AnyOpsOSLibTheiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibTheiaService = TestBed.get(AnyOpsOSLibTheiaService);
    expect(service).toBeTruthy();
  });
});
