import { TestBed } from '@angular/core/testing';

import { AnyOpsOSExtLibLzStringService } from './anyopsos-ext-lib-lz-string.service';

describe('AnyOpsOSExtLibLzStringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSExtLibLzStringService = TestBed.get(AnyOpsOSExtLibLzStringService);
    expect(service).toBeTruthy();
  });
});
