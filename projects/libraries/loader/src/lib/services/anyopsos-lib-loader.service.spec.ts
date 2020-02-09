import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibLoaderService } from './anyopsos-lib-loader.service';

describe('AnyOpsOSLibLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibLoaderService = TestBed.get(AnyOpsOSLibLoaderService);
    expect(service).toBeTruthy();
  });
});
