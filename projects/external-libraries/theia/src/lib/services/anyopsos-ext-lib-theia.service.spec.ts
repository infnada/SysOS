import { TestBed } from '@angular/core/testing';

import { AnyOpsOSExtLibTheiaService } from './anyopsos-ext-lib-theia.service';

describe('AnyOpsOSExtLibTheiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSExtLibTheiaService = TestBed.get(AnyOpsOSExtLibTheiaService);
    expect(service).toBeTruthy();
  });
});
