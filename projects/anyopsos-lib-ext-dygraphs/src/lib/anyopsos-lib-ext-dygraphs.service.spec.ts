import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibExtDygraphsService } from './anyopsos-lib-ext-dygraphs.service';

describe('AnyOpsOSLibExtDygraphsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibExtDygraphsService = TestBed.get(AnyOpsOSLibExtDygraphsService);
    expect(service).toBeTruthy();
  });
});
