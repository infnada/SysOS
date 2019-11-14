import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibExtPakoService } from './anyopsos-lib-ext-pako.service';

describe('AnyOpsOSLibExtPakoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibExtPakoService = TestBed.get(AnyOpsOSLibExtPakoService);
    expect(service).toBeTruthy();
  });
});
