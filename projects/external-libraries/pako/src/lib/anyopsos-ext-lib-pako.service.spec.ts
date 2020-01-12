import { TestBed } from '@angular/core/testing';

import { AnyOpsOSExtLibPakoService } from './anyopsos-ext-lib-pako.service';

describe('AnyOpsOSExtLibPakoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSExtLibPakoService = TestBed.get(AnyOpsOSExtLibPakoService);
    expect(service).toBeTruthy();
  });
});
