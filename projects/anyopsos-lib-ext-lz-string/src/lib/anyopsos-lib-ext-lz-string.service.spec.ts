import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibExtLzStringService } from './anyopsos-lib-ext-lz-string.service';

describe('AnyOpsOSLibExtLzStringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibExtLzStringService = TestBed.get(AnyOpsOSLibExtLzStringService);
    expect(service).toBeTruthy();
  });
});
